const mongoose = require("mongoose");

const hubSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },

    city: {
      type: String,
      required: true,
    },

    state: {
      type: String,
      required: true,
    },

    capacity: {
      type: Number,
      required: true,
    },

    activeParcels: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Parcel",
      },
    ],

    status: {
      type: String,
      enum: [
        "Active",
        "Busy",
        "Maintenance",
      ],
      default: "Active",
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model(
  "Hub",
  hubSchema,
);