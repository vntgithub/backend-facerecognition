const Admin = require('../models/admin.model');
const jwt = require('jsonwebtoken');
const md5 = require('md5');

module.exports = {
    login: async (req, res) => {
        const username = req.body.username;
        const password = req.body.password;
        await Admin.findOne({username: username, password: md5(password)})
        .then(admin => {
            if(admin){
                const data = {...admin['_doc']};
                delete data.password;
                const token = jwt.sign({
                    userId: data['_id']
                }, process.env.SECRET_KEY);
                res.json({
                    data,
                    token
                });
            }else{
                const loginAuth = {exist: false, data: {}}
                res.json(loginAuth);
            }
        })
        .catch(err => console.log(err));
    },
    loginByToken: async (req, res) => {
        const userId = req.user.userId;
        await Admin.findById(userId)
        .then(admin => {
            if(admin){
                const data = {...admin['_doc']};
                delete data.password
                const loginAuth = {exist: true, data }
                res.json(loginAuth);
            }else{
                const loginAuth = {exist: false, data: {}}
                res.json(loginAuth);
            }
        })
        .catch(err => console.log(err));
    },
    update: async (req, res) => {
        const dataUpdate = req.body;
        await Admin.findOneAndUpdate(dataUpdate['_id'], dataUpdate)
        .then(() => res.json('Updated!'))
        .catch(err => console.log(err));
    }
}