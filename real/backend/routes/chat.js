import express from "express";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

router.post("/", async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "mistralai/mistral-7b-instruct",
        messages: [
          { role: "system", content: "You are a helpful real estate assistant." },
          { role: "user", content: message }
        ]
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

  
const reply = openRouterResponse.data.choices[0]?.message?.content;

res.json({ response: reply });

  } catch (error) {
    console.error("❌ Chat API error:", error.response?.data || error.message);
    res.status(500).json({ error: "Chat failed. Try again." });
  }
});

export default router;
