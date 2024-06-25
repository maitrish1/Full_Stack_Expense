const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes.js');
const sequelize = require('./config/database.js');
const Expense = require('./models/Expense.js');
const User = require('./models/User.js');
const expenseRoutes = require('./routes/expenseRoutes.js');
const paymentRoutes = require('./routes/paymentRoutes.js');
const ForgotPasswordRequests=require('./models/ForgotPassword.js')

const app = express();
app.use(express.json());
app.use(cors());

User.hasMany(Expense, { foreignKey: 'userId' });
Expense.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(ForgotPasswordRequests, { foreignKey: 'userId' });
ForgotPasswordRequests.belongsTo(User, { foreignKey: 'userId' });

app.use('/user', userRoutes);
app.use('/expense', expenseRoutes);
app.use('/premium', paymentRoutes);
app.get('/', (req, res) => {
    res.json('App is running');
});

sequelize
  .sync()
  .then(() => {
    console.log('Synced with database');
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(8800, () => {
  console.log('Server running');
});
