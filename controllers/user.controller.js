const md5 = require('md5');
const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const fs = require('fs');

module.exports = {
    login: async(req, res) => {
        const username = req.body.username;
        const password = md5(req.body.password);
        await User.find({username: username, password: password})
        .then(user => {
            if(user.length > 0){
                const userInformation = {...user[0]['_doc']};
                delete userInformation.password;
                const token = jwt.sign({
                    userId: userInformation['_id']
                }, process.env.SECRET_KEY);
                res.json({
                    userInformation,
                    token,
                });
            }else{
                res.json('User not found!');
            }
        })

    },
    loginByToken: async (req, res) => {
        const userId = req.user.userId;
        await User.findById(userId)
        .then(user => {
            if(user){
                const userInformation = {...user['_doc']};
                delete userInformation.password;
                res.json({
                    userInformation
                });
            }else{
                res.json('Token is wrong!');
            }
        })
    },
    checkCode: async (req, res) => {
        const code = req.params.code;
        await User.find({code: code})
        .then(user => {
            if(user.length > 0)
                res.json(false);
            else
                res.json(true);
        })
        .catch(err => console.log(err))
    },
    checkUsername: async (req, res) => {
        const username = req.params.username;
        await User.find({username: username})
        .then(user => {
            if(user.length > 0)
                res.json(false);
            else
                res.json(true);
        })
        .catch(err => console.log(err))
    },
    getById: async (req, res) => {
        const id = req.params.id;
        await User.findById(id)
        .then(user => res.json(student))
        .then(err => console.log(err));
    },
    add: async (req, res) => {
        const data = {...req.body, password: md5(req.body.password)};
        const image = req.files.image;
        const tailPath = image.mimetype.substring(6);
        const dir = process.env.DIR_IMAGE + data.code;
        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir);
        }
        let countFile = 0;
        fs.readdir(dir, (err, files) => countFile = files.length + 1);
        const path = dir + '/' + countFile + '.' + tailPath;
        data.img = './img/' + data.code + '/' + countFile + '.' + tailPath;
        const newUser = new  User(data);
        await User.create(newUser)
        .then(() => res.json("You have signed up successfully!"))
        .catch(err => consle.log(err));

        image.mv(path);
    },
    update: async (req, res) => {
        const dataUpdate = {...req.body};
        const idUserNeedUpdate = dataUpdate['_id'];
        delete dataUpdate['_id'];
        await User.findByIdAndUpdate(idUserNeedUpdate, dataUpdate)
        .then(() => res.json('Updated!'))
        .catch(err => console.log(err));

    },
    delete: async (req, res) => {
        const idUserNeedDelete = req.params.id;
        await Student.findByIdAndDelete(idUserNeedDelete)
        .then(() => res.json("Deleted!"))
        .catch(err => console.log(err))
    },
    findByCode: async (req, res) => {
        const code = req.params.code;
        await User.find({code: {$regex: new RegExp(".*" + code.toLowerCase() + ".*", "i")}})
        .then(user => {
            if(user.length > 0)
                res.json(student)
            else
                res.json("Not found!")
        })
        .catch(err => console.log(err))
    },
    findByName: async (req, res) => {
        const name = req.params.name;
        await User.find({name: {$regex: new RegExp(".*" + name.toLowerCase() + ".*", "i")} })
        .then(user => {
            if(user.length > 0)
                res.json(student)
            else
                res.json("Not found!")
        })
        .catch(err => console.log(err));
    },
}