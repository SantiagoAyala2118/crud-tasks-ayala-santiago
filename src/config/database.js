import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import { Task } from "../models/tasks.model.js";
import { User } from "../models/users.model.js";
dotenv.config();

export const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
  }
);
