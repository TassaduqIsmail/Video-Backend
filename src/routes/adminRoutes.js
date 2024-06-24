// routes/auth.js
const express = require('express');
const router = express.Router();
const userController = require('../controller/adminController');


// POST /api/register
router.post('/register', userController.register);
// router.post('/resetPassword',userController.resetPassword)
router.put('/forgotPassword',userController.forgotPassword)
router.post('/login',userController.login)
router.get('/getallAdminname',userController.getallAdminname)
router.put('/adminChangePass',userController.adminChangePass)


module.exports = router;