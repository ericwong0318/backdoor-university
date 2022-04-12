// .env
require('dotenv').config();

/* express */
const express = require('express');
const app = express();

/* body parser */
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

/* cors */
const cors = require('cors')
app.use(cors());

/* header */
app.use((req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    next();
});

/* upload file */
const fileUpload = require('express-fileupload');
app.use(fileUpload());

/*  mongoose init connection */
const mongoose = require('mongoose');
const dbUrl = process.env.DB_URL;
mongoose.connect(dbUrl);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("DB is connected");
});

const router = require('./routes/routes');
app.use(router);

const server = app.listen(3001);
