import express from "express";

import Post from "../models/Post.js";
import User from "../models/User.js";

const router = express.Router();


// GET all posts
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .populate("author", "username profilePic");

    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch posts" });
  }
});


// POST a new post
router.post("/", async (req, res) => {
  const { title, content, userId, category } = req.body;

  if (!userId) {
    return res.status(400).json({ error: "User ID required" });
  }
    const validCategories = [
    "Paranormal",
    "Cursed",
    "Unreliable Reality",
    "Urban Legends",
    "Occult",
    "Body Horror",
    "Monsters",
    "Revenge from the Grave",
    "Psychological",
    "Possession",
    "Forbidden Knowledge",
    "Slasher",
  ];

  if (!validCategories.includes(category)) {
    return res.status(400).json({ error: "Invalid category" });
  }

  try {
    const newPost = new Post({
      title,
      content,
      author: userId,
      category,
    });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (err) {
    res.status(400).json({ error: "Failed to create post" });
  }
});


// ADD a response
router.post("/:postId/respond", async (req, res) => {
  try {
    const { postId } = req.params;
    const { userId, response } = req.body;

    if (!userId || !response) {
      return res
        .status(400)
        .json({ message: "Missing userId or response text" });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: "Post not found" });

    const newResponse = {
      userId,
      profilePic: user.profilePic,
      username: user.username,
      response: response,
    };

    post.responses.push(newResponse);
    await post.save();

    res
      .status(200)
      .json({ message: "Response added successfully", response: newResponse });
  } catch (err) {
    console.error("Add response error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// PUT route to toggle like/unlike for a post
router.put("/:postId/like", async (req, res) => {
  try {
    const { postId } = req.params;
    const { userId } = req.body; 

    if (!userId) return res.status(400).json({ message: "User ID required" });

    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: "Post not found" });

    // Check if user already liked the post
    const likedIndex = post.likes.indexOf(userId);

    if (likedIndex === -1) {
      // Not liked yet, so add userId to likes
      post.likes.push(userId);
    } else {
      // Already liked, so remove userId (unlike)
      post.likes.splice(likedIndex, 1);
    }

    await post.save();

    res.json({ likesCount: post.likes.length, likedByUser: likedIndex === -1 });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;