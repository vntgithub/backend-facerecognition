const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const teacherSchema = new Schema({
    username: String,
    password: String,
    img: String,
    email: String,
})

const Teacher = mongoose.model('Teacher', teacherSchema, 'teachers');

module.exports = Teacher;