"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { IconUser } from "@/components/icons";
import { useRouter } from "next/navigation";
import Logo from "@/components/Logo";
import { useAuth } from "@/context/AuthContext";

export default function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { user, isAuthenticated, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  const handleLogin = () => {
    router.push("/login");
  };

  const handleLogout = () => {
    logout();
    setIsDropdownOpen(false);
    router.push("/home");
  };

  return (
    <header className="absolute bg-white border-b border-black top-0 left-0 w-full h-16 md:h-18 lg:h-20 xl:h-20 z-50">
      <div className="flex items-center justify-between h-full px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
        <Link
          href="/"
          className="flex gap-1 md:gap-2 items-center cursor-pointer"
        >
          <Logo className="relative shrink-0 size-10 md:size-12 lg:size-14" />
          <div className="flex flex-col font-bold justify-center text-[#3a3a3a] text-lg md:text-xl lg:text-xl">
            <p>Git-Fit</p>
          </div>
        </Link>
        <div className="flex gap-3 md:gap-4 lg:gap-5 items-center">
          <Link
            href="/repositories"
            className="font-semibold text-[#191919] text-sm md:text-base lg:text-base hover:text-[#bbfb4c] transition-colors cursor-pointer"
          >
            레포지토리
          </Link>
          <Link
            href="/reports"
            className="font-semibold text-[#191919] text-sm md:text-base lg:text-base hover:text-[#bbfb4c] transition-colors cursor-pointer"
          >
            리포트
          </Link>
          {isAuthenticated ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex gap-1.5 md:gap-2 items-center"
              >
                <div className="bg-[#bbfb4c] flex items-center justify-center rounded-full size-8 md:size-9 lg:size-10 overflow-hidden">
                  {user?.avatarUrl ? (
                    <Image
                      src={user.avatarUrl}
                      alt="프로필"
                      width={40}
                      height={40}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <IconUser size={20} />
                  )}
                </div>

                <div className="flex items-center justify-center size-3.5 md:size-4">
                  <svg
                    width="100%"
                    height="100%"
                    viewBox="0 0 24 24"
                    fill="none"
                    className={`transition-transform ${
                      isDropdownOpen ? "rotate-[-90deg]" : "rotate-90"
                    }`}
                  >
                    <path
                      d="M9 18L15 12L9 6"
                      stroke="#1d1b20"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </button>

              {/* 로그인 후 드롭다운 메뉴 */}
              {isDropdownOpen && (
                <div className="absolute right-0 top-10 md:top-11 lg:top-12 bg-white border-2 border-[#e0e0e0] rounded-xl shadow-lg w-48 md:w-52 lg:w-56 py-2 z-50">
                  {user && (
                    <div className="px-3 md:px-4 py-2.5 md:py-3 border-b border-[#e0e0e0]">
                      <p className="text-[#191919] text-sm md:text-base font-semibold">
                        {user.displayName || user.githubUsername}
                      </p>
                      <p className="text-[#666] text-xs md:text-sm mt-0.5">
                        {user.email || "이메일 없음"}
                      </p>
                    </div>
                  )}
                  <button
                    onClick={() => {
                      router.push("/settings");
                      setIsDropdownOpen(false);
                    }}
                    className="w-full px-3 md:px-4 py-2.5 md:py-3 text-left hover:bg-[#f5f5f5] transition-colors"
                  >
                    <span className="text-[#191919] text-sm md:text-base font-medium">
                      설정
                    </span>
                  </button>
                  <div className="border-t border-[#e0e0e0] my-1.5" />
                  <button
                    onClick={handleLogout}
                    className="w-full px-3 md:px-4 py-2.5 md:py-3 text-left hover:bg-[#f5f5f5] transition-colors"
                  >
                    <span className="text-[#191919] text-sm md:text-base font-medium">
                      로그아웃
                    </span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={handleLogin}
              className="bg-[#bbfb4c] px-4 md:px-6 py-1.5 md:py-2 rounded-lg font-semibold text-[#191919] text-sm md:text-base hover:bg-[#a8e03c] transition-colors"
            >
              로그인
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
