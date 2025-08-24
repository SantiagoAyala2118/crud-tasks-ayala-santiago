import { body, param } from "express-validator";
import { Project } from "../../../models/projects.model.js";

export const updateProjectValidations = [
  param("id")
    .isInt({ gt: 0 })
    .withMessage("The id param must be a number greater than zero (0)")
    .custom(async (id) => {
      try {
        const existingProject = await Project.findByPk(id);
        if (!existingProject) {
          return Promise.reject("There is no project with that id in the DB");
        }
        return true;
      } catch (err) {
        return Promise.reject("Error trying to check the existency of that id");
      }
    }),
  body("name")
    .optional()
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
    .optional()
    .notEmpty()
    .withMessage("Description cannot be empty")
    .isString()
    .withMessage("Description must be a string")
    .isLength({ min: 10, max: 100 })
    .withMessage(
      "Description must have at least 10 characters and a maximum of 100"
    ),
];
