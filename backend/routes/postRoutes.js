const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

router.post('/', async (req, res) => {
  const { title, content, userId } = req.body;
  try {
    const newPost = await Post.create({ title, content, userId });
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ error: "Error al crear el artículo" });
  }
});

router.get('/', async (req, res) => {
  try {
    const posts = await Post.findAll();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los artículos" });
  }
});

module.exports = router;