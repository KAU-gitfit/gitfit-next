"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { apiGet } from "../lib/api";

interface User {
  userId: number;
  githubId: string;
  githubUsername: string;
  displayName: string;
  email: string | null;
  avatarUrl: string;
  createdAt: string;
}

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
    const token = localStorage.getItem("accessToken");
    if (token) {
      fetchUserInfo(token);
    } else {
      setIsLoading(false);
    }
  }, []);

  const fetchUserInfo = async (token: string) => {
    try {
      const res = await apiGet("/api/users/profile");

      setUser(res.result);
    } catch (error) {
      console.error("Failed to fetch user info:", error);
      localStorage.removeItem("accessToken");
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (token: string) => {
    try {
      localStorage.setItem("accessToken", token);

      await fetchUserInfo(token);
    } catch (error) {
      console.error("Login failed:", error);
      localStorage.removeItem("accessToken");
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
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
