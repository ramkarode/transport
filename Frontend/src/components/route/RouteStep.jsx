import React from "react";

export default function RouteStep({ step }) {

  return (
    <div className="border border-slate-200 rounded-2xl p-6 hover:shadow-lg transition">

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

        {/* Left */}
        <div>

          <h3 className="text-2xl font-bold text-slate-900 mb-2">
            {step.from} → {step.to}
          </h3>

          <p className="text-slate-500">
            Transport Mode:

            <span className="ml-2 text-blue-700 font-semibold">
              {step.mode}
            </span>
          </p>
        </div>

        {/* Right */}
        <div className="flex gap-6">

          <div>
            <p className="text-sm text-slate-500 mb-1">
              Time
            </p>

            <h4 className="text-xl font-bold text-blue-700">
              {step.time} hrs
            </h4>
          </div>

          <div>
            <p className="text-sm text-slate-500 mb-1">
              Cost
            </p>

            <h4 className="text-xl font-bold text-green-700">
              ₹ {step.cost}
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
}