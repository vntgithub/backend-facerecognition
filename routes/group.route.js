const express = require('express');
const groupController = require('../controllers/group.controller');

const router = express.Router();

router.post('/add', groupController.add);
router.get('/getbycourseid/:id', groupController.getByCourseId);

module.exports = router;
