import { param } from "express-validator";
import { User } from "../../../models/users.model.js";

export const getOneUserValidations = [
  param("id")
    .isInt()
    .withMessage("The id param must be a number")
    .custom(async (id) => {
      try {
        const existingUser = await User.findByPk(id);
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
];
