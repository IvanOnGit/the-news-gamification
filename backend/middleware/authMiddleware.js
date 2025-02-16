const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ message: "Acceso denegado. No hay token." });
  }

  try {
    const verified = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
    console.log("Usuario autenticado:", verified);
    req.user = verified;
    next();
  } catch (error) {
    console.error("Error al verificar el token:", error.message);
    res.status(400).json({ message: "Token inválido o expirado." });
  }
};

module.exports = authMiddleware;