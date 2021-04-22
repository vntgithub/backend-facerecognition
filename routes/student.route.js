const express = require('express');
const studentController = require('../controllers/student.controller');
const loginMiddleware = require('../middleware/loginMiddleware');
const router = express.Router();

router.post('/login', studentController.login);
router.post('/loginbytoken', loginMiddleware.checkToken, loginMiddleware.protectedRoute, studentController.loginByToken);
router.post('/add', studentController.add);
router.put('/update', studentController.update);
router.get('/findbyname/:name', studentController.findByName);
router.get('/findbycode/:code', studentController.findByCode);

module.exports = router;