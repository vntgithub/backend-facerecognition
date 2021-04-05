const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const groupSchema = new Schema({
    courseId: mongoose.Types.ObjectId,
    teacherName: String,
    nameCourse: String,
    no: Number,
    year: Number,
    semesber: Number,
    classId: mongoose.Types.ObjectId,
    isDone: Boolean
});

const Group = mongoose.model('Group', groupSchema, 'groups');

module.exports = Group;