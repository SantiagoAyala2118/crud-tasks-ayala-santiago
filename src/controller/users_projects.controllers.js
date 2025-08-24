import { UserProject } from "../models/users_projects.model.js";
import { User } from "../models/users.model.js";
import { Project } from "../models/projects.model.js";
import { matchedData } from "express-validator";

//----------Create an user project
export const createUserProject = async (req, res) => {
  try {
    const validatedData = matchedData(req);

    const userProject = await UserProject.create(validatedData);

    return res.status(201).json({
      message: "The register has been created",
      userProject,
    });
  } catch (err) {
    console.error(
      "A server error has occurred while creating an user project",
      err
    );
  }
};

//----------Get all user projects
export const getAllUsersProjects = async (req, res) => {
  try {
    const userProjects = await UserProject.findAll({
      attributes: {
        exclude: ["user_id", "project_id"],
      },
      include: [
        {
          model: User,
          as: "User",
          attributes: {
            exclude: ["password", "id"],
          },
        },
        {
          model: Project,
          as: "Project",
          attributes: {
            exclude: ["id"],
          },
        },
      ],
    });

    if (userProjects.length > 0) {
      return res.status(200).json({
        message: "Here are the registers",
        userProjects,
      });
    }
  } catch (err) {
    console.error(
      "An error has occurred while trying to get all the user projects",
      err
    );
  }
};

//---------Get one user_project
export const getOneUserProject = async (req, res) => {
  try {
    const user_project = await UserProject.findByPk(req.params.id, {
      attributes: {
        exclude: ["user_id", "project_id"],
      },
      include: [
        {
          model: User,
          as: "User",
          attributes: {
            exclude: ["password", "id"],
          },
        },
        {
          model: Project,
          as: "Project",
          attributes: {
            exclude: ["id"],
          },
        },
      ],
    });
    return res.status(200).json({
      message: "User projects founded",
      user_project,
    });
  } catch (err) {
    console.error(
      "A server error has occurres while trying to get one user project",
      err
    );
    return res.status(500).json({
      message:
        "A server error has occurres while trying to get one user project",
    });
  }
};

//--------Update user_project
export const updateUserProject = async (req, res) => {
  try {
    const validatedData = matchedData(req);

    await UserProject.update(validatedData, { where: { id: req.params.id } });
    return res.status(201).json({
      message: "Register updated correctly",
    });
  } catch (err) {
    console.error(
      "A server error has occurres while trying to update one user project",
      err
    );
    return res.status(500).json({
      message:
        "A server error has occurres while trying to update one user project",
    });
  }
};

//---------Delete user_project
export const deleteUserProject = async (req, res) => {
  try {
    await UserProject.destroy({ where: { id: req.params.id } });
    return res.status(410).json({
      message: "Register deleted correctly",
    });
  } catch (err) {
    console.error(
      "A server error has occurres while trying to delete one user project",
      err
    );
    return res.status(500).json({
      message:
        "A server error has occurres while trying to delete one user project",
    });
  }
};
