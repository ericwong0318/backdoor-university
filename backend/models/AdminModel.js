const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// admin
const AdminSchema = Schema({
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
});
const Admin = mongoose.model('Admin', AdminSchema);

module.exports = Admin;
