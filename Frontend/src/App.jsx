import React from "react";

import { Routes, Route, Navigate } from "react-router-dom";

// Auth Pages
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/Register";

// Dashboard Pages
import DashboardHome from "./pages/dashboard/DashboardHome";
import MailRegistration from "./pages/dashboard/MailRegistration";
import ParcelTracking from "./pages/dashboard/ParcelTracking";
import RouteOptimization from "./pages/dashboard/RouteOptimization";
import TrackingManagement from "./pages/dashboard/TrackingManagement";
import HubManagement from "./pages/dashboard/HubManagement";
import ParcelAssignment from "./pages/dashboard/ParcelAssignment";
import AnalyticsDashboard from "./pages/dashboard/AnalyticsDashboard";

// Route Protection
import RoleProtectedRoute from "./routes/RoleProtectedRoute.jsx";

// Unauthorized Page
import Unauthorized from "./pages/Unauthorized";
import Notifications from "./pages/Dashboard/Notifications.jsx";

export default function App() {
  return (
    <Routes>
      {/* Redirect */}
      <Route path="/" element={<Navigate to="/login" />} />

      {/* Public Routes */}
      <Route path="/login" element={<LoginPage />} />

      <Route path="/register" element={<RegisterPage />} />

      <Route path="/unauthorized" element={<Unauthorized />} />

      {/* Dashboard */}
      <Route
        path="/dashboard"
        element={
          <RoleProtectedRoute
            allowedRoles={["Admin", "Staff", "Transport Manager", "Customer"]}
          >
            <DashboardHome />
          </RoleProtectedRoute>
        }
      />

      {/* Mail Registration */}
      <Route
        path="/mail-registration"
        element={
          <RoleProtectedRoute allowedRoles={["Admin", "Staff"]}>
            <MailRegistration />
          </RoleProtectedRoute>
        }
      />

      {/* Parcel Tracking */}
      <Route
        path="/tracking"
        element={
          <RoleProtectedRoute
            allowedRoles={["Admin", "Staff", "Transport Manager", "Customer"]}
          >
            <ParcelTracking />
          </RoleProtectedRoute>
        }
      />

      {/* Route Optimization */}
      <Route
        path="/route-optimization"
        element={
          <RoleProtectedRoute allowedRoles={["Admin", "Transport Manager"]}>
            <RouteOptimization />
          </RoleProtectedRoute>
        }
      />

      {/* Tracking Management */}
      <Route
        path="/tracking-management"
        element={
          <RoleProtectedRoute allowedRoles={["Admin", "Staff"]}>
            <TrackingManagement />
          </RoleProtectedRoute>
        }
      />

      {/* Hub Management */}
      <Route
        path="/hub-management"
        element={
          <RoleProtectedRoute allowedRoles={["Admin", "Transport Manager"]}>
            <HubManagement />
          </RoleProtectedRoute>
        }
      />

      {/* Parcel Assignment */}
      <Route
        path="/parcel-assignment"
        element={
          <RoleProtectedRoute allowedRoles={["Admin", "Transport Manager"]}>
            <ParcelAssignment />
          </RoleProtectedRoute>
        }
      />

      {/* Analytics */}
      <Route
        path="/analytics"
        element={
          <RoleProtectedRoute allowedRoles={["Admin", "Transport Manager"]}>
            <AnalyticsDashboard />
          </RoleProtectedRoute>
        }
      />

      {/* 404 */}
      <Route
        path="*"
        element={
          <div className="min-h-screen flex items-center justify-center bg-slate-100">
            <h1 className="text-4xl font-bold text-slate-700">
              404 | Page Not Found
            </h1>
          </div>
        }
      />
      <Route
        path="/notifications"
        element={
          <RoleProtectedRoute
            allowedRoles={["Admin", "Staff", "Transport Manager", "Customer"]}
          >
            <Notifications />
          </RoleProtectedRoute>
        }
      />
    </Routes>
  );
}
