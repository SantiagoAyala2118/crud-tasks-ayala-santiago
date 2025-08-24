import { param } from "express-validator";
import { Project } from "../../../models/projects.model.js";

export const getOneProjectValidations = [
  param("id")
    .isInt({ gt: 0 })
    .withMessage("The id param must be a number greater that zero (0)")
    .custom(async (id) => {
      try {
        const existingProject = await Project.findByPk(id);
        if (!existingProject) {
          return Promise.reject("There is no project with that id in the DB");
        }
        return true;
      } catch (err) {
        return Promise.reject("Error tryng to check the existency of that id");
      }
    }),
];
