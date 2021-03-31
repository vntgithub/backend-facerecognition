const express = require('express');
const studentController = require('../controllers/student.controller');
const router = express.Router();

router.post('/login', studentController.login);
router.post('/loginbycookie', studentController.loginByCookie);
router.post('/add', studentController.add);
router.put('/update', studentController.update);
router.get('/findbyname/:name', studentController.findByName);
router.get('/findbycode/:code', studentController.findByCode);

module.exports = router;