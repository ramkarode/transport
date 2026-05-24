import React, { useState } from "react";
import axiosInstance from "../../services/axiosInstance";

export default function TrackingSearch({
  setTrackingData,
}) {

  const [parcelId, setParcelId] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await axiosInstance.get(
        `/tracking/${parcelId}`,
      );

      setTrackingData(response.data);

    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200">

      <form
        onSubmit={handleSearch}
        className="flex flex-col md:flex-row gap-5"
      >

        <input
          type="text"
          placeholder="Enter Parcel ID"
          value={parcelId}
          onChange={(e) => setParcelId(e.target.value)}
          className="flex-1 border border-slate-300 rounded-2xl px-5 py-4 outline-none focus:ring-4 focus:ring-blue-100"
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-gradient-to-r from-blue-600 to-blue-900 text-white px-8 py-4 rounded-2xl font-semibold"
        >
          {loading ? "Searching..." : "Track Parcel"}
        </button>
      </form>
    </div>
  );
}