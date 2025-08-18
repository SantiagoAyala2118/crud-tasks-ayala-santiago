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
