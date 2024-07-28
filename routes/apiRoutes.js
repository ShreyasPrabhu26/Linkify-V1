const express = require('express');
const router = express.Router();
const urlController = require('../controllers/url');
const userController = require('../controllers/user');

// User routes
router.post('/user/signup', userController.handleUserSignUp);
router.post('/user/login', userController.handUserLogin);

// URL routes
router.post('/url/shorten', urlController.handleGenerateNewShortURL);
router.get('/url/analytics/:shortId', urlController.handleGetAnalytics);


module.exports = router;
