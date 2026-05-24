import React from "react";

export default function StatsCard({
  title,
  value,
  color,
}) {

  return (
    <div className="bg-white rounded-3xl p-7 border border-slate-200 shadow-sm">

      <p className="text-slate-500 mb-3">
        {title}
      </p>

      <h2
        className={`text-4xl font-bold ${color}`}
      >
        {value}
      </h2>
    </div>
  );
}