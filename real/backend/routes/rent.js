import express from "express";
import Rent from "../db/rent.js";

const router = express.Router();

router.get('/rent', async (req, res) => {
  const search = req.query.search;
  const query = search
    ? {
        $or: [
          { address: { $regex: search, $options: "i" } },
          { description: { $regex: search, $options: "i" } },
        ],
      }
    : {};

  try {
    const properties = await Rent.find(query);
    res.json(properties);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get('/api/rents/:id', async (req, res) => {
  try {
    const rentProperty = await Rent.findById(req.params.id);
    if (!rentProperty) return res.status(404).json({ error: "Property not found" });
    res.json(rentProperty);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
