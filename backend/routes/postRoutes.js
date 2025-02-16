const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', async (req, res) => {
    const { title, content, userId } = req.body;
    try {
      const newPost = await Post.create({ title, content, userId });
      res.status(201).json(newPost);
    } catch (error) {
      console.error(error);  // 🔴 Esto imprimirá el error en la terminal
      res.status(500).json({ error: error.message }); // Enviar el mensaje real del error
    }
  });

router.get("/", async (req, res) => {
  try {
    const posts = await Post.findAll();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los artículos" });
  }
});

router.delete('/:id', authMiddleware, async (req, res) => {
    const { id } = req.params;
    const userId = req.user.userId;

    try {
        const post = await Post.findByPk(id);
        
        if (!post) {
            return res.status(404).json({ error: "Post no encontrado" });
        }
        if (post.userId !== userId) {
            return res.status(403).json({ error: "No tienes permiso para eliminar este post" });
        }

        await post.destroy();
        res.status(200).json({ message: "Post eliminado con éxito" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al eliminar el post" });
    }
});

router.put('/:id', authMiddleware, async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;
  
    try {
      const post = await Post.findByPk(id);
  
      if (!post) {
        return res.status(404).json({ error: "Post no encontrado" });
      }

      if (post.userId !== req.user.userId) {
        return res.status(403).json({ error: "No tienes permiso para editar este post" });
      }
  
      post.title = title || post.title;
      post.content = content || post.content;
      await post.save();
  
      res.status(200).json(post);
    } catch (error) {
      res.status(500).json({ error: "Error al actualizar el post" });
    }
  });

module.exports = router;