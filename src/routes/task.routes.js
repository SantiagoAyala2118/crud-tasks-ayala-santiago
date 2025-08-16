import { Router } from "express";
import {
  createTask,
  getAllTasks,
  getTask,
  updateTask,
  deleteTask,
} from "../controller/tasks.controller.js";

const taskRouter = Router();

taskRouter.post("/api/tasks", createTask); //crear una tarea relacionada a un usuario
taskRouter.get("/api/tasks", getAllTasks); //trae todas las tareas con el usuario que las creó
taskRouter.get("/api/tasks/:id", getTask); //trae una tarea específica junto al usuario relacionado
taskRouter.put("/api/tasks/:id", updateTask);
taskRouter.delete("/api/tasks/:id", deleteTask);


export default taskRouter;
