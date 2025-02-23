const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../db");

const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM("user", "admin"), // Nuevo campo para los roles
    defaultValue: "user",                  // Valor por defecto
  },
  streak: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
  lastClickDate: {
    type: Sequelize.DATE,
    defaultValue: null,
  },
});

module.exports = User;