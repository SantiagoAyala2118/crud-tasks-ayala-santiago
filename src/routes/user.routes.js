import { Router } from "express";
import {
  createUser,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
} from "../controller/user.controller.js";

const userRouter = Router();

taskRouter.post("/api/users", createUser);
taskRouter.get("/api/users", getAllUsers);
taskRouter.get("/api/users/:id", getUser);
taskRouter.put("/api/users/:id", updateUser);
taskRouter.delete("/api/users/:id", deleteUser);

export default userRouter;
