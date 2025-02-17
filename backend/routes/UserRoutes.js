const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Ruta para manejar el clic en "See more"
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    res.json({ user, streak: user.streak, lastClickDate: user.lastClickDate });
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el usuario" });
  }
});

// Ruta para crear un nuevo usuario
router.post("/:id/click", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    const today = new Date();
    const lastClickDate = user.lastClickDate ? new Date(user.lastClickDate) : null;

    if (!lastClickDate) {
      user.streak = 1;
    } else {
      const diffDays = Math.floor((today - lastClickDate) / (1000 * 60 * 60 * 24));

      if (diffDays === 1) {
        user.streak += 1;
      } else if (diffDays > 1) {
        user.streak = 0;
      }
    }

    user.lastClickDate = today;
    await user.save();

    res.json({ message: "Racha actualizada", streak: user.streak });
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar la racha" });
  }
});
module.exports = router;