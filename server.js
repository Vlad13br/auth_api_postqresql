const { Sequelize } = require("sequelize");

module.exports = new Sequelize(
  process.env.DB_NAME || "test_db",
  process.env.DB_USER || "vldbarsuk",
  process.env.DB_PASSWORD || "root",
  {
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || 5432,
    dialect: "postgres",
    logging: false,
  }
);
