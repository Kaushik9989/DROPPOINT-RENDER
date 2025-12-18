const mongoose = require("mongoose");

const ExtensionRequestSchema = new mongoose.Schema({
  parcelId: { type: mongoose.Schema.Types.ObjectId, ref: "Parcel2", required: true },
  hours: { type: Number, required: true },
  ratePerHour: { type: Number, required: true }, // in INR
  amount: { type: Number, required: true },      // in INR
  whatsAppTo: { type: String, required: true },  // E.164 with country code (no "whatsapp:" prefix here)
  paymentLinkId: String,
  paymentLinkShortUrl: String,
  status: { type: String, enum: ["created","issued","paid","cancelled","expired"], default: "created" },
  createdAt: { type: Date, default: Date.now },
  paidAt: Date
});

module.exports = mongoose.model("Extension", ExtensionRequestSchema);