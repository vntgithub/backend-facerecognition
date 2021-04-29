const md5 = require('md5');
const Student = require('../models/student.model');
const jwt = require('jsonwebtoken');

module.exports = {
    login: async(req, res) => {
        const username = req.body.username;
        const password = md5(req.body.password);
        await Student.find({username: username, password: password})
        .then(student => {
            if(student){
                const data = student[0];
                delete data.password;
                const token = jwt.sign({
                    userId: data['_id']
                }, process.env.SECRET_KEY);
                res.json({
                    data,
                    token
                });
            }else{
                res.json('No user not found');
            }
        })
    },
    loginByToken: async (req, res) => {
        const userId = req.user.userId;
        await Student.findById(userId)
        .then(student => {
            if(student){
                console.log(student);
                const data = {...student['_doc']};
                delete data.password;
                const loginAuth = {
                    exist: true,
                    data: data
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
    checkCode: async (req, res) => {
        const code = req.params.code;
        await Student.find({code: code})
        .then(student => {
            if(student.length > 0)
                res.json(false);
            else
                res.json(true);
        })
        .catch(err => console.log(err))
    },
    checkUsername: async (req, res) => {
        const username = req.params.username;
        await Student.find({username: username})
        .then(student => {
            if(student.length > 0)
                res.json(false);
            else
                res.json(true);
        })
        .catch(err => console.log(err))
    },
    getById: async (req, res) => {
        const id = req.params.id;
        await Student.findById(id)
        .then(student => res/json(student))
        .then(err => console.log(err));
    },
    add: async (req, res) => {
        const data = {...req.body, password: md5(req.body.password)};
        const image = req.files.image;
        const tailPath = image.mimetype.substring(6);
        const path = './img/' + data.code + '.' + tailPath;
        data.img = path;
        const newStudent = new  Student(data);
        await Student.create(newStudent)
        .then(() => res.json("Student added!"))
        .catch(err => consle.log(err));

        image.mv(path);
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
    },
    upload: async (req, res) => {
        const image = req.files.file;

        const tailPath = image.mimetype.substring(6);
        const path = './img/' + 'aabc' + '.' + tailPath;
        // const img = req.files;
        image.mv(path, err => console.log(err));
    }
}