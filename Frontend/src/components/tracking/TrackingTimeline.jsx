import React from "react";
import TimelineItem from "./TimelineItem";

export default function TrackingTimeline({
  trackingHistory,
}) {

  return (
    <div className="relative border-l-2 border-blue-200 ml-3">

      {trackingHistory.map((item, index) => (
        <TimelineItem
          key={index}
          item={item}
        />
      ))}
    </div>
  );
}