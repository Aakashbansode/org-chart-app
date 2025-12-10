"use client";

import { OrgChartNode } from "@/lib/types";
import { useAppDispatch, useAppSelector } from "@/stores/hooks";
import { openSidebar, toggleNode } from "@/stores/orgChartSlice";

interface Props {
  node: OrgChartNode;
}

export default function OrgChartNodeComponent({ node }: Props) {
  const dispatch = useAppDispatch();
  const { expandedNodeIds } = useAppSelector((s) => s.orgChart);

  const hasChildren = node.children && node.children.length > 0;
  const isExpanded = expandedNodeIds.includes(node.employee_id);

  const handleToggle = () => {
    if (hasChildren) {
      dispatch(toggleNode(node.employee_id));
    }
  };

  const handleOpenSidebar = () => {
    dispatch(openSidebar(node));
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex items-center gap-2">
        {hasChildren && (
          <button
            className="text-xs border rounded px-1"
            onClick={handleToggle}
            aria-label={isExpanded ? "Collapse" : "Expand"}
          >
            {isExpanded ? "−" : "+"}
          </button>
        )}

        <div className="flex items-center gap-2 border rounded-lg px-3 py-2 bg-white shadow-sm hover:shadow-md transition">
          {/* profile picture */}
          {node.pic ? (
            <img
              src={node.pic}
              alt={node.target}
              className="w-8 h-8 rounded-full object-cover"
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs">
              {node.target?.[0] ?? "?"}
            </div>
          )}

          <div className="flex flex-col">
            <span className="text-sm font-medium">{node.target}</span>
            {node.relationship_id && (
              <span className="text-xs text-gray-500">
                {node.relationship_id}
              </span>
            )}
          </div>

          {/* side icon for sidebar */}
          <button
            type="button"
            className="ml-2 text-xs underline"
            onClick={handleOpenSidebar}
          >
            Details
          </button>
        </div>
      </div>

      {/* children */}
      {hasChildren && isExpanded && (
        <div className="mt-2 flex gap-4">
          {node.children.map((child) => (
            <div key={child.employee_id} className="relative">
              {/* connectors can be styled with pseudo-elements / borders */}
              <OrgChartNodeComponent node={child} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
