import { ProfilePicture } from "../models/profile_picture.model.js";
import { User } from "../models/users.model.js";

export const createProfilePicture = async (req, res) => {
  try {
    const { url, description, user_id } = req.body;
    const profilePicture = await ProfilePicture.create({
      url,
      description,
      user_id,
    });
    if (profilePicture) {
      return res.status(201).json({
        message: profilePicture,
      });
    }
  } catch (err) {
    console.error(
      "An error has occurred while creating a profile picture",
      err
    );
  }
};

export const getAllProfilePictures = async (req, res) => {
  const profilePicture = await ProfilePicture.findAll({
    attributes: {
      exclude: ["user_id"],
    },
    include: {
      model: User,
      attributes: {
        exclude: ["password"],
      },
    },
  });
  if (profilePicture) {
    return res.status(200).json({
      message: profilePicture,
    });
  }
};
