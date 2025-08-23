import { Router } from "express";
import {
  createUserProject,
  getAllUsersProjects,
  getOneUserProject,
  updateUserProject,
  deleteUserProject,
} from "../controller/users_projects.controllers.js";

const usersProjectsRouter = Router();

usersProjectsRouter.post("/api/users_projects", createUserProject);
usersProjectsRouter.get("/api/users_projects", getAllUsersProjects);
usersProjectsRouter.get("/api/users_projects/:id", getOneUserProject);
usersProjectsRouter.put("/api/users_projects/:id", updateUserProject);
usersProjectsRouter.delete("/api/users_projects/:id", deleteUserProject);

export default usersProjectsRouter;
