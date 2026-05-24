const User = require("../models/User");

const jwt = require("jsonwebtoken");

/**
 * Generate JWT Token
 */
const generateToken = (userId) => {
  return jwt.sign(
    {
      id: userId,
    },

    process.env.JWT_SECRET,

    {
      expiresIn: process.env.JWT_EXPIRE || "1h",
    },
  );
};

/**
 * Register User
 * POST /auth/register
 */
const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    /**
     * Validation
     */
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,

        message: "Please provide name, email, and password",
      });
    }

    /**
     * Check Existing User
     */
    const existingUser = await User.findOne({
      email,
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,

        message: "Email already registered",
      });
    }

    /**
     * Create User
     */
    const user = new User({
      name,

      email,

      password,

      role: role || "Customer",
    });

    /**
     * Save User
     */
    await user.save();

    /**
     * Generate Token
     */
    const token = generateToken(user._id);

    /**
     * Remove Password
     */
    user.password = undefined;

    res.status(201).json({
      success: true,

      message: "User registered successfully",

      token,

      user: {
        _id: user._id,

        name: user.name,

        email: user.email,

        role: user.role,
      },
    });
  } catch (error) {
    console.error("Register error:", error);

    res.status(500).json({
      success: false,

      message: error.message || "Registration failed",
    });
  }
};

/**
 * Login User
 * POST /auth/login
 */
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    /**
     * Validation
     */
    if (!email || !password) {
      return res.status(400).json({
        success: false,

        message: "Please provide email and password",
      });
    }

    /**
     * Find User
     */
    const user = await User.findOne({
      email,
    }).select("+password");

    if (!user) {
      return res.status(401).json({
        success: false,

        message: "Invalid email or password",
      });
    }

    /**
     * Compare Password
     */
    const isPasswordCorrect = await user.comparePassword(password);

    if (!isPasswordCorrect) {
      return res.status(401).json({
        success: false,

        message: "Invalid email or password",
      });
    }

    /**
     * Generate Token
     */
    const token = generateToken(user._id);

    /**
     * Remove Password
     */
    user.password = undefined;

    res.status(200).json({
      success: true,

      message: "Login successful",

      token,

      user: {
        _id: user._id,

        name: user.name,

        email: user.email,

        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login error:", error);

    res.status(500).json({
      success: false,

      message: error.message || "Login failed",
    });
  }
};

/**
 * Get Current User
 * GET /auth/me
 */
const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    res.status(200).json({
      success: true,

      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: error.message || "Failed to get user",
    });
  }
};

/**
 * Get All Customers
 * GET /auth/customers
 */
const getCustomers = async (req, res) => {
  try {
    const customers = await User.find({
      role: "Customer",
    }).select("_id name email");

    res.status(200).json({
      success: true,

      customers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: error.message || "Failed to fetch customers",
    });
  }
};

module.exports = {
  register,

  login,

  getMe,

  getCustomers,
};
