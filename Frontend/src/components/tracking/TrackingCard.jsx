import React from "react";
import TrackingTimeline from "./TrackingTimeline";

export default function TrackingCard({
  trackingData,
}) {

  const { parcel, trackingHistory } = trackingData;

  return (
    <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200">

      {/* Parcel Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

        <div>
          <p className="text-slate-500 text-sm mb-1">
            Sender
          </p>

          <h3 className="text-xl font-bold text-slate-900">
            {parcel.senderName}
          </h3>
        </div>

        <div>
          <p className="text-slate-500 text-sm mb-1">
            Receiver
          </p>

          <h3 className="text-xl font-bold text-slate-900">
            {parcel.receiverName}
          </h3>
        </div>

        <div>
          <p className="text-slate-500 text-sm mb-1">
            Current Status
          </p>

          <h3 className="text-xl font-bold text-blue-700">
            {parcel.status}
          </h3>
        </div>
      </div>

      {/* Timeline */}
      <TrackingTimeline trackingHistory={trackingHistory} />
    </div>
  );
}