"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import StatusBadge from "@/components/StatusBadge";
import LoadingBlock from "@/components/LoadingBlock";
import ErrorState from "@/components/ErrorState";
import AuditProgressCell from "@/components/audits/AuditProgressCell";
import { ArrowLeftIcon, ExternalLinkIcon } from "@/components/Icons";
import { useAuditJobProgress } from "@/hooks/useAuditJobProgress";
import { ApiError } from "@/lib/api";
import {
  displayAuditStatus,
  displayValue,
  formatDate,
} from "@/lib/format";
import { getAuditById } from "@/services/audits";

export default function AuditDetailsContent() {
  const params = useParams();
  const auditId = params?.id ? String(params.id) : "";

  const [audit, setAudit] = useState(null);
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState(null);

  const loadAudit = useCallback(async () => {
    if (!auditId) {
      setAudit(null);
      setStatus("error");
      setError("Audit id is missing.");
      return;
    }

    setStatus("loading");
    setError(null);

    try {
      const data = await getAuditById(auditId);
      setAudit(data);
      setStatus("success");
    } catch (err) {
      setAudit(null);
      setStatus("error");
      setError(
        err instanceof ApiError
          ? err.message
          : err?.message || "Unable to load this audit."
      );
    }
  }, [auditId]);

  useEffect(() => {
    loadAudit();
  }, [loadAudit]);

  const processingIds = useMemo(
    () => (audit?.status === "PROCESSING" && audit?.id ? [audit.id] : []),
    [audit]
  );

  const jobsByAuditId = useAuditJobProgress(processingIds, {
    enabled: status === "success" && processingIds.length > 0,
  });

  const job = audit ? jobsByAuditId[audit.id] : null;

  useEffect(() => {
    if (!job) return undefined;
    if (job.status !== "completed" && job.status !== "failed") return undefined;

    const timer = window.setTimeout(() => {
      loadAudit();
    }, 800);

    return () => window.clearTimeout(timer);
  }, [job, loadAudit]);

  if (status === "loading") {
    return <LoadingBlock label="Loading audit details…" />;
  }

  if (status === "error") {
    return (
      <div className="space-y-4">
        <Link
          href="/audits"
          className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-white"
        >
          <ArrowLeftIcon />
          Back to SEO Audits
        </Link>
        <ErrorState
          title="Unable to load audit"
          message={error}
          onRetry={loadAudit}
        />
      </div>
    );
  }

  if (!audit) {
    return (
      <div className="rounded-xl border border-dashed border-border bg-card px-6 py-16 text-center">
        <p className="text-base font-medium text-white">Audit not found</p>
        <p className="mt-1 text-sm text-muted">
          This audit may have been removed or the link is invalid.
        </p>
        <Link
          href="/audits"
          className="mt-5 inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium text-muted transition-colors hover:border-zinc-600 hover:text-white"
        >
          <ArrowLeftIcon />
          Back to SEO Audits
        </Link>
      </div>
    );
  }

  const statusLabel = displayAuditStatus(audit.status);
  const score =
    typeof audit.overallScore === "number" ? audit.overallScore : null;

  return (
    <div className="space-y-6">
      <div>
        <Link
          href="/audits"
          className="mb-3 inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-white"
        >
          <ArrowLeftIcon />
          Back to SEO Audits
        </Link>
        <div className="flex flex-wrap items-center gap-3">
          <h2 className="break-all text-xl font-semibold text-white sm:text-2xl">
            {audit.id}
          </h2>
          <StatusBadge status={statusLabel} />
        </div>
        <p className="mt-1 text-sm text-muted">
          Live audit metadata from the SEO automation backend.
        </p>
      </div>

      <section className="rounded-xl border border-border bg-card p-5">
        <h3 className="text-base font-semibold text-white">
          Audit processing status
        </h3>
        <dl className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <dt className="text-sm text-muted">Website</dt>
            <dd className="mt-1">
              {audit.site?.url ? (
                <a
                  href={audit.site.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-white transition-colors hover:text-accent"
                >
                  {displayValue(audit.site?.domain || audit.site?.url)}
                  <ExternalLinkIcon />
                </a>
              ) : (
                <span className="text-white">
                  {displayValue(audit.site?.domain)}
                </span>
              )}
            </dd>
          </div>
          <div>
            <dt className="text-sm text-muted">Created</dt>
            <dd className="mt-1 text-white">{formatDate(audit.createdAt)}</dd>
          </div>
          <div>
            <dt className="text-sm text-muted">Started</dt>
            <dd className="mt-1 text-white">{formatDate(audit.startedAt)}</dd>
          </div>
          <div>
            <dt className="text-sm text-muted">Completed</dt>
            <dd className="mt-1 text-white">{formatDate(audit.completedAt)}</dd>
          </div>
          <div>
            <dt className="text-sm text-muted">Overall score</dt>
            <dd className="mt-1 text-white">{score === null ? "—" : score}</dd>
          </div>
          <div>
            <dt className="text-sm text-muted">Result / report</dt>
            <dd className="mt-1 text-white">
              {audit.hasResult ? "Result stored" : "No result yet"}
              {" · "}
              {audit.hasReport ? "Report available" : "No report yet"}
            </dd>
          </div>
          <div className="sm:col-span-2 lg:col-span-3">
            <dt className="text-sm text-muted">Background job progress</dt>
            <dd className="mt-2">
              <AuditProgressCell auditStatus={audit.status} job={job} />
              {job?.failedReason ? (
                <p className="mt-2 text-sm text-rose-300">{job.failedReason}</p>
              ) : null}
            </dd>
          </div>
        </dl>
      </section>

      <section className="rounded-xl border border-dashed border-border bg-card px-6 py-12 text-center">
        <p className="text-base font-medium text-white">
          Detailed SEO findings are not available in this phase
        </p>
        <p className="mx-auto mt-2 max-w-2xl text-sm text-muted">
          Category scores, technical issues, on-page issues, quick wins, and AI
          recommendations require an audit-result API that is not exposed yet.
          This portal only shows live audit metadata, status, and BullMQ job
          progress. Detailed findings will be connected in a later phase.
        </p>
      </section>
    </div>
  );
}
