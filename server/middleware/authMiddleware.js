import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const authenticateToken = async (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1]
    if (!token) {
        return res.status(401).json({ message: 'Access token missing' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findByPk(decoded.id);

        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }

        req.user = user;
        next();
    } catch (err) {
        res.status(401).json({ message: 'Invalid access token' });
    }
};

export const checkPremium = (req, res, next) => {
    if (req.user.isPremium==='false') {
        return res.status(403).json({ message: 'Not authorized' });
    }
    next();
};
