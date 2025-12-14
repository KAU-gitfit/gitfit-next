"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function SuccessHandler() {
    const params = useSearchParams();
    const router = useRouter();
    const { login } = useAuth();
    const [error, setError] = useState(false);

    useEffect(() => {
        const handleLogin = async () => {
            const token = params.get("token");

            const getOAuthUrl = () => {
                const baseUrl = process.env.NEXT_PUBLIC_GITHUB_AUTH_URL || "https://api.gitfit.site/oauth2/authorization/github";
                const isDevelopment = process.env.NODE_ENV === "development";
                return isDevelopment ? `${baseUrl}?env=local` : baseUrl;
            };

            if (!token) {
                setError(true);
                setTimeout(() => {
                    window.location.href = getOAuthUrl();
                }, 2000);
                return;
            }

            try {
                await login(token);
                router.replace("/home");
            } catch (err) {
                console.error("Login error:", err);
                setError(true);
                setTimeout(() => {
                    window.location.href = getOAuthUrl();
                }, 2000);
            }
        };

        handleLogin();
    }, [params, router, login]);

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-[#181818]">
                <div className="text-center">
                    <p className="text-red-500 text-xl mb-4">로그인에 실패했습니다.</p>
                    <p className="text-[#acacac]">다시 시도합니다...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-[#181818]">
            <div className="text-center">
                <p className="text-white text-xl">로그인 처리중...</p>
            </div>
        </div>
    );
}