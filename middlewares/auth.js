const { getUser } = require('../service/auth');

async function checkAuth(req, res, next) {
    const userAccessToken = req.cookies["access-token"];
    const user = getUser(userAccessToken);
    req.user = user;
    next();
}

async function authLoggedInUser(req, res, next) {
    const userAccessToken = req.cookies["access-token"];

    if (!userAccessToken) return res.redirect('/login');
    const user = getUser(userAccessToken);
    if (!user) return res.redirect('/login');

    req.user = user;
    next();
}

function restrictTo(roles = []) {
    return function (req, res, next) {
        if (!req.user) return res.redirect("/login");
        if (!roles.includes(req.user.role)) return res.end("UN-AUTHORIZED");
        next();
    }
}

module.exports = {
    authLoggedInUser,
    checkAuth,
    restrictTo
}