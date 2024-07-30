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

router.get('/:shortURL', async (req, res) => {
    try {
        const { shortURL } = req.params;

        // Handle redirection
        const redirectURL = `https://linkify-app.shreyas.info/${shortURL}`;

        // Redirect to the base URL
        res.redirect(302, redirectURL);
    } catch (error) {
        console.error(`Error: ${error}`);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
