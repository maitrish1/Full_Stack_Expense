import express from 'express';
import { verifyPayment } from '../controllers/paymentController.js';
import {authenticateToken,checkPremium} from '../middleware/authMiddleware.js';
import { createOrder } from '../controllers/paymentController.js';
import { getTotalExpensesByUser } from '../controllers/expenseSummaryController.js';

const router = express.Router();

router.post('/createOrder', authenticateToken, createOrder);
router.post('/verifyPayment', authenticateToken, verifyPayment);
router.get('/totalExpenses',authenticateToken, checkPremium,getTotalExpensesByUser);

export default router;
