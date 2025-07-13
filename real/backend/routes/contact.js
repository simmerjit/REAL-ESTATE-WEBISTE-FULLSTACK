// backend/routes/contact.js
import express from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { name, email } = req.body;

    // ✅ Validate required fields
    if (!name || !email) {
      return res.status(400).json({ 
        success: false, 
        error: "Name and email are required" 
      });
    }

    // ✅ Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        success: false, 
        error: "Please provide a valid email address" 
      });
    }

    // ✅ Check if environment variables are set
    if (!process.env.MAIL_USER || !process.env.MAIL_PASS) {
      console.error("❌ Missing email credentials in environment variables");
      return res.status(500).json({ 
        success: false, 
        error: "Email service not configured" 
      });
    }

    const transporter = nodemailer.createTransporter({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.MAIL_USER,
      to: email,
      subject: "Thanks for contacting Zillow Support!",
      html: `
        <div style="font-family: sans-serif;">
          <h2 style="color: #006aff;">Hi ${name},</h2>
          <p>Thanks for reaching out! One of our agents will get back to you shortly.</p>
          <br/>
          <p>Best,<br/>Zillow Support Team</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    
    res.status(200).json({ 
      success: true, 
      message: "Confirmation email sent successfully!" 
    });
    
  } catch (err) {
    console.error("❌ Email Error:", err);
    
    // ✅ Send proper JSON error response
    res.status(500).json({ 
      success: false, 
      error: "Failed to send confirmation email. Please try again later." 
    });
  }
});

export default router;