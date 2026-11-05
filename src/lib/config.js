export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:7000";

export const API_V1_BASE = `${API_BASE_URL.replace(/\/$/, "")}/api/v1`;
