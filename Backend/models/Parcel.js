const mongoose = require("mongoose");

const parcelSchema = new mongoose.Schema(
  {
    /**
     * Parcel Owner
     */
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    /**
     * Public Tracking ID
     */
    trackingId: {
      type: String,
      unique: true,
    },
    currentHub: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hub",
    },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    senderName: {
      type: String,
      required: true,
    },

    receiverName: {
      type: String,
      required: true,
    },

    /**
     * Receiver Email
     */
    receiverEmail: {
      type: String,
      required: true,
    },

    source: {
      type: String,
      required: true,
    },

    destination: {
      type: String,
      required: true,
    },

    weight: {
      type: Number,
      required: true,
    },

    priority: {
      type: String,
      enum: ["Normal", "High", "Urgent"],
      default: "Normal",
    },

    trackingHistory: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tracking",
      },
    ],

    status: {
      type: String,

      enum: [
        "Registered",
        "Dispatched",
        "Reached Hub",
        "In Transit",
        "Out For Delivery",
        "Delivered",
      ],

      default: "Registered",
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Parcel", parcelSchema);
