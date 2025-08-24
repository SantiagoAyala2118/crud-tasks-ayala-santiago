import { param } from "express-validator";
import { ProfilePicture } from "../../../models/profile_picture.model.js";

export const getOneProfilePictureValidations = [
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
];
