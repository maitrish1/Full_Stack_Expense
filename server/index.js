import express from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import sequelize from "./config/database.js";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api", userRoutes);
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
