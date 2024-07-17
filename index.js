const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const {authLoggedInUser,checkAuth, restrictTo} = require('./middlewares/auth');
const app = express()

// Get data from environment variables
const PORT = process.env.PORT || 8080;
const CONNECTION_URL = process.env.CONNECTION_URL;

const connectToMongoDb = require('./mongo_db_connection')
const urlRouter = require("./routes/url")
const staticRouter = require("./routes/staticRouter");
const userRouter = require("./routes/user");

// Middleware configuration
app.set("view engine", "ejs");
app.set("views",path.resolve("./views"))
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser())
app.use(checkAuth)

app.use("/",staticRouter)
app.use("/user",userRouter)
app.use("/url",restrictTo(["ADMIN","NORMAL"]),urlRouter)

connectToMongoDb(CONNECTION_URL)

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));

