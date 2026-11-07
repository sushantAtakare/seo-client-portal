"use client";

import RequestAuditButton from "@/components/RequestAuditButton";
import StatusBadge from "@/components/StatusBadge";
import LoadingBlock from "@/components/LoadingBlock";
import ErrorState from "@/components/ErrorState";
import {
  BuildingIcon,
  ExternalLinkIcon,
  GlobeIcon,
} from "@/components/Icons";
import { useClientWorkspace } from "@/hooks/useClientWorkspace";
import {
  displayClientStatus,
  displayValue,
  formatDate,
} from "@/lib/format";

function DetailRow({ label, children, icon: Icon }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-border/70 pb-4 last:border-0 last:pb-0">
      <dt className="flex items-center gap-2 text-muted">
        {Icon ? <Icon /> : null}
        {label}
      </dt>
      <dd className="text-right text-white">{children}</dd>
    </div>
  );
}

export default function WebsitePageContent() {
  const {
    client,
    sites,
    primarySite,
    isLoading,
    isError,
    error,
    reload,
  } = useClientWorkspace();

  if (isLoading) {
    return <LoadingBlock label="Loading your business profile and websites…" />;
  }

  if (isError) {
    return (
      <ErrorState
        title="Unable to load client profile"
        message={error}
        onRetry={reload}
      />
    );
  }

  if (!client) {
    return (
      <ErrorState
        title="Client profile unavailable"
        message="No business profile was returned for your account."
        onRetry={reload}
      />
    );
  }

  const statusLabel = displayClientStatus(client.status);
  const primaryUrl = primarySite?.url || client.website || null;
  const primaryDomain = primarySite?.domain || null;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-muted">
            Review your business profile and connected websites.
          </p>
        </div>
        <RequestAuditButton />
      </div>

      <section className="rounded-xl border border-border bg-card p-5 sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-start gap-4">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/15 text-accent">
              <GlobeIcon className="h-6 w-6" />
            </span>
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <h2 className="text-xl font-semibold text-white">
                  {displayValue(client.businessName)}
                </h2>
                <StatusBadge status={statusLabel} />
              </div>
              {primaryUrl ? (
                <a
                  href={primaryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-accent"
                >
                  {primaryDomain || primaryUrl}
                  <ExternalLinkIcon />
                </a>
              ) : (
                <p className="mt-1 text-sm text-muted">No primary website linked</p>
              )}
            </div>
          </div>
          <div className="text-left sm:text-right">
            <p className="text-sm text-muted">Connected websites</p>
            <p className="mt-1 text-3xl font-semibold text-white">
              {sites.length}
            </p>
            <p className="mt-1 text-xs text-muted">
              Profile since {formatDate(client.createdAt)}
            </p>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <section className="rounded-xl border border-border bg-card p-5">
          <h3 className="text-base font-semibold text-white">Client profile</h3>
          <p className="mt-1 text-sm text-muted">
            Business details linked to your client account.
          </p>

          <dl className="mt-5 space-y-4 text-sm">
            <DetailRow label="Business name">
              {displayValue(client.businessName)}
            </DetailRow>
            <DetailRow label="Contact person">
              {displayValue(client.contactPerson)}
            </DetailRow>
            <DetailRow label="Contact email">
              {client.contactEmail ? (
                <a
                  href={`mailto:${client.contactEmail}`}
                  className="transition-colors hover:text-accent"
                >
                  {client.contactEmail}
                </a>
              ) : (
                "—"
              )}
            </DetailRow>
            <DetailRow label="Contact phone">
              {displayValue(client.contactPhone)}
            </DetailRow>
            <DetailRow label="Industry" icon={BuildingIcon}>
              {displayValue(client.industry)}
            </DetailRow>
            <DetailRow label="Client status">
              <StatusBadge status={statusLabel} />
            </DetailRow>
            <DetailRow label="Primary website">
              {primaryUrl ? (
                <a
                  href={primaryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 transition-colors hover:text-accent"
                >
                  {primaryDomain || primaryUrl}
                  <ExternalLinkIcon className="h-3.5 w-3.5" />
                </a>
              ) : (
                displayValue(client.website)
              )}
            </DetailRow>
          </dl>
        </section>

        <section className="rounded-xl border border-border bg-card p-5">
          <h3 className="text-base font-semibold text-white">Websites</h3>
          <p className="mt-1 text-sm text-muted">
            Domains connected for SEO audits on your account.
          </p>

          {sites.length === 0 ? (
            <div className="mt-5 rounded-lg border border-dashed border-border bg-background/60 px-4 py-10 text-center">
              <p className="text-sm font-medium text-white">No websites yet</p>
              <p className="mt-1 text-sm text-muted">
                Your admin has not linked a website to this client profile.
              </p>
              {client.website ? (
                <p className="mt-3 text-xs text-zinc-500">
                  Profile website field: {client.website}
                </p>
              ) : null}
            </div>
          ) : (
            <ul className="mt-5 space-y-3">
              {sites.map((site) => (
                <li
                  key={site.id}
                  className="rounded-lg border border-border/80 bg-background/60 p-4 transition-colors hover:border-zinc-700"
                >
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent/15 text-accent">
                      <GlobeIcon className="h-4 w-4" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-white">
                        {displayValue(site.domain)}
                      </p>
                      {site.url ? (
                        <a
                          href={site.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-1 inline-flex max-w-full items-center gap-1.5 truncate text-sm text-muted transition-colors hover:text-accent"
                        >
                          <span className="truncate">{site.url}</span>
                          <ExternalLinkIcon className="h-3.5 w-3.5 shrink-0" />
                        </a>
                      ) : null}
                      <p className="mt-2 text-xs text-zinc-500">
                        Added {formatDate(site.createdAt)}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}
