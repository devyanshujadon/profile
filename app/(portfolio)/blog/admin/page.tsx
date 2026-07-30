"use client";

import { Suspense } from "react";
import AdminDashboard from "@/components/cms/AdminDashboard";

export default function AdminPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="w-5 h-5 border-2 border-line border-t-mark rounded-full animate-spin" />
        </div>
      }
    >
      <AdminDashboard />
    </Suspense>
  );
}
