const user_model = require('../models/user');
const ShortUniqueId = require("short-unique-id");
const { setUser, getUser } = require("../service/auth")

async function handleUserSignUp(req, res) {
    const { email, password } = req.body;
    try {
        await user_model.create({
            email,
            password
        })
        return res.render("LandingPage");

    } catch (err) {
        return res.render("signup", {
            error: "User already Exist try Logining in!"
        });
    }
}

async function handUserLogin(req, res) {
    const { email, password } = req.body;
    const user = await user_model.findOne({ email, password });
    if (!user) {
        return res.render("login", {
            error: "Invalid Username/Password"
        });
    }
    const token = setUser(user);
    res.cookie("access-token", token);
    return res.redirect("/")
}

module.exports = {
    handleUserSignUp,
    handUserLogin,
}