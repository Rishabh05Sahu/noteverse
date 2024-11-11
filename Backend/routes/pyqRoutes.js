const express=require('express');
const{allPyqs, addPyq, filterPyqs, deletePyq}=require('../controllers/pyqController');

const router=express.Router();

router.get('/all',allPyqs)
router.post('/add',addPyq)
router.post('/delete',deletePyq)
router.get('/filter/:semester/:subject',filterPyqs)

module.exports=router;