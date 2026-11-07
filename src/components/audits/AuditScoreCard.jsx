import { scoreColor } from "@/data/dummyData";

function scoreRingColor(score) {
  if (score == null) return "stroke-zinc-700";
  if (score >= 85) return "stroke-emerald-400";
  if (score >= 70) return "stroke-amber-400";
  return "stroke-rose-400";
}

const categoryLabels = [
  { key: "technicalSeo", label: "Technical SEO" },
  { key: "onPageSeo", label: "On-page SEO" },
  { key: "performance", label: "Performance" },
  { key: "mobileFriendliness", label: "Mobile friendliness" },
  { key: "contentQuality", label: "Content quality" },
  { key: "schemaMarkup", label: "Schema markup" },
];

export default function AuditScoreCard({ score, categories = {} }) {
  const safeScore = score ?? 0;
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const progress = score == null ? 0 : Math.min(Math.max(safeScore, 0), 100);
  const offset = circumference - (progress / 100) * circumference;

  return (
    <section className="rounded-xl border border-border bg-card p-5">
      <h3 className="text-base font-semibold text-white">Overall SEO Score</h3>
      <p className="mt-1 text-sm text-muted">
        Score breakdown from this demo audit analysis.
      </p>

      <div className="mt-6 flex flex-col items-center gap-8 lg:flex-row lg:items-start">
        <div className="relative flex h-36 w-36 items-center justify-center">
          <svg className="h-36 w-36 -rotate-90" viewBox="0 0 120 120">
            <circle
              cx="60"
              cy="60"
              r={radius}
              fill="none"
              strokeWidth="10"
              className="stroke-zinc-800"
            />
            <circle
              cx="60"
              cy="60"
              r={radius}
              fill="none"
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              className={scoreRingColor(score)}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className={`text-3xl font-semibold ${scoreColor(score)}`}>
              {score ?? "—"}
            </span>
            <span className="text-xs text-muted">/ 100</span>
          </div>
        </div>

        <div className="w-full flex-1 space-y-4">
          {categoryLabels.map((item) => {
            const value = categories[item.key] ?? 0;
            return (
              <div key={item.key}>
                <div className="mb-1.5 flex items-center justify-between text-sm">
                  <span className="text-muted">{item.label}</span>
                  <span
                    className={`font-medium ${scoreColor(
                      score == null ? null : value
                    )}`}
                  >
                    {score == null ? "—" : value}
                  </span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-zinc-800">
                  <div
                    className="h-full rounded-full bg-accent"
                    style={{
                      width: `${
                        score == null ? 0 : Math.min(Math.max(value, 0), 100)
                      }%`,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
