import express from 'express';
import nodemailer from 'nodemailer';
import Message from '../models/Message.js';

const router = express.Router();


router.post('/', async (req, res) => {
  const { name, email, message } = req.body;

  try {
    // Save to MongoDB
    await Message.create({ name, email, message });

    // Send email using Nodemailer
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: email,
      to: process.env.EMAIL_USER,
      subject: `New Contact Message from ${name}`,
      text: message,
    });

    res.status(200).json({ message: 'Success' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

export default router;
