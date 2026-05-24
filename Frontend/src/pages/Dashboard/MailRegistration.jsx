import React, {
  useEffect,
  useState,
} from "react";

import DashboardLayout from "../../components/dashboard/DashboardLayout";

import ParcelForm from "../../components/mail/ParcelForm";

import ParcelTable from "../../components/mail/ParcelTable";

import axiosInstance from "../../services/axiosInstance";

export default function MailRegistration() {

  const [
    parcels,
    setParcels,
  ] = useState([]);

  const [
    loading,
    setLoading,
  ] = useState(false);

  /**
   * Success Tracking ID
   */
  const [
    latestTrackingId,
    setLatestTrackingId,
  ] = useState("");

  console.log(
    "Rendering MailRegistration",
    parcels,
  );

  /**
   * Fetch Parcels
   */
  const fetchParcels =
    async () => {

      try {

        setLoading(true);

        const response =
          await axiosInstance.get(
            "/parcel",
          );

        console.log(
          "API Response:",
          response.data,
        );

        /**
         * Update State
         */
        setParcels(
          response.data.parcels || [],
        );

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

      {/* Page Heading */}
      <div className="mb-8">

        <h1 className="text-4xl font-bold text-slate-900 mb-2">

          Mail Registration

        </h1>

        <p className="text-slate-500">

          Register and manage parcel
          transmission details.

        </p>
      </div>

      {/* Success Tracking Card */}
      {latestTrackingId && (
        <div className="mb-8 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-3xl p-6 shadow-xl">

          <h2 className="text-2xl font-bold mb-2">

            Parcel Registered Successfully 🎉

          </h2>

          <p className="text-green-100 mb-4">

            Share this tracking ID with
            the customer.

          </p>

          <div className="bg-white/20 backdrop-blur-sm px-6 py-4 rounded-2xl inline-block">

            <p className="text-sm uppercase tracking-widest text-green-100 mb-1">

              Tracking ID

            </p>

            <h3 className="text-3xl font-bold tracking-wider">

              {latestTrackingId}

            </h3>
          </div>
        </div>
      )}

      {/* Parcel Form */}
      <ParcelForm
        fetchParcels={fetchParcels}
        setLatestTrackingId={
          setLatestTrackingId
        }
      />

      {/* Parcel Table */}
      <div className="mt-10">

        <ParcelTable
          parcels={parcels}
          loading={loading}
        />

      </div>

    </DashboardLayout>
  );
}