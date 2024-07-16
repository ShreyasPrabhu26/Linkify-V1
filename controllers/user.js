const user_model = require('../models/user');
const ShortUniqueId = require("short-unique-id");
const {randomUUID: randomID} = new ShortUniqueId({length: 10});
const {setUser,getUser} = require("../service/auth")

async function handleUserSignUp(req, res) {
    const {user_name, email, password} = req.body;
    await user_model.create({
        user_name,
        email,
        password
    })
    return res.render("home");
}

async function handUserLogin(req, res) {
    const {email, password} = req.body;
    const user = await user_model.findOne({email, password});
    if (!user) {
        return res.render("login", {
            error: "Invalid Username/Password"
        });
    }
    const sessionId = randomID();
    setUser(sessionId,user);
    res.cookie("access-token", sessionId);
    return res.redirect("/")
}

module.exports = {
    handleUserSignUp,
    handUserLogin,
}