import { API_BASE_URL } from "@/lib/config";

export async function apiGet<T>(url: string): Promise<T> {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;

  const res = await fetch(`${API_BASE_URL}${url}`, {
    method: "GET",
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  });

  if (!res.ok) {
    throw new Error(`API request failed: ${res.status}`);
  }

  return res.json();
}

export async function apiPost<T>(
  url: string,
  body: unknown,
  includeAuth: boolean = false
): Promise<T> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (includeAuth && typeof window !== "undefined") {
    const token = localStorage.getItem("accessToken");
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
  }

  const res = await fetch(`${API_BASE_URL}${url}`, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    throw new Error(`API request failed: ${res.status}`);
  }

  return res.json();
}
