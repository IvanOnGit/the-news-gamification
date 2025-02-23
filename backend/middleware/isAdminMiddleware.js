const jwt = require('jsonwebtoken');

const isAdminMiddleware = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) return res.status(403).json({ error: 'Token no proporcionado' });

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(401).json({ error: 'Token inválido' });

        if (decoded.role !== 'admin') {
            return res.status(403).json({ error: 'Acceso denegado' });
        }

        req.userId = decoded.id;
        next();
    });
};

module.exports = isAdminMiddleware;