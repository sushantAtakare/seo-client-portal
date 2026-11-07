export function getUserInitials(name = "") {
  const parts = String(name)
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  if (parts.length === 0) return "?";

  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase();
  }

  return `${parts[0][0] || ""}${parts[1][0] || ""}`.toUpperCase();
}

export function isClientUser(user) {
  return Boolean(
    user &&
      user.role === "CLIENT" &&
      typeof user.clientId === "string" &&
      user.clientId.length > 0
  );
}

export function getClientAccessError(user) {
  if (!user) {
    return "Authentication required.";
  }

  if (user.role === "ADMIN") {
    return "Admin accounts cannot access the Client Portal. Please use the Admin Portal instead.";
  }

  if (user.role !== "CLIENT") {
    return "Only client accounts can access this portal.";
  }

  if (!user.clientId) {
    return "This client account is not linked to a business profile.";
  }

  return null;
}
