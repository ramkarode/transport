const Parcel = require("../models/Parcel");

const Hub = require("../models/Hub");

const Tracking = require("../models/Tracking");

const { createNotification } = require("./notificationController");

const { getIO } = require("../socket/socketServer");

/**
 * Assign Parcel To Hub
 */
exports.assignParcelToHub = async (req, res) => {
  try {
    const { parcelId, hubId } = req.body;

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
     * Find Hub
     */
    const hub = await Hub.findById(hubId);

    if (!hub) {
      return res.status(404).json({
        success: false,

        message: "Hub not found",
      });
    }

    /**
     * Capacity Validation
     */
    if (hub.activeParcels.length >= hub.capacity) {
      return res.status(400).json({
        success: false,

        message: "Hub capacity full",
      });
    }

    /**
     * Prevent Duplicate
     */
    const alreadyAssigned = hub.activeParcels.includes(parcel._id);

    if (alreadyAssigned) {
      return res.status(400).json({
        success: false,

        message: "Parcel already assigned to this hub",
      });
    }

    /**
     * Assign Parcel
     */
    hub.activeParcels.push(parcel._id);

    await hub.save();

    /**
     * Update Parcel
     */
    parcel.status = "Reached Hub";

    /**
     * Save Current Hub
     */
    parcel.currentHub = hub._id;

    /**
     * Create Tracking Entry
     */
    const tracking = await Tracking.create({
      parcelId: parcel._id,

      status: "Reached Hub",

      location: hub.city,

      description: `Parcel reached ${hub.name}`,
    });

    /**
     * Ensure Tracking Exists
     */
    if (!parcel.trackingHistory) {
      parcel.trackingHistory = [];
    }

    /**
     * Push Tracking
     */
    parcel.trackingHistory.push(tracking._id);

    await parcel.save();

    /**
     * CUSTOMER Notification
     */
    await createNotification(
      parcel.customer,

      "Parcel Assigned",

      `Your parcel reached ${hub.name}`,

      "Assignment",
    );

    /**
     * Real-Time Event
     */
    const io = getIO();

    io.to(parcel.customer.toString()).emit("trackingUpdated", {
      trackingId: parcel.trackingId,

      status: "Reached Hub",

      location: hub.city,

      description: `Parcel reached ${hub.name}`,
    });

    res.status(200).json({
      success: true,

      message: "Parcel assigned successfully",

      hub,
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

/**
 * Move Parcel Between Hubs
 */
exports.moveParcelToAnotherHub = async (req, res) => {
  try {
    const { parcelId, fromHubId, toHubId } = req.body;

    /**
     * Find Hubs
     */
    const fromHub = await Hub.findById(fromHubId);

    const toHub = await Hub.findById(toHubId);

    if (!fromHub || !toHub) {
      return res.status(404).json({
        success: false,

        message: "Hub not found",
      });
    }

    /**
     * Remove From Old Hub
     */
    fromHub.activeParcels = fromHub.activeParcels.filter(
      (id) => id.toString() !== parcelId,
    );

    await fromHub.save();

    /**
     * Add To New Hub
     */
    toHub.activeParcels.push(parcelId);

    await toHub.save();

    /**
     * Create Tracking
     */
    const tracking = await Tracking.create({
      parcelId,

      status: "In Transit",

      location: toHub.city,

      description: `Parcel moved from ${fromHub.name} to ${toHub.name}`,
    });

    /**
     * Update Parcel
     */
    const parcel = await Parcel.findById(parcelId);

    parcel.status = "In Transit";

    /**
     * Remove Current Hub
     */
    parcel.currentHub = null;

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

    await parcel.save();

    /**
     * CUSTOMER Notification
     */
    await createNotification(
      parcel.customer,

      "Parcel In Transit",

      `Parcel moved to ${toHub.name}`,

      "Tracking",
    );

    /**
     * Real-Time Event
     */
    const io = getIO();

    io.to(parcel.customer.toString()).emit("trackingUpdated", {
      trackingId: parcel.trackingId,

      status: "In Transit",

      location: toHub.city,

      description: `Parcel moved from ${fromHub.name} to ${toHub.name}`,
    });

    res.status(200).json({
      success: true,

      message: "Parcel moved successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};
