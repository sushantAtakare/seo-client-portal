import { api } from "@/lib/api";

/**
 * @param {{ page?: number, limit?: number, status?: string, siteId?: string }} [params]
 */
export async function listAudits(params = {}) {
  const response = await api.get("/audits", { query: params });
  return {
    items: Array.isArray(response.data?.items) ? response.data.items : [],
    pagination: response.data?.pagination || {
      page: 1,
      limit: params.limit || 20,
      total: 0,
      totalPages: 0,
    },
  };
}

/**
 * @param {string} auditId
 */
export async function getAuditById(auditId) {
  if (!auditId) {
    throw new Error("auditId is required");
  }

  const response = await api.get(`/audits/${auditId}`);
  return response.data;
}

/**
 * @param {{ siteId: string }} payload
 */
export async function createAudit(payload) {
  const response = await api.post("/audits", {
    siteId: payload.siteId,
  });
  return response.data;
}

/**
 * Enqueue BullMQ crawl for an audit. Backend responds 202.
 * @param {string} auditId
 * @param {object} [crawlConfig]
 */
export async function enqueueAuditCrawl(auditId, crawlConfig = {}) {
  if (!auditId) {
    throw new Error("auditId is required");
  }

  const response = await api.post(`/audits/${auditId}/crawl`, crawlConfig);
  return response.data;
}

/**
 * Create audit then enqueue crawl.
 * @param {{ siteId: string }} payload
 */
export async function createAndStartAudit(payload) {
  const audit = await createAudit(payload);
  const crawl = await enqueueAuditCrawl(audit.id);
  return { audit, crawl };
}

/**
 * @param {string} auditId
 */
export async function getAuditJobs(auditId) {
  if (!auditId) {
    throw new Error("auditId is required");
  }

  const response = await api.get(`/audits/${auditId}/jobs`);
  return {
    auditId: response.data?.auditId || auditId,
    jobs: Array.isArray(response.data?.jobs) ? response.data.jobs : [],
  };
}
