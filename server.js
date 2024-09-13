const { Sequelize } = require("sequelize");
require("dotenv");

module.exports = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "postgres",
    logging: false,
  }
);
//docker run --name test_db -e POSTGRES_USER=vldbarsuk -e POSTGRES_PASSWORD=root -e POSTGRES_DB=test_db -p 5432:5432 -d postgres
