const express = require('express');
const groupController = require('../controllers/group.controller');

const router = express.Router();

router.post('/add', groupController.add);
router.post('/checkno', groupController.checkNo);
router.post('/getbyarrayid', groupController.getByArrayId);
router.get('/getbycourseid/:id', groupController.getByCourseId);
router.get('/getbyid/:id', groupController.getById);
router.get('/findbycode/:code', groupController.findByCode);
router.put('/endlesson', groupController.endLesson);
router.delete('/delete/:id', groupController.delete);

module.exports = router;
