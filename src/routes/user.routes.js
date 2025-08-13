import { Router } from "express";
import {
  createUser,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
} from "../controller/user.controller.js";

const userRouter = Router();

userRouter.post("/api/users", createUser);
userRouter.get("/api/users", getAllUsers); //trae todos los usuarios con sus tareas
userRouter.get("/api/users/:id", getUser); //trae un usuario con sus tareas correspondientes
userRouter.put("/api/users/:id", updateUser);
userRouter.delete("/api/users/:id", deleteUser);

export default userRouter;
