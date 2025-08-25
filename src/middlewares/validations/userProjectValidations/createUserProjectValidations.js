import { body } from "express-validator";
import { User } from "../../../models/users.model.js";
import { Project } from "../../../models/projects.model.js";

export const createUserProjectValidations = [
  body("user_id")
    .trim()
    .notEmpty()
    .withMessage("User_id field cannot be empty")
    .isInt({ gt: 0 })
    .withMessage("User_id must be a number greater than zero (0)")
    .custom(async (user_id) => {
      try {
        const existingUser = await User.findByPk(user_id);
        console.log(existingUser);
        if (!existingUser) {
          return Promise.reject("There are no users with that id in the DB");
        }
        return true;
      } catch (err) {
        return Promise.reject("Error trying to check the user existensy");
      }
    }),
  body("project_id")
    .trim()
    .notEmpty()
    .withMessage("Project_id cannot be empty")
    .isInt({ gt: 0 })
    .withMessage("Project_id cannot be empty")
    .custom(async (project_id) => {
      try {
        const existingProject = await Project.findByPk(project_id);
        console.log(existingProject);
        if (!existingProject) {
          return Promise.reject("There is no project with that id in the DB");
        }
        return true;
      } catch (err) {
        return Promise.reject("Error trying to check the project existency");
      }
    }),
];
