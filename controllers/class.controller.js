const Class = require('../models/class.model');

module.exports = {
    getById: async (req, res) => {
        const id = req.params.id;
        await Class.findById(id)
        .then(cls => {
            if(cls){
                res.json(cls);
            }else{
                res.json({});
            }
        })
        .catch(err => console.log(err))
    },
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
        const classId = req.body.classId;
        const studentId = req.body.studentId;
        const lesson = [...req.body.lesson];
        await Class.findById(classId)
        .then(rs => {
            if(rs){
                rs.data.push({
                    studentId: studentId,
                    lessonAttend: lesson
                })
                rs.save();
                res.json("Joined!")
            }else{
                res.json('Class not found!')
            }
        })
        .catch(err => console.log(err));
    }
}