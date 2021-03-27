const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');

router.post('/login', adminController.login);
router.post('/loginbycookie', adminController.loginByCookie);
router.put('/update', adminController.update);

module.exports = router;