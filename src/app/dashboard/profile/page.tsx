"use client";

import PageLayout from "@/components/layouts/page-layout";
import DashboardLayout from "@/components/layouts/dashboard-layout";
import DashboardProfile from "@/components/features/user-profile/dashboard-profile";

export default function ProfilePage() {
  return (
    <PageLayout className="px-4 flex flex-col items-center justify-center pt-24 pb-8 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-secondary z-[-1]" />
      <DashboardLayout>
        <DashboardProfile />
      </DashboardLayout>
    </PageLayout>
  );
}
