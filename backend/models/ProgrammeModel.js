const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// programme
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
    comments: [{ // include the content of interviews
        email: { type: String }, // user's email
        content: { type: String }
    }],
});
const Programme = mongoose.model('Programme', ProgrammeSchema);

module.exports = Programme;
