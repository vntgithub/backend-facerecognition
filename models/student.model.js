const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentSchema = new Schema({
    username: String,
    password: String,
    code: String,
    name: String,
    img: String
});

const Student = mongoose.model('Student', studentSchema, 'students');

module.exports = Student;