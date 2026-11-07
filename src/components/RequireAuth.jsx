"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { SparklesIcon } from "@/components/Icons";

export default function RequireAuth({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const { status, isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace(`/login?next=${encodeURIComponent(pathname || "/dashboard")}`);
    }
  }, [isAuthenticated, isLoading, pathname, router]);

  if (isLoading || status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-4">
        <div className="flex flex-col items-center gap-3 text-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/20 text-accent">
            <SparklesIcon className="h-6 w-6 animate-pulse" />
          </span>
          <p className="text-sm font-medium text-white">Restoring your session…</p>
          <p className="text-xs text-muted">Please wait a moment</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-4">
        <p className="text-sm text-muted">Redirecting to sign in…</p>
      </div>
    );
  }

  return children;
}
