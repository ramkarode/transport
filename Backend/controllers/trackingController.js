const Parcel = require("../models/Parcel");

const Tracking = require("../models/Tracking");

const Hub = require("../models/Hub");

const { createNotification } = require("./notificationController");

const { getIO } = require("../socket/socketServer");

const sendEmail = require("../utils/sendEmail");

/**
 * Create Tracking Entry
 */
exports.createTracking = async (req, res) => {
  try {
    const { parcelId, status, location, description } = req.body;

    /**
     * Find Parcel
     */
    const parcel = await Parcel.findById(parcelId);

    if (!parcel) {
      return res.status(404).json({
        success: false,
        message: "Parcel not found",
      });
    }

    /**
     * Create Tracking
     */
    const tracking = await Tracking.create({
      parcelId: parcel._id,

      status,

      location,

      description,
    });

    /**
     * Ensure History Exists
     */
    if (!parcel.trackingHistory) {
      parcel.trackingHistory = [];
    }

    /**
     * Push Tracking
     */
    parcel.trackingHistory.push(tracking._id);

    /**
     * Update Status
     */
    parcel.status = status;

    /**
     * AUTO HUB MANAGEMENT
     */

    /**
     * Reached Hub
     */
    if (status === "Reached Hub") {
      const hub = await Hub.findOne({
        city: location,
      });

      if (hub) {
        const exists = hub.activeParcels.includes(parcel._id);

        if (!exists) {
          hub.activeParcels.push(parcel._id);

          await hub.save();
        }

        parcel.currentHub = hub._id;
      }
    }

    /**
     * In Transit
     */
    if (status === "In Transit") {
      if (parcel.currentHub) {
        const oldHub = await Hub.findById(parcel.currentHub);

        if (oldHub) {
          oldHub.activeParcels = oldHub.activeParcels.filter(
            (id) => id.toString() !== parcel._id.toString(),
          );

          await oldHub.save();
        }

        parcel.currentHub = null;
      }
    }

    /**
     * Save Parcel
     */
    await parcel.save();

    /**
     * CUSTOMER NOTIFICATION
     */
    await createNotification(
      parcel.customer,

      "Tracking Updated",

      `Parcel status updated to ${status}`,

      "Tracking",
    );

    /**
     * Email Update
     */
    if (parcel.receiverEmail) {
      await sendEmail(
        parcel.receiverEmail,

        `Parcel Status Updated - ${parcel.trackingId}`,

        "parcelStatusUpdate",

        {
          receiverName: parcel.receiverName,

          trackingId: parcel.trackingId,

          status,

          location,

          description,
        },
      );
    }

    /**
     * Socket Event
     */
    const io = getIO();

    io.to(parcel.customer.toString()).emit("trackingUpdated", {
      trackingId: parcel.trackingId,

      status,

      location,

      description,
    });

    res.status(201).json({
      success: true,

      message: "Tracking updated successfully",

      tracking,
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

/**
 * Get Parcel Tracking
 */
exports.getParcelTracking = async (req, res) => {
  try {
    const { id } = req.params;

    /**
     * Search By Tracking ID
     */
    const parcel = await Parcel.findOne({
      trackingId: id,
    }).populate({
      path: "trackingHistory",

      options: {
        sort: {
          createdAt: 1,
        },
      },
    });

    if (!parcel) {
      return res.status(404).json({
        success: false,

        message: "Parcel not found",
      });
    }

    res.status(200).json({
      success: true,

      parcel,

      trackingHistory: parcel.trackingHistory,
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};
