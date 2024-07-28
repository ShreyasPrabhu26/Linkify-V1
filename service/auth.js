const jwt = require('jsonwebtoken');
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

function setUser(user) {
    return jwt.sign({
        _id: user._id,
        email: user.email,
        role: user.role
    }, JWT_SECRET_KEY)
}

function getUser(token) {
    if (!token) return null;
    try {
        return jwt.verify(token, JWT_SECRET_KEY)
    } catch (error) {
        return null;
    }
}

module.exports = {
    setUser,
    getUser
}