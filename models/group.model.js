const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const lessonSchema = new Schema({
    courseId: mongoose.Types.ObjectId,
    name: String,
    no: Number,
    year: Number,
    semesber: Number,
    studentList: Array
});

const Lesson = mongoose.model('Lesson', lessonSchema, 'lessons');

module.exports = Lesson;