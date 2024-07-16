const {getUser} = require('../service/auth');

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

module.exports = {
    authLoggedInUser,
    checkAuth
}