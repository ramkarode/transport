import React, { useState } from "react";

import axiosInstance from "../../services/axiosInstance";

export default function HubForm({
  fetchHubs,
}) {

  const [formData, setFormData] = useState({
    name: "",
    city: "",
    state: "",
    capacity: "",
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
        "/hub/create",
        formData,
      );

      setFormData({
        name: "",
        city: "",
        state: "",
        capacity: "",
      });

      fetchHubs();

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">

      <h2 className="text-2xl font-bold text-slate-900 mb-7">
        Create Logistics Hub
      </h2>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-5"
      >

        <input
          type="text"
          name="name"
          placeholder="Hub Name"
          value={formData.name}
          onChange={handleChange}
          className="border border-slate-300 rounded-2xl px-5 py-4"
        />

        <input
          type="text"
          name="city"
          placeholder="City"
          value={formData.city}
          onChange={handleChange}
          className="border border-slate-300 rounded-2xl px-5 py-4"
        />

        <input
          type="text"
          name="state"
          placeholder="State"
          value={formData.state}
          onChange={handleChange}
          className="border border-slate-300 rounded-2xl px-5 py-4"
        />

        <input
          type="number"
          name="capacity"
          placeholder="Hub Capacity"
          value={formData.capacity}
          onChange={handleChange}
          className="border border-slate-300 rounded-2xl px-5 py-4"
        />

        <button
          type="submit"
          disabled={loading}
          className="md:col-span-2 bg-gradient-to-r from-blue-600 to-blue-900 text-white py-4 rounded-2xl font-semibold"
        >
          {loading
            ? "Creating..."
            : "Create Hub"}
        </button>
      </form>
    </div>
  );
}