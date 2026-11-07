import { api } from "@/lib/api";

/**
 * Fetch a client business profile by id.
 * @param {string} clientId
 */
export async function getClientById(clientId) {
  if (!clientId) {
    throw new Error("clientId is required");
  }

  const response = await api.get(`/clients/${clientId}`);
  return response.data;
}

/**
 * Fetch websites belonging to a client.
 * @param {string} clientId
 */
export async function getClientSites(clientId) {
  if (!clientId) {
    throw new Error("clientId is required");
  }

  const response = await api.get(`/clients/${clientId}/sites`);
  return Array.isArray(response.data) ? response.data : [];
}

/**
 * Load client profile and sites together.
 * @param {string} clientId
 */
export async function getClientWorkspace(clientId) {
  const [client, sites] = await Promise.all([
    getClientById(clientId),
    getClientSites(clientId),
  ]);

  return { client, sites };
}
