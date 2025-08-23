import { Router } from "express";
import {
  createProfilePicture,
  getAllProfilePictures,
  updateProfilePicture,
  deleteProfilePicture,
} from "../controller/profile_picture.controller.js";

const profilePictureRouter = Router();

profilePictureRouter.post("/api/profile_picture", createProfilePicture);
profilePictureRouter.get("/api/profile_picture", getAllProfilePictures);
profilePictureRouter.put("/api/profile_picture/:id", updateProfilePicture);
profilePictureRouter.delete("/api/profile_picture/:id", deleteProfilePicture);

export default profilePictureRouter;
