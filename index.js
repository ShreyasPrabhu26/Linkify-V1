const express = require('express');
const app = express()

// Get data from environment variables
const PORT = process.env.PORT || 8080;
const CONNECTION_URL = process.env.CONNECTION_URL;

const connectToMongoDb = require('./mongo_db_connection')
const urlRouter = require("./routes/url")

// Middleware configuration
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/url",urlRouter)

connectToMongoDb(CONNECTION_URL)

app.listen(PORT,()=>console.log(`Server running on port: ${port}`));

