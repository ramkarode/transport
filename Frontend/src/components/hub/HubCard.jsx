import React from "react";

export default function HubCard({ hub }) {

  const usage =
    (hub.activeParcels.length / hub.capacity) *
    100;

  return (
    <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-xl transition">

      <div className="flex items-start justify-between mb-6">

        <div>

          <h2 className="text-2xl font-bold text-slate-900 mb-1">
            {hub.name}
          </h2>

          <p className="text-slate-500">
            {hub.city}, {hub.state}
          </p>
        </div>

        <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold">
          {hub.status}
        </span>
      </div>

      {/* Capacity */}
      <div className="mb-5">

        <div className="flex items-center justify-between mb-2">

          <p className="text-slate-500 text-sm">
            Capacity Usage
          </p>

          <p className="font-semibold text-slate-700">
            {hub.activeParcels.length}/
            {hub.capacity}
          </p>
        </div>

        <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">

          <div
            style={{
              width: `${usage}%`,
            }}
            className="bg-gradient-to-r from-blue-600 to-blue-900 h-full rounded-full"
          />
        </div>
      </div>

      {/* Parcel Count */}
      <div className="bg-slate-50 rounded-2xl p-5">

        <p className="text-slate-500 mb-2">
          Active Parcels
        </p>

        <h3 className="text-3xl font-bold text-slate-900">
          {hub.activeParcels.length}
        </h3>
      </div>
    </div>
  );
}