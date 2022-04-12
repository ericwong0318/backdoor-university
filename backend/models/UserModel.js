const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// user
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
            enum: ['undergrad', 'asso', 'hd', 'secondary school'],
            default: 'undergrad'
        },
        addmissionYear: { type: Number, required: true },
        cgpa: { type: Number },
    },
    exam: {
        name: { type: String },
        result: { type: String },
    },
    status: {
        type: String,
        required: true,
        enum: ['unverified', 'active', 'banned'],
        default: 'unverified'
    },
    offer: {
        school: { type: String },
        programme: { type: String }
    }
});
const User = mongoose.model('User', UserSchema);

module.exports = User;
