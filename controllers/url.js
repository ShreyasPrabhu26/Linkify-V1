const ShortUniqueId = require('short-unique-id');
const { randomUUID:randomID } = new ShortUniqueId({ length: 10 });
const {url_model} = require("../models/url")

async function handleGenerateNewShortURL(req,res){
    const body = req.body;
    const {redirectURL} = body;

    if(!redirectURL) {
        res.status(400).json({error: "URL cannot be empty"});
    }
    const shortId = randomID();

    await url_model.create({
        shortId,
        redirectURL,
    })

    return res.json({id :shortId})
}

module.exports = {
    handleGenerateNewShortURL
}