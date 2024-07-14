const express = require('express');
const app = express()

// Get data from environment variables
const PORT = process.env.PORT || 8080;
const CONNECTION_URL = process.env.CONNECTION_URL;

const connectToMongoDb = require('./mongo_db_connection')
const urlRouter = require("./routes/url")
const {url_model} = require("./models/url");

// Middleware configuration
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use("/url", urlRouter)

app.get("/", (req, res) => {
    res.json({"msg": "All is well"})
})

app.get("/:shortId", async (req, res) => {
    try {
        const {shortId} = req.params;

        // Validate shortId length
        if (shortId.length !== 10) {
            return res.status(400).json({"Error": "Invalid Short URL"});
        }
        const entry = await url_model.findOneAndUpdate(
            {shortId},
            {
                $push: {
                    visitHistory: {
                        timestamp: Date.now(),
                        ip_address:req.ip
                    },
                },
            },
        );

        if (!entry) {
            return res.status(404).json({"Error": "URL not found"});
        }

        // Validate and prepare the redirect URL
        const redirectURL = /^https?:\/\//i.test(entry.redirectURL) ? entry.redirectURL : `http://${entry.redirectURL}`;

        // Redirect to the correct URL
        return res.redirect(302, redirectURL);

    } catch (error) {
        console.error(`Error:${error}`);
        return res.status(500).send('Internal Server Error');
    }
})

connectToMongoDb(CONNECTION_URL)

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));

