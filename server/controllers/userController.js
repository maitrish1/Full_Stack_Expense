const User = require("../models/User.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//BREVO
var SibApiV3Sdk = require("sib-api-v3-sdk");

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, "maitrish", { expiresIn: "1h" });
};

exports.createUser = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = await User.create({
      ...req.body,
      password: hashedPassword,
      isPremium: "false",
    });
    res.status(201).json(user);
  } catch (err) {
    if (err.name === "SequelizeUniqueConstraintError") {
      res.status(400).json({ error: "Email is already present" });
    } else {
      res.status(500).json({ error: err.message });
    }
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Check Password" });
    }
    const token = generateToken(user.id);

    res.status(200).json({ message: "User login successful", token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
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

exports.forgotPassword = async (req, res) => {
  try {
    const email = req.body.email;
    const name = req.body.name;
    let defaultClient = SibApiV3Sdk.ApiClient.instance;
    let apiKey = defaultClient.authentications["api-key"];
    apiKey.apiKey = process.env.BREVO_API_KEY;
    let tranEmailApi = new SibApiV3Sdk.TransactionalEmailsApi();
    let sender={
        email:'maitrishmukherjee@gmail.com',
        name:'Maitrish Mukherjee'
    }
    let receivers=[
        {
            email:email
        }
    ]
    tranEmailApi.sendTransacEmail({
        sender,
        to:receivers,
        subject: 'This is your calling. Sorry OTP.',
        textContent:'Your otp is this'
    }).then(console.log)
    .catch(console.log)
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
