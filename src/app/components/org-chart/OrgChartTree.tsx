"use client";

import { OrgChartNode } from "@/lib/types";
import OrgChartNodeComponent from "./OrgChartNode";

interface Props {
  root: OrgChartNode;
}

export default function OrgChartTree({ root }: Props) {
  return (
    <div className="flex justify-center">
      <OrgChartNodeComponent node={root} />
    </div>
  );
}
