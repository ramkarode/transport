import React, { useState } from "react";

import DashboardLayout from "../../components/dashboard/DashboardLayout";

import RouteForm from "../../components/route/RouteForm";
import RouteResult from "../../components/route/RouteResult";

export default function RouteOptimization() {

  const [routeData, setRouteData] = useState(null);

  return (
    <DashboardLayout>

      {/* Heading */}
      <div className="mb-8">

        <h1 className="text-4xl font-bold text-slate-900 mb-2">
          Route Optimization Engine
        </h1>

        <p className="text-slate-500">
          Smart route selection using Greedy Algorithm and best connectivity.
        </p>
      </div>

      {/* Form */}
      <RouteForm setRouteData={setRouteData} />

      {/* Result */}
      {routeData && (
        <div className="mt-8">
          <RouteResult routeData={routeData} />
        </div>
      )}

    </DashboardLayout>
  );
}