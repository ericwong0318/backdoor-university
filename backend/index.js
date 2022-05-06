/**
 * @file Main program of backend.
 * @author Eric Wong
 * @description This program includes necessary libraries and settting for backend, connects MongoDB to the backend program, and listen for clients' requests
 */

/* environment variables */
require('dotenv').config();

/* express */
const express = require('express');
const app = express();

/** 
 * Body parser for parsing request from clients.
*/
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

/* cors for Cross-Origin Resource Sharing*/
const cors = require('cors');
app.use(cors());

/* header */
app.use((req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    next();
});

/* upload file */
const fileUpload = require('express-fileupload');
app.use(fileUpload());

/* mongoose init connection */
const mongoose = require('mongoose');
const dbUrl = process.env.DB_URL;
mongoose.connect(dbUrl);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("DB is connected");
});

const router = require('./routes/routes');
try {
    app.use(router);
} catch (err) {
    console.log(err);
}
app.listen(process.env.PORT || 3001);
