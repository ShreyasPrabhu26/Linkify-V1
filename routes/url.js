const express = require('express');
const router = express.Router();
const {handleGenerateNewShortURL,handleGetAnalytics} = require('../controllers/url');
const {url_model} = require("../models/url");
const {authLoggedInUser} = require("../middlewares/auth");

router.post('/',authLoggedInUser,handleGenerateNewShortURL);

router.get("/analytics/:shortId",handleGetAnalytics);

module.exports = router;