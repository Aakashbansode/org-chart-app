"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/stores/hooks";
import { fetchOrgChart } from "@/stores/orgChartSlice";
import OrgChartSearch from "./OrgChartSearch";
import OrgChartTree from "./OrgChartTree";
import OrgChartSidebar from "./OrgChartSidebar";

const DEFAULT_EMPLOYEE_ID = 18;

export default function OrgChartPage() {
  const dispatch = useAppDispatch();
  const { loading, error, rootNode, currentEmployeeId } = useAppSelector(
    (s) => s.orgChart
  );

  useEffect(() => {
    dispatch(fetchOrgChart(DEFAULT_EMPLOYEE_ID));
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-[#f5f5f7] flex">
      {/* Main content takes all remaining width, sidebar sits on the right */}
      <main className="flex-1 flex flex-col bg-[#f9fafb]">
        {/* Header */}
        <header className="border-b bg-white px-4 md:px-10 pt-6 pb-4">
          {/* breadcrumb */}
          <div className="text-xs text-gray-400 mb-2">
            <span className="hover:underline cursor-pointer">Home</span>
            <span className="mx-1">›</span>
            <span className="text-gray-500">Org Chart</span>
          </div>

          {/* title + description */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">
                Org Chart
              </h1>
              <p className="text-xs md:text-sm text-gray-500 mt-1 max-w-xl">
                This is a collection of all hierarchy in the system. You can
                view and understand reporting structures across your
                organisation.
              </p>
            </div>

            {/* optional avatar placeholder */}
            <div className="hidden md:flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-200" />
            </div>
          </div>

          {/* tabs */}
          <div className="mt-4 flex items-center gap-6 text-sm border-b border-gray-200">
            <button className="pb-2 border-b-2 border-indigo-500 text-indigo-600 font-medium">
              People
            </button>
            <button className="pb-2 text-gray-500 hover:text-gray-700">
              Position
            </button>
            <button className="pb-2 text-gray-500 hover:text-gray-700">
              Organization
            </button>
            <button className="pb-2 text-gray-500 hover:text-gray-700">
              Others
            </button>
          </div>

          {/* search */}
          <div className="mt-4">
            <OrgChartSearch />
          </div>
        </header>

        {/* Org chart area */}
        <section className="flex-1 px-4 md:px-10 py-4 md:py-6 overflow-auto">
          {loading && (
            <div className="text-sm text-gray-500">Loading org chart…</div>
          )}

          {error && (
            <div className="mb-3 text-red-500 text-sm flex items-center justify-between">
              <span>Failed to load org chart: {error}</span>
              <button
                className="ml-4 text-xs underline"
                onClick={() => dispatch(fetchOrgChart(currentEmployeeId))}
              >
                Retry
              </button>
            </div>
          )}

          {!loading && !error && !rootNode && (
            <div className="text-sm text-gray-500">
              No data available for this employee.
            </div>
          )}

          {rootNode && (
            <div className="mt-4 flex justify-center">
              <OrgChartTree root={rootNode} />
            </div>
          )}
        </section>
      </main>

      {/* Sidebar on the right */}
      <OrgChartSidebar />
    </div>
  );
}
