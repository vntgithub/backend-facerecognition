const md5 = require('md5');
const Student = require('../models/student.model');

module.exports = {
    login: async(req, res) => {
        const username = req.body.username;
        const password = md5(req.body.password);
        await Student.find({username: username, password: password})
        .then(student => {
            if(student){
                const loginAuth = {
                    exist: true,
                    data: student
                };
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
    loginByCookie: async (req, res) => {
        const cookie = req.body.cookie;
        await Student.findById(cookie)
        .then(student => {
            if(student){
                const loginAuth = {
                    exist: true,
                    data: student
                };
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
    getById: async (req, res) => {
        const id = req.params.id;
        await Student.findById(id)
        .then(student => res/json(student))
        .then(err => console.log(err));
    },
    add: async (req, res) => {
        const data = {...req.body, password: md5(req.body.password)};
        const newStudent = new  Student(data);
        await Student.create(newStudent)
        .then(() => res.json("Student added!"))
        .catch(err => consle.log(err))
    },
    update: async (req, res) => {
        const dataUpdate = {...req.body};
        const idStudentNeedUpdate = dataUpdate['_id'];
        delete dataUpdate['_id'];
        await Student.findByIdAndUpdate(idStudentNeedUpdate, dataUpdate)
        .then(() => res.json('Updated!'))
        .catch(err => console.log(err));
    },
    delete: async (req, res) => {
        const idStudentNeedDelete = req.params.id;
        await Student.findByIdAndDelete(idStudentNeedDelete)
        .then(() => res.json("Deleted!"))
        .catch(err => console.log(err))
    },
    findByCode: async (req, res) => {
        const code = req.params.code;
        await Student.find({code: {$regex: new RegExp(".*" + code.toLowerCase() + ".*", "i")}})
        .then(student => {
            if(student)
                res.json(student)
            else
                res.json("Not found!")
        })
        .catch(err => console.log(err))
    },
    findByName: async (req, res) => {
        const name = req.params.name;
        await Student.find({name: {$regex: new RegExp(".*" + name.toLowerCase() + ".*", "i")} })
        .then(student => {
            if(student)
                res.json(student)
            else
                res.json("Not found!")
        })
        .catch(err => console.log(err));
    }
}