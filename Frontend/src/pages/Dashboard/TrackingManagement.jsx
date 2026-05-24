import React, { useEffect, useState } from "react";

import DashboardLayout from "../../components/dashboard/DashboardLayout";

import TrackingUpdateForm from "../../components/tracking/TrackingUpdateForm";

import TrackingHistoryTable from "../../components/tracking/TrackingHistoryTable";

import axiosInstance from "../../services/axiosInstance";

export default function TrackingManagement() {

  const [parcels, setParcels] = useState([]);

  const [loading, setLoading] = useState(false);

  /**
   * Fetch Parcels
   */
  const fetchParcels = async () => {
    try {

      setLoading(true);

      const response = await axiosInstance.get(
        "/parcel",
      );

      setParcels(response.data.parcels);

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);
    }
  };

  useEffect(() => {
    fetchParcels();
  }, []);

  return (
    <DashboardLayout>

      <div className="mb-8">

        <h1 className="text-4xl font-bold text-slate-900 mb-2">
          Tracking Management
        </h1>

        <p className="text-slate-500">
          Manage parcel tracking and hub updates.
        </p>
      </div>

      <TrackingUpdateForm
        parcels={parcels}
        fetchParcels={fetchParcels}
      />

      <div className="mt-8">

        <TrackingHistoryTable
          parcels={parcels}
          loading={loading}
        />
      </div>

    </DashboardLayout>
  );
}