import express from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import sequelize from "./config/database.js";
import expenseRoutes from './routes/expenseRoutes.js';
import Expense from "./models/Expense.js";
import User from "./models/User.js";

const app = express();
app.use(express.json());
app.use(cors());

User.hasMany(Expense, { foreignKey: 'userId' });
Expense.belongsTo(User, { foreignKey: 'userId' });

app.use("/user", userRoutes);
app.use('/expense', expenseRoutes);

app.get('/',(req,res)=>{
    res.json('App is running')
})
sequelize
  .sync()
  .then(() => {
    console.log("Synced with database");
  })
  .catch((err) => {
    console.log(err);
  });
app.listen(8800, () => {
  console.log("Server running");
});
