const express = require('express');
const router = express.Router();
const authenticateUser = require('../middleware/auth');
const orderController = require('../controllers/order');

router.post('/ordercreate',authenticateUser, orderController.createOrder);
router.get('/orders', authenticateUser, orderController.getOrderById);
module.exports = router;
