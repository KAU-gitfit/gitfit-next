/**
 * 프로필 이미지 저장소 모듈
 * 현재 localStorage 기반으로 구현되어 있음
 * 나중에 백엔드 API로 교체 가능하도록 설계됨
 */

const PROFILE_IMAGE_KEY = "profileImage";

/**
 * localStorage에서 프로필 이미지를 불러옴
 * 나중에 백엔드 API로 교체: GET /api/profile/image
 */
export function loadProfileImage(): string | null {
  if (typeof window === "undefined") return null;

  try {
    const image = localStorage.getItem(PROFILE_IMAGE_KEY);
    return image;
  } catch (error) {
    console.error("Failed to load profile image:", error);
    return null;
  }
}

/**
 * localStorage에 프로필 이미지를 저장
 * 나중에 백엔드 API로 교체: POST /api/profile/image
 */
export function saveProfileImage(value: string): void {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem(PROFILE_IMAGE_KEY, value);
  } catch (error) {
    console.error("Failed to save profile image:", error);
  }
}

/**
 * localStorage에서 프로필 이미지를 삭제
 * 나중에 백엔드 API로 교체: DELETE /api/profile/image
 */
export function clearProfileImage(): void {
  if (typeof window === "undefined") return;

  try {
    localStorage.removeItem(PROFILE_IMAGE_KEY);
  } catch (error) {
    console.error("Failed to clear profile image:", error);
  }
}
