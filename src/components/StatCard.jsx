import {
  CheckCircleIcon,
  ClockIcon,
  FileDownIcon,
  FileTextIcon,
  GaugeIcon,
  SearchIcon,
  TrendingDownIcon,
  TrendingUpIcon,
} from "@/components/Icons";

const iconMap = {
  search: SearchIcon,
  check: CheckCircleIcon,
  clock: ClockIcon,
  file: FileTextIcon,
  download: FileDownIcon,
  gauge: GaugeIcon,
};

export default function StatCard({
  label,
  value,
  change,
  trend,
  icon,
  showTrend = true,
}) {
  const Icon = iconMap[icon] || SearchIcon;
  const isUp = trend === "up";

  return (
    <article className="rounded-xl border border-border bg-card p-5 transition-colors hover:border-zinc-700">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm text-muted">{label}</p>
          <p className="mt-2 text-3xl font-semibold tracking-tight text-white">
            {value}
          </p>
        </div>
        <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/15 text-accent">
          <Icon className="h-5 w-5" />
        </span>
      </div>
      {showTrend && change ? (
        <div
          className={`mt-4 flex items-center gap-1.5 text-xs font-medium ${
            isUp ? "text-emerald-400" : "text-amber-400"
          }`}
        >
          {isUp ? (
            <TrendingUpIcon className="h-3.5 w-3.5" />
          ) : (
            <TrendingDownIcon className="h-3.5 w-3.5" />
          )}
          <span>{change}</span>
        </div>
      ) : null}
    </article>
  );
}
