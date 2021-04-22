const Teacher = require('../models/teacher.model');
const md5 = require('md5');
const jwt = require('jsonwebtoken');
module.exports = {
    login: async(req, res) => {
        const username = req.body.username;
        const password = md5(req.body.password);
        await Teacher.findOne({username: username, password: password})
        .then(teacher => {
            if(teacher){
                const data = {...teacher['_doc']};
                delete data.password;
                const token = jwt.sign({
                    userId: data['_id']
                }, process.env.SECRET_KEY);
                res.json({
                    data,
                    token
                });
            }else{
                const loginAuth = {
                    exist: false,
                    data: {}
                }
                res.json(loginAuth);
            }
        })
        .catch(err => console.log(err));
    },
    loginByToken: async (req, res) => {
        const userId = req.user.userId;
        await Teacher.findById(userId)
        .then(teacher => {
            if(teacher){
                const data = {...teacher['_doc']};
                const loginAuth = {
                    exist: true,
                    data
                }
                res.json(loginAuth);
            }else{
                const loginAuth = {
                    exist: false,
                    data: {}
                }
                res.json(loginAuth);
            }
        })
    },
    add: async (req, res) => {
        const data = {...req.body, password: md5(req.body.password)};
        const newTeacher = new Teacher(data);
        await Teacher.create(newTeacher)
        .then(() => res.json("You have signed up successfully!"))
        .catch(err => consle.log(err));
    },
    update: async (req, res) => {
        const idTeacherNeedUpdate = req.body['_id'];
        const dataUpdate = {...req.body};
        delete dataUpdate['_id'];
        await Teacher.findOneAndUpdate(idTeacherNeedUpdate, dataUpdate)
        .then(() => res.json('Updated!'))
        .catch(err => console.log(err));
    },
    delete: async (req, res) => {
        const idTeacherNeedDelete = req.params.id;
        console.log(idTeacherNeedDelete);
        await Teacher.findByIdAndDelete(idTeacherNeedDelete)
        .then(() => res.json('Deleted!'))
        .catch(err => console.log(err));
    },
    findByName: async (req, res) => {
        const name = req.params.name;
        await Teacher.find({name: {$regex: new RegExp(".*" + name.toLowerCase() + ".*", "i")}})
        .then(teacher => {
            if(teacher)
                res.json(teacher)
            else
                res.json("Not found!")
        })
        .catch(err => console.log(err));
    }, findByCode: async (req, res) => {
        const code = req.params.code;
        await teacher.find({ 'code': code})
        .then(teachers => {
            if(teacher){
                res.json(teacher);
            }else{
                res.json([]);
            }
        })
        .catch(err => console.log(err));
    }
}