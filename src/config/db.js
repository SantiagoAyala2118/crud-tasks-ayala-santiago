import { sequelize } from "./database.js";
import { Task, User } from "../config/database.js";
export const initDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Se logró autenticar con la base de datos");
    await sequelize.sync();
  } catch (err) {
    console.error(
      "Se produjo un error al intentar conectar con la base de datos",
      err
    );
  }
  await Task.sync(), User.sync();
};
