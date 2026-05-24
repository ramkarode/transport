require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");

const app = express();

/**
 * Connect Database
 */
connectDB();

/**
 * Basic Security Headers
 */
app.use((req, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("X-XSS-Protection", "1; mode=block");
  next();
});

/**
 * CORS Configuration
 */
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

/**
 * Body Parsers
 */
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

/**
 * Request Logger
 */
app.use((req, res, next) => {
  console.log(
    `${new Date().toISOString()} | ${req.method} | ${req.originalUrl}`,
  );
  next();
});

/**
 * Health Check Route
 */
app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    uptime: process.uptime(),
    message: "Server is healthy",
    timestamp: new Date().toISOString(),
  });
});

/**
 * API Routes
 */
app.use("/auth", require("./routes/auth"));
app.use("/parcel", require("./routes/parcelRoutes"));
app.use("/tracking", require("./routes/trackingRoutes"));
app.use("/route", require("./routes/routeRoutes"));
app.use("/hub", require("./routes/hubRoutes"));
app.use("/assignment", require("./routes/assignmentRoutes"));
app.use("/analytics", require("./routes/analyticsRoutes"));
app.use("/notification", require("./routes/notificationRoutes"));
/**
 * 404 Handler
 */
app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
  });
});

/**
 * Global Error Handler
 */
app.use((err, req, res, next) => {
  console.error("ERROR:", err.stack);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

/**
 * Handle Uncaught Exceptions
 */
process.on("uncaughtException", (err) => {
  console.error("UNCAUGHT EXCEPTION!");
  console.error(err.name, err.message);

  process.exit(1);
});

/**
 * Start Server
 */
const PORT = process.env.PORT || 5000;

const http = require("http");

const { initSocket } = require("./socket/socketServer");

const server = http.createServer(app);

/**
 * Initialize Socket.IO
 */
initSocket(server);

/**
 * Start Server
 */
server.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════════════════╗
║                                                    ║
║     Dynamic Mail Transmission System Backend       ║
║                                                    ║
║     🚀 Server Running On Port : ${PORT}             
║                                                    ║
╚════════════════════════════════════════════════════╝
  `);
});

/**
 * Handle Unhandled Promise Rejections
 */
process.on("unhandledRejection", (err) => {
  console.error("UNHANDLED REJECTION!");
  console.error(err.name, err.message);

  server.close(() => {
    process.exit(1);
  });
});

/**
 * Graceful Shutdown
 */
const gracefulShutdown = (signal) => {
  console.log(`\n${signal} received. Shutting down gracefully...`);

  server.close(() => {
    console.log("✓ HTTP Server Closed");
    process.exit(0);
  });
};

process.on("SIGINT", () => gracefulShutdown("SIGINT"));
process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));

module.exports = app;
