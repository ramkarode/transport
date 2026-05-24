const express = require("express");

const {
  createHub,
  getAllHubs,
} = require("../controllers/hubController");

const {
  protect,
} = require("../middleware/authMiddleware");

const {
  authorizeRoles,
} = require("../middleware/roleMiddleware");

const router = express.Router();

router.post(
  "/create",
  protect,
  authorizeRoles(
    "Admin",
    "Transport Manager",
  ),
  createHub,
);

router.get(
  "/",
  protect,
  authorizeRoles(
    "Admin",
    "Transport Manager",
  ),
  getAllHubs,
);

module.exports = router;