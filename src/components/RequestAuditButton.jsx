"use client";

import { useState } from "react";
import { PlusIcon } from "@/components/Icons";
import RequestAuditModal from "@/components/audits/RequestAuditModal";

export default function RequestAuditButton({
  label = "Request SEO Audit",
  className = "",
  onSuccess,
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={`inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent-hover ${className}`}
      >
        <PlusIcon className="h-4 w-4" />
        {label}
      </button>

      {open ? (
        <RequestAuditModal
          isOpen={open}
          onClose={() => setOpen(false)}
          onSuccess={onSuccess}
        />
      ) : null}
    </>
  );
}
