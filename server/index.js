const express = require('express');
const cors = require('cors');
const https = require('https');
const fs = require('fs');
const path = require('path');
const helmet = require('helmet');
const morgan = require('morgan');
const userRoutes = require('./routes/userRoutes.js');
const sequelize = require('./config/database.js');
const Expense = require('./models/Expense.js');
const User = require('./models/User.js');
const expenseRoutes = require('./routes/expenseRoutes.js');
const paymentRoutes = require('./routes/paymentRoutes.js');
const ForgotPasswordRequests = require('./models/ForgotPassword.js');

// Create an express application
const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());

const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });
app.use(morgan('combined', { stream: accessLogStream }));

// Define the models relationships
User.hasMany(Expense, { foreignKey: 'userId' });
Expense.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(ForgotPasswordRequests, { foreignKey: 'userId' });
ForgotPasswordRequests.belongsTo(User, { foreignKey: 'userId' });

// Routes
app.use('/user', userRoutes);
app.use('/expense', expenseRoutes);
app.use('/premium', paymentRoutes);

app.get('/', (req, res) => {
  res.json('App is running');
});

// Read SSL certificate files
const privateKey = fs.readFileSync('server.key', 'utf8');
const certificate = fs.readFileSync('server.cert', 'utf8');

// Create HTTPS server
https.createServer({ key: privateKey, cert: certificate }, app).listen(8800, () => {
  console.log('Server running on https://localhost:8800');
});

// Sync sequelize with the database
sequelize.sync()
  .then(() => {
    console.log('Synced with database');
  })
  .catch((err) => {
    console.error('Failed to sync with database:', err);
  });
