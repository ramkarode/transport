import React from "react";

export default function TrackingStatusBadge({
  status,
}) {

  const statusStyles = {
    Registered:
      "bg-yellow-100 text-yellow-700",

    Dispatched:
      "bg-blue-100 text-blue-700",

    "Reached Hub":
      "bg-purple-100 text-purple-700",

    "In Transit":
      "bg-indigo-100 text-indigo-700",

    "Out For Delivery":
      "bg-orange-100 text-orange-700",

    Delivered:
      "bg-green-100 text-green-700",
  };

  return (
    <span
      className={`px-4 py-2 rounded-full text-sm font-semibold ${statusStyles[status]}`}
    >
      {status}
    </span>
  );
}