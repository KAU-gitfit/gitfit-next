"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import {
  loadProfileImage,
  saveProfileImage,
  clearProfileImage,
} from "@/lib/profileStorage";

interface ProfileContextType {
  profileImage: string | null;
  setProfileImage: (value: string | null) => void;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export function ProfileProvider({ children }: { children: ReactNode }) {
  const [profileImage, setProfileImage] = useState<string | null>(() => {
    if (typeof window === "undefined") return null;
    return loadProfileImage();
  });
  // profileImage가 변경될 때마다 localStorage에 저장 또는 삭제
  // profileImage 변경 → localStorage 동기화
  useEffect(() => {
    if (profileImage === null) {
      clearProfileImage();
    } else {
      saveProfileImage(profileImage);
    }
  }, [profileImage]);

  return (
    <ProfileContext.Provider value={{ profileImage, setProfileImage }}>
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error("useProfile must be used within a ProfileProvider");
  }
  return context;
}
