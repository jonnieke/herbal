// API configuration utility
// Default to same-origin in production. For local dev, set VITE_API_URL=http://localhost:5000
const API_BASE_URL = (import.meta.env.VITE_API_URL ?? '').trim();

export function getApiUrl(path: string): string {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;

  // If no base URL provided, use relative path to current origin
  if (!API_BASE_URL) return normalizedPath;

  const baseUrl = API_BASE_URL.endsWith('/') ? API_BASE_URL.slice(0, -1) : API_BASE_URL;
  return `${baseUrl}${normalizedPath}`;
}

export { API_BASE_URL };

// Build a CDN image URL if VITE_CDN_BASE is provided; else return path unchanged
export function getCdnUrl(path: string): string {
  const base = (import.meta.env.VITE_CDN_BASE ?? '').trim();
  if (!base) return path;
  const cleanBase = base.endsWith('/') ? base.slice(0, -1) : base;
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${cleanBase}${cleanPath}`;
}