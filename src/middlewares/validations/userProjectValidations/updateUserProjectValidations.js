import { body, param } from "express-validator";
import { UserProject } from "../../../models/users_projects.model.js";
import { User } from "../../../models/users.model.js";
import { Project } from "../../../models/projects.model.js";

export const updateUserProjectValidations = [
  param("id")
    .isInt({ gt: 0 })
    .withMessage("The id param must be a number greater than zero (0)")
    .custom(async (id) => {
      try {
        const registerExisting = await UserProject.findByPk(id);
        if (!registerExisting) {
          return Promise.reject("There is no register in the DB with that id");
        }
        return true;
      } catch (err) {
        return Promise.reject(
          "Error trying to check the existency of the register in the DB"
        );
      }
    }),
  body("user_id")
    .optional()
    .notEmpty()
    .withMessage("The user_id cannot be empty")
    .isInt({ gt: 0 })
    .withMessage("The id must be a number greater than zero (0)")
    .custom(async (user_id) => {
      try {
        const existingUser = await User.findByPk(user_id);
        if (!existingUser) {
          return Promise.reject("There is no user with that id in the DB");
        }
        return true;
      } catch (err) {
        return Promise.reject(
          "Error trying to check the existency of the user"
        );
      }
    }),
  body("project_id")
    .optional()
    .notEmpty()
    .withMessage("The project_id cannot be empty")
    .isInt({ gt: 0 })
    .withMessage("The project_id must be a number greater than zero (0)")
    .custom(async (project_id) => {
      try {
        const existingProject = await Project.findByPk(project_id);
        if (!existingProject) {
          return Promise.reject("There is no project with that id in the DB");
        }
        return true;
      } catch (err) {
        return Promise.reject(
          "Error trying to check the existency of the project"
        );
      }
    }),
];
