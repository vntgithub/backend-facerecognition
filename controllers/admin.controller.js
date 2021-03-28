const Admin = require('../models/admin.model');
const md5 = require('md5');

module.exports = {
    login: async (req, res) => {
        const username = req.body.username;
        const password = req.body.password;
        await Admin.findOne({username: username, password: md5(password)})
        .then(admin => {
            if(admin){
                const loginAuth = {exist: true, data: admin}
                res.json(loginAuth);
            }else{
                const loginAuth = {exist: false, data: {}}
                res.json(loginAuth);
            }
        })
        .catch(err => console.log(err));
    },
    loginByCookie: async (req, res) => {
        const cookie = req.body.cookie;
        await Admin.findById(cookie)
        .then(admin => {
            if(admin){
                const loginAuth = {exist: true, data: admin}
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