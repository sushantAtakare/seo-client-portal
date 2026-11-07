"use client";

import { useEffect, useRef, useState } from "react";
import { getAuditJobs } from "@/services/audits";
import { ACTIVE_JOB_STATES, isTerminalJobState } from "@/lib/format";

const POLL_INTERVAL_MS = 4000;

/**
 * Poll BullMQ job progress for PROCESSING audits.
 * Only uses progress values returned by the backend.
 *
 * @param {string[]} auditIds
 * @param {{ enabled?: boolean }} [options]
 */
export function useAuditJobProgress(auditIds, { enabled = true } = {}) {
  const [jobsByAuditId, setJobsByAuditId] = useState({});
  const idsKey = Array.isArray(auditIds) ? auditIds.filter(Boolean).join("|") : "";
  const idsRef = useRef([]);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    idsRef.current = idsKey ? idsKey.split("|") : [];
  }, [idsKey]);

  useEffect(() => {
    if (!enabled || !idsKey) {
      setJobsByAuditId({});
      return undefined;
    }

    let cancelled = false;
    let timerId = null;

    const poll = async () => {
      const ids = idsRef.current;
      if (!ids.length) return;

      const entries = await Promise.all(
        ids.map(async (auditId) => {
          try {
            const payload = await getAuditJobs(auditId);
            const job = payload.jobs[0] || null;
            return [auditId, job];
          } catch {
            return [auditId, null];
          }
        })
      );

      if (cancelled || !mountedRef.current) return;

      setJobsByAuditId((prev) => {
        const next = { ...prev };
        for (const [auditId, job] of entries) {
          next[auditId] = job;
        }
        return next;
      });

      const stillActive = entries.some(([, job]) => {
        if (!job?.status) return true;
        return ACTIVE_JOB_STATES.has(job.status) && !isTerminalJobState(job.status);
      });

      if (stillActive && !cancelled && mountedRef.current) {
        timerId = window.setTimeout(poll, POLL_INTERVAL_MS);
      }
    };

    poll();

    return () => {
      cancelled = true;
      if (timerId) window.clearTimeout(timerId);
    };
  }, [enabled, idsKey]);

  return jobsByAuditId;
}
