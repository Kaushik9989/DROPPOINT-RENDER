const mongoose = require("mongoose");

const DeliveryRequestSchema = new mongoose.Schema(
  {
    parcel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Parcel2",
      required: true,
      index: true,
    },

    customerPhone: {
      type: String,
      required: true,
      index: true,
    },

    customerName: {
      type: String,

    },

    // 🏢 Desk / office address
    deskAddress: {
      building: String,        // "T-Hub"
      floor: String,           // "3rd Floor"
      deskNumber: String,      // "Desk A-21"
      company: String,         // "Microsoft"
      directions: String,   
      address: String,   // "Near pantry / reception"
    },

    // 👷 Assigned delivery agent
    assignedAgent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "DeliveryAgent",
      index: true,
    },

    // 📦 Status of desk delivery
    status: {
      type: String,
      enum: [
        "pending",        // created, not yet assigned
        "assigned",       // agent assigned
        "picked_from_locker",
        "out_for_delivery",
        "delivered",
        "failed",
        "cancelled",
      ],
      default: "pending",
      index: true,
    },




    // 🕒 Timestamps for operations
    assignedAt: Date,
    pickedAt: Date,
    deliveredAt: Date,
    failedReason: String,

    // 💰 Optional pricing
    price: {
      type: Number,
      default: 0,
    },

    // 🏢 Which locker location / hub this belongs to
    locker: {
      type: String, // "T-Hub Raidurg"
      index: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("DeliveryRequest", DeliveryRequestSchema);
