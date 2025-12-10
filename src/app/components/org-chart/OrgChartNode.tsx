"use client";

import { OrgChartNode } from "@/lib/types";
import { useAppDispatch, useAppSelector } from "@/stores/hooks";
import { openSidebar, toggleNode } from "@/stores/orgChartSlice";
import Image from "next/image";

interface Props {
  node: OrgChartNode;
}

export default function OrgChartNodeComponent({ node }: Props) {
  const dispatch = useAppDispatch();
  const { expandedNodeIds } = useAppSelector((s) => s.orgChart);

  const hasChildren = node.children && node.children.length > 0;
  const isExpanded = expandedNodeIds.includes(node.employee_id);

  const handleToggle = () => {
    if (hasChildren) dispatch(toggleNode(node.employee_id));
  };

  const handleOpenSidebar = () => {
    dispatch(openSidebar(node));
  };

  return (
    <div className="flex flex-col items-center">
      {/* Node card + expand */}
      <div className="flex items-center gap-2 mb-1">
        {hasChildren && (
          <button
            className="flex items-center justify-center w-6 h-6 rounded-full border border-gray-300 text-xs bg-white hover:bg-gray-50 shadow-sm"
            onClick={handleToggle}
            aria-label={isExpanded ? "Collapse" : "Expand"}
          >
            {isExpanded ? "−" : "+"}
          </button>
        )}

        <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-white border border-gray-200 shadow-sm hover:shadow-md transition">
          {/* Avatar */}
          {node.pic ? (
            <Image
              src={node.pic || "/fallback-avatar.png"}
              alt={node.target}
              width={32}
              height={32}
              className="w-8 h-8 rounded-full object-cover"
            />
          ) : (
            <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center text-xs font-medium text-gray-600">
              {node.target?.[0] ?? "?"}
            </div>
          )}

          {/* Text */}
          <div className="flex flex-col">
            <span className="text-sm font-medium text-gray-900">
              {node.target}
            </span>
            {node.relationship_id && (
              <span className="text-xs text-gray-500">
                {node.relationship_id}
              </span>
            )}
          </div>

          {/* Details button (right icon in Figma) */}
          <button
            type="button"
            className="ml-1 text-[11px] px-2 py-1 rounded-lg bg-[#eef2ff] text-indigo-600 font-medium hover:bg-indigo-100"
            onClick={handleOpenSidebar}
          >
            Details
          </button>
        </div>
      </div>

      {/* Connectors + children */}
      {hasChildren && isExpanded && (
        <>
          {/* vertical connector from parent card down */}
          <div className="h-6 w-px bg-gray-300" />

          <div className="flex gap-10 mt-0">
            {node.children.map((child) => (
              <div
                key={child.employee_id}
                className="flex flex-col items-center"
              >
                {/* connector up to each child */}
                <div className="h-6 w-px bg-gray-300" />
                <OrgChartNodeComponent node={child} />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
