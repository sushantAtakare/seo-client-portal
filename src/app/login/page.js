"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ApiError } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import { EyeIcon, EyeOffIcon, SparklesIcon } from "@/components/Icons";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login, isAuthenticated, isLoading, error: authError, setError } =
    useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const [formError, setFormError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const nextPath = searchParams.get("next") || "/dashboard";

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.replace(nextPath.startsWith("/") ? nextPath : "/dashboard");
    }
  }, [isAuthenticated, isLoading, nextPath, router]);

  useEffect(() => {
    if (authError) {
      setFormError(authError);
    }
  }, [authError]);

  const validate = () => {
    const nextErrors = {};
    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      nextErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      nextErrors.email = "Enter a valid email address.";
    }

    if (!password) {
      nextErrors.password = "Password is required.";
    } else if (password.length < 6) {
      nextErrors.password = "Password must be at least 6 characters.";
    }

    setFieldErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormError("");
    setError(null);

    if (!validate()) return;

    setSubmitting(true);

    try {
      await login(email.trim(), password);
      router.replace(nextPath.startsWith("/") ? nextPath : "/dashboard");
    } catch (err) {
      const message =
        err instanceof ApiError
          ? err.message
          : "Unable to sign in. Please try again.";
      setFormError(message);
    } finally {
      setSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-4">
        <p className="text-sm text-muted">Checking your session…</p>
      </div>
    );
  }

  if (isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-4">
        <p className="text-sm text-muted">Redirecting to your dashboard…</p>
      </div>
    );
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-4 py-10">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(139,92,246,0.18),_transparent_55%)]"
        aria-hidden="true"
      />

      <div className="relative w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/20 text-accent">
            <SparklesIcon className="h-6 w-6" />
          </div>
          <h1 className="text-2xl font-semibold tracking-tight text-white">
            Edgelink Client Portal
          </h1>
          <p className="mt-2 text-sm text-muted">
            Sign in with your client account to view SEO audits and reports.
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 shadow-xl sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            <div>
              <label
                htmlFor="login-email"
                className="mb-1.5 block text-sm font-medium text-zinc-300"
              >
                Email
              </label>
              <input
                id="login-email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                  setFieldErrors((prev) => ({ ...prev, email: undefined }));
                  setFormError("");
                }}
                className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-white placeholder:text-zinc-500 outline-none transition focus:border-accent focus:ring-1 focus:ring-accent"
                placeholder="you@company.com"
                disabled={submitting}
              />
              {fieldErrors.email ? (
                <p className="mt-1.5 text-xs text-rose-400">{fieldErrors.email}</p>
              ) : null}
            </div>

            <div>
              <label
                htmlFor="login-password"
                className="mb-1.5 block text-sm font-medium text-zinc-300"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="login-password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  value={password}
                  onChange={(event) => {
                    setPassword(event.target.value);
                    setFieldErrors((prev) => ({
                      ...prev,
                      password: undefined,
                    }));
                    setFormError("");
                  }}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2.5 pr-11 text-sm text-white placeholder:text-zinc-500 outline-none transition focus:border-accent focus:ring-1 focus:ring-accent"
                  placeholder="Enter your password"
                  disabled={submitting}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1.5 text-muted transition-colors hover:bg-white/5 hover:text-white"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOffIcon className="h-4 w-4" />
                  ) : (
                    <EyeIcon className="h-4 w-4" />
                  )}
                </button>
              </div>
              {fieldErrors.password ? (
                <p className="mt-1.5 text-xs text-rose-400">
                  {fieldErrors.password}
                </p>
              ) : null}
            </div>

            {formError ? (
              <div
                className="rounded-lg border border-rose-500/30 bg-rose-500/10 px-3 py-2.5 text-sm text-rose-200"
                role="alert"
              >
                {formError}
              </div>
            ) : null}

            <button
              type="submit"
              disabled={submitting}
              className="inline-flex w-full items-center justify-center rounded-lg bg-accent px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? "Signing in…" : "Sign in"}
            </button>
          </form>
        </div>

        <p className="mt-6 text-center text-xs text-zinc-600">
          Client accounts only. Admin users should use the Admin Portal.
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-background px-4">
          <p className="text-sm text-muted">Loading sign in…</p>
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
