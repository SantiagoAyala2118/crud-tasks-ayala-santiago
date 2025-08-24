import { param } from "express-validator";
import { UserProject } from "../../../models/users_projects.model.js";

export const getOneUserProjectValidations = [
  param("id")
    .isInt({ gt: 0 })
    .withMessage("The id param must be a number greater than zero (0)")
    .custom(async (id) => {
      try {
        const registerExisting = await UserProject.findByPk(id);
        if (!registerExisting) {
          return Promise.reject("There is no register with that id in the DB");
        }
      } catch (err) {
        return Promise.reject(
          "Error trying to check the existency of the register"
        );
      }
    }),
];
