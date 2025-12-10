"use client";

import { useAppDispatch, useAppSelector } from "@/stores/hooks";
import { closeSidebar } from "@/stores/orgChartSlice";

export default function OrgChartSidebar() {
  const dispatch = useAppDispatch();
  const { isSidebarOpen, selectedNode } = useAppSelector((s) => s.orgChart);

  if (!isSidebarOpen || !selectedNode) return null;

  return (
    <aside className="w-80 border-l bg-white p-4 hidden md:block">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Employee Details</h2>
        <button
          onClick={() => dispatch(closeSidebar())}
          className="text-sm underline"
        >
          Close
        </button>
      </div>

      <div className="flex flex-col items-center gap-3">
        {selectedNode.pic ? (
          <img
            src={selectedNode.pic}
            alt={selectedNode.target}
            className="w-16 h-16 rounded-full object-cover"
          />
        ) : (
          <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-lg">
            {selectedNode.target?.[0] ?? "?"}
          </div>
        )}
        <div className="text-center">
          <div className="font-medium">{selectedNode.target}</div>
          {selectedNode.relationship_id && (
            <div className="text-xs text-gray-500">
              {selectedNode.relationship_id}
            </div>
          )}
          <div className="text-xs text-gray-400 mt-1">
            Employee ID: {selectedNode.employee_id}
          </div>
        </div>
      </div>

      <div className="mt-4 space-y-2 text-sm w-full">
        <p>Direct reports: {selectedNode.direct_reports}</p>
        <p>Indirect reports: {selectedNode.indirect_reports}</p>
      </div>
    </aside>
  );
}
