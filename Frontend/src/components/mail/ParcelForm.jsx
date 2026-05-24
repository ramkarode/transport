import React, { useEffect, useState } from "react";

import axiosInstance from "../../services/axiosInstance";

export default function ParcelForm({ fetchParcels, setLatestTrackingId }) {
  const [customers, setCustomers] = useState([]);

  const [formData, setFormData] = useState({
    senderName: "",

    receiverName: "",

    receiverEmail: "",

    customerId: "",

    source: "",

    destination: "",

    weight: "",

    priority: "Normal",
  });

  const [loading, setLoading] = useState(false);

  /**
   * Fetch Customers
   */
  const fetchCustomers = async () => {
    try {
      const response = await axiosInstance.get("/auth/customers");

      setCustomers(response.data.customers || []);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  /**
   * Handle Input
   */
  const handleChange = (e) => {
    setFormData({
      ...formData,

      [e.target.name]: e.target.value,
    });
  };

  /**
   * Submit Form
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await axiosInstance.post("/parcel/register", formData);

      /**
       * Latest Tracking ID
       */
      if (setLatestTrackingId) {
        setLatestTrackingId(response.data.parcel.trackingId);
      }

      alert(
        `Parcel Registered Successfully\nTracking ID: ${response.data.parcel.trackingId}`,
      );

      /**
       * Reset Form
       */
      setFormData({
        senderName: "",

        receiverName: "",

        receiverEmail: "",

        customerId: "",

        source: "",

        destination: "",

        weight: "",

        priority: "Normal",
      });

      fetchParcels();
    } catch (error) {
      console.error(error);

      alert(error.response?.data?.message || "Parcel Registration Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200">
      <h2 className="text-2xl font-bold text-slate-900 mb-7">
        Register New Parcel
      </h2>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* Sender */}
        <input
          type="text"
          name="senderName"
          placeholder="Sender Name"
          value={formData.senderName}
          onChange={handleChange}
          className="border border-slate-300 rounded-2xl px-5 py-4 outline-none focus:ring-4 focus:ring-blue-100"
          required
        />

        {/* Receiver */}
        <input
          type="text"
          name="receiverName"
          placeholder="Receiver Name"
          value={formData.receiverName}
          onChange={handleChange}
          className="border border-slate-300 rounded-2xl px-5 py-4 outline-none focus:ring-4 focus:ring-blue-100"
          required
        />

        {/* Receiver Email */}
        <input
          type="email"
          name="receiverEmail"
          placeholder="Receiver Email"
          value={formData.receiverEmail}
          onChange={handleChange}
          className="border border-slate-300 rounded-2xl px-5 py-4 outline-none focus:ring-4 focus:ring-blue-100"
          required
        />

        {/* Customer Dropdown */}
        <select
          name="customerId"
          value={formData.customerId}
          onChange={handleChange}
          className="border border-slate-300 rounded-2xl px-5 py-4 outline-none focus:ring-4 focus:ring-blue-100"
          required
        >
          <option value="">Select Customer</option>

          {customers.map((customer) => (
            <option key={customer._id} value={customer._id}>
              {customer.name}
              {" - "}
              {customer.email}
            </option>
          ))}
        </select>

        {/* Source */}
        <input
          type="text"
          name="source"
          placeholder="Source Location"
          value={formData.source}
          onChange={handleChange}
          className="border border-slate-300 rounded-2xl px-5 py-4 outline-none focus:ring-4 focus:ring-blue-100"
          required
        />

        {/* Destination */}
        <input
          type="text"
          name="destination"
          placeholder="Destination"
          value={formData.destination}
          onChange={handleChange}
          className="border border-slate-300 rounded-2xl px-5 py-4 outline-none focus:ring-4 focus:ring-blue-100"
          required
        />

        {/* Weight */}
        <input
          type="number"
          name="weight"
          placeholder="Weight (KG)"
          value={formData.weight}
          onChange={handleChange}
          className="border border-slate-300 rounded-2xl px-5 py-4 outline-none focus:ring-4 focus:ring-blue-100"
          required
        />

        {/* Priority */}
        <select
          name="priority"
          value={formData.priority}
          onChange={handleChange}
          className="border border-slate-300 rounded-2xl px-5 py-4 outline-none focus:ring-4 focus:ring-blue-100"
        >
          <option value="Normal">Normal</option>

          <option value="High">High</option>

          <option value="Urgent">Urgent</option>
        </select>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="md:col-span-2 bg-gradient-to-r from-blue-600 to-blue-900 text-white py-4 rounded-2xl font-semibold hover:scale-[1.01] transition disabled:opacity-70"
        >
          {loading ? "Registering..." : "Register Parcel"}
        </button>
      </form>
    </div>
  );
}
