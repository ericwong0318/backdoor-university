const bcrypt = require('bcrypt');
const salt = 10;

let User = require("../models/UserModel");
let Admin = require("../models/AdminModel");


/* 
admin's method
modify the password without validation of indentity 
*/
exports.userOrAdminUpdatePassword = (req, res) => {
    const newPwd = req.body.password;

    /* if the email is a user email */
    User
        .findOne(
            { email: req.body.email },
            'email password')
        .exec((err, user) => {
            if (user === null) { // email not found

                /* if the email is a admin email */
                Admin
                    .findOne({ email: req.body.email }, 'email password')
                    .exec((err, admin) => {
                        if (admin === null) { // email not found
                            res.status(401).json({ err: 'Incorrect email for both user and admin roles' });
                            return;
                        } else {
                            bcrypt.hash(newPwd, salt, function (err, hash) {
                                admin.password = hash;
                                admin.save();
                                res.json({ msg: "Modify admin password successful" });
                                return;
                            });
                        };
                    });
                    
            } else {
                bcrypt.hash(newPwd, salt, function (err, hash) {
                    user.password = hash;
                    user.save();
                    res.json({ msg: "Modify user password successful" });
                    return;
                });
            };
        });


}