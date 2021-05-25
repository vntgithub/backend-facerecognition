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
        await Class.findById(classId)
        .then(rs => {
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
    },
    studentLeaveClass: async(req, res) => {
        const {classId, studentId} = req.body;
        await Class.findById(classId)
        .then(rs => {
            if(rs){
                let index = -1;
                for(let i = 0; i < rs.data.length; i++){
                    if(rs.data[i].studentId === studentId){
                        index = i;
                        console.log(index);
                        break;
                    }
                }
                rs.data.splice(index,1);
                rs.save();
                res.json("Joined!")
            }else
                res.json('Class not found!')
        })
        .catch(err => console.log(err));
    }, 
    delete: async (req, res) => {
        const id = req.params.id;
        await Class.findByIdAndDelete(id)
        .then(() => res.json('Deleted!'))
        .catch(err => console.log(err))
    }
}