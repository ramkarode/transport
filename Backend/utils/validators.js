/**
 * Utility functions for common operations
 */

/**
 * Validate email format
 */
const isValidEmail = (email) => {
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return emailRegex.test(email);
};

/**
 * Validate password strength
 */
const isValidPassword = (password) => {
  return password && password.length >= 6;
};

/**
 * Generate error response
 */
const errorResponse = (message, status = 500) => {
  return {
    success: false,
    message,
    status
  };
};

/**
 * Generate success response
 */
const successResponse = (message, data = null, status = 200) => {
  return {
    success: true,
    message,
    data,
    status
  };
};

module.exports = {
  isValidEmail,
  isValidPassword,
  errorResponse,
  successResponse
};
