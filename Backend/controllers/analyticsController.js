const Parcel = require("../models/Parcel");
const Hub = require("../models/Hub");

/**
 * Dashboard Overview
 */
exports.getOverviewAnalytics =
  async (req, res) => {
    try {

      /**
       * Parcel Stats
       */
      const totalParcels =
        await Parcel.countDocuments();

      const deliveredParcels =
        await Parcel.countDocuments({
          status: "Delivered",
        });

      const inTransitParcels =
        await Parcel.countDocuments({
          status: "In Transit",
        });

      const reachedHubParcels =
        await Parcel.countDocuments({
          status: "Reached Hub",
        });

      /**
       * Hub Stats
       */
      const totalHubs =
        await Hub.countDocuments();

      const activeHubs =
        await Hub.countDocuments({
          status: "Active",
        });

      /**
       * Capacity Usage
       */
      const hubs = await Hub.find();

      let totalCapacity = 0;

      let usedCapacity = 0;

      hubs.forEach((hub) => {
        totalCapacity += hub.capacity;

        usedCapacity +=
          hub.activeParcels.length;
      });

      const capacityUsage =
        totalCapacity === 0
          ? 0
          : (
              (usedCapacity /
                totalCapacity) *
              100
            ).toFixed(2);

      res.status(200).json({
        success: true,

        analytics: {
          totalParcels,
          deliveredParcels,
          inTransitParcels,
          reachedHubParcels,

          totalHubs,
          activeHubs,

          capacityUsage,
        },
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };