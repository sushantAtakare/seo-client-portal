"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { ApiError } from "@/lib/api";
import { getClientWorkspace } from "@/services/clients";

/**
 * Loads the authenticated CLIENT's business profile and sites.
 * Uses AuthContext.user.clientId — never hardcodes an id.
 */
export function useClientWorkspace() {
  const { user, isAuthenticated } = useAuth();
  const clientId = user?.clientId || null;
  const requestIdRef = useRef(0);

  const [client, setClient] = useState(null);
  const [sites, setSites] = useState([]);
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    if (!isAuthenticated || !clientId) {
      setClient(null);
      setSites([]);
      setError(
        !isAuthenticated
          ? "Authentication required."
          : "Your account is not linked to a business profile."
      );
      setStatus("error");
      return;
    }

    const requestId = ++requestIdRef.current;
    setStatus("loading");
    setError(null);

    try {
      const workspace = await getClientWorkspace(clientId);
      if (requestId !== requestIdRef.current) return;

      setClient(workspace.client);
      setSites(workspace.sites);
      setStatus("success");
    } catch (err) {
      if (requestId !== requestIdRef.current) return;

      setClient(null);
      setSites([]);
      setStatus("error");
      setError(
        err instanceof ApiError
          ? err.message
          : err?.message || "Unable to load client workspace."
      );
    }
  }, [clientId, isAuthenticated]);

  useEffect(() => {
    load();
  }, [load]);

  return {
    clientId,
    client,
    sites,
    primarySite: sites[0] || null,
    status,
    error,
    isLoading: status === "loading" || status === "idle",
    isError: status === "error",
    isSuccess: status === "success",
    reload: load,
  };
}
