"use client";

import RecentAuditActivity from "@/components/dashboard/RecentAuditActivity";
import WebsiteOverviewCard from "@/components/dashboard/WebsiteOverviewCard";
import RequestAuditButton from "@/components/RequestAuditButton";
import StatCard from "@/components/StatCard";
import { useClientWorkspace } from "@/hooks/useClientWorkspace";
import { dashboardStats, recentAudits } from "@/data/dummyData";

export default function DashboardPageContent() {
  const {
    client,
    primarySite,
    sites,
    isLoading,
    isError,
    error,
    reload,
  } = useClientWorkspace();

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-muted">
            Track your SEO audits, scores, and website performance at a glance.
          </p>
        </div>
        <RequestAuditButton />
      </div>

      <section
        aria-label="Dashboard statistics"
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4"
      >
        {dashboardStats.map((stat) => (
          <StatCard
            key={stat.id}
            label={stat.label}
            value={stat.value}
            change={stat.change}
            trend={stat.trend}
            icon={stat.icon}
          />
        ))}
      </section>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <RecentAuditActivity audits={recentAudits} />
        </div>
        <div>
          <WebsiteOverviewCard
            client={client}
            primarySite={primarySite}
            siteCount={sites.length}
            isLoading={isLoading}
            isError={isError}
            error={error}
            onRetry={reload}
          />
        </div>
      </div>
    </div>
  );
}
