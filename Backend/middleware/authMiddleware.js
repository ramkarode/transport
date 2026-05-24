const jwt = require("jsonwebtoken");

const User = require("../models/User");

exports.protect = async (
  req,
  res,
  next,
) => {
  try {

    let token;

    /**
     * Check Authorization Header
     */
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith(
        "Bearer",
      )
    ) {

      token =
        req.headers.authorization.split(
          " ",
        )[1];
    }

    /**
     * Token Missing
     */
    if (!token) {
      return res.status(401).json({
        success: false,
        message:
          "Not authorized. No token provided",
      });
    }

    /**
     * Verify Token
     */
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET,
    );

    /**
     * Get User
     */
    req.user = await User.findById(
      decoded.id,
    ).select("-password");

    next();

  } catch (error) {

    res.status(401).json({
      success: false,
      message: "Unauthorized access",
    });
  }
};