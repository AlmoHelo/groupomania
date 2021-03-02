const express = require('express');
const router = express.Router();

const itemCtrl = require('../controllers/item');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer');


router.get('/:id', auth, itemCtrl.getOne);
router.get('/', auth, itemCtrl.getAll);
//router.get('/top', auth, itemCtrl.getItemTop);
router.post('/create', auth, multer, itemCtrl.create);
router.put('/:id', auth, multer, itemCtrl.update);
router.delete('/:id', auth, itemCtrl.delete);
router.post('/:id/like', auth, itemCtrl.like);   

module.exports = router;