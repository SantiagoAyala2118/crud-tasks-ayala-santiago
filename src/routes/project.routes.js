import { Router } from "express";
import {
  createProject,
  getAllProjects,
  getOneProject,
  updateProject,
  deleteProject,
} from "../controller/project.controller.js";

const projectRouter = Router();

projectRouter.post("/api/project", createProject);
projectRouter.get("/api/project", getAllProjects);
projectRouter.get("/api/project/:id", getOneProject);
projectRouter.put("/api/project/:id", updateProject);
projectRouter.delete("/api/project/:id", deleteProject);

export default projectRouter;
