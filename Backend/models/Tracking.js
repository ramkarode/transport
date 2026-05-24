const mongoose = require("mongoose");

const trackingSchema = new mongoose.Schema(
  {
    parcelId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Parcel",
      required: true,
    },

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

    location: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Tracking", trackingSchema);