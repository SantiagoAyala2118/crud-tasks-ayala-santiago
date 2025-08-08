import { Task } from "../models/tasks.model.js";

/*Validación de Datos:
● Validar los datos recibidos antes de añadir o editar una nueva tarea:
○ title: Debe ser un cadena única en la base de datos no vacía y de un máximo de
100 caracteres.
○ description: Debe ser una cadena no vacía y de un máximo de 100 caracteres.
○ isComplete: Debe ser un valor booleano.
*/
export const createTask = async (req, res) => {
  try {
    const { title, description, isComplete } = req.body;

    if (!title || !description) {
      return res.status(400).json({
        message: "The title and description are necessary",
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

    if (isComplete) {
      if (typeof isComplete != "boolean") {
        return res.status(400).json({
          message: "The isComplete property must be a Boolean",
        });
      }
    }

    const task = await Task.create({
      title,
      description,
      isComplete,
    });
    return res.status(201).json({
      message: task,
    });
  } catch (err) {
    console.log(err);
    console.error("An error has happened while creating a task", err);
  }
};

export const getAllTasks = async (req, res) => {
  try {
    const task = await Task.findAll();
    if (task) {
      return res.status(200).json({
        message: task,
      });
    }
  } catch (err) {
    console.error("An error has happened while geting the tasks", err);
  }
};

export const getTask = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findByPk(id);
    if (task) {
      return res.status(200).json({
        message: task,
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
    let { isComplete } = req.body;

    if (isComplete) {
      if (typeof isComplete != "boolean") {
        return res.status(400).json({
          message: "The isComplete property must be a Boolean",
        });
      }
    }

    const task = await Task.update(
      { title, description, isComplete },
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
