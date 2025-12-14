import { apiGet, apiDelete } from "./client";
import { API_BASE_URL, USE_MOCK_DATA } from "@/lib/config";
import type { User, UserProfileResponse } from "@/lib/types/user";

// GitHub OAuth URL 생성
export function getGithubOAuthUrl(): string {
  if (USE_MOCK_DATA) {
    return "/auth/success?token=mock-token";
  }

  const baseUrl = `${API_BASE_URL}/oauth2/authorization/github`;
  const isDevelopment = process.env.NODE_ENV === "development";
  return isDevelopment ? `${baseUrl}?env=local` : baseUrl;
}

// 사용자 프로필 조회
export async function getUserProfile(): Promise<User> {
  if (USE_MOCK_DATA) {
    const { mockUser } = await import("@/mock/user");
    return mockUser;
  }

  const response = await apiGet<UserProfileResponse>("/api/users/profile");
  return response.result;
}

// 토큰 저장
export function setAccessToken(token: string): void {
  localStorage.setItem("accessToken", token);
}

// 토큰 조회
export function getAccessToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("accessToken");
}

// 토큰 삭제
export function removeAccessToken(): void {
  localStorage.removeItem("accessToken");
}

// 회원 탈퇴
export async function deleteAccount(): Promise<void> {
  if (USE_MOCK_DATA) {
    return;
  }

  await apiDelete("/api/users/account");
}
