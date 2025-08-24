import { param } from "express-validator";
import { ProfilePicture } from "../../../models/profile_picture.model.js";

export const deleteProfilePictureValidations = [
  param("id")
    .isString()
    .withMessage("The id param must be a number")
    .custom(async (id) => {
      try {
        const existingProfilePicture = await ProfilePicture.findByPk(id);
        if (!existingProfilePicture) {
          return Promise.reject(
            "There is no profile picture with that id in the DB"
          );
        }
        return true;
      } catch (err) {
        return Promise.reject("Error trying to check the existency of that id");
      }
    }),
];
