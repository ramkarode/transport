import React, {
  useEffect,
  useState,
} from "react";

import DashboardLayout from "../../components/dashboard/DashboardLayout";

import HubForm from "../../components/hub/HubForm";

import HubGrid from "../../components/hub/HubGrid";

import axiosInstance from "../../services/axiosInstance";

export default function HubManagement() {

  const [hubs, setHubs] = useState([]);

  const [loading, setLoading] = useState(false);

  /**
   * Fetch Hubs
   */
  const fetchHubs = async () => {
    try {

      setLoading(true);

      const response = await axiosInstance.get(
        "/hub",
      );

      setHubs(response.data.hubs);

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHubs();
  }, []);

  return (
    <DashboardLayout>

      <div className="mb-8">

        <h1 className="text-4xl font-bold text-slate-900 mb-2">
          Hub Management
        </h1>

        <p className="text-slate-500">
          Manage logistics hubs and parcel distribution.
        </p>
      </div>

      <HubForm fetchHubs={fetchHubs} />

      <div className="mt-8">

        <HubGrid
          hubs={hubs}
          loading={loading}
        />
      </div>

    </DashboardLayout>
  );
}