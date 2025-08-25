import { Task } from "../models/tasks.model.js";
import { User } from "../models/users.model.js";
import { matchedData } from "express-validator";

//-----------Create an user
export const createUser = async (req, res) => {
  try {
    const validatedData = matchedData(req);
    const user = await User.create(validatedData);
    return res.status(201).json({
      message: user,
    });
  } catch (err) {
    console.error("An error has happened while creating an user", err);
  }
};

//----------Get all the users
export const getAllUsers = async (req, res) => {
  try {
    const user = await User.findAll({
      attributes: {
        exclude: ["password"],
      },
      include: {
        model: Task,
        attributes: {
          exclude: ["user_id"],
        },
      },
    });
    if (user) {
      return res.status(200).json({
        message: user,
      });
    }
  } catch (err) {
    console.error("An error has happened while geting the users", err);
  }
};

//----------Get one user
export const getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id, {
      attributes: {
        esxclude: ["password"],
      },
      include: {
        model: Task,
        attributes: {
          exclude: ["user_id"],
        },
      },
    });
    if (user) {
      return res.status(200).json({
        message: user,
      });
    }
  } catch (err) {
    console.error("An error has happened while geting one user", err);
  }
};

//----------Update an user
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;

    const validatedData = matchedData(req);

    const user = await User.update(validatedData, {
      where: {
        id,
      },
    });
    return res.status(201).json({
      message: "The user has been updated",
    });
  } catch (err) {
    console.error("An error has happened while updating a user", err);
  }
};

//----------Delete an user
export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    await user.destroy();
    if (user) {
      return res.status(200).json({
        message: "The user has been removed",
      });
    }
  } catch (err) {
    console.error("An error has happened while deleting an user", err);
  }
};
