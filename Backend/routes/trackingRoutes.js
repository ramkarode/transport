const express = require("express");

const {
  createTracking,
  getParcelTracking,
} = require("../controllers/trackingController");

const { protect } = require("../middleware/authMiddleware");

const { authorizeRoles } = require("../middleware/roleMiddleware");

const router = express.Router();

/**
 * Create Tracking
 */
router.post(
  "/create",
  protect,
  authorizeRoles("Admin", "Staff"),
  createTracking,
);

/**
 * Track Parcel
 */
router.get(
  "/:id",
  protect,
  authorizeRoles("Admin", "Staff", "Transport Manager", "Customer"),
  getParcelTracking,
);

module.exports = router;
