const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseSchema = new Schema({
    code: String,
    name: String,
    lessons: Array,
    teacherId: mongoose.Types.ObjectId,
    teacherName: String
})

const Course = mongoose.model('Course', courseSchema, 'courses');

module.exports = Course;