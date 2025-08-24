import { Router } from "express";
import { createTaskValidations } from "../middlewares/validations/taskValidations/createTaskValidations.js";
import { getOneTaskValidation } from "../middlewares/validations/taskValidations/getOneTaskValidation.js";
import { updateTaskValidations } from "../middlewares/validations/taskValidations/updateTaskValidation.js";

import {
  createTask,
  getAllTasks,
  getTask,
  updateTask,
  deleteTask,
} from "../controller/tasks.controller.js";
import { applyValidations } from "../middlewares/validator.js";
import { deleteTaskValidations } from "../middlewares/validations/taskValidations/deleteTaskValidations.js";

const taskRouter = Router();

taskRouter.post(
  "/api/tasks",
  createTaskValidations,
  applyValidations,
  createTask
); //crear una tarea relacionada a un usuario
taskRouter.get("/api/tasks", getAllTasks); //trae todas las tareas con el usuario que las creó
taskRouter.get(
  "/api/tasks/:id",
  getOneTaskValidation,
  applyValidations,
  getTask
); //trae una tarea específica junto al usuario relacionado
taskRouter.put(
  "/api/tasks/:id",
  updateTaskValidations,
  applyValidations,
  updateTask
);
taskRouter.delete(
  "/api/tasks/:id",
  deleteTaskValidations,
  applyValidations,
  deleteTask
);

export default taskRouter;
