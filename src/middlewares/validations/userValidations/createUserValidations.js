import { body } from "express-validator";
import { User } from "../../../models/users.model.js";

export const createUserValidations = [
  //BODY
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
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        throw new Error("Email already in use");
      }
      return true;
    }),
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isString()
    .withMessage("Name must be a string")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters"),
];
