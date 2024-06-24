// routes/auth.js
const express = require('express');
const router = express.Router();
const userController = require('../controller/usersContoller');


// POST /api/register
router.post('/register', userController.register);
router.post('/emailverify', userController.verifyEmail);
// router.post('/resetPassword',userController.resetPassword)
router.post('/forgotPassword',userController.forgotPassword)
router.post('/login',userController.login)
router.get('/getAllUsers',userController.getAllUsers)
router.get('/getUserByUid/:uid',userController.getUserByUid)
router.put('/updateStatus/:uid',userController.updateUsersStatus)
router.put('/updateStatusIntro/:uid',userController.updateIntroStatus)
router.put('/updateDeletestatus/:uid',userController.updateDeletestatus)


module.exports = router;