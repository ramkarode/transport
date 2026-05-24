import React, { useState } from "react";
import axiosInstance from "../../services/axiosInstance";
import { useNavigate } from "react-router";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    const { name, email, password, confirmPassword } = formData;

    if (!name || !email || !password || !confirmPassword) {
      return setError("All fields are required");
    }

    if (password !== confirmPassword) {
      return setError("Passwords do not match");
    }

    try {
      setLoading(true);

      const response = await axiosInstance.post("/auth/register", {
        name,
        email,
        password,
      });

      localStorage.setItem("token", response.data.token);

      setSuccess("Account created successfully");

      setTimeout(() => {
        navigate("/Login");
      }, 1000);
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 flex items-center justify-center p-5">
      <div className="w-full max-w-6xl bg-white rounded-3xl overflow-hidden shadow-2xl grid grid-cols-1 lg:grid-cols-2">
        {/* LEFT */}
        <div className="p-8 sm:p-12 lg:p-16 flex flex-col justify-center">
          <h2 className="text-4xl font-bold text-slate-900 mb-3">
            Create Account
          </h2>

          <p className="text-slate-500 mb-8 leading-relaxed">
            Register to access Dynamic Mail Transmission System
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {error && (
              <div className="bg-red-100 text-red-600 px-4 py-3 rounded-xl text-sm font-medium">
                {error}
              </div>
            )}

            {success && (
              <div className="bg-green-100 text-green-600 px-4 py-3 rounded-xl text-sm font-medium">
                {success}
              </div>
            )}

            <input
              type="text"
              name="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-slate-300 rounded-xl px-5 py-4 outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition"
            />

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-slate-300 rounded-xl px-5 py-4 outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition"
            />

            <input
              type="password"
              name="password"
              placeholder="Create password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border border-slate-300 rounded-xl px-5 py-4 outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition"
            />

            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full border border-slate-300 rounded-xl px-5 py-4 outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-800 text-white py-4 rounded-xl font-semibold hover:scale-[1.01] transition duration-300 shadow-lg disabled:opacity-70"
            >
              {loading ? "Creating Account..." : "Register"}
            </button>
          </form>

          <p className="mt-7 text-center text-sm text-slate-500">
            Already have an account?{" "}
            <span className="text-blue-600 font-semibold cursor-pointer hover:underline">
              Login
            </span>
          </p>
        </div>

        {/* RIGHT */}
        <div className="hidden lg:flex bg-gradient-to-br from-blue-600 to-blue-900 text-white p-16 flex-col justify-center">
          <h2 className="text-5xl font-bold leading-tight mb-8">
            Dynamic Mail Transmission System
          </h2>

          <ul className="space-y-5 text-lg">
            <li>✔ Faster parcel movement</li>
            <li>✔ Greedy route optimization</li>
            <li>✔ Multi-mode transport system</li>
            <li>✔ Real-time tracking updates</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
