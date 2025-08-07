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
userRouter.get("/api/users", getAllUsers);
userRouter.get("/api/users/:id", getUser);
userRouter.put("/api/users/:id", updateUser);
userRouter.delete("/api/users/:id", deleteUser);

export default userRouter;
