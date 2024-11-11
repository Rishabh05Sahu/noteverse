const express=require('express');
const{allNotes, addNote, filterNotes, deleteNote}=require('../controllers/noteController');

const router=express.Router();

router.get('/all',allNotes)
router.post('/add',addNote)
router.post('/delete',deleteNote)
router.get('/filter/:semester/:subject',filterNotes)

module.exports=router;