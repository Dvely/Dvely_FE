export const API_V1_BASE_PATH = '/api/v1';

export function resolveApiV1BaseUrl(apiUrl?: string): string {
  const base = (apiUrl ?? import.meta.env.VITE_API_URL ?? '').replace(/\/$/, '');
  if (!base) return API_V1_BASE_PATH;
  if (base.endsWith(API_V1_BASE_PATH)) return base;
  return `${base}${API_V1_BASE_PATH}`;
}

export function normalizeApiPath(path: string): string {
  return path.startsWith('/') ? path : `/${path}`;
}
