import React from "react";

import TrackingStatusBadge from "../tracking/TrackingStatusBadge";

export default function AssignmentCard({
  parcel,
}) {

  return (
    <div className="border border-slate-200 rounded-2xl p-5 hover:shadow-lg transition">

      {/* Top */}
      <div className="flex items-start justify-between mb-5">

        <div>

          <h3 className="text-lg font-bold text-slate-900 mb-1">
            {parcel.senderName} → {parcel.receiverName}
          </h3>

          <p className="text-slate-500 text-sm">
            {parcel.source} → {parcel.destination}
          </p>
        </div>

        <TrackingStatusBadge
          status={parcel.status}
        />
      </div>

      {/* Parcel Info */}
      <div className="grid grid-cols-2 gap-4 mb-5">

        <div className="bg-slate-50 rounded-xl p-4">

          <p className="text-xs text-slate-500 mb-1">
            Priority
          </p>

          <h4 className="font-bold text-slate-900">
            {parcel.priority}
          </h4>
        </div>

        <div className="bg-slate-50 rounded-xl p-4">

          <p className="text-xs text-slate-500 mb-1">
            Weight
          </p>

          <h4 className="font-bold text-slate-900">
            {parcel.weight} KG
          </h4>
        </div>
      </div>

      {/* Tracking Count */}
      <div className="flex items-center justify-between">

        <div>
          <p className="text-xs text-slate-500 mb-1">
            Tracking Events
          </p>

          <h4 className="text-xl font-bold text-blue-700">
            {parcel.trackingHistory?.length || 0}
          </h4>
        </div>

        <div className="text-right">
          <p className="text-xs text-slate-500 mb-1">
            Parcel ID
          </p>

          <h4 className="text-sm font-semibold text-slate-700">
            {parcel._id.slice(-6)}
          </h4>
        </div>
      </div>
    </div>
  );
}