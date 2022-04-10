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
const salt = 10;

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

/* schemas and models */
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

/* 
* supporting functions 
*/

/* send email for verification or reset password */
async function sendEmail(email, option, newPassword) {
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


    let info;
    switch (option) {
        case "verify":
            info = await transporter.sendMail({
                from: 'Backdoor-University@gmail.com',
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

        case "reset":
            info = await transporter.sendMail({
                from: 'Backdoor-University@gamil.com',
                to: email, // list of receivers
                subject: "Your new password",
                html: `<h1>Backdoor University</h1>
                        <h3>Your new password: ${newPassword} </h3>`
            });
            console.log("Message sent: %s", info.messageId);
            return;
        default:
            console.log("Wrong option for this function");
    }
}

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
    bcrypt.hash(req.body.password, salt, (err, hash) => {
        // move photo to folder /photos /
        let photo = req.files.photo;
        let uploadPath = __dirname + '/photos/' + photo.name;
        photo.mv(uploadPath, function (err) {
            if (err) {
                return res.status(500).json(err);
            }
        });

        // create user
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
                } else {
                    /* send email verification */
                    sendEmail(req.body.email, "verify").catch(console.error);
                    return res.json({ msg: "Please check the veriftication email, including spam folder" });
                }
            });
    })

});

/* login todo: cookie? */
app.post('/login', (req, res) => {
    let pwd = req.body.password;
    let role = req.body.role;
    /* compare email and password in database and input */
    switch (role) {
        case "user":
            User
                .findOne({ email: req.body.email, status: "active" }, 'email password')
                .exec((err, user) => {
                    if (user === null) { // email not found
                        res.status(401).json({ err: 'Incorrect email or This email is not verified' });
                        return;
                    } else {
                        bcrypt.compare(pwd, user.password, (err, result) => {
                            if (result === true) { // password correct
                                // res.cookie('saltedPassword', hash, { maxAge: 900000 });
                                res.json({ msg: "Login successful" });
                                return;
                            } else {
                                res.status(401).json({ err: 'Incorrect password' });
                                return;
                            }
                        });
                    }
                });
            break;
        case "admin":
            Admin
                .findOne({ email: req.body.email }, 'email password')
                .exec((err, admin) => {
                    if (admin === null) { // email not found
                        res.status(401).json({ err: 'Incorrect email' });
                        return;
                    } else {
                        bcrypt.compare(pwd, admin.password, (err, result) => {
                            if (result === true) { // password correct
                                // res.cookie('saltedPassword', hash, { maxAge: 900000 });
                                res.json({ msg: "Login successful" });
                                return;
                            } else {
                                res.status(401).json({ err: 'Incorrect password' });
                                return;
                            }
                        });
                    }
                });
            break;
        default:
            res.status(401).json({ err: 'Incorrect role' });


    }

});



app.get('/activate-email/:email', (req, res) => {
    let userEmail = req.params.email;
    /* set account status to active */
    User.findOne({ email: userEmail }, {}, {}, (err, user) => {
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

/* modify password */
app.post('/modify-password', (req, res) => {

    let oldPwd = req.body.oldPassword;
    let newPwd = req.body.newPassword;

    let role = req.body.role;

    switch (role) {
        case ("user"):
            /* compare email and old password in database and input */
            User
                .findOne({ email: req.body.email }, 'email password')
                .exec((err, user) => {
                    if (user === null) { // email not found
                        res.status(401).json({ err: 'Incorrect email' });
                        return;
                    } else {
                        bcrypt.compare(oldPwd, user.password, (err, result) => {
                            if (result === true) { // password correct
                                bcrypt.hash(newPwd, salt, function (err, newPwdHash) {
                                    user.password = newPwdHash;
                                    user.save();
                                })

                                res.json({ msg: "Modify password successful" });
                                return;
                            } else {
                                res.status(401).json({ err: 'Incorrect old password' });
                                return;
                            }
                        });
                    }
                });
            break;
        case ("admin"):
            /* modify the password without validation of indentity */

            /* if the email is a user email */
            User
                .findOne({ email: req.body.email }, 'email password')
                .exec((err, user) => {
                    if (user === null) { // email not found
                        // res.status(401).json({ err: 'Incorrect email' });
                        return;
                    } else {
                        bcrypt.hash(newPwd, salt, function (err, newPwdHash) {
                            user.password = newPwdHash;
                            user.save();
                            res.json({ msg: "Modify user password successful" });
                            return;
                        });
                    };
                });

            /* if the email is a admin email */
            Admin
                .findOne({ email: req.body.email }, 'email password')
                .exec((err, admin) => {
                    if (admin === null) { // email not found
                        res.status(401).json({ err: 'Incorrect email for both user and admin roles' });
                        return;
                    } else {
                        bcrypt.hash(newPwd, salt, function (err, newPwdHash) {
                            admin.password = newPwdHash;
                            admin.save();
                            res.json({ msg: "Modify admin password successful" });
                            return;
                        });
                    };
                });
            break;
        default:
            res.status(401).json({ err: 'Incorrect role' });
            return;
    }
});

/**
 * forget passwrod
 */
app.post('/forget-password', (req, res) => {
    let userEmail = req.body.email;

    User
        .findOne({ email: userEmail }, 'email password')
        .exec((err, user) => {
            if (user === null) {
                return res.status(401).json({ err: "Incorrect email" });
            }
            else {
                let newPwd = Math.floor(Math.random() * 999).toString();
                console.log(newPwd);
                bcrypt.hash(newPwd, salt, function (err, newPwdHash) {
                    user.password = newPwdHash;
                    user.save();
                })
                res.json({ msg: "The system has reset a new password. Please check your email for it" });
                sendEmail(userEmail, "reset", newPwd);
                return;
            };
        });
});

app.post('/favourite-program', (req, res) => {

});

/**
 * admin functions
 */
app.post('/list-all-users', (req, res) => {
    User
        .find({}, 'email name photo currProgramme exam status offer')
        .exec((err, users) => {
            if (users === []) {
                return res.status(401).json({ msg: "No users in database" });
            }
            else {
                res.json(users);
                return;
            };
        });
});

/* todo */
// app.post('/modify-all-information',(req, res)=>{
//     let info = 
// });


const server = app.listen(3001);
