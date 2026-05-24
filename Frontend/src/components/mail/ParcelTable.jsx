import React from "react";
import StatusBadge from "./StatusBadge";

export default function ParcelTable({ parcels, loading }) {
  return (
    <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200 overflow-x-auto">
      <div className="flex items-center justify-between mb-7">
        <h2 className="text-2xl font-bold text-slate-900">
          Registered Parcels
        </h2>
      </div>

      <table className="w-full min-w-[900px]">
        <thead>
          <tr className="border-b border-slate-200 text-left text-slate-500">
            <th className="pb-4">Sender</th>
            <th className="pb-4">Receiver</th>
            <th className="pb-4">Source</th>
            <th className="pb-4">Destination</th>
            <th className="pb-4">Weight</th>
            <th className="pb-4">Priority</th>
            <th className="pb-4">Status</th>
          </tr>
        </thead>

        <tbody>
          {loading ? (
            <tr>
              <td className="py-6">Loading...</td>
            </tr>
          ) : parcels.length === 0 ? (
            <tr>
              <td className="py-6">No Parcels Found</td>
            </tr>
          ) : (
            parcels.map((parcel) => (
              <tr
                key={parcel._id}
                className="border-b border-slate-100 hover:bg-slate-50 transition"
              >
                <td className="py-5 font-medium text-slate-800">
                  {parcel.senderName}
                </td>

                <td className="py-5">{parcel.receiverName}</td>

                <td className="py-5">{parcel.source}</td>

                <td className="py-5">{parcel.destination}</td>

                <td className="py-5">{parcel.weight} KG</td>

                <td className="py-5">{parcel.priority}</td>

                <td className="py-5">
                  <StatusBadge status={parcel.status} />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
