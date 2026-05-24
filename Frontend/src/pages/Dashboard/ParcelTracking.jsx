import React, {
  useEffect,
  useState,
} from "react";

import DashboardLayout from "../../components/dashboard/DashboardLayout";

import TrackingSearch from "../../components/tracking/TrackingSearch";

import TrackingCard from "../../components/tracking/TrackingCard";

import socket from "../../socket/socket";

export default function ParcelTracking() {

  const [trackingData, setTrackingData] =
    useState(null);

  /**
   * Fetch Latest Tracking
   */
  const fetchTracking = async () => {

    try {

      if (!trackingData?._id) return;

      // You can later add API refresh here

      console.log(
        "Refreshing tracking data...",
      );

    } catch (error) {

      console.error(error);
    }
  };

  /**
   * Real-Time Tracking Listener
   */
  useEffect(() => {

    socket.on(
      "trackingUpdated",
      (data) => {

        console.log(
          "Live Tracking Update:",
          data,
        );

        /**
         * Refresh Current Parcel
         */
        if (
          trackingData?._id ===
          data.parcelId
        ) {

          fetchTracking();
        }
      },
    );

    return () => {

      socket.off(
        "trackingUpdated",
      );
    };

  }, [trackingData]);

  return (
    <DashboardLayout>

      {/* Heading */}
      <div className="mb-8">

        <h1 className="text-4xl font-bold text-slate-900 mb-2">

          Parcel Tracking

        </h1>

        <p className="text-slate-500">

          Track parcel movement across
          hubs and transport modes.

        </p>
      </div>

      {/* Search */}
      <TrackingSearch
        setTrackingData={setTrackingData}
      />

      {/* Tracking Card */}
      {trackingData && (
        <div className="mt-8">

          <TrackingCard
            trackingData={trackingData}
          />

        </div>
      )}
    </DashboardLayout>
  );
}