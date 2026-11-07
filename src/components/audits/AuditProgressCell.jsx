import { ACTIVE_JOB_STATES } from "@/lib/format";

/**
 * Renders backend-provided job progress only. Never invents percentages.
 */
export default function AuditProgressCell({ auditStatus, job }) {
  if (auditStatus === "PROCESSING") {
    if (job && typeof job.progress === "number") {
      const progress = Math.max(0, Math.min(100, job.progress));
      return (
        <div className="flex min-w-[7rem] items-center gap-2">
          <div className="h-1.5 w-20 overflow-hidden rounded-full bg-zinc-800">
            <div
              className="h-full rounded-full bg-accent transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="text-xs text-muted">{progress}%</span>
        </div>
      );
    }

    const jobLabel = job?.status
      ? ACTIVE_JOB_STATES.has(job.status)
        ? job.status
        : job.status
      : "waiting for job";

    return <span className="text-xs text-muted capitalize">{jobLabel}</span>;
  }

  if (job?.status && !ACTIVE_JOB_STATES.has(job.status)) {
    return <span className="text-xs text-muted capitalize">{job.status}</span>;
  }

  return <span className="text-xs text-muted">—</span>;
}
