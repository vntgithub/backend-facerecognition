const teacherController = require('../controllers/teacher.controller');
const loginMiddleware = require('../middleware/loginMiddleware');
const express = require('express');
const router = express.Router();

router.post('/login', teacherController.login);
router.post('/loginbytoken', loginMiddleware.checkToken, loginMiddleware.protectedRoute, teacherController.loginByToken);
router.post('/add', teacherController.add);
router.put('/update', teacherController.update);
router.delete('/delete/:id', teacherController.delete);
router.get('/findbyname/:name', teacherController.findByName);
router.get('/checkcode/:code', teacherController.checkCode);
router.get('/checkusername/:username', teacherController.checkUsername);

module.exports = router;