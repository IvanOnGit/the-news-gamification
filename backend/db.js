const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    logging: false, // Oculta los logs de SQL en la consola
  }
);

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Conexión a la base de datos exitosa!");
    await sequelize.sync({ alter: true }); // Sincroniza los modelos
    console.log("✅ Base de datos sincronizada!");
  } catch (error) {
    console.error("❌ No se pudo conectar a la base de datos:", error);
  }
};

module.exports = sequelize;
connectDB();