import { validationResult } from "express-validator";

export const applyValidations = (req, res, next) => {
  const errors = validationResult(req);

  const custom = errors.formatWith((err) => {
    return ` ${err.msg}`;
  });
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: custom.mapped() });
  }

  next();
};
