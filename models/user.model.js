const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: String,
    password: String,
    code: String,
    name: String,
    img: String,
    isTeacher: Boolean
});

const User = mongoose.model('User', userSchema, 'users');

module.exports = User;