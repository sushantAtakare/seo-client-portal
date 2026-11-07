import { API_V1_BASE } from "@/lib/config";
import {
  clearTokens,
  getAccessToken,
  getRefreshToken,
  setTokens,
} from "@/lib/authStorage";

export class ApiError extends Error {
  constructor(message, { status = 500, errors = [], data = null } = {}) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.errors = errors;
    this.data = data;
  }
}

let refreshPromise = null;
let onUnauthorized = null;

/**
 * Register a callback invoked when refresh fails and the session must end.
 * AuthProvider uses this to clear React state and redirect.
 */
export function setUnauthorizedHandler(handler) {
  onUnauthorized = typeof handler === "function" ? handler : null;
}

async function parseJsonSafe(response) {
  const text = await response.text();
  if (!text) return null;

  try {
    return JSON.parse(text);
  } catch {
    return { raw: text };
  }
}

function buildUrl(path, query) {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  const url = new URL(`${API_V1_BASE}${normalized}`);

  if (query && typeof query === "object") {
    Object.entries(query).forEach(([key, value]) => {
      if (value === undefined || value === null || value === "") return;
      url.searchParams.set(key, String(value));
    });
  }

  return url.toString();
}

async function refreshAccessToken() {
  const refreshToken = getRefreshToken();

  if (!refreshToken) {
    throw new ApiError("Session expired. Please sign in again.", {
      status: 401,
    });
  }

  if (!refreshPromise) {
    refreshPromise = (async () => {
      const response = await fetch(buildUrl("/auth/refresh"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ refreshToken }),
      });

      const payload = await parseJsonSafe(response);

      if (!response.ok || !payload?.success) {
        clearTokens();
        throw new ApiError(
          payload?.message || "Session expired. Please sign in again.",
          {
            status: response.status || 401,
            errors: payload?.errors || [],
            data: payload?.data ?? null,
          }
        );
      }

      const nextAccess = payload.data?.accessToken;
      const nextRefresh = payload.data?.refreshToken;

      if (!nextAccess || !nextRefresh) {
        clearTokens();
        throw new ApiError("Invalid refresh response from server.", {
          status: 500,
        });
      }

      setTokens({
        accessToken: nextAccess,
        refreshToken: nextRefresh,
      });

      return {
        accessToken: nextAccess,
        refreshToken: nextRefresh,
        user: payload.data?.user || null,
      };
    })().finally(() => {
      refreshPromise = null;
    });
  }

  return refreshPromise;
}

async function request(
  path,
  {
    method = "GET",
    body,
    query,
    auth = true,
    headers = {},
    retry = true,
    responseType = "json",
  } = {}
) {
  const finalHeaders = {
    Accept: responseType === "blob" ? "*/*" : "application/json",
    ...headers,
  };

  if (body !== undefined && !(body instanceof FormData)) {
    finalHeaders["Content-Type"] =
      finalHeaders["Content-Type"] || "application/json";
  }

  if (auth) {
    const accessToken = getAccessToken();
    if (accessToken) {
      finalHeaders.Authorization = `Bearer ${accessToken}`;
    }
  }

  const response = await fetch(buildUrl(path, query), {
    method,
    headers: finalHeaders,
    body:
      body === undefined
        ? undefined
        : body instanceof FormData
          ? body
          : JSON.stringify(body),
  });

  const isRefreshCall = path === "/auth/refresh" || path.endsWith("/auth/refresh");

  if (response.status === 401 && auth && retry && !isRefreshCall) {
    try {
      await refreshAccessToken();
      return request(path, {
        method,
        body,
        query,
        auth,
        headers,
        retry: false,
        responseType,
      });
    } catch (error) {
      if (typeof onUnauthorized === "function") {
        onUnauthorized(error);
      }
      throw error;
    }
  }

  if (responseType === "blob") {
    if (!response.ok) {
      const payload = await parseJsonSafe(response);
      throw new ApiError(payload?.message || "Download failed", {
        status: response.status,
        errors: payload?.errors || [],
        data: payload?.data ?? null,
      });
    }

    return {
      blob: await response.blob(),
      headers: response.headers,
      status: response.status,
    };
  }

  const payload = await parseJsonSafe(response);

  if (!response.ok || payload?.success === false) {
    throw new ApiError(payload?.message || "Request failed", {
      status: response.status,
      errors: payload?.errors || [],
      data: payload?.data ?? null,
    });
  }

  return payload;
}

export const api = {
  get(path, options = {}) {
    return request(path, { ...options, method: "GET" });
  },
  post(path, body, options = {}) {
    return request(path, { ...options, method: "POST", body });
  },
  patch(path, body, options = {}) {
    return request(path, { ...options, method: "PATCH", body });
  },
  put(path, body, options = {}) {
    return request(path, { ...options, method: "PUT", body });
  },
  delete(path, options = {}) {
    return request(path, { ...options, method: "DELETE" });
  },
  download(path, options = {}) {
    return request(path, { ...options, method: "GET", responseType: "blob" });
  },
};

export const authApi = {
  login(email, password) {
    return api.post(
      "/auth/login",
      { email, password },
      { auth: false, retry: false }
    );
  },
  refresh(refreshToken) {
    return api.post(
      "/auth/refresh",
      { refreshToken },
      { auth: false, retry: false }
    );
  },
  me() {
    return api.get("/auth/me", { retry: true });
  },
  logout(refreshToken) {
    return api.post(
      "/auth/logout",
      { refreshToken },
      { auth: false, retry: false }
    );
  },
};

export { refreshAccessToken };
