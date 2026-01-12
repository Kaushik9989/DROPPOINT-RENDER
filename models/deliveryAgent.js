const mongoose = require("mongoose");

const DeliveryAgentSchema = new mongoose.Schema({
  partner: {
    type: String,          // "amazon", "flipkart", etc
    required: true,
    index: true,
  },

  name: {
    type: String,          // optional: agent name
  },

  phone: {
    type: String,
    required: true,
    index: true,
  },

  accessCode: {
    type: String,          // e.g. "A7K92Q" or "483921"
    required: true,
    unique: true,
    index: true,
  },

  isActive: {
    type: Boolean,
    default: true,
    index: true,
  },

  // Optional but powerful:
  lastUsedAt: {
    type: Date,
  },

  totalDrops: {
    type: Number,
    default: 0,
  },

}, {
  timestamps: true, // adds createdAt, updatedAt
});
