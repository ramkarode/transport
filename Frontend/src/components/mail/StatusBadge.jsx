import React from "react";

export default function StatusBadge({ status }) {

  const statusStyles = {
    Registered: "bg-yellow-100 text-yellow-700",
    Transit: "bg-blue-100 text-blue-700",
    Delivered: "bg-green-100 text-green-700",
  };

  return (
    <span
      className={`px-4 py-2 rounded-full text-sm font-semibold ${statusStyles[status]}`}
    >
      {status}
    </span>
  );
}