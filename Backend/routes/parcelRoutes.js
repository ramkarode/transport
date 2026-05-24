const express = require("express");

const {
  registerParcel,
  getAllParcels,
} = require("../controllers/parcelController");

const { protect } = require("../middleware/authMiddleware");

const { authorizeRoles } = require("../middleware/roleMiddleware");

const router = express.Router();

/**
 * Register Parcel
 */
router.post(
  "/register",
  protect,
  authorizeRoles("Admin", "Staff"),
  registerParcel,
);

/**
 * Get Parcels
 */
router.get(
  "/",
  protect,
  authorizeRoles("Admin", "Staff", "Transport Manager"),
  getAllParcels,
);

module.exports = router;
