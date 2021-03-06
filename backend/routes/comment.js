const express = require('express');
const router = express.Router();

const commentCtrl = require('../controllers/comment');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer');


router.get('/all/:id', auth, commentCtrl.getAll);
router.post('/', auth, multer, commentCtrl.create);
router.put('/:id', auth, multer, commentCtrl.update);
router.delete('/:id', auth, commentCtrl.delete);
//router.post('/:id/like', auth, itemCtrl.like);   

module.exports = router;