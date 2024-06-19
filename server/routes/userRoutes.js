import express from 'express';
import { Login, createUser, getAllUsers } from '../controllers/userController.js';

const router = express.Router();

router.post('/users', createUser);
router.get('/users', getAllUsers);
router.post('/login',Login)
export default router;
