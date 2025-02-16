const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const register = async (req, res) => {
    try {
      const { name, email, password } = req.body;
  
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ message: "El email ya está registrado" });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const newUser = await User.create({
        name,
        email,
        password: hashedPassword,
      });
  
      res.status(201).json({ message: "Usuario registrado exitosamente" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Hubo un error al registrar el usuario." });
    }
  };

const login = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const user = await User.findOne({ where: { email } });
  
      if (!user) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }
  
      const passwordMatch = await bcrypt.compare(password, user.password);
  
      if (!passwordMatch) {
        return res.status(401).json({ message: "Credenciales incorrectas" });
      }
  
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
  
      return res.json({ message: "Login exitoso", token });
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  };
module.exports = { register, login };