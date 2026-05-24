import React from "react";

import AssignmentCard from "./AssignmentCard";

export default function ParcelQueue({
  hubs,
}) {

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

      {hubs.map((hub) => (

        <div
          key={hub._id}
          className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm"
        >

          {/* Header */}
          <div className="flex items-center justify-between mb-6">

            <div>

              <h2 className="text-2xl font-bold text-slate-900 mb-1">
                {hub.name}
              </h2>

              <p className="text-slate-500">
                {hub.city}
              </p>
            </div>

            <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold">

              {hub.activeParcels.length} Parcels

            </span>
          </div>

          {/* Capacity */}
          <div className="mb-6">

            <div className="flex items-center justify-between mb-2">

              <p className="text-sm text-slate-500">
                Capacity Usage
              </p>

              <p className="font-semibold text-slate-700">

                {hub.activeParcels.length}/{hub.capacity}

              </p>
            </div>

            <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">

              <div
                style={{
                  width: `${
                    (hub.activeParcels.length /
                      hub.capacity) *
                    100
                  }%`,
                }}
                className="bg-gradient-to-r from-blue-600 to-blue-900 h-full rounded-full"
              />
            </div>
          </div>

          {/* Parcel Queue */}
          <div className="space-y-4">

            {hub.activeParcels.length === 0 ? (

              <div className="border border-dashed border-slate-300 rounded-2xl py-10 text-center">

                <p className="text-slate-500">
                  No Parcels Assigned
                </p>

              </div>

            ) : (

              hub.activeParcels.map((parcel) => (
                <AssignmentCard
                  key={parcel._id}
                  parcel={parcel}
                />
              ))

            )}
          </div>
        </div>
      ))}
    </div>
  );
}