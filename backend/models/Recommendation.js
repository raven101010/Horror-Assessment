import mongoose from "mongoose";

const recommendationSchema = new mongoose.Schema({
  title: String,
  duration: String,
  genre: String,
  image: String,
  category: String,
});

const Recommendation = mongoose.model("Recommendation", recommendationSchema);

export default Recommendation;
