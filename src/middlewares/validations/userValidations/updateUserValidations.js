import { body, param } from "express-validator";
import { User } from "../../../models/users.model.js";

export const updateUserValidations = [
  //BODY
  body("name")
    .optional()
    .notEmpty()
    .withMessage("The name must not be empty")
    .isLength({ min: 5 })
    .withMessage("Name must contain at least 5 characters ")
    .isString()
    .withMessage("Name must be a string"),
  body("email")
    .optional()
    .notEmpty()
    .withMessage("Email cannot be empty")
    .isString()
    .withMessage("Name must be a string")
    .isEmail()
    .withMessage("Email must be valid")
    .isLength({ min: 12 })
    .custom(async (email) => {
      try {
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
          return Promise.reject("Email already in use");
        }
        return true;
      } catch (err) {
        return Promise.reject(
          "Error trying to check the existency of that email"
        );
      }
    }),
  body("password")
    .optional()
    .notEmpty()
    .withMessage("Password is required")
    .isString()
    .withMessage("Name must be a string")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters"),
  //PARAMS
  param("id")
    .isString()
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
          "Error trying to check the existency of that user"
        );
      }
    }),
];
