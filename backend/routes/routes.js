/* express */
const express = require('express');
const app = express.Router();

/**
 * controllers
 */
let UserController = require("../controllers/UserController");
let ProgrammeController = require("../controllers/ProgrammeController");
let AdminController = require("../controllers/AdminController");
let LoginController = require("../controllers/LoginController");
let ResourceController = require("../controllers/ResourseController");


/**
 * routing
 */
/* download photo */
app.post('/photo', ResourceController.sendPhoto);

/* register account */
app.post('/register', UserController.userRegister);

/* admin login */
app.post("/admin-login", AdminController.adminLogin);

/* user login */
app.post("/user-login", UserController.userLogin);

/* activate email */
app.get('/activate-email/:email', UserController.activateAccount);

/* modify password */
app.post('/user-update-password', UserController.userUpdatePassword);

app.post("/admin-update-password", LoginController.userOrAdminUpdatePassword);

/* forget password */
app.post('/user-forget-password', UserController.userForgetPassword);

/**
 * user related functions
 */

/* find all users */
app.post('/list-all-users', UserController.userListAll);

/* find single user */
app.post('/user-list-one', UserController.userListOne);


/* modify user */
// email can not be modified
app.post('/user-update', UserController.userUpdate);

/**
 * programme related functions
 */

/* list all programmes */
app.post('/list-all-programmes', ProgrammeController.programmeList);

/* create a programme */
app.post('/create-a-programme', ProgrammeController.programmeCreate);

/* update programme */
app.post("/modify-programme", ProgrammeController.programmeUpdate);

/* update programme comment */
app.post('/submit-a-comment', ProgrammeController.programmeCommentUpdate);

module.exports = app;

