import { body } from "express-validator";
import { ProfilePicture } from "../../../models/profile_picture.model.js";
import { User } from "../../../models/users.model.js";

export const createProfilePictureValidations = [
  body("url")
    .trim()
    .notEmpty()
    .withMessage("Url field cannot be empty")
    .isURL()
    .withMessage("Url field must have url format")
    .isString()
    .withMessage("Url must be a string")
    .custom(async (url) => {
      try {
        const existingProfilePicture = await ProfilePicture.findOne({
          where: { url },
        });
        if (existingProfilePicture) {
          return Promise.reject(
            "Tnere is already a profile picture with that url in the DB"
          );
        }
        return true;
      } catch (err) {
        return Promise.reject(
          "Error trying to check the viability of that url"
        );
      }
    }),
  body("description")
    .trim()
    .notEmpty()
    .withMessage("Description field cannot be empty")
    .isString()
    .withMessage("Description must be a string")
    .isLength({ min: 10, max: 100 })
    .withMessage(
      "Description must have at least 10 characters and a maximum of 100"
    ),
  body("user_id")
    .trim()
    .notEmpty()
    .withMessage("The user_id cannot be empty")
    .isInt({ gt: 0 })
    .withMessage("The user_id field must be a number greater than zero (0)")
    .custom(async (user_id) => {
      try {
        const existingUser = await User.findByPk(user_id);
        if (!existingUser) {
          return Promise.reject("There is no user with that id in the DB");
        }
        return true;
      } catch (err) {
        return Promise.reject("Error trying to check the existency of that id");
      }
    }),
];
