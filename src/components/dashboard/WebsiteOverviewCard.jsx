import Link from "next/link";
import StatusBadge from "@/components/StatusBadge";
import {
  BuildingIcon,
  ExternalLinkIcon,
  GlobeIcon,
} from "@/components/Icons";
import {
  displayClientStatus,
  displayValue,
  formatDate,
} from "@/lib/format";

export default function WebsiteOverviewCard({
  client,
  primarySite,
  siteCount = 0,
  isLoading = false,
  isError = false,
  error = null,
  onRetry,
}) {
  if (isLoading) {
    return (
      <section className="rounded-xl border border-border bg-card">
        <div className="border-b border-border px-5 py-4">
          <h2 className="text-base font-semibold text-white">Website Overview</h2>
          <p className="mt-0.5 text-sm text-muted">Loading your property…</p>
        </div>
        <div className="space-y-4 px-5 py-5">
          <div className="h-12 animate-pulse rounded-lg bg-white/5" />
          <div className="h-24 animate-pulse rounded-lg bg-white/5" />
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="rounded-xl border border-border bg-card">
        <div className="border-b border-border px-5 py-4">
          <h2 className="text-base font-semibold text-white">Website Overview</h2>
          <p className="mt-0.5 text-sm text-muted">
            Could not load your business profile
          </p>
        </div>
        <div className="px-5 py-5">
          <p className="text-sm text-rose-300">{error || "Request failed."}</p>
          {onRetry ? (
            <button
              type="button"
              onClick={onRetry}
              className="mt-4 inline-flex rounded-lg border border-border px-3 py-2 text-xs font-medium text-muted transition-colors hover:border-zinc-600 hover:text-white"
            >
              Try again
            </button>
          ) : null}
        </div>
      </section>
    );
  }

  if (!client) {
    return (
      <section className="rounded-xl border border-border bg-card">
        <div className="border-b border-border px-5 py-4">
          <h2 className="text-base font-semibold text-white">Website Overview</h2>
        </div>
        <div className="px-5 py-8 text-center">
          <p className="text-sm text-muted">No client profile available.</p>
        </div>
      </section>
    );
  }

  const statusLabel = displayClientStatus(client.status);
  const url = primarySite?.url || client.website || null;
  const domain = primarySite?.domain || null;

  return (
    <section className="rounded-xl border border-border bg-card">
      <div className="border-b border-border px-5 py-4">
        <h2 className="text-base font-semibold text-white">Website Overview</h2>
        <p className="mt-0.5 text-sm text-muted">
          Your connected property at a glance
        </p>
      </div>

      <div className="space-y-5 px-5 py-5">
        <div className="flex items-start gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-accent/15 text-accent">
            <GlobeIcon className="h-5 w-5" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-medium text-white">
              {displayValue(client.businessName)}
            </p>
            {url ? (
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-0.5 inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-accent"
              >
                {domain || url}
                <ExternalLinkIcon className="h-3.5 w-3.5" />
              </a>
            ) : (
              <p className="mt-0.5 text-sm text-muted">No website linked</p>
            )}
          </div>
          <StatusBadge status={statusLabel} />
        </div>

        <dl className="space-y-3 text-sm">
          <div className="flex items-center justify-between gap-3">
            <dt className="flex items-center gap-2 text-muted">
              <BuildingIcon />
              Industry
            </dt>
            <dd className="text-white">{displayValue(client.industry)}</dd>
          </div>
          <div className="flex items-center justify-between gap-3">
            <dt className="text-muted">Contact</dt>
            <dd className="text-right text-white">
              {displayValue(client.contactPerson)}
            </dd>
          </div>
          <div className="flex items-center justify-between gap-3">
            <dt className="text-muted">Websites</dt>
            <dd className="text-white">{siteCount}</dd>
          </div>
          <div className="flex items-center justify-between gap-3">
            <dt className="text-muted">Profile since</dt>
            <dd className="text-white">{formatDate(client.createdAt)}</dd>
          </div>
        </dl>

        <Link
          href="/website"
          className="inline-flex w-full items-center justify-center rounded-lg border border-border px-4 py-2.5 text-sm font-medium text-muted transition-colors hover:border-zinc-600 hover:text-white"
        >
          View website details
        </Link>
      </div>
    </section>
  );
}
