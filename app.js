import express from "express";
import userRouter from "./src/routes/user.routes.js";
import taskRouter from "./src/routes/task.routes.js";
import profilePictureRouter from "./src/routes/profile_picture.routes.js";
import projectRouter from "./src/routes/project.routes.js";
import usersProjectsRouter from "./src/routes/users_projects.routes.js";
import dotenv from "dotenv";
import { initDB } from "./src/config/db.js";
dotenv.config();

initDB();

const app = express();
app.use(express.json());
const PORT = process.env.PORT;

app.use(
  "/",
  userRouter,
  taskRouter,
  profilePictureRouter,
  projectRouter,
  usersProjectsRouter
);

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
