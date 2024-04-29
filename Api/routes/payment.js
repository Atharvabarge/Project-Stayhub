const express = require('express')

const PaymentController = require('../controlers/Payment');

const router = express.Router();

router.post("/orders", PaymentController.orderFunc);

router.post('/success' , PaymentController.successFunc);

module.exports = router;