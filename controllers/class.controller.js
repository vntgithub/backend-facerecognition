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
        const numOfLesson = req.body;
        const newClass = new Class({
            data: [],
            numOfLesson
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
                    lessonAttend: new Array(rs.numOfLesson).fill(false)
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
    },
    recognition: async (req, res) => {
        const {classId, arr, indexLesson} = req.body;
        let updateData;
        await Class.findById(classId)
        .then(rs => {
            updateData = new Class(rs)
            updateData.data.forEach((item,index) => {
                item.lessonAttend[indexLesson] = arr[index];
            })
        })
        .catch(err => console.log(err))
        await Class.findByIdAndUpdate(classId, updateData)
        .then(() => res.json('Updated!'))
        .catch(err => console.log(err))
    }
}