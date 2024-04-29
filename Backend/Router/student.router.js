const express = require('express');
const studentCtrl = require('../Controller/student.ctrl');

const router = express.Router();

router.get('/', studentCtrl.getAllStudent);
router.post('/', studentCtrl.addStudent);
router.put('/:id', studentCtrl.updateStudent);
router.delete('/:id', studentCtrl.deleteStudent);

module.exports = router;