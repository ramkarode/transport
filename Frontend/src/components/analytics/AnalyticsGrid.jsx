import React from "react";

import StatsCard from "./StatsCard";

export default function AnalyticsGrid({
  analytics,
}) {

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

      <StatsCard
        title="Total Parcels"
        value={analytics.totalParcels}
        color="text-blue-700"
      />

      <StatsCard
        title="Delivered Parcels"
        value={analytics.deliveredParcels}
        color="text-green-700"
      />

      <StatsCard
        title="In Transit"
        value={analytics.inTransitParcels}
        color="text-orange-700"
      />

      <StatsCard
        title="Hub Capacity Usage"
        value={`${analytics.capacityUsage}%`}
        color="text-purple-700"
      />
    </div>
  );
}