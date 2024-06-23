import User from '../models/User.js';
import Expense from '../models/Expense.js';
import sequelize from '../config/database.js';

export const getTotalExpensesByUser = async (req, res) => {
    try {
        const totalExpenses = await Expense.findAll({
            attributes: [
                'userId',
                [sequelize.fn('SUM', sequelize.col('amount')), 'totalExpenses']
            ],
            group: ['userId'],
            order: [[sequelize.literal('totalExpenses'), 'DESC']],
            include: [
                {
                    model: User,
                    attributes: ['name', 'email']
                }
            ],
            raw: true
        });

        const formattedExpenses = totalExpenses.map(expense => ({
            userId: expense.userId,
            totalExpenses: expense.totalExpenses,
            name: expense['user.name'],
            email: expense['user.email']
        }));

        res.status(200).json(formattedExpenses);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
