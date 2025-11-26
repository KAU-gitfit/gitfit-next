"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Logo from "./Logo";
import { IconUser } from "./icons";

export default function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
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

  return (
    <header className="absolute bg-white border-b border-black top-0 left-0 w-full h-16 md:h-20 lg:h-24 xl:h-28 z-50">
      <div className="flex items-center justify-between h-full px-4 md:px-8 lg:px-16 xl:px-20 max-w-[1920px] mx-auto">
        <Link href="/" className="flex gap-1 md:gap-2 items-center cursor-pointer">
          <Logo className="relative shrink-0 size-12 md:size-16 lg:size-20 xl:size-24" />
          <div className="flex flex-col font-bold justify-center text-[#3a3a3a] text-xl md:text-2xl lg:text-3xl xl:text-4xl">
            <p>Git-Fit</p>
          </div>
        </Link>
        <div className="flex gap-4 md:gap-6 lg:gap-8 xl:gap-10 items-center">
          <Link href="/repositories" className="font-semibold text-[#191919] text-base md:text-lg lg:text-xl xl:text-2xl hover:text-[#bbfb4c] transition-colors cursor-pointer">
            레포지토리
          </Link>
          <Link href="/reports" className="font-semibold text-[#191919] text-base md:text-lg lg:text-xl xl:text-2xl hover:text-[#bbfb4c] transition-colors cursor-pointer">
            리포트
          </Link>
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex gap-2 md:gap-2.5 items-center"
            >
              <div className="bg-[#bbfb4c] flex items-center justify-center rounded-full size-10 md:size-12 lg:size-14 xl:size-16">
                <IconUser size={24} />
              </div>
              <div className="flex items-center justify-center size-4 md:size-5 lg:size-6">
                <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" className={`transition-transform ${isDropdownOpen ? 'rotate-[-90deg]' : 'rotate-90'}`}>
                  <path d="M9 18L15 12L9 6" stroke="#1d1b20" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </button>

            {/* 드롭다운 메뉴 */}
            {isDropdownOpen && (
              <div className="absolute right-0 top-12 md:top-14 lg:top-16 xl:top-20 bg-white border-2 border-[#e0e0e0] rounded-xl shadow-lg w-56 md:w-64 lg:w-72 py-2 z-50">
                <button className="w-full px-4 md:px-6 py-3 md:py-4 text-left hover:bg-[#f5f5f5] transition-colors">
                  <span className="text-[#191919] text-base md:text-lg lg:text-xl xl:text-2xl font-medium">마이페이지</span>
                </button>
                <button className="w-full px-4 md:px-6 py-3 md:py-4 text-left hover:bg-[#f5f5f5] transition-colors">
                  <span className="text-[#191919] text-base md:text-lg lg:text-xl xl:text-2xl font-medium">설정</span>
                </button>
                <div className="border-t border-[#e0e0e0] my-2" />
                <button className="w-full px-4 md:px-6 py-3 md:py-4 text-left hover:bg-[#f5f5f5] transition-colors">
                  <span className="text-[#191919] text-base md:text-lg lg:text-xl xl:text-2xl font-medium">로그아웃</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
