const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');
const multer = require('../middleware/multer');

router.post('/signup', multer, userCtrl.signup);
router.post('/login', userCtrl.login);
router.get("/:id", userCtrl.getOneUser);
router.put("/:id", userCtrl.updateUser);
router.delete('/:id', userCtrl.deleteUser);
router.get("/", userCtrl.getCountUsers)
router.get("/profil/:id", userCtrl.getOneOtherUser)

module.exports = router;