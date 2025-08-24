import { param } from "express-validator";
import { ProfilePicture } from "../../../models/profile_picture.model.js";

export const deleteProfilePictureValidations = [
  param("id")
    .isString()
    .withMessage("The id param must be a number")
    .custom(async (id) => {
      const existingProfilePicture = await ProfilePicture.findByPk(id);
      if (!existingProfilePicture) {
        throw new Error("There is no profile picture with that id in the DB");
      }
      return true;
    }),
];
