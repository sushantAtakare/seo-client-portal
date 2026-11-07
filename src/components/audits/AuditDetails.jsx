import Link from "next/link";
import AuditScoreCard from "@/components/audits/AuditScoreCard";
import StatusBadge from "@/components/StatusBadge";
import {
  ArrowLeftIcon,
  ExternalLinkIcon,
  LightbulbIcon,
  SparklesIcon,
  WrenchIcon,
} from "@/components/Icons";

function IssueList({ title, items, empty }) {
  return (
    <article className="rounded-xl border border-border bg-card p-5">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h4 className="font-semibold text-white">{title}</h4>
        <span className="rounded-full bg-white/5 px-2.5 py-1 text-xs text-muted">
          {items.length}
        </span>
      </div>
      {items.length === 0 ? (
        <p className="text-sm text-muted">{empty}</p>
      ) : (
        <ul className="space-y-3">
          {items.map((issue) => (
            <li
              key={issue.id}
              className="rounded-lg border border-border/80 bg-background/60 p-3"
            >
              <div className="flex flex-wrap items-start justify-between gap-2">
                <p className="font-medium text-white">{issue.title}</p>
                <StatusBadge status={issue.severity} />
              </div>
              <p className="mt-1.5 text-sm text-muted">{issue.description}</p>
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}

export default function AuditDetails({ audit }) {
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

  const isPending = audit.status === "Pending";
  const isInProgress = audit.status === "In Progress";
  const showResults = audit.status === "Completed" || audit.status === "Failed";

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
          <h2 className="text-2xl font-semibold text-white">{audit.auditId}</h2>
          <StatusBadge status={audit.status} />
        </div>
        <p className="mt-1 text-sm text-muted">{audit.summary}</p>
      </div>

      <section className="rounded-xl border border-border bg-card p-5">
        <h3 className="text-base font-semibold text-white">
          Audit processing status
        </h3>
        <dl className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <dt className="text-sm text-muted">Website</dt>
            <dd className="mt-1">
              <a
                href={audit.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-white transition-colors hover:text-accent"
              >
                {audit.domain}
                <ExternalLinkIcon />
              </a>
            </dd>
          </div>
          <div>
            <dt className="text-sm text-muted">Audit date</dt>
            <dd className="mt-1 text-white">{audit.auditDate}</dd>
          </div>
          <div>
            <dt className="text-sm text-muted">Duration</dt>
            <dd className="mt-1 text-white">{audit.duration}</dd>
          </div>
          <div>
            <dt className="text-sm text-muted">Progress</dt>
            <dd className="mt-2">
              <div className="flex items-center gap-3">
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-zinc-800">
                  <div
                    className="h-full rounded-full bg-accent transition-all"
                    style={{ width: `${audit.progress}%` }}
                  />
                </div>
                <span className="text-sm text-white">{audit.progress}%</span>
              </div>
            </dd>
          </div>
        </dl>
      </section>

      {isPending || isInProgress ? (
        <div className="rounded-xl border border-dashed border-border bg-card px-6 py-12 text-center">
          <p className="text-base font-medium text-white">
            {isPending ? "Audit queued (demo)" : "Audit in progress (demo)"}
          </p>
          <p className="mx-auto mt-2 max-w-lg text-sm text-muted">
            {isPending
              ? "This audit is pending. Score breakdowns, issues, and recommendations will appear here once processing completes."
              : "Analysis is running. Technical findings, on-page issues, and AI recommendations will appear when the audit finishes."}
          </p>
        </div>
      ) : null}

      {showResults ? (
        <>
          <AuditScoreCard score={audit.seoScore} categories={audit.categories} />

          <section className="space-y-4">
            <div>
              <h3 className="text-base font-semibold text-white">
                Technical & on-page issues
              </h3>
              <p className="mt-1 text-sm text-muted">
                Demo findings only — not a live crawl of the website.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
              <IssueList
                title="Technical SEO issues"
                items={audit.technicalIssues || []}
                empty="No technical issues in this demo report."
              />
              <IssueList
                title="On-page issues"
                items={audit.onPageIssues || []}
                empty="No on-page issues in this demo report."
              />
            </div>
          </section>

          <section className="space-y-4">
            <div>
              <h3 className="text-base font-semibold text-white">
                Critical & important issues
              </h3>
              <p className="mt-1 text-sm text-muted">
                Highest-priority findings from this audit.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
              <IssueList
                title="Critical issues"
                items={audit.issues?.critical || []}
                empty="No critical issues in this demo report."
              />
              <IssueList
                title="Important issues"
                items={audit.issues?.important || []}
                empty="No important issues in this demo report."
              />
            </div>
          </section>

          <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
            <section className="rounded-xl border border-border bg-card p-5">
              <div className="mb-3 flex items-center gap-2 text-accent">
                <LightbulbIcon className="h-5 w-5" />
                <h3 className="text-base font-semibold text-white">
                  Quick wins
                </h3>
              </div>
              {audit.quickWins?.length ? (
                <ul className="space-y-2.5 text-sm text-zinc-300">
                  {audit.quickWins.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-muted">No quick wins listed.</p>
              )}
            </section>

            <section className="rounded-xl border border-border bg-card p-5 xl:col-span-2">
              <div className="mb-3 flex items-center gap-2 text-accent">
                <SparklesIcon className="h-5 w-5" />
                <h3 className="text-base font-semibold text-white">
                  AI recommendations
                </h3>
              </div>
              {audit.aiRecommendations?.length ? (
                <ol className="list-decimal space-y-2 pl-5 text-sm text-zinc-300">
                  {audit.aiRecommendations.map((item) => (
                    <li key={item} className="pl-1">
                      {item}
                    </li>
                  ))}
                </ol>
              ) : (
                <p className="text-sm text-muted">
                  No AI recommendations available for this audit.
                </p>
              )}
            </section>
          </div>

          <section className="rounded-xl border border-border bg-card p-5">
            <div className="mb-4 flex items-center gap-2 text-accent">
              <WrenchIcon className="h-5 w-5" />
              <h3 className="text-base font-semibold text-white">
                Suggested fixes
              </h3>
            </div>
            {audit.suggestedFixes?.length ? (
              <ul className="space-y-3">
                {audit.suggestedFixes.map((fix) => (
                  <li
                    key={fix.id}
                    className="flex flex-col gap-2 rounded-lg border border-border/80 bg-background/60 p-4 sm:flex-row sm:items-start sm:justify-between"
                  >
                    <div>
                      <p className="font-medium text-white">{fix.title}</p>
                      <p className="mt-1 text-sm text-muted">{fix.detail}</p>
                    </div>
                    <StatusBadge status={fix.priority} />
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-muted">No suggested fixes available.</p>
            )}
          </section>
        </>
      ) : null}
    </div>
  );
}
