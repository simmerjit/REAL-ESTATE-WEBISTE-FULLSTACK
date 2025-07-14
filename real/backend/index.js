import dotenv from "dotenv";
dotenv.config();

import axios from "axios";
import express from "express";
import cors from "cors";
import "./db/config.js";
import User from "./db/user.js";
import bcrypt from "bcryptjs"
import jsonwebtoken from "jsonwebtoken"
import Property from "./db/property.js"; 
import Rent from "./db/rent.js"; 
import { v2 as cloudinary } from 'cloudinary';
import Agents from "./db/agent.js"; 
import connectDB from "./db/config.js";
import nodemailer from "nodemailer"; // ✅ Add nodemailer import
// import chatRoute from "./routes/chat.js";


const app = express();
const port = process.env.PORT || 4000;
// ✅ MIDDLEWARE FIRST
const allowedOrigins = [
  "https://real-estate-webiste-fullstack.vercel.app",
  "https://real-estate-webiste-fullstack-oa69ktcbp-simmerjits-projects.vercel.app",
  "https://real-estate-webiste-fullstack-f30knes83-simmerjits-projects.vercel.app", // ← ADD THIS
  "http://localhost:5173"
];


app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log("❌ CORS blocked origin:", origin);
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));
app.use(express.json());

connectDB(); 







app.post("/api/contact", async (req, res) => {
  console.log("📧 Contact route hit!");
  console.log("📦 Request body:", req.body);
  
  try {
    const { name, email } = req.body;

    // ✅ Validate required fields
    if (!name || !email) {
      console.log("❌ Missing required fields");
      return res.status(400).json({ 
        success: false, 
        error: "Name and email are required" 
      });
    }


    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.log("❌ Invalid email format:", email);
      return res.status(400).json({ 
        success: false, 
        error: "Please provide a valid email address" 
      });
    }

    console.log("🔍 Checking environment variables...");
    console.log("MAIL_USER:", process.env.MAIL_USER ? "✅ Set" : "❌ Missing");
    console.log("MAIL_PASS:", process.env.MAIL_PASS ? "✅ Set" : "❌ Missing");
    
    if (!process.env.MAIL_USER || !process.env.MAIL_PASS) {
      console.error("❌ Missing email credentials in environment variables");
      return res.status(500).json({ 
        success: false, 
        error: "Email service not configured" 
      });
    }

    console.log("📧 Creating transporter...");
   const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});


    console.log("🔗 Testing SMTP connection...");
    try {
      await transporter.verify();
      console.log("✅ SMTP connection successful");
    } catch (verifyError) {
      console.error("❌ SMTP connection failed:", verifyError.message);
      return res.status(500).json({ 
        success: false, 
        error: "Email service connection failed. Please check your credentials." 
      });
    }

    const mailOptions = {
      from: process.env.MAIL_USER,
      to: email,
      subject: "Thanks for contacting Zillow Support!",
      html: `
        <div style="font-family: sans-serif;">
          <h2 style="color: #006aff;">Hi ${name},</h2>
          <p>Thanks for reaching out! One of our agents will get back to you shortly.</p>
          <br/>
          <p>Best,<br/>Simmerjit's Support Team</p>
        </div>
      `,
    };

    console.log("📮 Sending email...");
    await transporter.sendMail(mailOptions);
    console.log("✅ Email sent successfully!");
    
    res.status(200).json({ 
      success: true, 
      message: "Confirmation email sent successfully!" 
    });
    
  } catch (err) {
    console.error("❌ Email Error:", err);
    console.error("Error details:", {
      message: err.message,
      code: err.code,
      command: err.command,
      response: err.response,
      responseCode: err.responseCode
    });
    
    // ✅ Send proper JSON error response
    res.status(500).json({ 
      success: false, 
      error: "Failed to send confirmation email. Please try again later.",
      details: err.message // Include error details for debugging
    });
  }
});


// Middleware for JWT validation
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  jsonwebtoken.verify(token, process.env.JWT_SECRET, (err, decoded) =>{
    if (err) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    req.user = decoded;
    next();
  });
};

app.post("/api/register" , async (req,res)=>{   
  try {
    const existingUser = await User.findOne({email: req.body.email});
    if (existingUser) {
        return res.status(400).json({error:'email already exists'})
    } 
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      email: req.body.email,
      password: hashedPassword
    });
    let result = await user.save();
    result = result.toObject();
    delete result.password
    res.send(result)
  } catch (error) {
     res.status(500).json({ error: 'Internal server error' });
  }
})

