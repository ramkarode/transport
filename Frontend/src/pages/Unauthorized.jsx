import React from "react";

import {
  ShieldX,
} from "lucide-react";

export default function Unauthorized() {

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-6">

      <div className="bg-white rounded-3xl p-10 shadow-xl border border-slate-200 text-center max-w-lg w-full">

        <div className="flex justify-center mb-6">

          <div className="bg-red-100 p-5 rounded-full">

            <ShieldX
              size={60}
              className="text-red-600"
            />
          </div>
        </div>

        <h1 className="text-4xl font-bold text-slate-900 mb-4">
          Access Denied
        </h1>

        <p className="text-slate-500 mb-8 leading-relaxed">
          You do not have permission
          to access this page.
        </p>

        <button
          onClick={() =>
            window.history.back()
          }
          className="bg-gradient-to-r from-blue-600 to-blue-900 text-white px-8 py-4 rounded-2xl font-semibold"
        >
          Go Back
        </button>
      </div>
    </div>
  );
}