const express = require('express');
const router = express.Router();
const {handleGenerateNewShortURL} = require('../controllers/url');

router.get('/', (req,res)=>{
    return res.json({
        "msg":"All is well!"
    })
});

router.post('/',handleGenerateNewShortURL);

module.exports = router;