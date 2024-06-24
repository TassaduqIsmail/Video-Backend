
const express = require('express');
const router = express.Router();
const accountController = require('../controller/accountDetailsController');


router.post('/account', accountController.withdrawAccountDeatils);
router.get('/getAllAccount', accountController.getAllAccounts);
router.get('/getAllAccount/:id', accountController.getSingleAccount);
router.put('/updateStatus/:id', accountController.accountStatusUpdate);

module.exports = router;
