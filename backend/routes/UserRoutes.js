const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.get("/", async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los usuarios" });
  }
});

router.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const user = await User.findByPk(id);
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ error: "Usuario no encontrado" });
      }
    } catch (error) {
      res.status(500).json({ error: "Error al obtener el usuario" });
    }
  });

router.post("/", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const newUser = await User.create({ name, email, password });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: "Error al crear el usuario" });
  }
});

module.exports = router;