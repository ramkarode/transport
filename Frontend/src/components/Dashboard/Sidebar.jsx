import React from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  Package,
  Route,
  MapPinned,
  Bell,
  LogOut,
  Building2,
  GitBranch,
  BarChart3,
} from "lucide-react";

export default function Sidebar() {

  const navigate = useNavigate();

  /**
   * Current User
   */
  const user = JSON.parse(
    localStorage.getItem("user"),
  );

  /**
   * Logout
   */
  const handleLogout = () => {

    localStorage.removeItem("token");

    localStorage.removeItem("user");

    navigate("/login");
  };

  /**
   * Role Based Menu
   */
  const menuItems = [
    {
      title: "Analytics",
      path: "/analytics",
      icon: <BarChart3 size={20} />,

      roles: [
        "Admin",
        "Transport Manager",
      ],
    },

    {
      title: "Mail Registration",
      path: "/mail-registration",
      icon: <Package size={20} />,

      roles: [
        "Admin",
        "Staff",
      ],
    },

    {
      title: "Route Optimization",
      path: "/route-optimization",
      icon: <Route size={20} />,

      roles: [
        "Admin",
        "Transport Manager",
      ],
    },

    {
      title: "Tracking",
      path: "/tracking",
      icon: <MapPinned size={20} />,

      roles: [
        "Admin",
        "Staff",
        "Transport Manager",
        "Customer",
      ],
    },

    {
      title: "Notifications",
      path: "/notifications",
      icon: <Bell size={20} />,

      roles: [
        "Admin",
        "Staff",
        "Transport Manager",
        "Customer",
      ],
    },

    {
      title: "Tracking Management",
      path: "/tracking-management",
      icon: <MapPinned size={20} />,

      roles: [
        "Admin",
        "Staff",
      ],
    },

    {
      title: "Hub Management",
      path: "/hub-management",
      icon: <Building2 size={20} />,

      roles: [
        "Admin",
        "Transport Manager",
      ],
    },

    {
      title: "Parcel Assignment",
      path: "/parcel-assignment",
      icon: <GitBranch size={20} />,

      roles: [
        "Admin",
        "Transport Manager",
      ],
    },
  ];

  /**
   * Filter Menu By Role
   */
  const filteredMenu =
    menuItems.filter((item) =>
      item.roles.includes(
        user?.role,
      ),
    );

  return (
    <aside className="hidden lg:flex w-72 bg-slate-950 text-white flex-col justify-between shadow-2xl">

      <div>

        {/* Logo */}
        <div className="p-7 border-b border-slate-800">

          <h1 className="text-2xl font-bold leading-tight">
            Dynamic Mail
          </h1>

          <p className="text-slate-400 text-sm mt-1">
            Transmission System
          </p>

          {/* User Role */}
          <div className="mt-5">

            <span className="bg-blue-600 text-white text-xs font-semibold px-4 py-2 rounded-full">

              {user?.role || "User"}

            </span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-5 space-y-2">

          {filteredMenu.map(
            (item, index) => (
              <Link
                key={index}
                to={item.path}
                className="w-full flex items-center gap-4 px-5 py-4 rounded-2xl hover:bg-blue-600 transition duration-300 text-left"
              >

                {item.icon}

                <span className="font-medium">
                  {item.title}
                </span>

              </Link>
            ),
          )}
        </nav>
      </div>

      {/* Logout */}
      <div className="p-5 border-t border-slate-800">

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-4 px-5 py-4 rounded-2xl hover:bg-red-500 transition duration-300"
        >

          <LogOut size={20} />

          Logout

        </button>
      </div>
    </aside>
  );
}