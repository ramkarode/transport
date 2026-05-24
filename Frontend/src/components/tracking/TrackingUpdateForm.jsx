import React, { useState } from "react";

import axiosInstance from "../../services/axiosInstance";

export default function TrackingUpdateForm({
  parcels,
  fetchParcels,
}) {

  const [formData, setFormData] = useState({
    parcelId: "",
    status: "Dispatched",
    location: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      setLoading(true);

      await axiosInstance.post(
        "/tracking/create",
        formData,
      );

      setFormData({
        parcelId: "",
        status: "Dispatched",
        location: "",
        description: "",
      });

      fetchParcels();

      alert("Tracking Updated Successfully");

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">

      <h2 className="text-2xl font-bold text-slate-900 mb-7">
        Update Tracking
      </h2>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-5"
      >

        {/* Parcel */}
        <select
          name="parcelId"
          value={formData.parcelId}
          onChange={handleChange}
          className="border border-slate-300 rounded-2xl px-5 py-4"
        >
          <option value="">
            Select Parcel
          </option>

          {parcels.map((parcel) => (
            <option
              key={parcel._id}
              value={parcel._id}
            >
              {parcel.senderName} → {parcel.receiverName}
            </option>
          ))}
        </select>

        {/* Status */}
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="border border-slate-300 rounded-2xl px-5 py-4"
        >
          <option value="Dispatched">
            Dispatched
          </option>

          <option value="Reached Hub">
            Reached Hub
          </option>

          <option value="In Transit">
            In Transit
          </option>

          <option value="Out For Delivery">
            Out For Delivery
          </option>

          <option value="Delivered">
            Delivered
          </option>
        </select>

        {/* Location */}
        <input
          type="text"
          name="location"
          placeholder="Current Hub / Location"
          value={formData.location}
          onChange={handleChange}
          className="border border-slate-300 rounded-2xl px-5 py-4"
        />

        {/* Description */}
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="border border-slate-300 rounded-2xl px-5 py-4"
        />

        {/* Button */}
        <button
          type="submit"
          disabled={loading}
          className="md:col-span-2 bg-gradient-to-r from-blue-600 to-blue-900 text-white py-4 rounded-2xl font-semibold hover:scale-[1.01] transition"
        >
          {loading
            ? "Updating..."
            : "Update Tracking"}
        </button>
      </form>
    </div>
  );
}