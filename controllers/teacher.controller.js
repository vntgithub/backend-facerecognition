const Teacher = require('../models/teacher.model');
const md5 = require('md5');
const jwt = require('jsonwebtoken');
module.exports = {
    login: async(req, res) => {
        const username = req.body.username;
        const password = md5(req.body.password);
        await Teacher.find({username: username, password: password})
        .then(teacher => {
            if(teacher.length > 0){
                const data = {...teacher[0]['_doc']};
                delete data.password;
                const token = jwt.sign({
                    userId: data['_id']
                }, process.env.SECRET_KEY);
                res.json({
                    data,
                    token,
                    position: 'teacher'
                });
            }else{
                res.json('Teacher not found!');
            }
        })
        .catch(err => console.log(err));
    },
    checkCode: async (req, res) => {
        const code = req.params.code;
        await Teacher.find({code: code})
        .then(teacher => {
            if(teacher.length > 0)
                res.json(false);
            else
                res.json(true);
        })
        .catch(err => console.log(err))
    },
    checkUsername: async (req, res) => {
        const username = req.params.username;
        await Teacher.find({username: username})
        .then(teacher => {
            if(teacher.length > 0)
                res.json(false);
            else
                res.json(true);
        })
        .catch(err => console.log(err))
    },
    loginByToken: async (req, res) => {
        const userId = req.user.userId;
        await Teacher.findById(userId)
        .then(teacher => {
            if(teacher){
                const data = {...teacher['_doc']};
                delete data.password;
                res.json({
                    data,
                    position: 'teacher'
                });
            }else{
                res.json('Token is wrong!');
            }
        })
    },
    add: async (req, res) => {
        const data = {...req.body, password: md5(req.body.password)};
        const image = req.files.image;
        const tailPath = image.mimetype.substring(6);
        const path = process.env.DIR_IMAGE + data.code + '.' + tailPath;
        data.img = path;
        const newTeacher = new Teacher(data);
        await Teacher.create(newTeacher)
        .then(() => res.json("You have signed up successfully!"))
        .catch(err => console.log(err));
        image.mv(path);
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