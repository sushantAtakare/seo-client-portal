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

export function displayValue(value, fallback = "—") {
  if (value === null || value === undefined) return fallback;
  const text = String(value).trim();
  return text.length ? text : fallback;
}
