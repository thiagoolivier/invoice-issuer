import { Sequelize } from "sequelize-typescript";
import Customer from "../models/Customer";
import Invoice from "../models/Invoice";

const sequelize = new Sequelize(
  process.env.DB_NAME || "your_db",
  process.env.DB_USER || "your_user",
  process.env.DB_PASS || "your_password",
  {
    host: process.env.DB_HOST || "localhost",
    dialect: "postgres",
    models: [Customer, Invoice],
  }
);

export default sequelize;
