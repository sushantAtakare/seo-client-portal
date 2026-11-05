const statusStyles = {
  Completed: "bg-emerald-500/15 text-emerald-400 ring-emerald-500/30",
  "In Progress": "bg-amber-500/15 text-amber-400 ring-amber-500/30",
  Failed: "bg-rose-500/15 text-rose-400 ring-rose-500/30",
  Pending: "bg-sky-500/15 text-sky-400 ring-sky-500/30",
  Available: "bg-emerald-500/15 text-emerald-400 ring-emerald-500/30",
  Processing: "bg-amber-500/15 text-amber-400 ring-amber-500/30",
  Active: "bg-emerald-500/15 text-emerald-400 ring-emerald-500/30",
  Inactive: "bg-zinc-500/15 text-zinc-400 ring-zinc-500/30",
  Critical: "bg-rose-500/15 text-rose-400 ring-rose-500/30",
  Important: "bg-amber-500/15 text-amber-400 ring-amber-500/30",
  Warning: "bg-yellow-500/15 text-yellow-400 ring-yellow-500/30",
  Passed: "bg-emerald-500/15 text-emerald-400 ring-emerald-500/30",
  Delivered: "bg-emerald-500/15 text-emerald-400 ring-emerald-500/30",
  Sent: "bg-sky-500/15 text-sky-400 ring-sky-500/30",
  Email: "bg-violet-500/15 text-violet-300 ring-violet-500/30",
  WhatsApp: "bg-emerald-500/15 text-emerald-400 ring-emerald-500/30",
  Healthy: "bg-emerald-500/15 text-emerald-400 ring-emerald-500/30",
  "Audit completion": "bg-sky-500/15 text-sky-400 ring-sky-500/30",
  "Report ready": "bg-violet-500/15 text-violet-300 ring-violet-500/30",
};

export default function StatusBadge({ status }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${
        statusStyles[status] || "bg-zinc-500/15 text-zinc-300 ring-zinc-500/30"
      }`}
    >
      {status}
    </span>
  );
}
