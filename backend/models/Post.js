import mongoose from "mongoose";

const responseSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  username: String,
  response: String,
  createdAt: { type: Date, default: Date.now },
});

const allowedCategories = [
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

const PostSchema = new mongoose.Schema({
  title: String,
  content: String,
  category: {
    type: String,
    enum: allowedCategories,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  responses: [responseSchema],

  // Track who liked the post
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});


const Post = mongoose.model("Post", PostSchema, "Posts");
export default Post;