"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import {
  getUserProfile,
  getAccessToken,
  setAccessToken,
  removeAccessToken,
} from "@/lib/api/auth";
import type { User } from "@/lib/types/user";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (token: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = getAccessToken();
    if (token) {
      fetchUserInfo();
    } else {
      setIsLoading(false);
    }
  }, []);

  const fetchUserInfo = async () => {
    try {
      const userProfile = await getUserProfile();
      setUser(userProfile);
    } catch (error) {
      console.error("Failed to fetch user info:", error);
      removeAccessToken();
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (token: string) => {
    try {
      setAccessToken(token);
      await fetchUserInfo();
    } catch (error) {
      console.error("Login failed:", error);
      removeAccessToken();
      throw error;
    }
  };

  const logout = () => {
    removeAccessToken();
    setUser(null);
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
