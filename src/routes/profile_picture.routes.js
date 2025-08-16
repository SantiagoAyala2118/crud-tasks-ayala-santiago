import { Router } from "express";
import {
  createProfilePicture,
  getAllProfilePictures,
} from "../controller/profile_picture.controller.js";

const ProfilePictureRouter = Router();

ProfilePictureRouter.post("/api/profile_picture", createProfilePicture);
ProfilePictureRouter.get("/api/profile_picture", getAllProfilePictures);

export default ProfilePictureRouter;
