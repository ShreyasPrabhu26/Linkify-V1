const express = require('express');
const {url_model} = require("../models/url");
const {restrictTo} = require("../middlewares/auth");
const router = express.Router();

router.get('/admin/urls',restrictTo(["ADMIN"]), async (req, res) => {
    const allUrls = await url_model.find({});
    return res.render('home', {
        urls: allUrls
    });
})

router.get('/',restrictTo(["ADMIN","NORMAL"]), async (req, res) => {
    const allUrls = await url_model.find({createdBy:req.user._id});
    return res.render('home', {
        urls: allUrls
    });
})

router.get("/signup",async (req,res)=>{
    return res.render("signup")
})

router.get("/login",async (req,res)=>{
    return res.render("login")
})
module.exports = router;