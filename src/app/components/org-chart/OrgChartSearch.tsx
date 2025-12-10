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
    <form onSubmit={onSubmit} className="flex gap-2 items-center max-w-sm">
      <input
        className="border rounded px-3 py-2 w-full text-sm"
        placeholder="Search employee by ID (e.g. 18)"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button
        type="submit"
        className="px-4 py-2 text-sm rounded bg-black text-white"
      >
        Search
      </button>
    </form>
  );
}
