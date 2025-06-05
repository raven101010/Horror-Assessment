import express from "express";
import Recommendation from "../models/Recommendation.js";

const router = express.Router();

// GET all recommendations
router.get("/", async (req, res) => {
  try {
    const recommendations = await Recommendation.find({});
    res.status(200).json(recommendations);
  } catch (err) {
    console.error("❌ Error fetching recommendations:", err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
