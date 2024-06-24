const express = require('express');
const { Login, createUser, forgotPassword, getAllUsers, getUserProfile } = require('../controllers/userController.js');
const { authenticateToken } = require('../middleware/authMiddleware.js');

const router = express.Router();

router.post('/users', createUser);
router.get('/users', getAllUsers);
router.post('/login', Login);
router.get('/profile', authenticateToken, getUserProfile);
router.post('/forgotpassword', forgotPassword);

module.exports = router;
