require("dotenv").config();
require("./db");
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Importar las rutas
const userRoutes = require("./routes/UserRoutes");
const postRoutes = require("./routes/postRoutes");
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes"); // Nueva ruta para admins

// Configurar las rutas
app.use("/users", userRoutes);
app.use("/posts", postRoutes);
app.use("/auth", authRoutes);
app.use("/admin", adminRoutes); // Ruta protegida para administradores

// Ruta principal
app.get("/", (req, res) => {
  res.send("Servidor funcionando 🚀");
});

// Iniciar el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});