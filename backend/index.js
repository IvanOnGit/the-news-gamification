require("dotenv").config();
require("./db");
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const userRoutes = require("./routes/UserRoutes");
app.use("/users", userRoutes);

const postRoutes = require("./routes/postRoutes");
app.use("/posts", postRoutes);

const authRoutes = require("./routes/authRoutes");
app.use("/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Servidor funcionando 🚀");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});