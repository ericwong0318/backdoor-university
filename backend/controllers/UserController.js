
// encryption
const bcrypt = require('bcrypt');
const salt = 10;

// mail
const nodemailer = require("nodemailer");

/* upload file */
const photoDir = __dirname + '/../photos/';

const User = require('../models/UserModel');

/* register account */
exports.userRegister = (req, res) => {
    /* handle photo */
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({ err: 'No files are uploaded.' });
    }
    /* encrypt password */
    bcrypt.hash(req.body.password, salt, (err, hash) => {
        let photoName = uploadPhoto(req, res);

        /* create user */
        User.create(
            {
                email: req.body.email,
                password: hash,
                name: req.body.name,
                photo: photoName,
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
                offer: {
                    school: req.body.school,
                    programme: req.body.programme
                }
            }, (err) => {
                if (err) {
                    return res.status(409).json(err);
                } else {
                    /* send email verification */
                    sendEmail(req.body.email, "verify");
                    return res.json({ msg: "Please check the veriftication email, including spam folder" });
                }
            });
    });
}

exports.userLogin = (req, res) => {
    User
        .findOne(
            { email: req.body.email, status: "active" },
            'email password')
        .exec((err, user) => {
            if (user === null) { // email not found
                res.status(401).json({ err: 'Incorrect email or This email is not verified' });
                return;
            } else {
                bcrypt.compare(req.body.password, user.password, (err, result) => {
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
}


exports.activateAccount = (req, res) => {
    let userEmail = req.params.email;
    /* set account status to active */
    User.findOne({ email: userEmail }, {}, {}, (err, user) => {
        if (err) {
            return res.json(err);
        }
        if (user !== null) {
            user.status = 'active';
            user.save();
            return res.json({ msg: 'Account is activated' });
        }
    });
}

/* modify the password with validation of indentity */
exports.userUpdatePassword = (req, res) => {
    let oldPwd = req.body.oldPassword;
    let newPwd = req.body.newPassword;

    User
        .findOne(
            { email: req.body.email },
            'email password')
        .exec((err, user) => {
            if (user === null) { // email not found
                res.status(401).json({ err: "Incorrect email" });
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
                        res.status(401).json({ err: "Incorrect old password" });
                        return;
                    }
                });
            }
        });
}


exports.userForgetPassword = (req, res) => {
    let userEmail = req.body.email;

    User
        .findOne({ email: userEmail }, 'email password')
        .exec((err, user) => {
            if (user === null) {
                return res.status(401).json({ err: "Incorrect email" });
            }
            else {
                let newPassword = Math.floor(Math.random() * (9999 - 1000) + 1000).toString();
                console.log(newPassword);
                bcrypt.hash(newPassword, salt, (err, newPwdHash) => {
                    user.password = newPwdHash;
                    user.save();
                })
                res.json({ msg: "The system has reset a new password. Please check your email for it" });
                sendEmail(userEmail, "reset", newPassword);
                return;
            };
        });
}



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
                html: `
                        <h1>Backdoor University</h1>
                        <h3>Please click the following Link for register: </h3>
                        <a href="http://localhost:3000/activate-email/${email}">
                        http://localhost:3000/activate-email/${email}</a>
                    `
            });
            console.log("Message sent to %s", email);
            return;

        case "reset":
            info = await transporter.sendMail({
                from: 'Backdoor-University@gamil.com',
                to: email, // list of receivers
                subject: "Your new password",
                html: `<h1>Backdoor University</h1>
                        <h3>Your new password: ${newPassword}</h3>`
            });
            console.log("Message sent to %s", email);
            return;
        default:
            console.log("Wrong option for this function");
    }
}

/* upload photo */
function uploadPhoto(req, res) {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({ err: 'No files are uploaded' });
    }
    // move photo to folder /photos
    let photoObj = req.files.photo;
    let uploadPath = photoDir + photoObj.name;
    photoObj.mv(uploadPath, function (err) {
        if (err) {
            return res.status(500).json(err);
        }
    });
    return photoObj.name; // return photo name
}



exports.userListOne = (req, res) => {
    let userEmail = req.body.email;
    let userName = req.body.name;

    /* find user by email */
    User
        .findOne(
            { email: userEmail },
            'email name photo currProgramme exam status offer')
        .exec((err, user) => {
            if (user === null) {
                /* find user by name */
                User
                    .findOne({ name: userName }, 'email name photo currProgramme exam status offer')
                    .exec((err, user) => {
                        if (user === null) {
                            return res.status(401).json({ err: "Email and name do not existed" });
                        }
                        else {
                            return res.json(user);
                        };
                    });
            }
            else {
                return res.json(user);
            };
        });
}

exports.userListAll = (req, res) => {
    User
        .find({}, 'email name photo currProgramme exam status offer')
        .exec((err, users) => {
            if (users === []) {
                return res.status(401).json({ err: "No users in the database" });
            }
            else {
                return res.json(users);
            };
        });
}

exports.userUpdate = (req, res) => {
    User
        .findOne(
            { email: req.body.email },
            'name photo currProgramme exam status offer')
        .exec((err, user) => {
            let photoName = uploadPhoto(req, res);

            if (err) {
                return res.json({ err: "Cannot modify user information" });
            }

            user.name = req.body.name;
            user.photo = photoName;
            user.currProgramme = {
                school: req.body.school,
                programme: req.body.programme,
                addmissionYear: req.body.addmissionYear,
                type: req.body.type,
                cgpa: req.body.cgpa
            };
            user.exam = {
                name: req.body.examname,
                result: req.body.result
            };
            user.offer = {
                school: req.body.offerSchool,
                programme: req.body.offerProgramme
            }

            user.save();

            res.json({ msg: "User information is modified" });
        });
}
