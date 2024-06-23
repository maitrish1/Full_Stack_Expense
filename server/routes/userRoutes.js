import express from 'express';
import { Login, createUser, getAllUsers, getUserProfile } from '../controllers/userController.js';
import authenticateToken from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/users', createUser);
router.get('/users', getAllUsers);
router.post('/login',Login)
router.get('/profile', authenticateToken, getUserProfile); 

export default router;
