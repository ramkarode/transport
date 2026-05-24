import React, {
  useEffect,
  useState,
} from "react";

import DashboardLayout from "../../components/dashboard/DashboardLayout";

import NotificationList from "../../components/notification/NotificationList";

import axiosInstance from "../../services/axiosInstance";

import socket from "../../socket/socket";

export default function Notifications() {

  const [
    notifications,
    setNotifications,
  ] = useState([]);

  const [
    loading,
    setLoading,
  ] = useState(false);

  /**
   * Fetch Notifications
   */
  const fetchNotifications =
    async () => {

      try {

        setLoading(true);

        const response =
          await axiosInstance.get(
            "/notification",
          );

        setNotifications(
          response.data
            .notifications || [],
        );

      } catch (error) {

        console.error(
          "Notification Fetch Error:",
          error,
        );

      } finally {

        setLoading(false);
      }
    };

  /**
   * Initial Fetch
   */
  useEffect(() => {

    fetchNotifications();

  }, []);

  /**
   * Real-Time Notifications
   */
  useEffect(() => {

    /**
     * New Notification Event
     */
    socket.on(
      "newNotification",
      (data) => {

        console.log(
          "🔔 New Notification:",
          data,
        );

        /**
         * Prevent Duplicate
         */
        setNotifications(
          (prev) => {

            const exists =
              prev.some(
                (item) =>
                  item._id ===
                  data._id,
              );

            if (exists) {
              return prev;
            }

            return [
              data,
              ...prev,
            ];
          },
        );
      },
    );

    /**
     * Notification Read Event
     */
    socket.on(
      "notificationRead",
      (data) => {

        console.log(
          "✅ Notification Read:",
          data,
        );

        setNotifications(
          (prev) =>
            prev.map(
              (notification) => {

                if (
                  notification._id ===
                  data.notificationId
                ) {

                  return {
                    ...notification,

                    isRead: true,
                  };
                }

                return notification;
              },
            ),
        );
      },
    );

    /**
     * Cleanup
     */
    return () => {

      socket.off(
        "newNotification",
      );

      socket.off(
        "notificationRead",
      );
    };

  }, []);

  return (
    <DashboardLayout>

      {/* Header */}
      <div className="mb-8">

        <h1 className="text-4xl font-bold text-slate-900 mb-2">

          Notifications

        </h1>

        <p className="text-slate-500">

          Real-time logistics alerts
          and updates.

        </p>
      </div>

      {/* Notification List */}
      <NotificationList
        notifications={notifications}
        loading={loading}
        fetchNotifications={fetchNotifications}
      />

    </DashboardLayout>
  );
}