const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const classSchema = new Schema({
    groupId: mongoose.Types.ObjectId,
    data: [{
        studentId: mongoose.Types.ObjectId,
        lessonAttend: Array
    }]
});

const Class = mongoose.model('Class', classSchema, 'classes');

module.exports = Class;