"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import StatusBadge from "@/components/StatusBadge";
import LoadingBlock from "@/components/LoadingBlock";
import ErrorState from "@/components/ErrorState";
import RequestAuditButton from "@/components/RequestAuditButton";
import AuditProgressCell from "@/components/audits/AuditProgressCell";
import { EyeIcon, SearchIcon } from "@/components/Icons";
import { useAuditJobProgress } from "@/hooks/useAuditJobProgress";
import { ApiError } from "@/lib/api";
import {
  displayAuditStatus,
  displayValue,
  formatDate,
  shortenId,
  toAuditApiStatus,
} from "@/lib/format";
import { listAudits } from "@/services/audits";

const STATUS_FILTERS = ["All", "Completed", "In Progress", "Pending", "Failed"];
const PAGE_SIZE = 10;

export default function AuditsPageContent() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [page, setPage] = useState(1);
  const [items, setItems] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: PAGE_SIZE,
    total: 0,
    totalPages: 0,
  });
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState(null);

  const loadAudits = useCallback(async () => {
    setStatus("loading");
    setError(null);

    try {
      const apiStatus = toAuditApiStatus(statusFilter);
      const result = await listAudits({
        page,
        limit: PAGE_SIZE,
        ...(apiStatus ? { status: apiStatus } : {}),
      });

      setItems(result.items);
      setPagination(result.pagination);
      setStatus("success");
    } catch (err) {
      setItems([]);
      setStatus("error");
      setError(
        err instanceof ApiError
          ? err.message
          : err?.message || "Unable to load SEO audits."
      );
    }
  }, [page, statusFilter]);

  useEffect(() => {
    loadAudits();
  }, [loadAudits]);

  const processingIds = useMemo(
    () =>
      items
        .filter((audit) => audit.status === "PROCESSING")
        .map((audit) => audit.id),
    [items]
  );

  const jobsByAuditId = useAuditJobProgress(processingIds, {
    enabled: status === "success",
  });

  // When a PROCESSING audit job finishes, refresh the list so status updates.
  useEffect(() => {
    const finished = processingIds.some((id) => {
      const job = jobsByAuditId[id];
      return job?.status === "completed" || job?.status === "failed";
    });

    if (!finished) return undefined;

    const timer = window.setTimeout(() => {
      loadAudits();
    }, 800);

    return () => window.clearTimeout(timer);
  }, [jobsByAuditId, processingIds, loadAudits]);

  const visibleAudits = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return items;

    return items.filter((audit) => {
      const domain = audit.site?.domain?.toLowerCase() || "";
      const url = audit.site?.url?.toLowerCase() || "";
      const id = String(audit.id || "").toLowerCase();
      return domain.includes(query) || url.includes(query) || id.includes(query);
    });
  }, [items, search]);

  const totalPages = Math.max(1, pagination.totalPages || 1);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-muted">
            Browse audit history, track crawl progress, and open audit details.
          </p>
        </div>
        <RequestAuditButton onSuccess={() => loadAudits()} />
      </div>

      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="relative w-full lg:max-w-sm">
          <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search by domain..."
            className="w-full rounded-lg border border-border bg-card py-2.5 pl-9 pr-3 text-sm text-white placeholder:text-zinc-500 outline-none transition focus:border-accent focus:ring-1 focus:ring-accent"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {STATUS_FILTERS.map((filter) => {
            const isActive = statusFilter === filter;
            return (
              <button
                key={filter}
                type="button"
                onClick={() => {
                  setStatusFilter(filter);
                  setPage(1);
                }}
                className={`rounded-lg px-3 py-2 text-xs font-medium transition-colors ${
                  isActive
                    ? "bg-accent/15 text-accent"
                    : "border border-border text-muted hover:border-zinc-600 hover:text-white"
                }`}
              >
                {filter}
              </button>
            );
          })}
        </div>
      </div>

      {status === "loading" ? (
        <LoadingBlock label="Loading SEO audits…" />
      ) : null}

      {status === "error" ? (
        <ErrorState
          title="Unable to load audits"
          message={error}
          onRetry={loadAudits}
        />
      ) : null}

      {status === "success" && visibleAudits.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border bg-card px-6 py-16 text-center">
          <p className="text-base font-medium text-white">No audits found</p>
          <p className="mt-1 text-sm text-muted">
            {search.trim()
              ? "Try a different domain search on this page."
              : "Request an SEO audit to get started."}
          </p>
        </div>
      ) : null}

      {status === "success" && visibleAudits.length > 0 ? (
        <>
          <section className="rounded-xl border border-border bg-card">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[820px] text-left text-sm">
                <thead>
                  <tr className="border-b border-border text-xs uppercase tracking-wide text-muted">
                    <th className="px-5 py-3 font-medium">Audit ID</th>
                    <th className="px-5 py-3 font-medium">Domain</th>
                    <th className="px-5 py-3 font-medium">Created</th>
                    <th className="px-5 py-3 font-medium">Score</th>
                    <th className="px-5 py-3 font-medium">Status</th>
                    <th className="px-5 py-3 font-medium">Progress</th>
                    <th className="px-5 py-3 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {visibleAudits.map((audit) => {
                    const job = jobsByAuditId[audit.id];
                    const score =
                      typeof audit.overallScore === "number"
                        ? audit.overallScore
                        : null;

                    return (
                      <tr
                        key={audit.id}
                        className="border-b border-border/70 transition-colors last:border-0 hover:bg-white/[0.02]"
                      >
                        <td className="px-5 py-4">
                          <span
                            className="font-mono text-xs text-white"
                            title={audit.id}
                          >
                            {shortenId(audit.id)}
                          </span>
                        </td>
                        <td className="px-5 py-4 text-muted">
                          {displayValue(audit.site?.domain)}
                        </td>
                        <td className="px-5 py-4 text-muted">
                          {formatDate(audit.createdAt)}
                        </td>
                        <td className="px-5 py-4 text-white">
                          {score === null ? "—" : score}
                        </td>
                        <td className="px-5 py-4">
                          <StatusBadge
                            status={displayAuditStatus(audit.status)}
                          />
                        </td>
                        <td className="px-5 py-4">
                          <AuditProgressCell
                            auditStatus={audit.status}
                            job={job}
                          />
                        </td>
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
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-muted">
              Page {pagination.page} of {totalPages} · {pagination.total} total
            </p>
            <div className="flex gap-2">
              <button
                type="button"
                disabled={page <= 1}
                onClick={() => setPage((current) => Math.max(1, current - 1))}
                className="rounded-lg border border-border px-3 py-2 text-xs font-medium text-muted transition-colors hover:border-zinc-600 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
              >
                Previous
              </button>
              <button
                type="button"
                disabled={page >= totalPages}
                onClick={() =>
                  setPage((current) => Math.min(totalPages, current + 1))
                }
                className="rounded-lg border border-border px-3 py-2 text-xs font-medium text-muted transition-colors hover:border-zinc-600 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
              >
                Next
              </button>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}
