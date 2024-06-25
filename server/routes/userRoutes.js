const express = require('express');
const { Login, createUser, forgotPassword, getAllUsers, getUserProfile, verifyResetToken, resetPassword } = require('../controllers/userController.js');
const { authenticateToken } = require('../middleware/authMiddleware.js');

const router = express.Router();

router.post('/users', createUser);
router.get('/users', getAllUsers);
router.post('/login', Login);
router.get('/profile', authenticateToken, getUserProfile);
router.post('/forgotpassword', forgotPassword);
router.get('/resetpassword/:resetToken', verifyResetToken);
router.post('/resetpassword/:resetToken', resetPassword);
module.exports = router;
