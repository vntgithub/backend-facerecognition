const express = require('express');
const groupController = require('../controllers/group.controller');

const router = express.Router();

router.post('/add', groupController.add);
router.post('/checkno', groupController.checkNo);
router.get('/getbycourseid/:id', groupController.getByCourseId);
router.delete('/delete/:id', groupController.delete);

module.exports = router;
