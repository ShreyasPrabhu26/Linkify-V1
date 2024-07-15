const express = require('express');
const path = require('path');
const app = express()

// Get data from environment variables
const PORT = process.env.PORT || 8080;
const CONNECTION_URL = process.env.CONNECTION_URL;

const connectToMongoDb = require('./mongo_db_connection')
const urlRouter = require("./routes/url")
const staticRouter = require("./routes/staticRouter");

// Middleware configuration
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use("/url", urlRouter)
app.use("/",staticRouter)
app.set("view engine", "ejs");
app.set("views",path.resolve("./views"))


connectToMongoDb(CONNECTION_URL)

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));

