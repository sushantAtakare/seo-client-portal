import RequestAuditButton from "@/components/RequestAuditButton";
import StatusBadge from "@/components/StatusBadge";
import {
  BuildingIcon,
  ExternalLinkIcon,
  GlobeIcon,
  MapPinIcon,
} from "@/components/Icons";
import { scoreColor, website } from "@/data/dummyData";

function scoreBarColor(score) {
  if (score >= 85) return "bg-emerald-400";
  if (score >= 70) return "bg-amber-400";
  return "bg-rose-400";
}

const performanceItems = [
  { key: "technicalSeo", label: "Technical SEO" },
  { key: "contentQuality", label: "Content quality" },
  { key: "backlinks", label: "Backlinks" },
  { key: "mobileUsability", label: "Mobile usability" },
  { key: "pageSpeed", label: "Page speed" },
];

export default function WebsitePage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-muted">
            Review your connected website details and request a new SEO audit.
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
                  {website.businessName}
                </h2>
                <StatusBadge status={website.status} />
              </div>
              <a
                href={website.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-accent"
              >
                {website.url}
                <ExternalLinkIcon />
              </a>
            </div>
          </div>
          <div className="text-left sm:text-right">
            <p className="text-sm text-muted">Latest SEO score</p>
            <p
              className={`mt-1 text-3xl font-semibold ${scoreColor(
                website.lastAuditScore
              )}`}
            >
              {website.lastAuditScore}
            </p>
            <p className="mt-1 text-xs text-muted">{website.lastAuditDate}</p>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <section className="rounded-xl border border-border bg-card p-5">
          <h3 className="text-base font-semibold text-white">
            Website information
          </h3>
          <p className="mt-1 text-sm text-muted">
            Core property details used for SEO audits.
          </p>

          <dl className="mt-5 space-y-4 text-sm">
            <div className="flex items-start justify-between gap-4 border-b border-border/70 pb-4">
              <dt className="text-muted">Website URL</dt>
              <dd className="text-right text-white">{website.url}</dd>
            </div>
            <div className="flex items-start justify-between gap-4 border-b border-border/70 pb-4">
              <dt className="text-muted">Domain</dt>
              <dd className="text-right text-white">{website.domain}</dd>
            </div>
            <div className="flex items-start justify-between gap-4 border-b border-border/70 pb-4">
              <dt className="flex items-center gap-2 text-muted">
                <BuildingIcon />
                Business type
              </dt>
              <dd className="text-right text-white">{website.businessType}</dd>
            </div>
            <div className="flex items-start justify-between gap-4 border-b border-border/70 pb-4">
              <dt className="flex items-center gap-2 text-muted">
                <MapPinIcon />
                Business location
              </dt>
              <dd className="text-right text-white">{website.businessLocation}</dd>
            </div>
            <div className="flex items-start justify-between gap-4 border-b border-border/70 pb-4">
              <dt className="text-muted">Platform</dt>
              <dd className="text-right text-white">{website.platform}</dd>
            </div>
            <div className="flex items-start justify-between gap-4 border-b border-border/70 pb-4">
              <dt className="text-muted">Pages indexed</dt>
              <dd className="text-right text-white">{website.pagesIndexed}</dd>
            </div>
            <div className="flex items-start justify-between gap-4 border-b border-border/70 pb-4">
              <dt className="text-muted">Crawl status</dt>
              <dd>
                <StatusBadge status={website.crawlStatus} />
              </dd>
            </div>
            <div className="flex items-start justify-between gap-4">
              <dt className="text-muted">Connected since</dt>
              <dd className="text-right text-white">{website.createdAt}</dd>
            </div>
          </dl>
        </section>

        <section className="rounded-xl border border-border bg-card p-5">
          <h3 className="text-base font-semibold text-white">
            Performance summary
          </h3>
          <p className="mt-1 text-sm text-muted">
            Latest category scores from your most recent completed audit.
          </p>

          <div className="mt-5 space-y-4">
            {performanceItems.map((item) => {
              const value = website.performanceSummary[item.key];
              return (
                <div key={item.key}>
                  <div className="mb-1.5 flex items-center justify-between text-sm">
                    <span className="text-muted">{item.label}</span>
                    <span className={`font-medium ${scoreColor(value)}`}>
                      {value}
                    </span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-zinc-800">
                    <div
                      className={`h-full rounded-full transition-all ${scoreBarColor(
                        value
                      )}`}
                      style={{ width: `${value}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-6 rounded-lg border border-border bg-background/60 p-4">
            <p className="text-sm font-medium text-white">About this business</p>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              {website.description}
            </p>
            <div className="mt-4 grid grid-cols-1 gap-3 text-sm sm:grid-cols-2">
              <div>
                <p className="text-muted">Contact person</p>
                <p className="mt-1 text-white">{website.contactPerson}</p>
              </div>
              <div>
                <p className="text-muted">Contact email</p>
                <p className="mt-1 text-white">{website.contactEmail}</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
