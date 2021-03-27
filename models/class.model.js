const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const classSchema = new Schema({
    code: String,
    name: String,
    students: Array,
    isDone: Boolean
});

const Class = mongoose.model('Class', classSchema, 'classes');

module.exports = Class;