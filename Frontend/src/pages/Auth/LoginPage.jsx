import React, { useState } from "react";

import axiosInstance from "../../services/axiosInstance";

import { useNavigate } from "react-router-dom";

export default function LoginPage() {

  const [email, setEmail] = useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    setSuccess("");

    /**
     * Validation
     */
    if (!email || !password) {
      return setError(
        "All fields are required",
      );
    }

    try {

      setLoading(true);

      /**
       * Login API
       */
      const response =
        await axiosInstance.post(
          "/auth/login",
          {
            email,
            password,
          },
        );

      /**
       * Store Token
       */
      localStorage.setItem(
        "token",
        response.data.token,
      );

      /**
       * Store User
       */
      localStorage.setItem(
        "user",
        JSON.stringify(
          response.data.user,
        ),
      );

      setSuccess(
        "Login successful",
      );

      /**
       * Role Based Navigation
       */
      setTimeout(() => {

        const role =
          response.data.user.role;

        /**
         * Admin
         */
        if (role === "Admin") {

          navigate("/analytics");
        }

        /**
         * Staff
         */
        else if (
          role === "Staff"
        ) {

          navigate(
            "/mail-registration",
          );
        }

        /**
         * Transport Manager
         */
        else if (
          role ===
          "Transport Manager"
        ) {

          navigate(
            "/hub-management",
          );
        }

        /**
         * Customer
         */
        else {

          navigate("/tracking");
        }

      }, 1000);

    } catch (err) {

      setError(
        err.response?.data?.message ||
          "Login failed",
      );

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
            Secure Mail Access
          </h2>

          <p className="text-slate-500 mb-8 leading-relaxed">
            Login to manage and
            transmit emails
            dynamically
          </p>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-5"
          >

            {/* Error */}
            {error && (
              <div className="bg-red-100 text-red-600 px-4 py-3 rounded-xl text-sm font-medium">
                {error}
              </div>
            )}

            {/* Success */}
            {success && (
              <div className="bg-green-100 text-green-600 px-4 py-3 rounded-xl text-sm font-medium">
                {success}
              </div>
            )}

            {/* Email */}
            <input
              type="email"
              placeholder="Enter your registered email"
              value={email}
              onChange={(e) =>
                setEmail(
                  e.target.value,
                )
              }
              className="w-full border border-slate-300 rounded-xl px-5 py-4 outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition"
            />

            {/* Password */}
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) =>
                setPassword(
                  e.target.value,
                )
              }
              className="w-full border border-slate-300 rounded-xl px-5 py-4 outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition"
            />

            {/* Options */}
            <div className="flex items-center justify-between text-sm text-slate-500">

              <label className="flex items-center gap-2 cursor-pointer">

                <input
                  type="checkbox"
                  className="accent-blue-600"
                />

                Remember me
              </label>

              <span className="cursor-pointer hover:text-blue-600 transition">

                Forgot password?

              </span>
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-800 text-white py-4 rounded-xl font-semibold hover:scale-[1.01] transition duration-300 shadow-lg disabled:opacity-70"
            >

              {loading
                ? "Logging In..."
                : "Login"}

            </button>
          </form>

          {/* Register */}
          <p className="mt-7 text-center text-sm text-slate-500">

            New to platform?{" "}

            <span
              onClick={() =>
                navigate(
                  "/register",
                )
              }
              className="text-blue-600 font-semibold cursor-pointer hover:underline"
            >

              Create Account

            </span>
          </p>
        </div>

        {/* RIGHT */}
        <div className="hidden lg:flex bg-gradient-to-br from-blue-600 to-blue-900 text-white p-16 flex-col justify-center">

          <h2 className="text-5xl font-bold leading-tight mb-8">

            Dynamic Mail Transmission System

          </h2>

          <ul className="space-y-5 text-lg">

            <li>
              ✔ Real-time parcel tracking
            </li>

            <li>
              ✔ Smart logistics routing
            </li>

            <li>
              ✔ Secure authentication
            </li>

            <li>
              ✔ Intelligent hub management
            </li>

          </ul>
        </div>
      </div>
    </div>
  );
}