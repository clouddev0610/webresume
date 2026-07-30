const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000/api";

export async function fetchResume() {
  const res = await fetch(`${API_BASE_URL}/resume/`);
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.detail || `Request failed with status ${res.status}`);
  }
  return res.json();
}