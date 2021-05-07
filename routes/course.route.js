const express = require('express');
const router = express.Router();
const courseController = require('../controllers/course.controller');

router.post('/add', courseController.add);
router.put('/update', courseController.update);
router.delete('/delete', courseController.delete);
router.get('/findbycode/:code', courseController.findByCode);
router.get('/findbyname/:name', courseController.findByName);
router.get('/checkcode/:code', courseController.checkCodeExist);

module.exports = router;