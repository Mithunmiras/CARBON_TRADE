import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import readingsRouter from "./routes/readings.js";
import ledgerRouter from "./routes/ledger.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const {
  MONGODB_URI,
  DB_USERNAME = "",
  DB_PASSWORD = "",
  DB_HOST = "localhost:27017",
  DB_NAME = "hackathon",
} = process.env;

const safeEncode = (val) => encodeURIComponent(val || "");

// Build a sensible default URI when MONGODB_URI isn't provided.
// If the host looks like an Atlas SRV domain, use mongodb+srv.
let derivedUri = `mongodb://${safeEncode(DB_USERNAME)}:${safeEncode(DB_PASSWORD)}@${DB_HOST}/${DB_NAME}?authSource=admin`;
if (/\.mongodb\.net$/i.test(DB_HOST)) {
  derivedUri = `mongodb+srv://${safeEncode(DB_USERNAME)}:${safeEncode(DB_PASSWORD)}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`;
}

const uri = MONGODB_URI && MONGODB_URI.trim().length > 0 ? MONGODB_URI : derivedUri;

async function start() {
  try {
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 10000,
    });
    // eslint-disable-next-line no-console
    console.log("MongoDB connected");
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  }

  app.get("/api/health", (_req, res) => {
    res.json({ ok: true });
  });

  app.use("/api/readings", readingsRouter);
  app.use("/api/ledger", ledgerRouter);

  const PORT = Number(process.env.PORT || 5000);
  app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Server listening on http://localhost:${PORT}`);
  });
}

start();


