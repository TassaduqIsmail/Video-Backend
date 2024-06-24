// routes/auth.js
const express = require('express');
const router = express.Router();
const profileController = require('../controller/userProfileController');
// Multer storage configuration
const multer = require('multer');
const storage = multer.diskStorage({});
const upload = multer({ storage });
// POST /api/register
router.post('/setUserProfile', upload.single("file"), profileController.setUserProfile);
// router.post('/payment', profileController.payment);
router.get('/getUserProfileByUid/:uid', profileController.getProfileByUid);
router.put('/updatePicById/:uid', profileController.updatePicById);
router.put('/updateNameById/:uid', profileController.updateNameById);
router.put('/updateUsernameById/:uid', profileController.updateUsernameById);
router.put('/updatePriceById/:uid', profileController.updatePriceById);
router.delete('/profiles/:uid', profileController.deleteProfileByUid);
router.get('/getAllProfile', profileController.getAllProfile);


module.exports = router; 