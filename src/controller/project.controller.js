import { Project } from "../models/projects.model.js";

//----------Create a project
export const createProject = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name || !description) {
      return res.status(400).json({
        message: "The name and de description are neccesary",
      });
    }

    if (typeof name !== "string" || typeof description !== "string") {
      return res.status(400).json({
        message: "The name and the description must be a string",
      });
    }
    if (name.length > 100 || description.length > 100) {
      return res.status(400).json({
        message: "The length cannot be more than 100 characters",
      });
    }

    const project = await Project.create({
      name,
      description,
    });
    if (project) {
      return res.status(201).json({
        messsage: "Project created",
        project,
      });
    }
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
    if (project) {
      return res.status(200).json({
        message: "Project founded",
        project,
      });
    } else {
      return res.status(404).json({
        message: "There is no project with that id in the DB",
      });
    }
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
    const project = await Project.findByPk(req.params.id);
    if (project) {
      await Project.update(req.body, { where: { id: req.params.id } });
      return res.status(201).json({
        message: "Project updated",
      });
    } else {
      return res.status(400).json({
        message: "There is no project with that id in the DB",
      });
    }
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
