import Expense from '../models/Expense.js';
import User from '../models/User.js';

export const createExpense = async (req, res) => {
    const { userId, description, amount, category } = req.body;
    console.log(req.body)
    try {
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const expense = await Expense.create({
            description,
            amount,
            category,
            userId
        });

        res.status(201).json(expense);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getUserExpenses = async (req, res) => {
    const { userId } = req.params;

    try {
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const expenses = await Expense.findAll({
            where: { userId }
        });

        res.status(200).json(expenses);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const deleteExpense=async(req,res)=>{
    const {id}=req.params
    try{
        const expense=await Expense.findByPk(id)
        if(!expense){
            return res.status(404).json({error:'Expense not found'})
        }

        await expense.destroy()
        res.status(200).json('Expense has been deleted.')
    }
    catch(err){
        res.status(500).json({error:err.message})
    }
}