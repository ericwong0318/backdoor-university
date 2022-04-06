// express
const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const fs = require('fs');
// const session = require('express-session');
const bcrypt = require('bcrypt');

// import cors to allow cross port data transfer
const cors = require('cors')

/* mongoose */

// connection
const mongoose = require('mongoose');
const dbUri = "mongodb+srv://admin:ALVGC6RTUTdbDJs@csci3100.47s09.mongodb.net/DB?retryWrites=true&w=majority";
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
    // name: { type: String, unique: true, required: true },
    photo: { data: Buffer, contentType: String },
    currProgramme: {
        school: { type: String, required: true },
        programme: { type: String, required: true },
        // addmissionYear: { type: Number, required: true },
        cgpa: { type: Number },
    }
    , // monitor is a user who got a offer
    exam: {
        name: { type: String },
        result: { type: String },
        // year: { type: Number, required: true }
    },
    status: { type: String, required: true },
    // ref to programme
    offer: [{
        programme: [{ type: Schema.Types.ObjectId, ref: 'Programme' }]
        // school: { type: String, required: true },
        // programme: { type: String, required: true },
        // year: { type: Number, required: true },
        // detail: { type: String }
    }]
});



// UserSchema.pre("save", async function (next) {
//     if (!this.isModified("password")) return next();
//     try {
//         const salt = await bcrypt.genSalt(10);
//         this.password = await bcrypt.hash(this.password, salt);
//         return next();
//     } catch (error) {
//         return next(error);
//     }
// });
// UserSchema.pre("findOne", async function (next) {
//     if (!this.isModified("password")) return next();
//     try {
//         const salt = await bcrypt.genSalt(10);
//         this.password = await bcrypt.hash(this.password, salt);
//         return next();
//     } catch (error) {
//         return next(error);
//     }
// });

const User = mongoose.model('User', UserSchema);

const AdminSchema = Schema({
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    name: { type: String, unique: true, required: true }
});
const Admin = mongoose.model('Admin', AdminSchema);

const ProgrammeSchema = Schema({
    title: { type: String, required: true },
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
function handleErr(res, err) {
    res.send("Operation failed. Please try again\n\n\n" + err);
}

// Enable Cross-Origin Resource Sharing
app.use(cors());

// routing
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

/* register account */
app.post('/register', (req, res) => {
    User.create(
        {
            email: req.body.email,
            password: req.body.password,
            // photo: fs.readFileSync(imgPath),
            currProgramme: {
                school: req.body.school,
                programme: req.body.programme,
                cgpa: req.body.cgpa
            },
            exam: {
                name: req.body.examname,
                result: req.body.result
            },
            status: 'active',
            offer: [{ /*todo*/
            }]
        }, (err, user) => {
            if (err) {
                handleErr(res, err);
                return
            }
            res.send("Account register successful");
            return;
        });
});

/* login */
app.post('/login', (req, res) => {
    User
        .findOne({
            email: req.body.email,
            password: req.body.password,
        })
        .exec((err, user) => {
            if (user === null) {
                handleErr(res, "wrong email or password");
                return;
            } else {
                handleErr(res, "login successful");
                return;
            }
        });
});

// app.all('*/', function (req, res) {
//     res.send("hello");
//     console.log(req.header);
//     console.log(req.get('user-agent'));
// });

const server = app.listen(3001);
