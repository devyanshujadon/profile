"use client";

import { Suspense } from "react";
import AdminDashboard from "@/components/cms/AdminDashboard";

export default function AdminPage() {
  return (
    <div className="px-5 sm:px-7 lg:px-9">
      <Suspense
        fallback={
          <div className="flex items-center justify-center min-h-[50vh]">
            <p className="font-mono text-[0.72rem] tracking-[0.1em] uppercase text-ink-3">
              Loading
            </p>
          </div>
        }
      >
        <AdminDashboard />
      </Suspense>
    </div>
  );
}
