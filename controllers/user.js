const user_model = require('../models/user');
const ShortUniqueId = require("short-unique-id");
const { setUser, getUser } = require("../service/auth");

async function handleUserSignUp(req, res) {
    const { email, password } = req.body;
    try {
        const user = await user_model.create({
            email,
            password
        });
        
        const token = setUser(user);
        res.cookie("access-token", token);

        if (req.originalUrl.startsWith('/api')) {
            return res.json({ message: "User signed up successfully" });
        }
        return res.redirect("/");

    } catch (err) {
        if (req.originalUrl.startsWith('/api')) {
            return res.status(400).json({ error: "User already exists" });
        }
        return res.render("signup", {
            error: "User already exists, try logging in!"
        });
    }
}

async function handUserLogin(req, res) {
    const { email, password } = req.body;
    const user = await user_model.findOne({ email, password });
    if (!user) {
        if (req.originalUrl.startsWith('/api')) {
            return res.status(400).json({ error: "Invalid Username/Password" });
        }
        return res.render("login", {
            error: "Invalid Username/Password"
        });
    }
    const token = setUser(user);
    res.cookie("access-token", token);

    if (req.originalUrl.startsWith('/api')) {
        return res.json({ message: "Login successful", token });
    }
    return res.redirect("/");
}

module.exports = {
    handleUserSignUp,
    handUserLogin,
};
