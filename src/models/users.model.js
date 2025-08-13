import { sequelize } from "../config/database.js";
import { DataTypes } from "sequelize";
import { Task } from "./tasks.model.js";

export const User = sequelize.define(
  "User",
  {
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(100),
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

User.hasMany(Task, {
  foreignKey: "user_id",
  sourceKey: "id",
});
Task.belongsTo(User, {
  foreignKey: "user_id",
  targetKey: "id",
});
