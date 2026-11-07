"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import { ApiError, authApi, setUnauthorizedHandler } from "@/lib/api";
import {
  clearTokens,
  getAccessToken,
  getRefreshToken,
  setTokens,
} from "@/lib/authStorage";
import { getClientAccessError, isClientUser } from "@/lib/user";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState(null);
  const [status, setStatus] = useState("loading"); // loading | authenticated | unauthenticated
  const [error, setError] = useState(null);

  const clearSession = useCallback(() => {
    clearTokens();
    setUser(null);
    setStatus("unauthenticated");
  }, []);

  const handleUnauthorized = useCallback(() => {
    clearSession();
    if (pathname !== "/login") {
      router.replace("/login");
    }
  }, [clearSession, pathname, router]);

  useEffect(() => {
    setUnauthorizedHandler(handleUnauthorized);
    return () => setUnauthorizedHandler(null);
  }, [handleUnauthorized]);

  const restoreSession = useCallback(async () => {
    const accessToken = getAccessToken();
    const refreshToken = getRefreshToken();

    if (!accessToken && !refreshToken) {
      setUser(null);
      setStatus("unauthenticated");
      return;
    }

    setStatus("loading");
    setError(null);

    try {
      const response = await authApi.me();
      const profile = response.data;
      const accessError = getClientAccessError(profile);

      if (accessError) {
        clearTokens();
        setUser(null);
        setStatus("unauthenticated");
        setError(accessError);
        return;
      }

      setUser(profile);
      setStatus("authenticated");
    } catch (err) {
      clearTokens();
      setUser(null);
      setStatus("unauthenticated");

      if (!(err instanceof ApiError && err.status === 401)) {
        setError(err.message || "Unable to restore session.");
      }
    }
  }, []);

  useEffect(() => {
    restoreSession();
  }, [restoreSession]);

  const login = useCallback(async (email, password) => {
    setError(null);

    const response = await authApi.login(email, password);
    const nextUser = response.data?.user;
    const accessToken = response.data?.accessToken;
    const refreshToken = response.data?.refreshToken;

    if (!accessToken || !refreshToken || !nextUser) {
      throw new ApiError("Invalid login response from server.");
    }

    const accessError = getClientAccessError(nextUser);
    if (accessError) {
      clearTokens();
      setUser(null);
      setStatus("unauthenticated");
      throw new ApiError(accessError, { status: 403 });
    }

    setTokens({ accessToken, refreshToken });
    setUser(nextUser);
    setStatus("authenticated");
    setError(null);

    return nextUser;
  }, []);

  const logout = useCallback(async () => {
    const refreshToken = getRefreshToken();

    try {
      if (refreshToken) {
        await authApi.logout(refreshToken);
      }
    } catch {
      // Still clear local session even if logout API fails
    } finally {
      clearSession();
      router.replace("/login");
    }
  }, [clearSession, router]);

  const value = useMemo(
    () => ({
      user,
      status,
      error,
      isAuthenticated: status === "authenticated" && isClientUser(user),
      isLoading: status === "loading",
      login,
      logout,
      restoreSession,
      clearSession,
      setError,
    }),
    [user, status, error, login, logout, restoreSession, clearSession]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
