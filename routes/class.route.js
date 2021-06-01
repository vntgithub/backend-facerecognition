const express = require('express');
const router = express.Router();
const classController = require('../controllers/class.controller');

router.post('/add', classController.add);
router.put('/join', classController.studentJoinClass);
router.put('/leave', classController.studentLeaveClass);
router.put('/recognition', classController.recognition);
router.get('/getbyid/:id', classController.getById);
router.delete('/delete/:id',classController.delete);


module.exports = router;