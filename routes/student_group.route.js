const express = require('express');
const router = express.Router();
const student_group_controller = require('../controllers/student_group.controller');

router.get('/getbystudentid/:id', student_group_controller.getByStudentId);
router.post('/add', student_group_controller.add);
router.put('/join', student_group_controller.joinGroup);
router.put('/leave', student_group_controller.leaveGroup);

module.exports = router;