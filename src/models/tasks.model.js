import { sequelize } from "../config/database.js";
import { DataTypes } from "sequelize";
export const Task = sequelize.define("Task", {
  title: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING(100),
    unique: true,
    allowNull: false,
  },
  isComplete: {
    type: DataTypes.BOOLEAN(),
    defaultValue: false,
  },
});
