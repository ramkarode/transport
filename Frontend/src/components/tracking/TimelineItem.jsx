import React from "react";

export default function TimelineItem({ item }) {

  return (
    <div className="mb-10 ml-8 relative">

      {/* Dot */}
      <div className="absolute -left-[42px] top-1 w-5 h-5 bg-blue-600 rounded-full border-4 border-white shadow" />

      <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200">

        <div className="flex items-center justify-between mb-2">

          <h3 className="text-lg font-bold text-slate-900">
            {item.status}
          </h3>

          <span className="text-sm text-slate-500">
            {new Date(item.createdAt).toLocaleString()}
          </span>
        </div>

        <p className="text-blue-700 font-medium mb-2">
          {item.location}
        </p>

        <p className="text-slate-600">
          {item.description}
        </p>
      </div>
    </div>
  );
}