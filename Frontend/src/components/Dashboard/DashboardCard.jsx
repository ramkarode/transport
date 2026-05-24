
import React from "react";

export default function DashboardCard({ title, value, subtitle }) {
  return (
    <div className="bg-white rounded-3xl p-7 shadow-sm border border-slate-200 hover:shadow-xl transition duration-300">

      <p className="text-slate-500 text-sm font-medium mb-3">
        {title}
      </p>

      <h2 className="text-4xl font-bold text-slate-900 mb-2">
        {value}
      </h2>

      <p className="text-slate-400 text-sm">
        {subtitle}
      </p>
    </div>
  );
}
