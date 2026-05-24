import React from "react";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function ParcelAnalytics({
  analytics,
}) {

  const data = [
    {
      name: "Delivered",
      value:
        analytics.deliveredParcels,
    },
    {
      name: "In Transit",
      value:
        analytics.inTransitParcels,
    },
    {
      name: "Reached Hub",
      value:
        analytics.reachedHubParcels,
    },
  ];

  const COLORS = [
    "#16a34a",
    "#2563eb",
    "#9333ea",
  ];

  return (
    <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">

      <h2 className="text-2xl font-bold text-slate-900 mb-6">
        Parcel Analytics
      </h2>

      <div className="h-[350px]">

        <ResponsiveContainer
          width="100%"
          height="100%"
        >

          <PieChart>

            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={120}
              dataKey="value"
              label
            >

              {data.map((entry, index) => (
                <Cell
                  key={index}
                  fill={
                    COLORS[index %
                    COLORS.length]
                  }
                />
              ))}
            </Pie>

            <Tooltip />

          </PieChart>

        </ResponsiveContainer>
      </div>
    </div>
  );
}