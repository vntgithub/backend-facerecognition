const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const student_group_Schema = new Schema({
	studentId: mongoose.Types.ObjectId,
    groups: [mongoose.Types.ObjectId]
});

const Student_Group = mongoose.model(
    'Student_Group', 
    student_group_Schema, 
    'student_group');

module.exports = Student_Group;