const mongoose = require('mongoose')

const urlSchema = new mongoose.Schema({
    shortId: {
        type: String,
        required: true,
        unique: true
    },
    redirectURL: {
        type: String,
        required: true,
    },

    visitClicks: Number

    }, {timestamps: true}
);

const url_model = mongoose.model("url", urlSchema);

module.exports = {url_model}
