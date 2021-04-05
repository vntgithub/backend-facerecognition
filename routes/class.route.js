const express = require('express');
const router = express.Router();
const classController = require('../controllers/class.controller');

router.post('/add', classController.add);

module.exports = router;