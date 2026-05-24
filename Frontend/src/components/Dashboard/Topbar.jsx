
import React from "react";

export default function Topbar() {
  return (
    <header className="bg-white border-b border-slate-200 px-8 py-5 flex items-center justify-between shadow-sm">

      <div>
        <h2 className="text-2xl font-bold text-slate-900">
          Dashboard
        </h2>

        <p className="text-slate-500 mt-1">
          Welcome back to Dynamic Mail Transmission System
        </p>
      </div>

      {/* User */}
      <div className="flex items-center gap-4">

        <div className="text-right hidden sm:block">
          <h4 className="font-semibold text-slate-900">
            Admin User
          </h4>

          <p className="text-sm text-slate-500">
            System Administrator
          </p>
        </div>

        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-blue-800 flex items-center justify-center text-white font-bold text-lg">
          A
        </div>
      </div>
    </header>
  );
}
