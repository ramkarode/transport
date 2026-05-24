import React from "react";

import HubCard from "./HubCard";

export default function HubGrid({
  hubs,
  loading,
}) {

  if (loading) {
    return (
      <div className="text-center py-10">
        Loading...
      </div>
    );
  }

  if (hubs.length === 0) {
    return (
      <div className="bg-white rounded-3xl p-10 text-center border border-slate-200">
        No Hubs Found
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

      {hubs.map((hub) => (
        <HubCard
          key={hub._id}
          hub={hub}
        />
      ))}
    </div>
  );
}