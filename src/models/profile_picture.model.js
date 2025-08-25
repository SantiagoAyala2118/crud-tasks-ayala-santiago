import { sequelize } from "../config/database.js";
import { DataTypes, where } from "sequelize";
import { User } from "./users.model.js";
import { UserProject } from "./users_projects.model.js";
import { Task } from "./tasks.model.js";

export const ProfilePicture = sequelize.define(
  "ProfilePicture",
  {
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
  },
  {
    timestamps: false,
  }
);

ProfilePicture.belongsTo(User, {
  foreignKey: "user_id",
  as: "User",
  targetKey: "id",
});
User.hasOne(ProfilePicture, {
  foreignKey: "user_id",
  sourceKey: "id",
});
//--------------Hook para que los registros se destruyan en cascada
User.addHook("afterDestroy", async (user) => {
  const profile_picture = await ProfilePicture.findOne({
    where: { user_id: user.dataValues.id },
  });
  await profile_picture.destroy();

  await UserProject.destroy({ where: { user_id: user.dataValues.id } });
  await Task.destroy({ where: { user_id: user.dataValues.id } });
});
