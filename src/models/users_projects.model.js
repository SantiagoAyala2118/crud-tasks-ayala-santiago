import { sequelize } from "../config/database.js";
import { DataTypes } from "sequelize";
import { User } from "./users.model.js";
import { Project } from "./projects.model.js";

export const UserProject = sequelize.define(
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
  through: UserProject,
  foreignKey: "user_id",
  sourceKey: "id",
});
Project.belongsToMany(User, {
  through: UserProject,
  foreignKey: "project_id",
  targetKey: "id",
});

//Relaciondes DESDE la tabla intermedia a otras tablas
UserProject.belongsTo(User, {
  foreignKey: "user_id",
  as: "User",
});

UserProject.belongsTo(Project, {
  foreignKey: "project_id",
  as: "Project",
});
