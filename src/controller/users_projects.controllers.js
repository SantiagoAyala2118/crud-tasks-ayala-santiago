import { UserProject } from "../models/users_projects.model.js";
import { User } from "../models/users.model.js";
import { Project } from "../models/projects.model.js";

//----------Create an user project
export const createUserProject = async (req, res) => {
  try {
    const { user_id, project_id } = req.body;

    if (!user_id || !project_id) {
      return res.status(400).json({
        message: "The user_id and project_id are neccessary",
      });
    }

    if (typeof user_id !== "number" || typeof project_id !== "number") {
      return res.status(400).json({
        message: "The user_id and project_id must be a number",
      });
    }

    const userIdExistig = await User.findByPk(user_id);
    if (!userIdExistig) {
      return res.status(400).json({
        message: "There are no users with that id in the database",
      });
    }

    const projectIdExisting = await Project.findByPk(project_id);
    if (!projectIdExisting) {
      return res.status(400).json({
        message: "There are no projects with that id in the database",
      });
    }

    const userProject = await UserProject.create({
      user_id,
      project_id,
    });

    if (userProject) {
      return res.status(201).json({
        message: "The register has been created",
        userProject,
      });
    }
  } catch (err) {
    console.error("An error has occurred while creating an user project", err);
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
    const user_project = await UserProject.findByPk(req.params.id);
    if (user_project) {
      return res.status(200).json({
        message: "User projects founded",
        user_project,
      });
    } else {
      return res.status(404).json({
        message: "There is no an user_project register in the DB",
      });
    }
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
    const user_project = await UserProject.findByPk(req.params.id);
    if (user_project) {
      await UserProject.update(req.body, { where: { id: req.params.id } });
      return res.status(201).json({
        message: "Register updated correctly",
      });
    } else {
      return res.status(400).json({
        message: "There is no register in the DB with that id",
      });
    }
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
    const user_project = await UserProject.findByPk(req.params.id);
    if (user_project) {
      await UserProject.destroy({ where: { id: req.params.id } });
      return res.status(410).json({
        message: "Register deleted correctly",
      });
    } else {
      return res.status(400).json({
        message: "There is no a register with that id in the DB",
      });
    }
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
