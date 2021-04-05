const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const teacherSchema = new Schema({
    username: String,
    password: String,
    name: String,
    code: String,
    img: String,
    email: String,
    courses: [mongoose.Types.ObjectId]
})

const Teacher = mongoose.model('Teacher', teacherSchema, 'teachers');

module.exports = Teacher;