import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'

const generateToken = (userId) => {
    return jwt.sign({ id: userId }, 'maitrish', { expiresIn: '1h' });
};

export const createUser = async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = await User.create({ ...req.body, password: hashedPassword, isPremium:'false' });
        res.status(201).json(user);
    } catch (err) {
        if (err.name === 'SequelizeUniqueConstraintError') {
            res.status(400).json({ error: 'Email is already present' });
        } else {
            res.status(500).json({ error: err.message });
        }
    }
};

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });
        
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Check Password' });
        }
        const token = generateToken(user.id);

        res.status(200).json({message:'User login successful', token, user});
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getUserProfile = async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json({
            id: user.id,
            name: user.name,
            email: user.email,
            isPremium: user.isPremium,
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};