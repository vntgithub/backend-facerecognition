const teacherController = require('../controllers/teacher.controller');
const express = require('express');
const router = express.Router();

router.post('/login', teacherController.login);
router.post('/loginbycookie', teacherController.loginByCookie);
router.post('/add', teacherController.add);
router.put('/update', teacherController.update);
router.delete('/delete/:id', teacherController.delete);
router.get('/findbyname/:name', teacherController.findByName);

module.exports = router;