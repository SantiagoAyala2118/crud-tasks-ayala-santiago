import { ProfilePicture } from "../models/profile_picture.model.js";
import { User } from "../models/users.model.js";

//----------Create a profile picture
export const createProfilePicture = async (req, res) => {
  try {
    const { url, description, user_id } = req.body;

    if (!url || !user_id) {
      return res.status(400).json({
        message: "The url and the user_id are neccessary",
      });
    }

    if (typeof user_id !== "number") {
      return res.status(400).json({
        message: "The user_id must be a number",
      });
    }

    const userExisting = await User.findByPk(user_id);

    if (!userExisting) {
      return res.status(404).json({
        message: "There is no user with that user_id in the database",
      });
    }

    const profilePicture = await ProfilePicture.create({
      url,
      description,
      user_id,
    });
    if (profilePicture) {
      return res.status(201).json({
        message: "Profile picture created",
        profilePicture,
      });
    }
  } catch (err) {
    console.error(
      "An error has occurred while creating a profile picture",
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
    const profile_picture = await ProfilePicture.findByPk(req.params.id);
    if (profile_picture) {
      return res.status(200).json({
        message: "Profile picture founded",
        profile_picture,
      });
    } else {
      return res.status(404).json({
        message: "There are no profile picture with that id in de DB",
      });
    }
  } catch (err) {
    console.error(
      "A server error has occurred while getting a profile picture"
    );
    return res.status(500).json({
      message: "A server error has occurred while getting a profile picture",
    });
  }
};

//-----------Update profile picture
export const updateProfilePicture = async (req, res) => {
  try {
    const profile_picture = await ProfilePicture.update(req.body, {
      where: { id: req.params.id },
    });

    if (profile_picture.length > 0) {
      return res.status(201).json({
        message: "profile picture updated",
      });
    } else {
      return res.status(400).json({
        message: "There is no profile picture with that id",
      });
    }
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
    console.log("PFP Destroyed");
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
