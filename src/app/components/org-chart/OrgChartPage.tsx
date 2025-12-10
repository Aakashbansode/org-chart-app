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
  const { loading, error, rootNode } = useAppSelector((s) => s.orgChart);

  useEffect(() => {
    dispatch(fetchOrgChart(DEFAULT_EMPLOYEE_ID));
  }, [dispatch]);

  return (
    <div className="flex h-screen">
      {/* Main content */}
      <main className="flex-1 flex flex-col p-4 md:p-6 gap-4 overflow-hidden">
        <header className="flex items-center justify-between">
          <h1 className="text-xl md:text-2xl font-semibold">
            Employee Org Chart
          </h1>
        </header>

        <OrgChartSearch />

        <section className="flex-1 border rounded-lg p-2 md:p-4 overflow-auto">
          {loading && <div>Loading...</div>}
          {error && <div className="text-red-500">Error: {error}</div>}
          {!loading && !error && !rootNode && (
            <div>No data available for this employee.</div>
          )}
          {rootNode && <OrgChartTree root={rootNode} />}
        </section>
      </main>

      {/* Sidebar */}
      <OrgChartSidebar />
    </div>
  );
}
