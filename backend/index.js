// .env
const env = require('dotenv').config();

// express
const express = require('express');
const app = express();

// io
const bodyParser = require('body-parser');
// const session = require('express-session');

// encryption
const bcrypt = require('bcrypt');
const saltRounds = 10;

// mail
const nodemailer = require("nodemailer");

// cors
const cors = require('cors')
app.use(cors());

// routing
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use((req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    next();
});
// upload file
const fileUpload = require('express-fileupload');

// default options
app.use(fileUpload());
const uploadPath = __dirname + '/photos/';

/* mongoose */

// connection
const mongoose = require('mongoose');
const dbUri = process.env.DB_URL;
mongoose.connect(dbUri);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("DB is connected");
})

// schemas and models
const Schema = mongoose.Schema;

const UserSchema = Schema({
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    name: { type: String, unique: true, required: true },
    photo: { type: String, unique: true, required: true },
    currProgramme: {
        school: { type: String, required: true },
        programme: { type: String, required: true },
        type: {
            type: String,
            required: true,
            enum: ['undergrad', 'asso', 'hd'],
            default: 'undergrad'
        },
        addmissionYear: { type: Number, required: true },
        cgpa: { type: Number },
    }
    , // monitor is a user who got a offer
    exam: {
        name: { type: String },
        result: { type: String },
        // year: { type: Number, required: true }
    },
    status: {
        type: String,
        required: true,
        enum: ['unverified', 'active', 'banned'],
        default: 'unverified'
    },
    offer: [{
        programme: [{ type: Schema.Types.ObjectId, ref: 'Programme' }]
        // school: { type: String, required: true },
        // programme: { type: String, required: true },
        // year: { type: Number, required: true },
        // detail: { type: String }
    }]
});
const User = mongoose.model('User', UserSchema);

const AdminSchema = Schema({
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    name: { type: String, unique: true, required: true }
});
const Admin = mongoose.model('Admin', AdminSchema);

const ProgrammeSchema = Schema({
    school: { type: String, required: true },
    programme: { type: String, required: true },
    type: {
        type: String,
        required: true,
        enum: ['undergrad', 'asso', 'hd'],
        default: 'undergrad'
    },
    info: { type: String, required: true },
    comments: [{ type: String }],
    subjects: [{ type: String, required: true }],
    interviews: [{
        user: { type: Schema.Types.ObjectId, ref: 'User' },
        // date: { type: Date("<YYYY-mm-dd>"), required: true },
        date: { type: String, required: true },
        content: { type: String, required: true },
    }]
});
const Programme = mongoose.model('Programme', ProgrammeSchema);

const reportSchema = Schema({
    content: { type: String, required: true },
    status: {
        type: String,
        enum: ['waiting', 'done'],
        default: 'waiting'
    }
});
const Report = mongoose.model('Report', reportSchema);

// workers


/*
 * routing
 */


/* register account */
app.post('/register', (req, res) => {
    /* handle photo */
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({ err: 'No files are uploaded.' });
    }
    /* encrypt password */
    bcrypt.genSalt(saltRounds, function (err, salt) {
        bcrypt.hash(req.body.password, salt, function (err, hash) {
            let photo = req.files.photo;
            let uploadPath = __dirname + '/photos/' + photo.name;
            photo.mv(uploadPath, function (err) { // move photo to folder /photos/
                if (err) {
                    return res.status(500).json(err);
                }
            });

            User.create(
                {
                    email: req.body.email,
                    password: hash,
                    name: req.body.name,
                    photo: uploadPath,
                    currProgramme: {
                        school: req.body.school,
                        programme: req.body.programme,
                        addmissionYear: req.body.addmissionYear,
                        cgpa: req.body.cgpa
                    },
                    exam: {
                        name: req.body.examname,
                        result: req.body.result
                    },
                    status: 'unverified', // will change to active after passed email verification
                    offer: req.body.offer /* need checking correctness*/
                }, (err, user) => {
                    if (err) {
                        res.status(409).json(err);
                        return
                    }
                    /* send email verification */
                    sendEmailVerification(req.body.email).catch(console.error);
                    return res.json({ msg: "Please check the veriftication email, including spam folder" });
                });
        })
    });
});

app.post('/login', (req, res) => {
    let pwd = req.body.password;
    /* compare email and password in database and input */
    bcrypt.genSalt(saltRounds, function (err, salt) {
        bcrypt.hash(pwd, salt, function (err, hash) {
            User
                .findOne({ email: req.body.email, }, 'email password')
                .exec((err, user) => {
                    if (user === null) { // email not found
                        res.status(401).json({ err: 'incorrect email' });
                        return;
                    } else {
                        bcrypt.compare(pwd, user.password, (err, result) => {
                            if (result === true) { // password correct
                                res.cookie('saltedPassword', hash, { maxAge: 900000 });
                                res.json({ msg: "Login successful" });
                                return;
                            } else {
                                res.status(401).json({ err: 'incorrect password' });
                                return;
                            }
                        });
                    }
                });
        });
    });
});

/* verify email */
app.get('/send-verfiy-email', (req, res) => {
    sendEmailVerification(req.body.email).catch(console.error);
    res.json({ msg: "A verfication email is sent" });
});

async function sendEmailVerification(email) {
    let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        service: 'gmail',
        auth: {
            type: 'OAuth2',
            user: process.env.MAIL_USERNAME,
            // pass: process.env.MAIL_PASSWORD,
            clientId: process.env.OAUTH_CLIENTID,
            clientSecret: process.env.OAUTH_CLIENT_SECRET,
            refreshToken: process.env.OAUTH_REFRESH_TOKEN
        }
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: 'Backdoor University',
        to: email, // list of receivers
        subject: "Click the Link for register",
        html: `<h1>Backdoor University</h1>
        <h3>Please click the following Link for register: </h3>
        <a href="http://localhost:3001/activate-email/${email}">
        http://localhost:3001/activate-email/${email}
        </a>`
    });

    console.log("Message sent: %s", info.messageId);
    return;
}

app.get('/activate-email/:email', (req, res) => {
    let e = req.params.email;
    /* set account status to active */
    User.findOne({ email: e }, {}, {}, (err, user) => {
        if (err) {
            return res.json(err);
        }
        if (user !== null) {
            user.status = 'active';
            user.save();
            return res.json({ msg: "Account is activated" });
        }
    });
});

const server = app.listen(3001);
