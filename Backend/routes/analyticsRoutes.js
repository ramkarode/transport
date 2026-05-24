const express = require("express");

const {
  getOverviewAnalytics,
} = require("../controllers/analyticsController");

const {
  protect,
} = require("../middleware/authMiddleware");

const {
  authorizeRoles,
} = require("../middleware/roleMiddleware");

const router = express.Router();

router.get(
  "/overview",
  protect,
  authorizeRoles(
    "Admin",
    "Transport Manager",
  ),
  getOverviewAnalytics,
);

module.exports = router;