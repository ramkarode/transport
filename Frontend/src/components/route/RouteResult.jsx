import React from "react";

import RouteStep from "./RouteStep";

export default function RouteResult({
  routeData,
}) {

  return (
    <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">

      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-10">

        <div>
          <h2 className="text-3xl font-bold text-slate-900 mb-2">
            Optimized Route
          </h2>

          <p className="text-slate-500">
            Best possible route selected using Greedy Approach.
          </p>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap gap-5">

          <div className="bg-blue-50 px-6 py-4 rounded-2xl">

            <p className="text-sm text-slate-500 mb-1">
              Total Time
            </p>

            <h3 className="text-2xl font-bold text-blue-700">
              {routeData.totalTime} hrs
            </h3>
          </div>

          <div className="bg-green-50 px-6 py-4 rounded-2xl">

            <p className="text-sm text-slate-500 mb-1">
              Total Cost
            </p>

            <h3 className="text-2xl font-bold text-green-700">
              ₹ {routeData.totalCost}
            </h3>
          </div>
        </div>
      </div>

      {/* Route Steps */}
      <div className="space-y-5">

        {routeData.route.map((step, index) => (
          <RouteStep
            key={index}
            step={step}
          />
        ))}
      </div>
    </div>
  );
}