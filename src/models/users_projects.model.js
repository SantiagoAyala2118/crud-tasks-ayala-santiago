import { sequelize } from "../config/database.js";
import { DataTypes } from "sequelize";
import { User } from "./users.model.js";
import { Project } from "./projects.model.js";

export const User_Project = sequelize.define(
  "User_Project",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    project_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);
//Relaciones de otras tablas HACIA la tabla intermedia
User.belongsToMany(Project, {
  through: User_Project,
  foreignKey: "user_id",
  sourceKey: "id",
});
Project.belongsToMany(User, {
  through: User_Project,
  foreignKey: "project_id",
  targetKey: "id",
});

//Relaciondes DESDE la tabla intermedia a otras tablas
User_Project.belongsTo(User, {
  foreignKey: 'user_id',
  as: 'User'
});

User_Project.belongsTo(Project, {
  foreignKey: 'project_id',
  as: 'Project'
});
