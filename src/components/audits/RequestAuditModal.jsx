"use client";

import { useEffect, useState } from "react";
import { XIcon } from "@/components/Icons";
import { ApiError } from "@/lib/api";
import { useClientWorkspace } from "@/hooks/useClientWorkspace";
import { createAndStartAudit } from "@/services/audits";

export default function RequestAuditModal({ isOpen, onClose, onSuccess }) {
  const { sites, isLoading, isError, error, reload } = useClientWorkspace();
  const [siteId, setSiteId] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState("");

  useEffect(() => {
    if (!isOpen) {
      setSiteId("");
      setSubmitting(false);
      setFormError("");
      setFormSuccess("");
      return undefined;
    }

    const handleEscape = (event) => {
      if (event.key === "Escape" && !submitting) onClose();
    };

    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose, submitting]);

  useEffect(() => {
    if (!isOpen || isLoading || isError) return;
    if (!siteId && sites.length === 1) {
      setSiteId(sites[0].id);
    }
  }, [isOpen, isLoading, isError, siteId, sites]);

  if (!isOpen) return null;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormError("");
    setFormSuccess("");

    if (!siteId) {
      setFormError("Please select a website to audit.");
      return;
    }

    setSubmitting(true);

    try {
      const { audit, crawl } = await createAndStartAudit({ siteId });
      const domain =
        audit?.site?.domain ||
        sites.find((site) => site.id === siteId)?.domain ||
        "your website";

      setFormSuccess(
        `Audit ${audit.id} created for ${domain}. Crawl job ${crawl?.jobId || "queued"} is processing in the background.`
      );

      if (typeof onSuccess === "function") {
        onSuccess({ audit, crawl });
      }

      window.setTimeout(() => {
        onClose();
      }, 1200);
    } catch (err) {
      setFormError(
        err instanceof ApiError
          ? err.message
          : err?.message || "Unable to start the SEO audit."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/70"
        onClick={() => {
          if (!submitting) onClose();
        }}
        aria-hidden="true"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="request-audit-title"
        className="relative w-full max-w-md rounded-xl border border-border bg-card shadow-2xl"
      >
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <h2
            id="request-audit-title"
            className="text-lg font-semibold text-white"
          >
            Request SEO Audit
          </h2>
          <button
            type="button"
            onClick={onClose}
            disabled={submitting}
            className="rounded-lg p-1.5 text-muted transition-colors hover:bg-white/5 hover:text-white disabled:opacity-50"
            aria-label="Close modal"
          >
            <XIcon className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 px-5 py-5">
          {isLoading ? (
            <p className="text-sm text-muted">Loading your websites…</p>
          ) : null}

          {isError ? (
            <div className="rounded-lg border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-sm text-rose-200">
              <p>{error || "Unable to load websites."}</p>
              <button
                type="button"
                onClick={reload}
                className="mt-2 text-xs font-medium underline"
              >
                Retry
              </button>
            </div>
          ) : null}

          {!isLoading && !isError && sites.length === 0 ? (
            <div className="rounded-lg border border-dashed border-border bg-background/60 px-3 py-4 text-sm text-muted">
              No registered websites were found for your account. Ask your admin
              to link a site before requesting an audit.
            </div>
          ) : null}

          {!isLoading && !isError && sites.length > 0 ? (
            <div>
              <label
                htmlFor="request-audit-site"
                className="mb-1.5 block text-sm font-medium text-zinc-300"
              >
                Website
              </label>
              <select
                id="request-audit-site"
                value={siteId}
                onChange={(event) => {
                  setSiteId(event.target.value);
                  setFormError("");
                }}
                disabled={submitting}
                className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-white outline-none transition focus:border-accent focus:ring-1 focus:ring-accent disabled:opacity-60"
              >
                <option value="">Select a website</option>
                {sites.map((site) => (
                  <option key={site.id} value={site.id}>
                    {site.domain || site.url}
                  </option>
                ))}
              </select>
            </div>
          ) : null}

          {formError ? (
            <p
              className="rounded-lg bg-rose-500/10 px-3 py-2 text-sm text-rose-300"
              role="alert"
            >
              {formError}
            </p>
          ) : null}

          {formSuccess ? (
            <p
              className="rounded-lg bg-emerald-500/10 px-3 py-2 text-sm text-emerald-300"
              role="status"
            >
              {formSuccess}
            </p>
          ) : null}

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={submitting}
              className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-muted transition-colors hover:border-zinc-600 hover:text-white disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={
                submitting || isLoading || isError || sites.length === 0
              }
              className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? "Starting…" : "Start audit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
