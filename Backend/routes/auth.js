const express = require("express");

const { register, login } = require("../controllers/authController");

const { protect } = require("../middleware/authMiddleware");

const { authorizeRoles } = require("../middleware/roleMiddleware");

const router = express.Router();
const { getCustomers } = require("../controllers/authController");

/**
 * Public Routes
 */
router.post("/register", register);

router.post("/login", login);

router.get(
  "/customers",

  protect,

  authorizeRoles("Admin", "Staff"),

  getCustomers,
);
/**
 * Admin Only Example
 */
router.get("/admin-test", protect, authorizeRoles("Admin"), (req, res) => {
  res.status(200).json({
    success: true,
    message: "Admin Access Granted",
  });
});

module.exports = router;
