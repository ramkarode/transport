const express = require("express");

const {
  assignParcelToHub,
  moveParcelToAnotherHub,
} = require("../controllers/assignmentController");

const {
  protect,
} = require("../middleware/authMiddleware");

const {
  authorizeRoles,
} = require("../middleware/roleMiddleware");

const router = express.Router();

router.post(
  "/assign",
  protect,
  authorizeRoles(
    "Admin",
    "Transport Manager",
  ),
  assignParcelToHub,
);

router.post(
  "/move",
  protect,
  authorizeRoles(
    "Admin",
    "Transport Manager",
  ),
  moveParcelToAnotherHub,
);

module.exports = router;