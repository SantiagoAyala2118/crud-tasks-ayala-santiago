import { Router } from "express";
import {
  createProfilePicture,
  getAllProfilePictures,
} from "../controller/profile_picture.controller.js";

const profilePictureRouter = Router();

profilePictureRouter.post("/api/profile_picture", createProfilePicture);
profilePictureRouter.get("/api/profile_picture", getAllProfilePictures);

export default profilePictureRouter;
