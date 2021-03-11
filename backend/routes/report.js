const express = require('express');
const router = express.Router();

const reportCtrl = require('../controllers/report');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer');

router.get('/item', auth, reportCtrl.getAllItem);
router.get('/comment', auth, reportCtrl.getAllComment);
router.post('/', auth, reportCtrl.create);
router.delete('/:id', auth, reportCtrl.delete);
router.delete('/one/:id', auth, reportCtrl.deleteOne);


module.exports = router;