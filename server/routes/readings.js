import { Router } from "express";
import Reading from "../models/Reading.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const limit = Math.min(Number(req.query.limit || 100), 1000);
    const items = await Reading.find({}).sort({ timestamp: -1 }).limit(limit).lean();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const payload = req.body || {};
    const doc = await Reading.create({
      deviceId: payload.deviceId,
      cluster: payload.cluster,
      homeId: payload.homeId,
      emissionKg: payload.emissionKg,
      creditsSigned: payload.creditsSigned || 0,
      timestamp: payload.timestamp,
    });
    res.status(201).json(doc);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;


