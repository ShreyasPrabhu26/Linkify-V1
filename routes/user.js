const express = require("express");
const {handleUserSignUp,handUserLogin} = require("../controllers/user");

const router = express.Router();

router.post("/", handleUserSignUp)
router.post("/login", handUserLogin)

module.exports = router
