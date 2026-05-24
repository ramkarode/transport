import React, {
  useEffect,
  useState,
} from "react";

import DashboardLayout from "../../components/dashboard/DashboardLayout";

import AnalyticsGrid from "../../components/analytics/AnalyticsGrid";

import ParcelAnalytics from "../../components/analytics/ParcelAnalytics";

import HubAnalytics from "../../components/analytics/HubAnalytics";

import axiosInstance from "../../services/axiosInstance";

export default function AnalyticsDashboard() {

  const [analytics, setAnalytics] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  /**
   * Fetch Analytics
   */
  const fetchAnalytics =
    async () => {
      try {

        setLoading(true);

        const response =
          await axiosInstance.get(
            "/analytics/overview",
          );

        setAnalytics(
          response.data.analytics,
        );

      } catch (error) {

        console.error(error);

      } finally {

        setLoading(false);
      }
    };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  if (loading || !analytics) {
    return (
      <DashboardLayout>
        <div className="text-center py-20">
          Loading Analytics...
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>

      <div className="mb-8">

        <h1 className="text-4xl font-bold text-slate-900 mb-2">
          Analytics Dashboard
        </h1>

        <p className="text-slate-500">
          Real-time logistics insights and system monitoring.
        </p>
      </div>

      <AnalyticsGrid analytics={analytics} />

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-8">

        <ParcelAnalytics analytics={analytics} />

        <HubAnalytics analytics={analytics} />
      </div>

    </DashboardLayout>
  );
}