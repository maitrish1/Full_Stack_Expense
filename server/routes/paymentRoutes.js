const express = require('express');
const { verifyPayment, createOrder } = require('../controllers/paymentController.js');
const { authenticateToken, checkPremium } = require('../middleware/authMiddleware.js');
const { getTotalExpensesByUser } = require('../controllers/expenseSummaryController.js');

const router = express.Router();

router.post('/createOrder', authenticateToken, createOrder);
router.post('/verifyPayment', authenticateToken, verifyPayment);
router.get('/totalExpenses', authenticateToken, checkPremium, getTotalExpensesByUser);

module.exports = router;
