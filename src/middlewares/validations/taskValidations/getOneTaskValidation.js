import { param } from "express-validator";
import { Task } from "../../../models/tasks.model.js";

export const getOneTaskValidation = [
  param("id")
    .isString()
    .withMessage("The id param must be a number")
    .custom(async (id) => {
      try {
        const existingTask = await Task.findByPk(id);
        if (!existingTask) {
          return Promise.reject("There is no task with that id in the DB");
        }
        return true;
      } catch (err) {
        return Promise.reject(
          "Error trying to check the existency of that task"
        );
      }
    }),
];
