import { body } from "express-validator";
import { Project } from "../../../models/projects.model.js";

export const createProjectValidations = [
  body("name")
    .notEmpty()
    .withMessage("Name cannot be empty")
    .isString()
    .withMessage("Name must be a string")
    .isLength({ min: 5, max: 100 })
    .withMessage("Name must have at least 5 characters and a maximum of 100")
    .custom(async (name) => {
      try {
        const existingProject = await Project.findOne({ where: { name } });
        if (existingProject) {
          return Promise.reject(
            "There already exist a project with that name in the DB"
          );
        }
        return true;
      } catch (err) {
        return Promise.reject(
          "Error trying to check the existency of that name"
        );
      }
    }),
  body("description")
    .notEmpty()
    .withMessage("Description cannot be empty")
    .isString()
    .withMessage("Description must be a string")
    .isLength({ min: 10, max: 100 })
    .withMessage(
      "Description must have at least 10 characters and a maximum of 100"
    ),
];
