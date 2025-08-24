import { Router } from "express";
import { createProfilePictureValidations } from "../middlewares/validations/profilePictureValidations/createProfilePictureValidations.js";
import { getOneProfilePictureValidations } from "../middlewares/validations/profilePictureValidations/getOneProfilePictureValidations.js";
import { updateProfilePictureValidations } from "../middlewares/validations/profilePictureValidations/updateProfilePictureValidations.js";
import { deleteProfilePictureValidations } from "../middlewares/validations/profilePictureValidations/deleteProfilePictureValidations.js";
import {
  createProfilePicture,
  getAllProfilePictures,
  getOneProfilePicture,
  updateProfilePicture,
  deleteProfilePicture,
} from "../controller/profile_picture.controller.js";
import { applyValidations } from "../middlewares/validator.js";

const profilePictureRouter = Router();

profilePictureRouter.post(
  "/api/profile_picture",
  createProfilePictureValidations,
  applyValidations,
  createProfilePicture
);
profilePictureRouter.get("/api/profile_picture", getAllProfilePictures);
profilePictureRouter.get(
  "/api/profile_picture/:id",
  getOneProfilePictureValidations,
  applyValidations,
  getOneProfilePicture
);
profilePictureRouter.put(
  "/api/profile_picture/:id",
  updateProfilePictureValidations,
  applyValidations,
  updateProfilePicture
);
profilePictureRouter.delete(
  "/api/profile_picture/:id",
  deleteProfilePictureValidations,
  applyValidations,
  deleteProfilePicture
);

export default profilePictureRouter;
