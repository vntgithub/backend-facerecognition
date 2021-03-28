const Teacher = require('../models/teacher.model');

module.exports = {
    login: async(req, res) => {
        const username = req.body.username;
        const password = req.body.password;
        await Teacher.findOne({username: username, password: password})
        .then(teacher => {
            if(teacher){
                const loginAuth = {
                    exist: true,
                    data: teacher
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
        .catch(err => console.log(err));
    },
    loginByCookie: async (req, res) => {
        const cookie = req.body.cookie;
        await Teacher.findById(cookie)
        .then(teacher => {
            if(teacher){
                const loginAuth = {
                    exist: true,
                    data: teacher
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
        const newTeacher = new Teacher(req.body);
        await Teacher.create(newTeacher)
        .then(() => res.json(newTeacher))
        .catch(err => consle.log(err));
    },
    update: async (req, res) => {
        const idTeacherNeedUpdate = req.body['_id'];
        const dataUpdate = req.body;
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
    }
}