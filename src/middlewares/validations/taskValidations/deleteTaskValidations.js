import { param } from "express-validator";
import { Task } from "../../../models/tasks.model.js";

export const deleteTaskValidations = [
  param("id")
    .isString()
    .withMessage("The id param must be a number")
    .custom(async (id) => {
      const existingTask = await Task.findByPk(id);
      if (!existingTask) {
        throw new Error("There is no task with that id in the DB");
      }
      return true;
    }),
];
