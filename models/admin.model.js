const mongoose = require('mongoose');
const Schema =  mongoose.Schema;

const adminSchema = new Schema({
    username: String,
    password: String,
    url: String
});

const Admin = mongoose.model('Admin', adminSchema, 'admin');
module.exports = Admin;