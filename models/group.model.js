const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const groupSchema = new Schema({
	code: String,
    courseId: mongoose.Types.ObjectId,
    teacherName: String,
    teacherCode: String,
    teacherImg: String,
    nameCourse: String,
    codeCourse: String,
    year: String,
    semesber: Number,
    classId: mongoose.Types.ObjectId,
    isDone: Boolean
});

const Group = mongoose.model('Group', groupSchema, 'groups');

module.exports = Group;