app.post("/login", async (req, res)=>{
  try{
    const user = await User.findOne({email: req.body.email});
    if (!user) {
         return res.status(401).json({ error: 'Invalid credentials' });
    }
    const passwordMatch = await bcrypt.compare(req.body.password , user.password);
    if(!passwordMatch){
         return res.status(401).json({ error: 'Invalid credentials pass' });
    }
    const token = jsonwebtoken.sign({ email: user.email }, 'secret');
    res.status(200).json({ token });
  }
  catch(error){
     res.status(500).json({ error: 'Internal server error' });
  }
})

app.post("/sell/upload", async (req, res) => {
    try {
        const property = new Property(req.body);
        await property.save();
        res.status(201).json(property);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.get('/property', async (req, res) => {
  try {
    const address = req.query.address?.trim();
    const search = req.query.search?.trim();
    let properties;

    if (address || search) {
      let searchConditions = [];

      if (address) {
        searchConditions.push({
          address: { $regex: address, $options: 'i' }
        });
      }

      if (search) {
        searchConditions.push({
          $or: [
            { title: { $regex: search, $options: 'i' } },
            { description: { $regex: search, $options: 'i' } },
            { address: { $regex: search, $options: 'i' } }
          ]
        });
      }

      properties = await Property.find({ $or: searchConditions });
    } else {
      properties = await Property.find({});
    }

    res.json(properties);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.get('/rent', async (req, res) => {
  const search = req.query.search?.trim(); // Trim whitespace

  const query = search
    ? {
        $or: [
          { title: { $regex: search, $options: 'i' } },
          { address: { $regex: search, $options: 'i' } },
        ],
      }
    : {};

  try {
    console.log("🔍 Querying:", query);
    const properties = await Rent.find(query);
    res.json(properties);
  } catch (err) {
    console.error('Error fetching properties:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.get('/api/geocode', async (req, res) => {
  const { q } = req.query;
  if (!q) {
    return res.status(400).json({ error: 'Query parameter "q" is required' });
  }
  try {
    const response = await axios.get('https://nominatim.openstreetmap.org/search', {
      params: {
        format: 'json',
        q,
        viewbox: '-118.67,34.34,-118.16,33.70',
        bounded: 1,
      },
      headers: {
        'User-Agent': 'my-real-estate-app/1.0'
      }
    });
    res.json(response.data);
  } catch (error) {
    console.error('Geocoding error:', error.message);
    res.status(500).json({ error: 'Geocoding failed' });
  }
});

app.get('/api/properties', async (req, res) => {
  const properties = await Property.find();
  res.json(properties);
});

app.get('/api/properties/:id', async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) return res.status(404).json({ error: 'Property not found' });
    res.json(property);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/api/rents/:id', async (req, res) => {
  try {
    const rentProperty = await Rent.findById(req.params.id);
    if (!rentProperty) return res.status(404).json({ error: 'Property not found' });
    res.json(rentProperty);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/agents', async (req,res) => {
  try {
   const agents = await Agents.find();
    res.json(agents); 
  } catch (error) {
     res.status(500).json({ error: 'Server error' });
  }
})

app.get('/agents/search', async (req, res) => {
  try {
    const search = req.query.search;
    if (!search) {
      return res.status(400).json({ error: 'Query parameter "search" is required' });
    }
    const query = {
      $or: [
        { name: { $regex: search, $options: 'i' } }
      ]
    };
    const agents = await Agents.find(query);
    res.json(agents);
  }
  catch (error) {
    console.error("Search Error:", error);
    res.status(500).json({ error: 'Server error' });
  }
});


app.post('/rent/upload', async (req, res) => {
  try {
    const rent = new Rent(req.body);
    await rent.save();
    res.status(201).json(rent); // ✅ correct: rent, not rents
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.post("/api/chat", async (req, res) => {
  const { message } = req.body;
  console.log("📩 User message:", message);

  if (!message || message.trim().length === 0) {
    return res.status(400).json({ error: "Message is required" });
  }

  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "mistralai/mistral-7b-instruct",
        max_tokens: 60,
        messages: [
          {
            role: "system",
            content:
              "You are a helpful real estate assistant. Reply briefly and clearly in 1–2 lines (under 40 words).",
          },
          {
            role: "user",
            content: message,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer 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`,
          "Content-Type": "application/json",
        },
      }
    );

    const reply = response.data.choices?.[0]?.message?.content;

    if (!reply) {
      return res.status(500).json({ error: "No reply from assistant" });
    }

    res.json({ response: reply.trim() });
  } catch (err) {
    console.error("❌ Chat error:", {
      message: err.message,
      status: err.response?.status,
      data: err.response?.data,
    });
    res.status(500).json({ error: "Chat failed. Try again." });
  }
});



app.listen(port, () => {
  
});
