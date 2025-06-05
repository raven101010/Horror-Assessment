import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

import bcrypt from "bcrypt";
import path from "path";
import { fileURLToPath } from "url";

import User from "./models/User.js";
import postRoutes from "./routes/Post.js";
import recommendationRoutes from "./routes/recommendationRoutes.js";
import horrorTakesRoutes from './routes/horrorTakes.js';
import contactRouter from './routes/contactRouter.js';
import sendEmail from "./utils/sendEmail.js";

const app = express();

dotenv.config();
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "dist")));


app.use(
  cors({
    origin: [
      "http://localhost:5173",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

//MONGO DB CONNECTION
mongoose
  .connect(process.env.HORROR_HUBDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("✅ Successfully connected to MongoDB");

    // Register
    app.post("/api/register", async (req, res) => {
      const { username, email, password } = req.body;

      const existingAccount = await User.findOne({ email });
      if (existingAccount) {
        return res
          .status(400)
          .json({ error: "User already exists with this email." });
      }

      const hashedPass = await bcrypt.hash(password, 15);
      const verificationCode = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit code

      try {
        const newAccount = new User({
          username,
          email,
          password: hashedPass,
          verificationCode,
          isVerified: false,
        });
        await newAccount.save();

        await sendEmail(email, "Horror Hub Verification Code", `Your verification code is: ${verificationCode}`);

        res.status(200).json({ message: "New Account Registered Successfully" });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Account Registration failed" });
      }
    });

    // Verify Account
    app.post("/api/verify-code", async (req, res) => {
      const { email, code } = req.body;

      try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ error: "User not found." });

        if (user.verificationCode !== code)
          return res.status(400).json({ error: "Invalid verification code." });

        user.isVerified = true;
        user.verificationCode = undefined;
        await user.save();

        res.status(200).json({ message: "Account verified successfully!" });
      } catch (error) {
        console.error("Verification error:", error);
        res.status(500).json({ error: "Verification failed." });
      }
    });

    // Login
    app.post("/api/login", async (req, res) => {
      const { email, password } = req.body;

      try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ error: "User Not Found." });

        const isPasswordsMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordsMatch)
          return res.status(400).json({ error: "Incorrect Password." });

        res.status(200).json({
          message: "Login successful",
          user: {
            _id: user._id,
            username: user.username,
            email: user.email,
            profilePic: user.profilePic,
          },
        });
      } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ error: "Login Failed" });
      }
    });

    // Posting on the Forum
    app.use("/api/posts", postRoutes);
    // Movie Routes
    app.use("/api/recommendations", recommendationRoutes);
    // Horror Takes Routes
    app.use('/api/horrortakes', horrorTakesRoutes);
    // Contact Form Routes
    app.use("/api/contact", contactRouter);


    app.use("/uploads", express.static("uploads"));

    // Start 
    const port = process.env.PORT || 5000;
    app.listen(port, () => {
      console.log(
        `🚀 Server running on port ${port}`
      );
    });
  })
  .catch((err) => console.error(" ❌ Error connecting to MongoDB:", err));

