"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { apiPost } from "../lib/api";

interface User {
  id: string;
  login: string;
  name: string;
  email: string;
  avatarUrl: string;
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
      const res = await fetch("https://api.gitfit.site/api/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        const userData = await res.json();
        setUser(userData);
      } else {
        localStorage.removeItem("accessToken");
      }
    } catch (error) {
      console.error("Failed to fetch user info:", error);
      localStorage.removeItem("accessToken");
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (token: string) => {
    try {
      // Call backend API to exchange GitHub token for JWT
      const response = await apiPost("/api/auth/github/token", {
        accessToken: token,
      });

      // Store the JWT token from backend
      const jwtToken = response.accessToken || response.token;
      localStorage.setItem("accessToken", jwtToken);

      // Fetch user info with the new JWT
      await fetchUserInfo(jwtToken);
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
