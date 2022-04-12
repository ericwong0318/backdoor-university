/* encryption */
const bcrypt = require('bcrypt');
const salt = 10;

let Admin = require("../models/AdminModel");

exports.adminLogin = (req, res) => {
    Admin
        .findOne({ email: req.body.email }, 'email password')
        .exec((err, admin) => {
            if (err) return res.json({ err: err });
            if (admin === null) { // email not found
                res.status(401).json({ err: "Incorrect email" });
                return;
            } else {
                bcrypt.compare(req.body.password, admin.password, (err, result) => {
                    if (err) return res.json({ err: err });
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
