const express = require("express");
const Post = require("../models/Post"); // Import the Post class
const authenticate = require("../middleware/authenticate");
const router = express.Router();

// Fetch all posts
router.get("/posts", async (req, res) => {
  try {
    const posts = await Post.findAll(); // Używamy metody findAll z klasy Post
    res.json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error); // Logowanie błędu
    res.status(500).json({ error: "Failed to fetch posts" });
  }
});

// Add a new post
router.post("/posts", async (req, res) => {
  const { title, description } = req.body;
  console.log("Adding post:", { title, description }); // Logowanie dla debugowania
  try {
    const newPost = await Post.create({ title, description }); // Używamy metody create z klasy Post
    res.status(201).json(newPost);
  } catch (error) {
    console.error("Error adding post:", error); // Logowanie błędu
    res.status(500).json({ error: "Failed to add post" });
  }
});

// Like a post
router.post("/posts/:id/like", authenticate, async (req, res) => {
  const { id } = req.params;
  const userId = req.user.userId; // Pobierz userId z middleware

  try {
    const updatedPost = await Post.likePost(id, userId);
    res.json(updatedPost);
  } catch (error) {
    console.error("Error liking post:", error);
    res.status(500).json({ error: "Failed to like post" });
  }
});

// Add a comment to a post
router.post("/posts/:id/comments", authenticate, async (req, res) => {
  const { id } = req.params;
  const { text } = req.body;
  const userId = req.user.userId; // Pobieramy userId z middleware

  try {
    const updatedPost = await Post.addComment(id, userId, text);
    res.json(updatedPost);
  } catch (error) {
    console.error("Error adding comment:", error);
    res.status(500).json({ error: "Failed to add comment" });
  }
});

module.exports = router;
