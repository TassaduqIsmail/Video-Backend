
const express = require('express');
const router = express.Router();
const subController = require('../controller/subscriptionContoller');


router.post('/payment', subController.payment);
router.put('/updatePayment/:id', subController.updateStatus);
router.get('/getAllSubscriber', subController.getAllSubscriber);

module.exports = router;
