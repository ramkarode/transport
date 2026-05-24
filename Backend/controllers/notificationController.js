const Notification = require(
  "../models/Notification",
);

const {
  getIO,
} = require(
  "../socket/socketServer",
);

/**
 * Create Notification
 */
exports.createNotification =
  async (
    userId,
    title,
    message,
    type = "Parcel",
  ) => {

    try {

      /**
       * Save Notification
       */
      const notification =
        await Notification.create({
          user: userId,

          title,

          message,

          type,
        });

      console.log(
        "Notification Created:",
        notification,
      );

      /**
       * Get Socket Instance
       */
      const io = getIO();

      /**
       * Emit Live Notification
       */
      io.emit(
        "newNotification",
        notification,
      );

      return notification;

    } catch (error) {

      console.error(
        "Notification Error:",
        error.message,
      );
    }
  };


/**
 * Get Notifications
 */
exports.getNotifications =
  async (req, res) => {

    try {

      const notifications =
        await Notification.find({
          user: req.user._id,
        }).sort({
          createdAt: -1,
        });

      res.status(200).json({
        success: true,

        notifications,
      });

    } catch (error) {

      res.status(500).json({
        success: false,

        message:
          error.message,
      });
    }
  };


/**
 * Mark Notification Read
 */
exports.markAsRead =
  async (req, res) => {

    try {

      const notification =
        await Notification.findById(
          req.params.id,
        );

      if (!notification) {

        return res.status(404).json({
          success: false,

          message:
            "Notification not found",
        });
      }

      /**
       * Security Check
       */
      if (
        notification.user.toString() !==
        req.user._id.toString()
      ) {

        return res.status(403).json({
          success: false,

          message:
            "Unauthorized access",
        });
      }

      /**
       * Mark Read
       */
      notification.isRead = true;

      await notification.save();

      /**
       * Emit Live Update
       */
      const io = getIO();

      io.emit(
        "notificationRead",
        {
          notificationId:
            notification._id,
        },
      );

      res.status(200).json({
        success: true,

        message:
          "Notification updated",
      });

    } catch (error) {

      res.status(500).json({
        success: false,

        message:
          error.message,
      });
    }
  };