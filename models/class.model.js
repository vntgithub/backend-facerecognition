const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const classSchema = new Schema({
    data: [{
        studentId: mongoose.Types.ObjectId,
        lessonAttend: Array
    }],
    numOfLesson: Number
});

const Class = mongoose.model('Class', classSchema, 'classes');

module.exports = Class;