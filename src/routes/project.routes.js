import { Router } from "express";
import { createProjectValidations } from "../middlewares/validations/projectValidations/createProjectValidations.js";
import { getOneProjectValidations } from "../middlewares/validations/projectValidations/getOneProjectValidations.js";
import { updateProjectValidations } from "../middlewares/validations/projectValidations/updateProjectValidations.js";
import { deleteProjectValidations } from "../middlewares/validations/projectValidations/deleteProjectValidations.js";
import {
  createProject,
  getAllProjects,
  getOneProject,
  updateProject,
  deleteProject,
} from "../controller/project.controller.js";
import { applyValidations } from "../middlewares/validator.js";

const projectRouter = Router();

projectRouter.post(
  "/api/project",
  createProjectValidations,
  applyValidations,
  createProject
);
projectRouter.get("/api/project", getAllProjects);
projectRouter.get(
  "/api/project/:id",
  getOneProjectValidations,
  applyValidations,
  getOneProject
);
projectRouter.put(
  "/api/project/:id",
  updateProjectValidations,
  applyValidations,
  updateProject
);
projectRouter.delete(
  "/api/project/:id",
  deleteProjectValidations,
  applyValidations,
  deleteProject
);

export default projectRouter;
