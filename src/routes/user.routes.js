import { Router } from "express";
import { applyValidations } from "../middlewares/validator.js";
import { createUserValidations } from "../middlewares/validations/userValidations/createUserValidations.js";
import { getOneUserValidations } from "../middlewares/validations/userValidations/getOneUserValidations.js";
import { updateUserValidations } from "../middlewares/validations/userValidations/updateUserValidations.js";
import {
  createUser,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
} from "../controller/user.controller.js";
import { deleteUserValidation } from "../middlewares/validations/userValidations/deleteUserValidations.js";

const userRouter = Router();

userRouter.post(
  "/api/users",
  createUserValidations,
  applyValidations,
  createUser
);
userRouter.get("/api/users", getAllUsers); //trae todos los usuarios con sus tareas
userRouter.get(
  "/api/users/:id",
  getOneUserValidations,
  applyValidations,
  getUser
); //trae un usuario con sus tareas correspondientes
userRouter.put(
  "/api/users/:id",
  updateUserValidations,
  applyValidations,
  updateUser
);
userRouter.delete(
  "/api/users/:id",
  deleteUserValidation,
  applyValidations,
  deleteUser
);

export default userRouter;
