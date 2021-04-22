const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');
const loginMiddleware = require('../middleware/loginMiddleware');

router.post('/login', adminController.login);
router.post('/loginbytoken', loginMiddleware.checkToken, loginMiddleware.protectedRoute, adminController.loginByToken);
router.put('/update', adminController.update);

module.exports = router;