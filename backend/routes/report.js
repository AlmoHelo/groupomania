const express = require('express');
const router = express.Router();

const reportCtrl = require('../controllers/report');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer');

router.get('/', auth, reportCtrl.getAll);
router.post('/', auth, reportCtrl.create);
router.delete('/:id', auth, reportCtrl.delete);


module.exports = router;