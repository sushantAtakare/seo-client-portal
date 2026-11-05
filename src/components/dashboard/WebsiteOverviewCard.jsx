import Link from "next/link";
import StatusBadge from "@/components/StatusBadge";
import {
  BuildingIcon,
  ExternalLinkIcon,
  GlobeIcon,
  MapPinIcon,
} from "@/components/Icons";
import { scoreColor } from "@/data/dummyData";

export default function WebsiteOverviewCard({ website }) {
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
            <p className="font-medium text-white">{website.businessName}</p>
            <a
              href={website.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-0.5 inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-accent"
            >
              {website.domain}
              <ExternalLinkIcon className="h-3.5 w-3.5" />
            </a>
          </div>
          <StatusBadge status={website.status} />
        </div>

        <dl className="space-y-3 text-sm">
          <div className="flex items-center justify-between gap-3">
            <dt className="flex items-center gap-2 text-muted">
              <BuildingIcon />
              Business type
            </dt>
            <dd className="text-white">{website.businessType}</dd>
          </div>
          <div className="flex items-center justify-between gap-3">
            <dt className="flex items-center gap-2 text-muted">
              <MapPinIcon />
              Location
            </dt>
            <dd className="text-right text-white">{website.businessLocation}</dd>
          </div>
          <div className="flex items-center justify-between gap-3">
            <dt className="text-muted">Latest SEO score</dt>
            <dd className={`font-semibold ${scoreColor(website.lastAuditScore)}`}>
              {website.lastAuditScore}
            </dd>
          </div>
          <div className="flex items-center justify-between gap-3">
            <dt className="text-muted">Last audit</dt>
            <dd className="text-white">{website.lastAuditDate}</dd>
          </div>
          <div className="flex items-center justify-between gap-3">
            <dt className="text-muted">Crawl status</dt>
            <dd>
              <StatusBadge status={website.crawlStatus} />
            </dd>
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
