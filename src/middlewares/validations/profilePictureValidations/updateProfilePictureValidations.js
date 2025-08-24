import { body, param } from "express-validator";
import { ProfilePicture } from "../../../models/profile_picture.model.js";
import { User } from "../../../models/users.model.js";

export const updateProfilePictureValidations = [
  param("id")
    .isInt({ gt: 0 })
    .withMessage("The id param must be a number greater than zero (0)")
    .custom(async (id) => {
      const existingProfilePicture = await ProfilePicture.findByPk(id);
      if (!existingProfilePicture) {
        throw new Error("There is no profile picture with that id in the DB");
      }
      return true;
    }),
  body("url")
    .optional()
    .notEmpty()
    .withMessage("Url field cannot be empty")
    .isURL()
    .withMessage("Url field must have url format")
    .isString()
    .withMessage("Url must be a string")
    .custom(async (url) => {
      const existingProfilePicture = await ProfilePicture.findOne({
        where: { url },
      });
      if (existingProfilePicture) {
        throw new Error(
          "Tnere is already a profile picture with that url in the DB"
        );
      }
      return true;
    }),
  body("description")
    .optional()
    .notEmpty()
    .withMessage("Description field cannot be empty")
    .isString()
    .withMessage("Description must be a string")
    .isLength({ min: 10, max: 100 })
    .withMessage(
      "Description must have at least 10 characters and a maximum of 100"
    ),
  body("user_id")
    .optional()
    .isInt({ gt: 0 })
    .withMessage("The user_id field must be a number greater than zero (0)")
    .custom(async (user_id) => {
      const existingUser = await User.findByPk(user_id);
      if (!existingUser) {
        throw new Error("There is no user with that id in the DB");
      }
      return true;
    }),
];
