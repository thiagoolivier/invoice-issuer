import { Sequelize } from "sequelize-typescript";
import Client from "../models/Client";
import Invoice from "../models/Invoice";

const sequelize = new Sequelize(
  process.env.DB_NAME || "your_db",
  process.env.DB_USER || "your_user",
  process.env.DB_PASS || "your_password",
  {
    host: process.env.DB_HOST || "localhost",
    dialect: "postgres",
    models: [Client, Invoice],
  }
);

export default sequelize;
