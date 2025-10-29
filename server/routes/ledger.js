import { Router } from "express";
import Ledger from "../models/Ledger.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const limit = Math.min(Number(req.query.limit || 100), 1000);
    const items = await Ledger.find({}).sort({ timestamp: -1 }).limit(limit).lean();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const payload = req.body || {};
    const doc = await Ledger.create({
      txType: payload.txType,
      amountKg: payload.amountKg,
      priceUsd: payload.priceUsd,
      from: payload.from,
      to: payload.to,
      note: payload.note,
      timestamp: payload.timestamp,
    });
    res.status(201).json(doc);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;


