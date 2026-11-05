"use client";

import { useMemo, useState } from "react";
import DemoNotice from "@/components/DemoNotice";
import StatCard from "@/components/StatCard";
import StatusBadge from "@/components/StatusBadge";
import { DownloadIcon, SearchIcon } from "@/components/Icons";
import { reports, scoreColor } from "@/data/dummyData";

const STATUS_FILTERS = ["All", "Available", "Processing", "Failed"];

export default function ReportsPageContent() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [notice, setNotice] = useState("");

  const overview = useMemo(() => {
    return {
      total: reports.length,
      available: reports.filter((r) => r.status === "Available").length,
      processing: reports.filter((r) => r.status === "Processing").length,
      failed: reports.filter((r) => r.status === "Failed").length,
    };
  }, []);

  const filteredReports = useMemo(() => {
    const query = search.trim().toLowerCase();

    return reports.filter((report) => {
      const matchesStatus =
        statusFilter === "All" || report.status === statusFilter;
      const matchesSearch =
        !query ||
        report.reportId.toLowerCase().includes(query) ||
        report.domain.toLowerCase().includes(query);

      return matchesStatus && matchesSearch;
    });
  }, [search, statusFilter]);

  const handleDownload = (report) => {
    setNotice(
      `PDF download for ${report.reportId} is a demo action. Actual PDF generation will be connected to the backend later.`
    );
    window.setTimeout(() => setNotice(""), 4500);
  };

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-muted">
          Access generated SEO reports for your website and download PDFs when
          available.
        </p>
      </div>

      {notice ? <DemoNotice message={notice} /> : null}

      <section
        aria-label="Report overview statistics"
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4"
      >
        <StatCard
          label="Total Reports"
          value={String(overview.total)}
          icon="file"
          showTrend={false}
        />
        <StatCard
          label="Available"
          value={String(overview.available)}
          icon="check"
          showTrend={false}
        />
        <StatCard
          label="Processing"
          value={String(overview.processing)}
          icon="clock"
          showTrend={false}
        />
        <StatCard
          label="Failed"
          value={String(overview.failed)}
          icon="download"
          showTrend={false}
        />
      </section>

      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="relative w-full lg:max-w-sm">
          <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search reports..."
            className="w-full rounded-lg border border-border bg-card py-2.5 pl-9 pr-3 text-sm text-white placeholder:text-zinc-500 outline-none transition focus:border-accent focus:ring-1 focus:ring-accent"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {STATUS_FILTERS.map((status) => {
            const isActive = statusFilter === status;
            return (
              <button
                key={status}
                type="button"
                onClick={() => setStatusFilter(status)}
                className={`rounded-lg px-3 py-2 text-xs font-medium transition-colors ${
                  isActive
                    ? "bg-accent/15 text-accent"
                    : "border border-border text-muted hover:border-zinc-600 hover:text-white"
                }`}
              >
                {status}
              </button>
            );
          })}
        </div>
      </div>

      {filteredReports.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border bg-card px-6 py-16 text-center">
          <p className="text-base font-medium text-white">No reports found</p>
          <p className="mt-1 text-sm text-muted">
            Try adjusting your search or status filters.
          </p>
        </div>
      ) : (
        <section className="rounded-xl border border-border bg-card">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[780px] text-left text-sm">
              <thead>
                <tr className="border-b border-border text-xs uppercase tracking-wide text-muted">
                  <th className="px-5 py-3 font-medium">Report ID</th>
                  <th className="px-5 py-3 font-medium">Website Domain</th>
                  <th className="px-5 py-3 font-medium">Generated Date</th>
                  <th className="px-5 py-3 font-medium">SEO Score</th>
                  <th className="px-5 py-3 font-medium">Status</th>
                  <th className="px-5 py-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredReports.map((report) => (
                  <tr
                    key={report.id}
                    className="border-b border-border/70 transition-colors last:border-0 hover:bg-white/[0.02]"
                  >
                    <td className="px-5 py-4 font-mono text-xs text-white">
                      {report.reportId}
                    </td>
                    <td className="px-5 py-4 text-muted">{report.domain}</td>
                    <td className="px-5 py-4 text-muted">
                      {report.generatedDate}
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`font-semibold ${scoreColor(
                          report.seoScore
                        )}`}
                      >
                        {report.seoScore ?? "—"}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <StatusBadge status={report.status} />
                    </td>
                    <td className="px-5 py-4">
                      <button
                        type="button"
                        onClick={() => handleDownload(report)}
                        disabled={report.status !== "Available"}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-border px-2.5 py-1.5 text-xs font-medium text-muted transition-colors hover:border-zinc-600 hover:text-white disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-border disabled:hover:text-muted"
                      >
                        <DownloadIcon />
                        Download PDF
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </div>
  );
}
