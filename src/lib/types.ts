// src/lib/types.ts

export interface OrgChartNode {
  id?: number;                     // present on children, not root
  employee_id: number;
  target: string;                  // employee name
  pic?: string | null;             // profile picture
  relationship_id?: string | null;
  effective_start_date?: string | null;
  effective_end_date?: string | null;
  direct_reports: number;
  indirect_reports: number;
  children: OrgChartNode[];
}

export interface OrgChartResponse {
  status: string;
  tree: OrgChartNode;
}
