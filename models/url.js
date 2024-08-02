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

    visitHistory: [{
        timestamp: String,
        ip_address: String,
        device: String,
        os: String,
        browser: String,
        country: String,
        region: String,
        regionName: String,
        city: String,
        lat: String,
        lon: String,
        isp: String,
        org: String,
        device: String,
        os: String,
        zip: Number
    }],

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    }

}, { timestamps: true }
);

const url_model = mongoose.model("url", urlSchema);

module.exports = { url_model };
