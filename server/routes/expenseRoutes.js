import express from 'express';
import { createExpense, deleteExpense, getUserExpenses } from '../controllers/expenseController.js';

const router = express.Router();

router.post('/createExpense', createExpense);
router.get('/getExpense/:userId', getUserExpenses);
router.delete('/deleteExpense/:id', deleteExpense)
export default router;

