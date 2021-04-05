const Class = require('../models/class.model');

module.exports = {
    add: async (req, res) => {
        const groupId = req.body.groupId;
        const newClass = new Class({
            groupId: groupId,
            data: []
        });
        await Class.create(newClass)
        .then(() => res.json('Class added!'))
        .catch(err => console.log(err));
    },
    studentJoinClass: async (req, res) => {
        const classId = req.body.clasId;
        const studentId = req.body.studentId;
        const lesson = [...req.body.lesson];
        await Class.findById(classId)
        .then(rs => {
            if(rs){
                rs.data.push({
                    studentId: studentId,
                    lesson: lesson
                })
                rs.save();
                rs.json("Joined!")
            }else{
                rs.json('Class not found!')
            }
        })
        .catch(err => console.log(err));
    }
}