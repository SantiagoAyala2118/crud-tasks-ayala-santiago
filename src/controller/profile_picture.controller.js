import { ProfilePicture } from "../models/profile_picture.model.js";
import { User } from "../models/users.model.js";
import { matchedData } from "express-validator";

//----------Create a profile picture
export const createProfilePicture = async (req, res) => {
  try {
    const validatedData = matchedData(req);
    const profilePicture = await ProfilePicture.create(validatedData);
    return res.status(201).json({
      message: "Profile picture created",
      profilePicture,
    });
  } catch (err) {
    console.error(
      "A server error has occurred while creating a profile picture",
      err
    );
  }
};

//----------Get all the ptofile pictures
export const getAllProfilePictures = async (req, res) => {
  const profilePicture = await ProfilePicture.findAll({
    attributes: {
      exclude: ["user_id"],
    },
    include: {
      model: User,
      as: "User",
      attributes: {
        exclude: ["password"],
      },
    },
  });
  if (profilePicture) {
    return res.status(200).json({
      message: "Here are the profile pictures",
      profilePicture,
    });
  }
};

//----------Get one profile picture
export const getOneProfilePicture = async (req, res) => {
  try {
    const profile_picture = await ProfilePicture.findByPk(req.params.id, {
      attributes: {
        exclude: ["user_id"],
      },
      include: {
        model: User,
        as: "User",
        attributes: { exclude: ["password"] },
      },
    });
    return res.status(200).json({
      message: "Here is the profile picture",
      profile_picture,
    });
  } catch (err) {
    console.error(
      "A server error has occurred while getting a profile picture",
      err
    );
    return res.status(500).json({
      message: "A server error has occurred while getting a profile picture",
    });
  }
};

//-----------Update profile picture
export const updateProfilePicture = async (req, res) => {
  try {
    const validatedData = matchedData(req);
    await ProfilePicture.update(validatedData, {
      where: { id: req.params.id },
    });

    return res.status(200).json({
      message: "Profile picture updated",
    });
  } catch (err) {
    console.error(
      "An error has occurred while updating a profile picture",
      err
    );
    return res.status(500).json({
      message: "An error has occurred while updating a profile picture",
    });
  }
};

//-----------Delete profile picture
export const deleteProfilePicture = async (req, res) => {
  try {
    await ProfilePicture.destroy({ where: { id: req.params.id } });
    return res.status(410).json({
      message: "PFP Destroyed",
    });
  } catch (err) {
    console.error(
      "A server has occurred while deleting a profile picture",
      err
    );
    return res.status(500).json({
      message: "A server error has occurred while deleting a profile picture",
    });
  }
};
