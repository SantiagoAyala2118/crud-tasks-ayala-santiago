import { param } from "express-validator";
import { User } from "../../../models/users.model.js";

export const getOneUserValidations = [
  param("id")
    .isString()
    .withMessage("The id param must be a number")
    .custom(async (id) => {
      const existingUser = await User.findByPk(id);
      if (!existingUser) {
        throw new Error("There is no user with that id in the DB");
      }
      return true;
    }),
];
