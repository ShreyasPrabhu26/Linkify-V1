const express = require('express');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const compression = require('compression')
const favicon = require('serve-favicon');
const swaggerUi = require('swagger-ui-express');
const { authLoggedInUser, checkAuth, restrictTo } = require('./middlewares/auth');
const swaggerDocument = require('./swagger.json');
const requestIp = require('request-ip');
const useragent = require('express-useragent');

const app = express();


// Get data from environment variables
const PORT = process.env.PORT || 8080;
const CONNECTION_URL = process.env.CONNECTION_URL;

const connectToMongoDb = require('./mongo_db_connection');
const urlRouter = require("./routes/url");
const staticRouter = require("./routes/staticRouter");
const userRouter = require("./routes/user");
const apiRouter = require("./routes/apiRoutes");

// Middleware configuration
app.use(cors());
app.use(requestIp.mw());
app.use(useragent.express());
app.set("view engine", "ejs");
app.set('views', path.join(__dirname, '/views'));
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compression())
app.use(checkAuth);
app.use(favicon(path.join(__dirname, 'public/images/logo', 'favicon.png')));


// Define your routes
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/", staticRouter);
app.use("/user", userRouter);
app.use("/url", restrictTo(["ADMIN", "NORMAL"]), urlRouter);
app.use("/api", apiRouter);


connectToMongoDb(CONNECTION_URL)
    .then(() => {
        app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
    })
    .catch((err) => {
        console.error('Failed to connect to MongoDB', err);
        process.exit(1);
    });
