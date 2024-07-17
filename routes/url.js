const express = require('express');
const router = express.Router();
const {handleGenerateNewShortURL,handleGetAnalytics} = require('../controllers/url');
const {url_model} = require("../models/url");
const {authLoggedInUser} = require("../middlewares/auth");

router.post('/',authLoggedInUser,handleGenerateNewShortURL);
router.get("/:shortId", async (req, res) => {
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
router.get("/analytics/:shortId",handleGetAnalytics);

module.exports = router;