import express from 'express';
import { verifyPayment } from '../controllers/paymentController.js';
import authenticateToken from '../middleware/authMiddleware.js';
import { createOrder } from '../controllers/paymentController.js';

const router = express.Router();

router.post('/createOrder', authenticateToken, createOrder);
router.post('/verifyPayment', authenticateToken, verifyPayment);

export default router;
