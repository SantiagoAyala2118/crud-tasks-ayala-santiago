import { Router } from "express";
import { createUserProjectValidations } from "../middlewares/validations/userProjectValidations/createUserProjectValidations.js";
import { getOneUserProjectValidations } from "../middlewares/validations/userProjectValidations/getOneUserProjectValidations.js";
import { updateUserProjectValidations } from "../middlewares/validations/userProjectValidations/updateUserProjectValidations.js";
import { deleteUserProjectValidations } from "../middlewares/validations/userProjectValidations/deleteUserProjectValidations.js";
import {
  createUserProject,
  getAllUsersProjects,
  getOneUserProject,
  updateUserProject,
  deleteUserProject,
} from "../controller/users_projects.controllers.js";
import { applyValidations } from "../middlewares/validator.js";

const usersProjectsRouter = Router();

usersProjectsRouter.post(
  "/api/users_projects",
  createUserProjectValidations,
  applyValidations,
  createUserProject
);
usersProjectsRouter.get("/api/users_projects", getAllUsersProjects);
usersProjectsRouter.get(
  "/api/users_projects/:id",
  getOneUserProjectValidations,
  applyValidations,
  getOneUserProject
);
usersProjectsRouter.put(
  "/api/users_projects/:id",
  updateUserProjectValidations,
  applyValidations,
  updateUserProject
);
usersProjectsRouter.delete(
  "/api/users_projects/:id",
  deleteUserProjectValidations,
  applyValidations,
  deleteUserProject
);

export default usersProjectsRouter;
