import mongoose from "mongoose";

const ReadingSchema = new mongoose.Schema(
  {
    deviceId: { type: String, required: true, index: true },
    cluster: { type: String, required: true },
    homeId: { type: String, required: true },
    emissionKg: { type: Number, required: true },
    creditsSigned: { type: Number, default: 0 },
    timestamp: { type: Date, default: () => new Date() },
  },
  { collection: "readings", versionKey: false }
);

export default mongoose.models.Reading || mongoose.model("Reading", ReadingSchema);


