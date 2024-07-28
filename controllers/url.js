const ShortUniqueId = require('short-unique-id');
const { randomUUID: randomID } = new ShortUniqueId({ length: 10 });
const { url_model } = require("../models/url");

async function handleGenerateNewShortURL(req, res) {
    const body = req.body;
    const { redirectURL } = body;

    if (!redirectURL) {
        if (req.originalUrl.startsWith('/api')) {
            return res.status(400).json({ error: "URL cannot be empty" });
        }
        return res.status(400).render('error', { error: "URL cannot be empty" });
    }

    const shortId = randomID();

    await url_model.create({
        shortId,
        redirectURL,
        createdBy: req.user._id
    });

    if (req.originalUrl.startsWith('/api')) {
        return res.json({ shortId });
    }
    return res.redirect("/");
}

async function handleGetAnalytics(req, res) {
    const shortId = req.params.shortId;
    const result = await url_model.findOne({ shortId });
    const response = {
        totalClicks: result.visitHistory.length,
        analytics: result.visitHistory
    };

    if (req.originalUrl.startsWith('/api')) {
        return res.json(response);
    }
}

module.exports = {
    handleGenerateNewShortURL,
    handleGetAnalytics
};
