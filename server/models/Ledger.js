import mongoose from "mongoose";

const LedgerSchema = new mongoose.Schema(
  {
    txType: { type: String, enum: ["buy", "sell", "transfer"], required: true },
    amountKg: { type: Number, required: true },
    priceUsd: { type: Number },
    from: { type: String },
    to: { type: String },
    note: { type: String },
    timestamp: { type: Date, default: () => new Date() },
  },
  { collection: "ledger", versionKey: false }
);

export default mongoose.models.Ledger || mongoose.model("Ledger", LedgerSchema);


