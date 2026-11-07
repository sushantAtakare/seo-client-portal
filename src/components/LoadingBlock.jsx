export default function LoadingBlock({ label = "Loading…" }) {
  return (
    <div className="space-y-4" role="status" aria-live="polite">
      <div className="h-28 animate-pulse rounded-xl border border-border bg-card" />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="h-72 animate-pulse rounded-xl border border-border bg-card" />
        <div className="h-72 animate-pulse rounded-xl border border-border bg-card" />
      </div>
      <p className="text-center text-sm text-muted">{label}</p>
    </div>
  );
}
