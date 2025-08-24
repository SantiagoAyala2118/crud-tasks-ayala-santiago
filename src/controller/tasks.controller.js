import { Task } from "../models/tasks.model.js";
import { Op } from "sequelize";
import { User } from "../models/users.model.js";
import { matchedData } from "express-validator";

//----------Create a task
export const createTask = async (req, res) => {
  try {
    console.log(req.body);
    const validatedData = matchedData(req);
    console.log(
      validatedData,
      "HOLAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"
    );
    await Task.create(validatedData);
    return res.status(201).json({
      message: "Task created",
      validatedData,
    });
  } catch (err) {
    console.log(err);
    console.error("An error has happened while creating a task", err);
  }
};

//----------Get all the tasks
export const getAllTasks = async (req, res) => {
  try {
    const task = await Task.findAll({
      attributes: {
        exclude: ["user_id"],
      },
      include: [
        {
          model: User,
          as: "Author",
          attributes: {
            exclude: ["password"],
          },
        },
      ],
    });
    if (task) {
      return res.status(200).json({
        message: "All tasks and users founded",
        task,
      });
    }
  } catch (err) {
    console.error("An error has happened while geting the tasks", err);
  }
};

//----------Get one task
export const getTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findByPk(id, {
      attributes: {
        exclude: ["user_id"],
      },
      include: [
        {
          model: User,
          as: "Author",
          attributes: {
            exclude: ["password"],
          },
        },
      ],
    });
    if (task) {
      return res.status(200).json({
        message: "Task founded",
        task,
      });
    } else {
      return res.status(400).json({
        message: "There are no task with that id",
      });
    }
  } catch (err) {
    console.error("An error has happened while geting one task", err);
  }
};

//----------Update a task
export const updateTask = async (req, res) => {
  try {
    const validatedData = matchedData(req);
    const task = await Task.update(validatedData);
    if (task.length > 0) {
      return res.status(201).json({
        message: "Task updated",
      });
    } else {
      return res.status(400).json({
        message: "There is no task with that id",
      });
    }
  } catch (err) {
    console.error("An error has happened while updating a task", err);
  }
};

//----------Delete a task
export const deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.destroy({
      where: {
        id,
      },
    });
    if (task) {
      return res.status(200).json({
        message: "The task has been removed",
      });
    } else {
      return res.status(400).json({
        message: "There are no task with that id",
      });
    }
  } catch (err) {
    console.error("An error has happened while deleting a task", err);
  }
};
