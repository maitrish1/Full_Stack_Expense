const express = require('express');
const { createExpense, deleteExpense, getUserExpenses } = require('../controllers/expenseController.js');
const { authenticateToken } = require('../middleware/authMiddleware.js');

const router = express.Router();

router.post('/createExpense', authenticateToken, createExpense);
router.get('/getExpense', authenticateToken, getUserExpenses);
router.delete('/deleteExpense/:id', authenticateToken, deleteExpense);

module.exports = router;
