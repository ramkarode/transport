const Parcel = require("../models/Parcel");

const Tracking = require("../models/Tracking");

const sendEmail = require("../utils/sendEmail");

/**
 * Generate Tracking ID
 */
const generateTrackingId = () => {
  const random = Math.floor(100000 + Math.random() * 900000);

  return `TRK-${random}`;
};

/**
 * Register Parcel
 */
exports.registerParcel = async (req, res) => {
  try {
    /**
     * Generate Public Tracking ID
     */
    const trackingId = generateTrackingId();

    /**
     * Create Parcel
     */
    const parcel = await Parcel.create({
      ...req.body,

      /**
       * Logged In User
       */
      user: req.user._id,

      customer: req.body.customerId,

      /**
       * Public Tracking ID
       */
      trackingId,
    });

    /**
     * Create Initial Tracking
     */
    const tracking = await Tracking.create({
      parcelId: parcel._id,

      status: "Registered",

      location: parcel.source,

      description: "Parcel registered successfully",
    });

    /**
     * Push Tracking History
     */
    parcel.trackingHistory.push(tracking._id);

    await parcel.save();

    /**
     * Send Registration Email
     */
    await sendEmail(
      parcel.receiverEmail,

      "Parcel Registration Successful",

      "parcelRegistered",

      {
        receiverName: parcel.receiverName,

        trackingId: parcel.trackingId,

        source: parcel.source,

        destination: parcel.destination,
      },
    );

    res.status(201).json({
      success: true,

      message: "Parcel registered successfully",

      parcel,
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

/**
 * Get All Parcels
 */
exports.getAllParcels = async (req, res) => {
  try {
    const parcels = await Parcel.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      parcels,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
