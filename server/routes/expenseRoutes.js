import express from 'express';
import { createExpense, deleteExpense, getUserExpenses } from '../controllers/expenseController.js';
import authenticateToken from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/createExpense',authenticateToken, createExpense);
router.get('/getExpense',authenticateToken, getUserExpenses);
router.delete('/deleteExpense/:id',authenticateToken, deleteExpense)
export default router;

