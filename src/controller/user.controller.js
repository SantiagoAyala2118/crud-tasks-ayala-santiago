import { Task } from "../models/tasks.model.js";
import { User } from "../models/users.model.js";

/*
○ name: Debe ser una cadena no vacía y de un máximo de 100 caracteres.
○ email: Debe ser un cadena única en la base de datos no vacía y de un máximo de
100 caracteres.
○ password: Debe ser una cadena no vacía y de un máximo de 100 caracteres.
*/
export const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "The name, email and password are necessary",
      });
    }

    //---------------------------------------------------------------NAME

    if (typeof name != "string") {
      return res.status(400).json({
        message: "The name must be a string",
      });
    }

    if (name === "" || name === " ") {
      return res.status(400).json({
        message: "The name cannot be an empty space",
      });
    }

    if (name.trim().length > 100) {
      return res.status(400).json({
        message: "The name's length can't be more than 100 characters",
      });
    }
    //----------------------------------------------------------------------

    //----------------------------------------------------------------EMAIL
    const existingEmail = await User.findOne({
      where: {
        email,
      },
    });
    if (existingEmail) {
      return res.status(400).json({
        message: "There is already an user with that email, it must be unique",
      });
    }

    if (typeof email !== "string") {
      return res.status(400).json({
        message: "The email must be a string",
      });
    }

    if (email === "" || email === " ") {
      return res.status(400).json({
        message: "The email cannot be an empty space",
      });
    }

    if (email.trim().length > 100) {
      return res.status(400).json({
        message: "The email's length cannot be more than 100 characters",
      });
    }
    //---------------------------------------------------------------------------
    //------------------------------------------------------------------PASSWORD
    if (typeof password !== "string") {
      return res.status({
        message: "The password must be a string",
      });
    }

    if (password == "" || password == " ") {
      return res.status(400).json({
        message: "The password cannot be an empty space",
      });
    }

    if (password.length > 100) {
      return res.status(400).json({
        message: "The password's length cannot be more than 100 characters",
      });
    }

    //----------------------------------------------------------------------------

    const user = await User.create({
      name,
      email,
      password,
    });
    if (user) {
      return res.status(201).json({
        message: user,
      });
    }
  } catch (err) {
    console.error("An error has happened while creating an user", err);
  }
};

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
    } else {
      return res.status(400).json({
        message: "There are no users with that id",
      });
    }
  } catch (err) {
    console.error("An error has happened while geting one user", err);
  }
};

export const updateUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const { id } = req.params;

    //---------------------------------------------------------------NAME

    if (typeof name != "string") {
      return res.status(400).json({
        message: "Title must be a string",
      });
    }

    if (name === "" || name === " ") {
      return res.status(400).json({
        message: "The name cannot be an empty space",
      });
    }

    if (name.trim().length > 100) {
      return res.status(400).json({
        message: "The name's length can't be more than 100 characters",
      });
    }
    //----------------------------------------------------------------------

    //----------------------------------------------------------------EMAIL
    const existingEmail = await User.findOne({
      where: { email },
    });
    if (existingEmail) {
      return res.status(400).json({
        message: "There is already a user with that email, it must be unique",
      });
    }

    if (typeof email !== "string") {
      return res.status(400).json({
        message: "The email must be a string",
      });
    }

    if (email === "" || email === " ") {
      return res.status(400).json({
        message: "The description cannot be an empty space",
      });
    }

    if (email.trim().length > 100) {
      return res.status(400).json({
        message: "The email's length cannot be more than 100 characters",
      });
    }
    //---------------------------------------------------------------------------
    //------------------------------------------------------------------PASSWORD

    if (typeof password !== "string") {
      return res.status({
        message: "The password must be a string",
      });
    }

    if (password == "" || password == " ") {
      return res.status(400).json({
        message: "The password cannot be an empty space",
      });
    }

    if (password.length > 100) {
      return res.status(400).json({
        message: "The password's length cannot be more than 100 characters",
      });
    }

    const user = await User.update(
      { name, email, password },
      {
        where: {
          id,
        },
      }
    );
    return res.status(201).json({
      message: "The user has been updated",
    });
  } catch (err) {
    console.error("An error has happened while updating a user", err);
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.destroy({
      where: {
        id,
      },
    });
    if (user) {
      return res.status(200).json({
        message: "The user has been removed",
      });
    } else {
      return res.status(400).json({
        message: "There are no users with that id",
      });
    }
  } catch (err) {
    console.error("An error has happened while deleting an user", err);
  }
};
