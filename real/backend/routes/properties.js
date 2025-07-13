import express from "express";
import Property from "../db/property.js";

const router = express.Router();

router.post("/add", async (req, res) => {
  try {
    const property = new Property(req.body);
    await property.save();
    res.status(201).json(property);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/property', async (req, res) => {
  try {
    const { address, search } = req.query;
    let conditions = [];

    if (address) conditions.push({ address: { $regex: address, $options: "i" } });
    if (search) conditions.push({ address: { $regex: search, $options: "i" } });

    const properties = conditions.length
      ? await Property.find({ $or: conditions })
      : await Property.find();

    res.json(properties);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/api/properties/:id', async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) return res.status(404).json({ error: "Property not found" });
    res.json(property);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
