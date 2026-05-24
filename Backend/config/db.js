const mongoose = require("mongoose");

/**
 * Production Ready MongoDB Connection
 * Features:
 * - Modern Mongoose v8+ configuration
 * - Connection Pooling
 * - Graceful Shutdown
 * - Auto Reconnect
 * - Connection Monitoring
 * - Retry Mechanism
 */

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      // Connection Pooling
      maxPoolSize: 20,
      minPoolSize: 5,

      // Timeout Settings
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      connectTimeoutMS: 10000,

      // Retry Operations
      retryWrites: true,
      retryReads: true,

      // Disable auto index in production
      autoIndex: process.env.NODE_ENV !== "production",
    });

    console.log(`✓ MongoDB Connected: ${conn.connection.host}`);

    /**
     * Connection Events
     */
    mongoose.connection.on("connected", () => {
      console.log("✓ Mongoose connected");
    });

    mongoose.connection.on("error", (err) => {
      console.error("✗ MongoDB Error:", err.message);
    });

    mongoose.connection.on("disconnected", () => {
      console.warn("⚠ MongoDB disconnected");
    });

    /**
     * Graceful Shutdown
     */
    const gracefulShutdown = async (signal) => {
      console.log(`\n${signal} received. Closing MongoDB connection...`);

      try {
        await mongoose.connection.close();
        console.log("✓ MongoDB connection closed successfully");
        process.exit(0);
      } catch (error) {
        console.error("✗ Error while closing MongoDB connection:", error);
        process.exit(1);
      }
    };

    process.on("SIGINT", () => gracefulShutdown("SIGINT"));
    process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));

    return conn;
  } catch (error) {
    console.error(`✗ Initial MongoDB Connection Failed: ${error.message}`);

    // Retry Connection
    setTimeout(() => {
      console.log("⟳ Retrying MongoDB connection...");
      connectDB();
    }, 5000);
  }
};

module.exports = connectDB;