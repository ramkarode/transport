const Hub = require("../models/Hub");

/**
 * Create Hub
 */
exports.createHub = async (req, res) => {
  try {

    const hub = await Hub.create(req.body);

    res.status(201).json({
      success: true,
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
 * Get All Hubs
 */
exports.getAllHubs = async (req, res) => {
  try {

    const hubs = await Hub.find()
      .populate("activeParcels")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      hubs,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};