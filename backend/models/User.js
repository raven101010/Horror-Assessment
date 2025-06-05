import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: String,
  email: { type: String, unique: true },
  password: String,
  profilePic: {
    type: String,
    default: "/images/profilePic.png",
  },
  verificationCode: String,
  isVerified: { type: Boolean, default: false },
});

const User = mongoose.model("User", userSchema, "users");

export default User;

