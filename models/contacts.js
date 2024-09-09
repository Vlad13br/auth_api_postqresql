const { DataTypes } = require("sequelize");
const sequelize = require("../server");

const Contact = sequelize.define(
  "Contact",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Set name for contact",
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true,
      },
    },
    phone: {
      type: DataTypes.STRING,
    },
    favorite: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    ownerId: {
      type: DataTypes.INTEGER,
      references: {
        model: "users", // Вказуємо ім'я таблиці
        key: "id",
      },
    },
  },
  {
    tableName: "contacts", // Задаємо ім'я таблиці явно
  }
);

module.exports = Contact;
