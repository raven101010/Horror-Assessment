import express from "express";
import HorrorTake from "../models/HorrorTake.js";

const router = express.Router();

// GET all horror takes
router.get("/", async (req, res) => {
  try {
    const takes = await HorrorTake.find().sort({ createdAt: -1 });
    res.json(takes);
  } catch (err) {
    console.error("Error fetching horror takes:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// POST a new horror take
router.post("/", async (req, res) => {
  try {
    const { text } = req.body;
    if (!text || text.trim() === "") {
      return res.status(400).json({ message: "Text is required" });
    }

    const newTake = new HorrorTake({ text });
    await newTake.save();
    res.status(201).json(newTake);
  } catch (err) {
    console.error("Error saving horror take:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
