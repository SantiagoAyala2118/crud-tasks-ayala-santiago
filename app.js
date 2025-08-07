import express from "express";
import userRouter from "./src/routes/user.routes.js";
import taskRouter from "./src/routes/task.routes.js";
import dotenv from "dotenv";
import { initDB } from "./src/config/db.js";
dotenv.config();

initDB();

const app = express();
app.use(express.json());
const PORT = process.env.PORT;

app.use("/", userRouter, taskRouter);

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
