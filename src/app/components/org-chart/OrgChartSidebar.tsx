"use client";

import { useAppDispatch, useAppSelector } from "@/stores/hooks";
import { closeSidebar } from "@/stores/orgChartSlice";
import Image from "next/image";

export default function OrgChartSidebar() {
  const dispatch = useAppDispatch();
  const { isSidebarOpen, selectedNode } = useAppSelector((s) => s.orgChart);

  if (!isSidebarOpen || !selectedNode) return null;

  return (
    <aside className="hidden lg:flex w-96 flex-col bg-white border-l">
      {/* Photo header */}
      <div className="relative h-32 bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-500">
        {/* Profile */}
        <div className="absolute left-6 bottom-[-32px]">
          {selectedNode.pic ? (
            <Image
  src={selectedNode.pic || "/fallback-avatar.png"}
  alt={selectedNode.target}
  width={64}
  height={64}
  className="w-16 h-16 rounded-full object-cover"
/>
          ) : (
            <div className="w-16 h-16 rounded-full bg-gray-200 border-4 border-white flex items-center justify-center text-lg font-medium text-gray-700 shadow-lg">
              {selectedNode.target?.[0] ?? "?"}
            </div>
          )}
        </div>

        {/* Close button */}
        <button
          onClick={() => dispatch(closeSidebar())}
          className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white/80 flex items-center justify-center text-xs text-gray-700 hover:bg-white"
        >
          ✕
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto px-6 pt-10 pb-6">
        {/* Name + title */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            {selectedNode.target}
          </h2>
          {selectedNode.relationship_id && (
            <p className="text-xs text-gray-500 mt-1">
              {selectedNode.relationship_id}
            </p>
          )}
          <p className="text-[11px] text-gray-400 mt-1">
            Employee ID: {selectedNode.employee_id}
          </p>
        </div>

        {/* Basic details section */}
        <div className="mt-6">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
            Basic Details
          </h3>
          <div className="space-y-2 text-sm text-gray-700">
            <p>
              Direct reports:{" "}
              <span className="font-medium">
                {selectedNode.direct_reports}
              </span>
            </p>
            <p>
              Indirect reports:{" "}
              <span className="font-medium">
                {selectedNode.indirect_reports}
              </span>
            </p>
          </div>
        </div>

        {/* Collapsible-style sections (static for now, to mirror Figma) */}
        <div className="mt-6 space-y-2 text-sm">
          {["History", "Parent(s)", "Hierarchy"].map((label) => (
            <button
              key={label}
              className="w-full flex items-center justify-between px-3 py-2 rounded-xl border border-gray-200 bg-gray-50 text-gray-700 hover:bg-gray-100"
            >
              <span className="text-xs font-medium">{label}</span>
              <span className="text-xs text-gray-400">▾</span>
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}
