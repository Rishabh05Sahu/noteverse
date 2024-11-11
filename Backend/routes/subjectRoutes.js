const express=require('express');
const {addSubject , filterSubjects}=require('../controllers/subjectController');

const router=express.Router();

router.post('/add',addSubject);
router.get('/filter/:semester',filterSubjects);

module.exports=router;