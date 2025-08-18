import { Task } from "../models/tasks.model.js";
import { Op } from "sequelize";
import { User } from "../models/users.model.js";

//----------Create a task
export const createTask = async (req, res) => {
  try {
    const { title, description, is_complete, user_id } = req.body;

    if (!title || !description || !user_id) {
      return res.status(400).json({
        message: "The title, description and user_id are necessary",
      });
    }

    //---------------------------------------------------------------TITLE
    const existingTitle = await Task.findOne({
      where: { title },
    });
    if (existingTitle) {
      return res.status(400).json({
        message: "There is already a task with that name, it must be unique",
      });
    }

    if (typeof title != "string") {
      return res.status(400).json({
        message: "Title must be a string",
      });
    }

    if (title === "" || title === " ") {
      return res.status(400).json({
        message: "The title cannot be an empty space",
      });
    }

    if (title.trim().length > 100) {
      return res.status(400).json({
        message: "The title's length can't be more than 100 characters",
      });
    }
    //----------------------------------------------------------------------

    //----------------------------------------------------------------DESCRIPTION
    if (typeof description !== "string") {
      return res.status(400).json({
        message: "Description must be a string",
      });
    }

    if (description === "" || description === " ") {
      return res.status(400).json({
        message: "The description cannot be an empty space",
      });
    }

    if (description.trim().length > 100) {
      return res.status(400).json({
        message: "The description's length cannot be more than 100 characters",
      });
    }
    //---------------------------------------------------------------------------
    //------------------------------------------------------------------ISCOMPLETE

    if (is_complete) {
      if (typeof is_complete != "boolean") {
        return res.status(400).json({
          message: "The is_complete property must be a Boolean",
        });
      }
    }

    //-----------------------------------------------------------------USER_ID

    if (typeof user_id !== "number" || user_id < 0) {
      return res.status(400).json({
        message: "The user_id must be a positive number",
      });
    }

    const idUserExisting = await User.findByPk(user_id);
    if (idUserExisting) {
      const task = await Task.create({
        title,
        description,
        is_complete,
        user_id,
      });
      return res.status(201).json({
        message: "Task created",
        task,
      });
    } else {
      return res.status(404).json({
        message: "That user_id does not exist in the database",
      });
    }
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
    const { title, description } = req.body;
    const { id } = req.params;

    //---------------------------------------------------------------TITLE
    const existingTitle = await Task.findOne({
      where: {
        title,
      },
    });
    if (existingTitle) {
      return res.status(400).json({
        message: "There is already a task with that name, it must be unique",
      });
    }

    if (typeof title != "string") {
      return res.status(400).json({
        message: "Title must be a string",
      });
    }

    if (title === "" || title === " ") {
      return res.status(400).json({
        message: "The title cannot be an empty space",
      });
    }

    if (title.trim().length > 100) {
      return res.status(400).json({
        message: "The title's length can't be more than 100 characters",
      });
    }
    //----------------------------------------------------------------------

    //----------------------------------------------------------------DESCRIPTION
    if (typeof description !== "string") {
      return res.status(400).json({
        message: "Description must be a string",
      });
    }

    if (description === "" || description === " ") {
      return res.status(400).json({
        message: "The description cannot be an empty space",
      });
    }

    if (description.trim().length > 100) {
      return res.status(400).json({
        message: "The description's length cannot be more than 100 characters",
      });
    }
    //---------------------------------------------------------------------------
    //------------------------------------------------------------------ISCOMPLETE
    let { is_complete } = req.body;

    if (is_complete) {
      if (typeof is_complete != "boolean") {
        return res.status(400).json({
          message: "The is_complete property must be a Boolean",
        });
      }
    }

    const task = await Task.update(
      { title, description, is_complete },
      {
        where: {
          id,
        },
      }
    );
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
