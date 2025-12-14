"use client";

import { useAuth } from "@/context/AuthContext";
import { getGithubOAuthUrl } from "@/lib/api/auth";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="bg-[#181818] min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!user) {
    if (typeof window !== "undefined") {
      window.location.href = getGithubOAuthUrl();
    }
    return null;
  }

  return <>{children}</>;
}
