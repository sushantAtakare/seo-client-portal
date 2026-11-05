import Link from "next/link";
import StatusBadge from "@/components/StatusBadge";
import { EyeIcon } from "@/components/Icons";
import { scoreColor } from "@/data/dummyData";

export default function RecentAuditActivity({ audits }) {
  return (
    <section className="rounded-xl border border-border bg-card">
      <div className="flex items-center justify-between border-b border-border px-5 py-4">
        <div>
          <h2 className="text-base font-semibold text-white">
            Recent Audit Activity
          </h2>
          <p className="mt-0.5 text-sm text-muted">
            Latest SEO audits for your website
          </p>
        </div>
        <Link
          href="/audits"
          className="text-sm font-medium text-accent transition-colors hover:text-accent-hover"
        >
          View all
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead>
            <tr className="border-b border-border text-xs uppercase tracking-wide text-muted">
              <th className="px-5 py-3 font-medium">Audit ID</th>
              <th className="px-5 py-3 font-medium">Date</th>
              <th className="px-5 py-3 font-medium">SEO Score</th>
              <th className="px-5 py-3 font-medium">Status</th>
              <th className="px-5 py-3 font-medium">Progress</th>
              <th className="px-5 py-3 font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            {audits.map((audit) => (
              <tr
                key={audit.id}
                className="border-b border-border/70 transition-colors last:border-0 hover:bg-white/[0.02]"
              >
                <td className="px-5 py-4">
                  <p className="font-mono text-xs text-white">{audit.auditId}</p>
                  <p className="mt-0.5 text-xs text-muted">{audit.domain}</p>
                </td>
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
                    <div className="h-1.5 w-16 overflow-hidden rounded-full bg-zinc-800">
                      <div
                        className="h-full rounded-full bg-accent transition-all"
                        style={{ width: `${audit.progress}%` }}
                      />
                    </div>
                    <span className="text-xs text-muted">{audit.progress}%</span>
                  </div>
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
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
