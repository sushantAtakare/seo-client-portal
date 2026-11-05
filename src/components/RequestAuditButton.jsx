"use client";

import { useState } from "react";
import { PlusIcon } from "@/components/Icons";
import DemoNotice from "@/components/DemoNotice";

export default function RequestAuditButton({
  label = "Request SEO Audit",
  className = "",
}) {
  const [notice, setNotice] = useState("");

  const handleClick = () => {
    setNotice(
      "Audit request is a demo action. Live audit processing will be connected to the backend later."
    );
    window.setTimeout(() => setNotice(""), 4500);
  };

  return (
    <>
      {notice ? (
        <div className="fixed bottom-4 right-4 z-50 max-w-sm shadow-xl">
          <DemoNotice message={notice} />
        </div>
      ) : null}
      <button
        type="button"
        onClick={handleClick}
        className={`inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent-hover ${className}`}
      >
        <PlusIcon className="h-4 w-4" />
        {label}
      </button>
    </>
  );
}
