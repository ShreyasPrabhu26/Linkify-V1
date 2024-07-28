const express = require('express');
const { url_model } = require("../models/url");
const { restrictTo } = require("../middlewares/auth");
const router = express.Router();
const { getUser } = require('../service/auth');


router.get('/admin/urls', restrictTo(["ADMIN"]), async (req, res) => {
    const allUrls = await url_model.find({});
    return res.render('home', {
        urls: allUrls
    });
})

// router.get('/', restrictTo(["ADMIN", "NORMAL"]), async (req, res) => {
//     const allUrls = await url_model.find({ createdBy: req.user._id });
//     return res.render('home', {
//         urls: allUrls
//     });
// })

router.get('/', async (req, res) => {
    // const allUrls = await url_model.find({ createdBy: req.user._id });
    const token = req.cookies['access-token'];
    const user = getUser(token);
    // const num = Math.floor(Math.random() * 10) + 1;
    res.render('home', { user });
});

router.get("/signup", async (req, res) => {
    return res.render("signup")
})

router.get("/login", async (req, res) => {
    return res.render("login")
})

router.get("/:shortId", async (req, res) => {
    try {
        const { shortId } = req.params;

        // Validate shortId length
        if (shortId.length !== 10) {
            return res.status(400).json({ "Error": "Invalid Short URL" });
        }
        const entry = await url_model.findOneAndUpdate(
            { shortId },
            {
                $push: {
                    visitHistory: {
                        timestamp: Date.now(),
                        ip_address: req.ip
                    },
                },
            },
        );

        if (!entry) {
            return res.status(404).json({ "Error": "URL not found" });
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

module.exports = router;