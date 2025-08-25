import { body, param } from "express-validator";
import { Task } from "../../../models/tasks.model.js";

export const updateTaskValidations = [
  param("id")
    .isInt()
    .withMessage("The id param must be a number")
    .custom(async (id) => {
      try {
        const existingTask = await Task.findByPk(id);
        if (!existingTask) {
          return Promise.reject("There is no user with that id in the DB");
        }
        return true;
      } catch (err) {
        return Promise.reject(
          "Error trying to check the existency of that task"
        );
      }
    }),
  body("title")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Title cannot be empty")
    .isLength({ min: 5, max: 100 })
    .withMessage("Name must have at least 5 characters and a maximun of 100")
    .isString()
    .withMessage("Title must be a string")
    .custom(async (title) => {
      const existingTitle = await Task.findOne({ where: { title } });
      if (existingTitle) {
        throw new Error("That task already exists in the DB, use other title");
      }
      return true;
    }),
  body("description")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Description cannot be empty")
    .isString()
    .withMessage("Description must be a string")
    .isLength({ min: 10, max: 100 })
    .withMessage(
      "Description must have at least 10 characters and a maximun of 100"
    )
    .isString()
    .withMessage("Description must be a string"),
  body("is_complete")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("If you insert an is_complete field, it cannot be empty")
    .isBoolean()
    .withMessage("Is_complete field must be boolean value (true or false)"),
  body("user_id")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("User_id field cannot be empty")
    .isInt({ gt: 0 })
    .withMessage("User_id field must be an int (number) superior to zero (0)")
    .custom(async (user_id) => {
      const existingUser = await User.findByPk(user_id);
      if (!existingUser) {
        throw new Error("There are no user with that id in the DB");
      }
      return true;
    }),
];
