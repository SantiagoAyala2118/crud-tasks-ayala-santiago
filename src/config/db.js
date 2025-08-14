import { sequelize } from "./database.js";
import { User } from "../models/users.model.js";
import { Task } from "../models/tasks.model.js";

export const initDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Se logró autenticar con la base de datos");
    await sequelize.sync({
      force: false,
    });
  } catch (err) {
    console.error(
      "Se produjo un error al intentar conectar con la base de datos",
      err
    );
  }
  await Task.sync(), User.sync();
};
