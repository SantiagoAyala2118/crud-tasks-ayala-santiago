import { Project } from "../models/projects.model.js";
import { matchedData } from "express-validator";

//----------Create a project
export const createProject = async (req, res) => {
  try {
    const validatedData = matchedData(req);
    const project = await Project.create(validatedData);
    return res.status(201).json(project);
  } catch (err) {
    console.error("An error has occurred while creating a project", err);
  }
};

//----------Get all the projects
export const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.findAll();

    if (projects.length > 0) {
      return res.status(200).json({
        message: "Here are the projects",
        projects,
      });
    } else {
      return res.status(404).json({
        message: "There are no projects on the database yet",
      });
    }
  } catch (err) {
    console.error("An error has occurred while getting all the projects", err);
  }
};

//----------Get one project
export const getOneProject = async (req, res) => {
  try {
    const project = await Project.findByPk(req.params.id);
    return res.status(200).json(project);
  } catch (err) {
    console.error(
      "A server error has occurred while trying to get one project",
      err
    );
    return res.status(500).json({
      message: "A server error has occurred while trying to get one project",
    });
  }
};

//-----------Update project
export const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const validatedData = matchedData(req);

    await Project.update(validatedData, { where: { id } });
    return res.status(201).json({
      message: "Project updated",
    });
  } catch (err) {
    console.error(
      "A server herror has occurred while trying to update a project",
      err
    );
    return res.status(500).json({
      message: "A server herror has occurred while trying to update a project",
    });
  }
};

//---------Delete project
export const deleteProject = async (req, res) => {
  const { id } = req.params;
  try {
    await Project.destroy({ where: { id } });
    return res.status(410).json({
      message: "Porject deleted",
    });
  } catch (err) {
    console.error(
      "A server herror has occurred while trying to delete a project",
      err
    );
    return res.status(500).json({
      message: "A server herror has occurred while delete to update a project",
    });
  }
};
