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
        const newClass = new Class({
            data: []
        });
        await Class.create(newClass)
        .then(rs => res.json(rs))
        .catch(err => console.log(err));
    },
    studentJoinClass: async (req, res) => {
        const {classId, studentId} = req.body;
        // console.log(req.body)
        await Class.findById(classId)
        .then(rs => {
            console.log(rs)
            if(rs){
                rs.data.push({
                    studentId: studentId,
                    lessonAttend: []
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