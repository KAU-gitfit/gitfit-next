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
    <header className="absolute bg-white border-b border-black top-0 left-0 w-full h-16 md:h-18 lg:h-20 xl:h-20 z-50">
      <div className="flex items-center justify-between h-full px-4 md:px-8 lg:px-12 xl:px-16 max-w-[1920px] mx-auto">
        <Link href="/" className="flex gap-1 md:gap-2 items-center cursor-pointer">
          <Logo className="relative shrink-0 size-12 md:size-14 lg:size-16 xl:size-16" />
          <div className="flex flex-col font-bold justify-center text-[#3a3a3a] text-xl md:text-2xl lg:text-2xl xl:text-2xl">
            <p>Git-Fit</p>
          </div>
        </Link>
        <div className="flex gap-4 md:gap-6 lg:gap-6 xl:gap-8 items-center">
          <Link href="/repositories" className="font-semibold text-[#191919] text-base md:text-lg lg:text-lg xl:text-xl hover:text-[#bbfb4c] transition-colors cursor-pointer">
            레포지토리
          </Link>
          <Link href="/reports" className="font-semibold text-[#191919] text-base md:text-lg lg:text-lg xl:text-xl hover:text-[#bbfb4c] transition-colors cursor-pointer">
            리포트
          </Link>
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex gap-2 md:gap-2.5 items-center"
            >
              <div className="bg-[#bbfb4c] flex items-center justify-center rounded-full size-10 md:size-11 lg:size-12 xl:size-12">
                <IconUser size={24} />
              </div>
              <div className="flex items-center justify-center size-4 md:size-5 lg:size-5">
                <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" className={`transition-transform ${isDropdownOpen ? 'rotate-[-90deg]' : 'rotate-90'}`}>
                  <path d="M9 18L15 12L9 6" stroke="#1d1b20" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </button>

            {/* 드롭다운 메뉴 */}
            {isDropdownOpen && (
              <div className="absolute right-0 top-12 md:top-13 lg:top-14 xl:top-14 bg-white border-2 border-[#e0e0e0] rounded-xl shadow-lg w-56 md:w-60 lg:w-64 py-2 z-50">
                <button className="w-full px-4 md:px-5 py-3 md:py-3.5 text-left hover:bg-[#f5f5f5] transition-colors">
                  <span className="text-[#191919] text-base md:text-lg lg:text-lg xl:text-xl font-medium">마이페이지</span>
                </button>
                <button className="w-full px-4 md:px-5 py-3 md:py-3.5 text-left hover:bg-[#f5f5f5] transition-colors">
                  <span className="text-[#191919] text-base md:text-lg lg:text-lg xl:text-xl font-medium">설정</span>
                </button>
                <div className="border-t border-[#e0e0e0] my-2" />
                <button className="w-full px-4 md:px-5 py-3 md:py-3.5 text-left hover:bg-[#f5f5f5] transition-colors">
                  <span className="text-[#191919] text-base md:text-lg lg:text-lg xl:text-xl font-medium">로그아웃</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
