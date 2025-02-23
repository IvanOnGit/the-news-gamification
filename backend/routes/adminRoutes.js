const express = require('express');
const User = require('../models/User');
const Post = require('../models/Post'); // Suponiendo que tienes publicaciones
const isAdminMiddleware = require('../middleware/isAdminMiddleware');

const router = express.Router();

router.get('/dashboard', isAdminMiddleware, async (req, res) => {
    try {
        const userCount = await User.count();
        const postCount = await Post.count();
        res.json({ userCount, postCount });
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener métricas' });
    }
});

module.exports = router;