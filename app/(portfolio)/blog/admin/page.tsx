"use client";

import { Suspense } from "react";
import AdminDashboard from "@/components/cms/AdminDashboard";

export default function AdminPage() {
  return (
    <Suspense fallback={<p className="studio-wait">Loading</p>}>
      <AdminDashboard />
    </Suspense>
  );
}
