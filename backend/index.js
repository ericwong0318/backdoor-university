// express
const express = require('express');
const app = express();

// extra package
const bodyParser = require('body-parser');
// const session = require('express-session');

// mongoose

// connection
const mongoose = require('mongoose');
// const dbUri = "mongodb+srv://admin:ALVGC6RTUTdbDJs@csci3100.47s09.mongodb.net/DB?retryWrites=true&w=majority";
mongoose.connect(dbUri);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("DB is connected");
})

// schemas and models
const Schema = mongoose.Schema;

const UserSchema = Schema({
    // id: { type: String, required: true }, // mongodb's _id is unique primary key
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    name: { type: String, unique: true, required: true },
    photo: { type: String, unique: true }, // url
    currProgramme: [
        {
            school: { type: String, required: true },
            programme: { type: String, required: true },
            addmissionYear: { type: Number, required: true },
            cgpa: { type: Number },
        }
    ], // monitor is a user who got a offer
    exam: [
        {
            name: { type: String },
            result: { type: String },
            year: { type: Number, required: true }
        }
    ],
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

UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        return next();
    } catch (error) {
        return next(error);
    }
});

const User = mongoose.model('User', UserSchema);

const AdminSchema = Schema({
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    name: { type: String, unique: true, required: true }
});
const Admin = mongoose.model('Admin', AdminSchema);

// const InterviewSchema = Schema({
//     date: { type: Date("<YYYY-mm-dd>"), required: true },
//     content: { type: String, required: true },
// });
// const Interview = mongoose.model('Interview', InterviewSchema);

const ProgrammeSchema = Schema({
    title: { type: String, required: true },
    info: { type: String, required: true },
    comments: [{ type: String }],
    subjects: [{ type: String, required: true }],
    interviews: [{
        user: { type: Schema.Types.ObjectId, ref: 'User' },
        date: { type: Date("<YYYY-mm-dd>"), required: true },
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




// routing
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/create-account', (req, res) => {
    let id = req.body['loginid'], pwd = req.body['password'];

});

app.post('/login', (req, res) => {
    let id = req.body['loginid'], pwd = req.body['password'];
    res.send("login");

});

app.get('/insert-login', (req, res) => {
    res.send("insert login");
    Subject.create(
        { name: "Chemistry" },
        (err) => {
            if (err) {
                console.log(err);
            }
        }
    );
});

app.get('/get-login', (req, res) => {
    Subject.findOne(
        { name: "chemistry" },
        'name',
        (err, e) => {
            if (err) { console.log(err) }
            else { res.send(e.name) }
        }
    );
});

app.all('*/', function (req, res) {
    res.send("hello");
    console.log(req.header);
    console.log(req.get('user-agent'));
});

const server = app.listen(3000);
