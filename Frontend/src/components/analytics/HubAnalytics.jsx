import React from "react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function HubAnalytics({
  analytics,
}) {

  const data = [
    {
      name: "Total Hubs",
      value: analytics.totalHubs,
    },
    {
      name: "Active Hubs",
      value: analytics.activeHubs,
    },
  ];

  return (
    <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">

      <h2 className="text-2xl font-bold text-slate-900 mb-6">
        Hub Analytics
      </h2>

      <div className="h-[350px]">

        <ResponsiveContainer
          width="100%"
          height="100%"
        >

          <BarChart data={data}>

            <XAxis dataKey="name" />

            <YAxis />

            <Tooltip />

            <Bar
              dataKey="value"
              fill="#2563eb"
              radius={[10, 10, 0, 0]}
            />

          </BarChart>

        </ResponsiveContainer>
      </div>
    </div>
  );
}