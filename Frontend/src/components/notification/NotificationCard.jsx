import React from "react";

import axiosInstance from "../../services/axiosInstance";

export default function NotificationCard({
  notification,
  fetchNotifications,
}) {

  const markAsRead = async () => {
    try {

      await axiosInstance.put(
        `/notification/${notification._id}/read`,
      );

      fetchNotifications();

    } catch (error) {

      console.error(error);
    }
  };

  return (
    <div
      className={`rounded-3xl p-6 border shadow-sm transition ${
        notification.isRead
          ? "bg-white border-slate-200"
          : "bg-blue-50 border-blue-200"
      }`}
    >

      <div className="flex items-start justify-between gap-5">

        <div>

          <h2 className="text-xl font-bold text-slate-900 mb-2">
            {notification.title}
          </h2>

          <p className="text-slate-600 leading-relaxed">
            {notification.message}
          </p>

          <p className="text-sm text-slate-400 mt-4">
            {new Date(
              notification.createdAt,
            ).toLocaleString()}
          </p>
        </div>

        {!notification.isRead && (
          <button
            onClick={markAsRead}
            className="bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-semibold"
          >
            Mark Read
          </button>
        )}
      </div>
    </div>
  );
}