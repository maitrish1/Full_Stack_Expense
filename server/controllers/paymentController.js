import Razorpay from 'razorpay';
import dotenv from 'dotenv';
import User from '../models/User.js';
import crypto from 'crypto'
dotenv.config();

const razorpayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export const createOrder = async (req, res) => {
    const { amount } = req.body;
    const options = {
        amount: amount * 100, // amount in the smallest currency unit
        currency: 'INR',
        receipt: `receipt_${Math.floor(Math.random() * 1000000)}`,
    };

    try {
        const order = await razorpayInstance.orders.create(options);
        res.status(200).json({ orderId: order.id });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const verifyPayment = async (req, res) => {
    const { orderId, paymentId, signature } = req.body;
    const userId = req.user.id;

    const body = orderId + "|" + paymentId;
    const expectedSignature = crypto
        .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
        .update(body.toString())
        .digest('hex');

    if (expectedSignature === signature) {
        try {
            await User.update({ isPremium: "true" }, { where: { id: userId } });
            res.status(200).json({ message: 'Payment verified successfully and user is now premium' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    } else {
        res.status(400).json({ error: 'Invalid signature' });
    }
};
