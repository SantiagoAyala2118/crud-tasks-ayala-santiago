import { sequelize } from "../config/database.js";
import { DataTypes } from "sequelize";
import { User } from "./users.model.js";

export const Task = sequelize.define(
  "Task",
  {
    title: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(100),
      unique: true,
      allowNull: false,
    },
    is_complete: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    timestamps: false,
  }
);

Task.belongsTo(User, {
  foreignKey: "user_id",
  as: "Author",
  targetKey: "id",
  onDelete: "CASCADE",
});

User.hasMany(Task, {
  foreignKey: "user_id",
  sourceKey: "id",
});
