const express = require("express");

const {
  optimizeRoute,
} = require("../controllers/routeController");

const {
  protect,
} = require("../middleware/authMiddleware");

const {
  authorizeRoles,
} = require("../middleware/roleMiddleware");

const router = express.Router();

router.post(
  "/optimize",
  protect,
  authorizeRoles(
    "Admin",
    "Transport Manager",
  ),
  optimizeRoute,
);

module.exports = router;