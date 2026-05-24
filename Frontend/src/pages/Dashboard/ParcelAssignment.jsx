import React, {
  useEffect,
  useState,
} from "react";

import DashboardLayout from "../../components/dashboard/DashboardLayout";

import AssignmentForm from "../../components/assignment/AssignmentForm";

import ParcelQueue from "../../components/assignment/ParcelQueue";

import axiosInstance from "../../services/axiosInstance";

export default function ParcelAssignment() {

  const [parcels, setParcels] = useState([]);

  const [hubs, setHubs] = useState([]);

  /**
   * Fetch Data
   */
  const fetchData = async () => {
    try {

      const parcelResponse =
        await axiosInstance.get(
          "/parcel",
        );

      const hubResponse =
        await axiosInstance.get(
          "/hub",
        );

      setParcels(
        parcelResponse.data.parcels,
      );

      setHubs(
        hubResponse.data.hubs,
      );

    } catch (error) {

      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <DashboardLayout>

      <div className="mb-8">

        <h1 className="text-4xl font-bold text-slate-900 mb-2">
          Parcel Assignment
        </h1>

        <p className="text-slate-500">
          Manage parcel movement across hubs.
        </p>
      </div>

      <AssignmentForm
        parcels={parcels}
        hubs={hubs}
        fetchData={fetchData}
      />

      <div className="mt-8">

        <ParcelQueue hubs={hubs} />
      </div>

    </DashboardLayout>
  );
}