import Expense from '../models/Expense.js';
import User from '../models/User.js';

export const createExpense = async (req, res) => {
    const { description, amount, category } = req.body;
    const userId=req.user.id
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
    const  userId =req.user.id
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
    const { id } = req.params;
    const userId = req.user.id;
    try{
        const expense=await Expense.findOne({where:{id,userId}})
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