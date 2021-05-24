const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const groupSchema = new Schema({
	no: Number,
    courseId: mongoose.Types.ObjectId,
    teacherName: String,
    teacherCode: String,
    teacherImg: String,
    nameCourse: String,
    codeCourse: String,
    year: String,
    semester: Number,
    lessons: [
        {
            name: String,
            isDone: Boolean
        }
    ],
    classId: mongoose.Types.ObjectId,
    numberOfStudent: Number,
    isDone: Boolean
});

const Group = mongoose.model('Group', groupSchema, 'groups');

module.exports = Group;