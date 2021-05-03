const express = require('express');
const userController = require('../controllers/user.controller');
const loginMiddleware = require('../middleware/loginMiddleware');
const router = express.Router();

router.post('/login', userController.login);
router.post('/loginbytoken', 
	loginMiddleware.checkToken, 
	loginMiddleware.protectedRoute, 
	userController.loginByToken);
router.post('/add', userController.add);
router.put('/update', userController.update);
router.get('/findbyname/:name', userController.findByName);
router.get('/findbycode/:code', userController.findByCode);
router.get('/checkcode/:code', userController.checkCode);
router.get('/checkusername/:username', userController.checkUsername);

module.exports = router;
