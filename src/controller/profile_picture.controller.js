import { ProfilePicture } from "../models/profile_picture.model.js";
import { User } from "../models/users.model.js";

export const createProfilePicture = async (req, res) => {
  try {
    const { url, description, user_id } = req.body;

    if (!url || !user_id) {
      return res.status(400).json({
        message: 'The url and the user_id are neccessary'
      });
    };

    if (typeof user_id !== 'number') {
      return res.status(400).json({
        message: 'The user_id must be a number'
      });
    };

    const userExisting = await User.findByPk(user_id)

    if (!userExisting) {
      return res.status(404).json({
        message: 'There is no user with that user_id in the database'
      });
    };




    const profilePicture = await ProfilePicture.create({
      url,
      description,
      user_id,
    });
    if (profilePicture) {
      return res.status(201).json({
        message:'Profile picture created',
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

export const getAllProfilePictures = async (req, res) => {
  const profilePicture = await ProfilePicture.findAll({
    attributes: {
      exclude: ["user_id"],
    },
    include: {
      model: User,
      as:'User',
      attributes: {
        exclude: ["password"],
      },
    },
  });
  if (profilePicture) {
    return res.status(200).json({
      message:'Here are the profile pictures',
      profilePicture,
    });
  }
};
