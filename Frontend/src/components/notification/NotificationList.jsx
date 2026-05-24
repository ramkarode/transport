import React from "react";

import NotificationCard from "./NotificationCard";

export default function NotificationList({
  notifications,
  loading,
  fetchNotifications,
}) {

  if (loading) {
    return (
      <div className="text-center py-10">
        Loading...
      </div>
    );
  }

  if (notifications.length === 0) {
    return (
      <div className="bg-white rounded-3xl p-10 border border-slate-200 text-center">

        No Notifications Found

      </div>
    );
  }

  return (
    <div className="space-y-5">

      {notifications.map(
        (notification) => (
          <NotificationCard
            key={notification._id}
            notification={notification}
            fetchNotifications={fetchNotifications}
          />
        ),
      )}
    </div>
  );
}