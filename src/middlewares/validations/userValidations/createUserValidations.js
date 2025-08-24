import { body } from "express-validator";
import { User } from "../../../models/users.model.js";

export const createUserValidations = [
  body("name")
    .notEmpty()
    .withMessage("The name must not be empty")
    .isLength({ min: 5 })
    .withMessage("Name must contain at least 5 characters ")
    .isString()
    .withMessage("Name must be a string"),
  body("email")
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
      } catch (err) {
        return Promise.reject(
          "Error trying to check the viability of the email"
        );
      }
    }),
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isString()
    .withMessage("Name must be a string")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters"),
];
