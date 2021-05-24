const express = require('express');
const router = express.Router();
const classController = require('../controllers/class.controller');

router.post('/add', classController.add);
router.post('/join', classController.studentJoinClass);
router.get('/getbyid/:id', classController.getById);


module.exports = router;