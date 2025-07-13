import express from "express";
import Agent from "../db/agent.js";

const router = express.Router();

router.get('/agents', async (req, res) => {
  try {
    const agents = await Agent.find();
    res.json(agents);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
