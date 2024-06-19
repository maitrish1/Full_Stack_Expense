import express from 'express';
import { createUser, getAllUsers } from '../controllers/userController.js';

const router = express.Router();

router.post('/users', createUser);
router.get('/users', getAllUsers);

export default router;