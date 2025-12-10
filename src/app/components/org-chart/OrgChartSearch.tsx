"use client";

import { FormEvent, useState } from "react";
import { useAppDispatch } from "@/stores/hooks";
import { fetchOrgChart, setCurrentEmployeeId } from "@/stores/orgChartSlice";

export default function OrgChartSearch() {
  const [value, setValue] = useState("");
  const dispatch = useAppDispatch();

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const id = Number(value.trim());
    if (Number.isNaN(id)) return;

    dispatch(setCurrentEmployeeId(id));
    dispatch(fetchOrgChart(id));
  };

  return (
    <form
      onSubmit={onSubmit}
      className="flex items-center w-full max-w-md bg-[#f3f4f6] rounded-full px-4 py-2 border border-gray-200 shadow-sm"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-4 w-4 text-gray-400 mr-2"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 103.6 3.6a7.5 7.5 0 0013.05 13.05z"
        />
      </svg>
      <input
        className="flex-1 bg-transparent text-sm outline-none placeholder:text-gray-400"
        placeholder="Search employee by ID (e.g. 18, 21, 22...)"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button
        type="submit"
        className="ml-3 px-4 py-1.5 text-xs md:text-sm rounded-full bg-indigo-500 text-white font-medium hover:bg-indigo-600 transition"
      >
        Search
      </button>
    </form>
  );
}
