import { sequelize } from "../config/database.js";
import { DataTypes } from "sequelize";

export const Project = sequelize.define(
  "Project",
  {
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    descrption: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);
