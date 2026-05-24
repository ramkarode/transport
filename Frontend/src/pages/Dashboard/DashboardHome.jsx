import React from "react";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import DashboardCard from "../../components/dashboard/DashboardCard";

export default function DashboardHome() {
  return (
    <DashboardLayout>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">

        <DashboardCard
          title="Total Parcels"
          value="1,245"
          subtitle="Overall registered parcels"
        />

        <DashboardCard
          title="In Transit"
          value="328"
          subtitle="Currently moving"
        />

        <DashboardCard
          title="Delivered"
          value="876"
          subtitle="Successfully delivered"
        />

        <DashboardCard
          title="Active Hubs"
          value="24"
          subtitle="Connected logistics hubs"
        />
      </div>

      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-900 rounded-3xl p-10 text-white shadow-2xl">

        <h2 className="text-4xl font-bold mb-4 leading-tight">
          Smart Mail Transmission Using Best Connectivity
        </h2>

        <p className="text-blue-100 max-w-3xl leading-relaxed text-lg">
          This system automates parcel transmission by selecting the
          best transport mode and optimized route using a Greedy
          Approach. It improves delivery efficiency, tracking,
          and transport management across multiple hubs.
        </p>
      </div>
    </DashboardLayout>
  );
}
