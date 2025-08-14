import { sequelize } from "../config/database.js";
import { DataTypes } from "sequelize";
import { User } from "./users.model.js";

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

User.hasOne(ProfilePicture, {
  foreignKey: "user_id",
  sourceKey: "id",
});
ProfilePicture.belongsTo(User, {
  foreignKey: "user_id",
  as: "User",
  targetKey: "id",
});
