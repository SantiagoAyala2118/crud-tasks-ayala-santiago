import { param } from "express-validator";

export const getOneUserValidations = [
  param("id").notEmpty().withMessage("The id param cannot be empty"),
];
