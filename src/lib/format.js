export function formatDate(value) {
  if (!value) return "—";

  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return "—";

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function displayClientStatus(status) {
  if (!status) return "Unknown";
  if (status === "ACTIVE") return "Active";
  if (status === "INACTIVE") return "Inactive";
  return status;
}

export function displayAuditStatus(status) {
  switch (status) {
    case "PENDING":
      return "Pending";
    case "PROCESSING":
      return "In Progress";
    case "COMPLETED":
      return "Completed";
    case "FAILED":
      return "Failed";
    default:
      return status || "Unknown";
  }
}

export function toAuditApiStatus(label) {
  switch (label) {
    case "Pending":
      return "PENDING";
    case "In Progress":
      return "PROCESSING";
    case "Completed":
      return "COMPLETED";
    case "Failed":
      return "FAILED";
    default:
      return undefined;
  }
}

export function shortenId(id, size = 10) {
  if (!id) return "—";
  const value = String(id);
  if (value.length <= size + 3) return value;
  return `${value.slice(0, size)}…`;
}

export function displayValue(value, fallback = "—") {
  if (value === null || value === undefined) return fallback;
  const text = String(value).trim();
  return text.length ? text : fallback;
}

export const ACTIVE_JOB_STATES = new Set([
  "waiting",
  "active",
  "delayed",
  "paused",
  "waiting-children",
]);

export function isTerminalJobState(state) {
  return state === "completed" || state === "failed";
}
