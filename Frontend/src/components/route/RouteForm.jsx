import React, { useState } from "react";

import axiosInstance from "../../services/axiosInstance";

export default function RouteForm({
  setRouteData,
}) {

  const [formData, setFormData] = useState({
    source: "",
    destination: "",
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

      const response = await axiosInstance.post(
        "/route/optimize",
        formData,
      );

      setRouteData(
        response.data.optimizedRoute,
      );

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-3 gap-5"
      >

        {/* Source */}
        <input
          type="text"
          name="source"
          placeholder="Source City"
          value={formData.source}
          onChange={handleChange}
          className="border border-slate-300 rounded-2xl px-5 py-4 outline-none focus:ring-4 focus:ring-blue-100"
        />

        {/* Destination */}
        <input
          type="text"
          name="destination"
          placeholder="Destination City"
          value={formData.destination}
          onChange={handleChange}
          className="border border-slate-300 rounded-2xl px-5 py-4 outline-none focus:ring-4 focus:ring-blue-100"
        />

        {/* Button */}
        <button
          type="submit"
          disabled={loading}
          className="bg-gradient-to-r from-blue-600 to-blue-900 text-white rounded-2xl font-semibold hover:scale-[1.01] transition"
        >
          {loading
            ? "Optimizing..."
            : "Optimize Route"}
        </button>
      </form>
    </div>
  );
}