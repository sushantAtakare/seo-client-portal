"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import StatusBadge from "@/components/StatusBadge";
import { EyeIcon, SearchIcon } from "@/components/Icons";
import { audits, scoreColor } from "@/data/dummyData";

const STATUS_FILTERS = ["All", "Completed", "In Progress", "Pending", "Failed"];

export default function AuditsPageContent() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredAudits = useMemo(() => {
    const query = search.trim().toLowerCase();

    return audits.filter((audit) => {
      const matchesStatus =
        statusFilter === "All" || audit.status === statusFilter;
      const matchesSearch =
        !query ||
        audit.auditId.toLowerCase().includes(query) ||
        audit.domain.toLowerCase().includes(query) ||
        audit.summary.toLowerCase().includes(query);

      return matchesStatus && matchesSearch;
    });
  }, [search, statusFilter]);

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-muted">
          Browse audit history, track progress, and open detailed SEO findings.
        </p>
      </div>

      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="relative w-full lg:max-w-sm">
          <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search audits..."
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

      {filteredAudits.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border bg-card px-6 py-16 text-center">
          <p className="text-base font-medium text-white">No audits found</p>
          <p className="mt-1 text-sm text-muted">
            Try adjusting your search or status filters.
          </p>
        </div>
      ) : (
        <section className="rounded-xl border border-border bg-card">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[860px] text-left text-sm">
              <thead>
                <tr className="border-b border-border text-xs uppercase tracking-wide text-muted">
                  <th className="px-5 py-3 font-medium">Audit ID</th>
                  <th className="px-5 py-3 font-medium">Domain</th>
                  <th className="px-5 py-3 font-medium">Audit Date</th>
                  <th className="px-5 py-3 font-medium">SEO Score</th>
                  <th className="px-5 py-3 font-medium">Status</th>
                  <th className="px-5 py-3 font-medium">Progress</th>
                  <th className="px-5 py-3 font-medium">Duration</th>
                  <th className="px-5 py-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredAudits.map((audit) => (
                  <tr
                    key={audit.id}
                    className="border-b border-border/70 transition-colors last:border-0 hover:bg-white/[0.02]"
                  >
                    <td className="px-5 py-4 font-mono text-xs text-white">
                      {audit.auditId}
                    </td>
                    <td className="px-5 py-4 text-muted">{audit.domain}</td>
                    <td className="px-5 py-4 text-muted">{audit.auditDate}</td>
                    <td className="px-5 py-4">
                      <span
                        className={`font-semibold ${scoreColor(audit.seoScore)}`}
                      >
                        {audit.seoScore ?? "—"}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <StatusBadge status={audit.status} />
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 w-20 overflow-hidden rounded-full bg-zinc-800">
                          <div
                            className="h-full rounded-full bg-accent"
                            style={{ width: `${audit.progress}%` }}
                          />
                        </div>
                        <span className="text-xs text-muted">
                          {audit.progress}%
                        </span>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-muted">{audit.duration}</td>
                    <td className="px-5 py-4">
                      <Link
                        href={`/audits/${audit.id}`}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-border px-2.5 py-1.5 text-xs font-medium text-muted transition-colors hover:border-zinc-600 hover:text-white"
                      >
                        <EyeIcon />
                        View
                      </Link>
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
