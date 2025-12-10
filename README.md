Employee Org Chart – Frontend Developer Assignment

This project is an implementation of the PeopleFusion Employee Organizational Chart assignment.

It is built using Next.js 14, React 18, TypeScript, Tailwind CSS, Redux Toolkit, and Axios, and visualizes employee reporting relationships as an interactive org chart.

✨ Features
Org Chart Tree

Recursive hierarchical visualization

Expand / collapse nodes

Connectors between parent and child nodes

Employee Cards

Displays employee:

Profile picture

Name

Role / Relationship (relationship_id)

Rounded card style matching Figma design

Inline “Details” button opens sidebar

Search

Search by employee ID

Supports required IDs: 18, 21, 22, 23, 25, 29, 30

Re-renders chart with selected employee as new root

Sidebar with Employee Details

Displays:

Employee photo

Name

Relationship ID

Employee ID

Direct / indirect reports

Sections: History, Parent(s), Hierarchy (as per Figma)

Error Handling & Empty States

Network/API error banner with Retry button

Handles missing data gracefully:

“No data available for this employee.”
(e.g., for ID 22 or sparse test cases)

Missing images replaced with fallback initials avatar

Responsive Design

Mobile-first layout

Sidebar hides on small screens

Tree is scrollable horizontally & vertically

🧰 Tech Stack

Framework: Next.js 14 (App Router) + React 18

Language: TypeScript

Styling: Tailwind CSS

State Management: Redux Toolkit

HTTP Requests: Axios

Linting: ESLint + Prettier

🚀 Getting Started
1. Clone the repository
git clone <your-repo-url>
cd <your-repo-folder>

2. Install dependencies
npm install
# or
yarn install
# or
pnpm install

3. Environment Variables

Create a .env.local file:

NEXT_PUBLIC_API_BASE_URL=https://worksync.global/api
NEXT_PUBLIC_API_TOKEN=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...


Token is the non-expiring one provided in the assignment.

4. Remote Image Configuration (Required for profile pictures)

The API serves employee images from:

https://hel1.your-objectstorage.com/...


Next.js <Image> requires whitelisting this domain.

Add this to next.config.ts:

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "hel1.your-objectstorage.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;


Restart dev server afterward.

5. Run the project
npm run dev


Open:

👉 http://localhost:3000/

🧱 Project Structure
src/
  app/
    layout.tsx              // App wrapper + Redux Provider
    page.tsx                // Loads OrgChartPage
    components/
      org-chart/
        OrgChartPage.tsx     // Header, search, chart, sidebar
        OrgChartSearch.tsx   // Search input
        OrgChartTree.tsx     // Renders root node
        OrgChartNode.tsx     // Recursive node component
        OrgChartSidebar.tsx  // Employee details panel
  lib/
    api.ts                  // Axios instance with auth token
    types.ts                // Type definitions
  stores/
    index.ts                // Redux store
    hooks.ts                // Typed hooks
    orgChartSlice.ts        // Chart state, reducers, async thunk

🧠 Key Implementation Notes

Uses recursive rendering for org chart nodes

Expand/collapse state stored in Redux (expandedNodeIds)

Robust API error handling:

400 response → treat as “No data available”

Network errors → retry option

Properly matches Figma design for:

Header

Tabs

Search bar

Card design

Sidebar panel

Next.js <Image> optimization enabled for remote bucket domain

🧪 Testing Checklist

Test with employee IDs:

ID	Expected
18	Should show JC + reports
21	Shows hierarchy if available
22	Returns 400 → “No data available”
23	Loads normally
25	Loads normally
29	Loads normally
30	Loads normally

Confirm:

Nodes collapse / expand

Sidebar opens on clicking “Details”

Search works correctly

No console errors

⏱ Time Spent
Setup & configuration: 1 hours

API integration + Redux: 1 hours

Tree rendering logic: 30min

Sidebar UI + styling: 30min

Figma alignment: 30min

Testing + polish: 30min