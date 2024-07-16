const ShortUniqueId = require('short-unique-id');
const {randomUUID: randomID} = new ShortUniqueId({length: 10});
const {url_model} = require("../models/url")


async function handleGenerateNewShortURL(req, res) {
    const body = req.body;
    const {redirectURL} = body;

    if (!redirectURL) {
        res.status(400).json({error: "URL cannot be empty"});
    }
    const shortId = randomID();

    await url_model.create({
        shortId,
        redirectURL,
        createdBy:req.user._id
    })

    return res.redirect("/")
}

async function handleGetAnalytics(req, res) {
    const shortId = req.params.shortId;
    const result = await url_model.findOne({shortId});
    return res.json({
        totalClicks: result.visitHistory.length,
        analytics: result.visitHistory
    })

}

module.exports = {
    handleGenerateNewShortURL,
    handleGetAnalytics
}