import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import api from "@/lib/api";
import type { OrgChartNode, OrgChartResponse } from "@/lib/types";

interface OrgChartState {
  currentEmployeeId: number;
  rootNode: OrgChartNode | null;
  loading: boolean;
  error: string | null;
  expandedNodeIds: number[]; // list of employee_id values
  selectedNode: OrgChartNode | null;
  isSidebarOpen: boolean;
}

const initialState: OrgChartState = {
  currentEmployeeId: 18,
  rootNode: null,
  loading: false,
  error: null,
  expandedNodeIds: [],
  selectedNode: null,
  isSidebarOpen: false,
};

export const fetchOrgChart = createAsyncThunk<OrgChartResponse, number>(
  "orgChart/fetchOrgChart",
  async (employeeId: number) => {
    // Assuming baseURL = https://worksync.global/api
    const res = await api.get<OrgChartResponse>(
      `/relationship/people_chart/${employeeId}`
    );
    return res.data;
  }
);

const orgChartSlice = createSlice({
  name: "orgChart",
  initialState,
  reducers: {
    setCurrentEmployeeId(state, action: PayloadAction<number>) {
      state.currentEmployeeId = action.payload;
    },
    toggleNode(state, action: PayloadAction<number>) {
      const id = action.payload;
      if (state.expandedNodeIds.includes(id)) {
        state.expandedNodeIds = state.expandedNodeIds.filter((i) => i !== id);
      } else {
        state.expandedNodeIds.push(id);
      }
    },
    openSidebar(state, action: PayloadAction<OrgChartNode>) {
      state.selectedNode = action.payload;
      state.isSidebarOpen = true;
    },
    closeSidebar(state) {
      state.selectedNode = null;
      state.isSidebarOpen = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrgChart.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.rootNode = null;
      })
      .addCase(fetchOrgChart.fulfilled, (state, action) => {
        state.loading = false;
        state.rootNode = action.payload.tree;

        if (action.payload.tree) {
          state.expandedNodeIds = [action.payload.tree.employee_id]; // Root expanded
        } else {
          state.expandedNodeIds = [];
        }
      })
      .addCase(fetchOrgChart.rejected, (state, action) => {
        state.loading = false;
        const message = action.error.message || "Failed to fetch chart";

        // If it's a 400, treat it as "no data" instead of a hard error
        if (message.includes("400")) {
          state.error = null; // no error shown
        } else {
          state.error = message; // real error (network, 500, etc.)
        }

        state.rootNode = null;
        state.expandedNodeIds = [];
      });
  },
});

export const { setCurrentEmployeeId, toggleNode, openSidebar, closeSidebar } =
  orgChartSlice.actions;

export default orgChartSlice.reducer;
