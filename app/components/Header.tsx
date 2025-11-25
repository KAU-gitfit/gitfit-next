"use client";

import { useState, useEffect, useRef } from "react";
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
    <header className="absolute bg-white border-b border-black top-0 left-0 w-full h-[150px] z-50">
      <div className="flex items-center justify-between h-full px-[106px] max-w-[1920px] mx-auto">
        <div className="flex gap-[5px] items-center">
          <Logo className="relative shrink-0 size-[100px]" />
          <div className="flex flex-col font-bold justify-center text-[#3a3a3a] text-[40px]">
            <p>Git-Fit</p>
          </div>
        </div>
        <div className="flex gap-[40px] items-center">
          <p className="font-semibold text-[#191919] text-[40px]">레포지토리</p>
          <p className="font-semibold text-[#191919] text-[40px]">리포트</p>
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex gap-[10px] items-center"
            >
              <div className="bg-[#bbfb4c] flex items-center justify-center rounded-full size-[100px]">
                <IconUser size={48} />
              </div>
              <div className="flex items-center justify-center size-[24px]">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className={`transition-transform ${isDropdownOpen ? 'rotate-[-90deg]' : 'rotate-90'}`}>
                  <path d="M9 18L15 12L9 6" stroke="#1d1b20" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </button>

            {/* 드롭다운 메뉴 */}
            {isDropdownOpen && (
              <div className="absolute right-0 top-[110px] bg-white border-2 border-[#e0e0e0] rounded-[12px] shadow-lg w-[280px] py-[8px] z-50">
                <button className="w-full px-[24px] py-[16px] text-left hover:bg-[#f5f5f5] transition-colors">
                  <span className="text-[#191919] text-[28px] font-medium">마이페이지</span>
                </button>
                <button className="w-full px-[24px] py-[16px] text-left hover:bg-[#f5f5f5] transition-colors">
                  <span className="text-[#191919] text-[28px] font-medium">설정</span>
                </button>
                <div className="border-t border-[#e0e0e0] my-[8px]" />
                <button className="w-full px-[24px] py-[16px] text-left hover:bg-[#f5f5f5] transition-colors">
                  <span className="text-[#191919] text-[28px] font-medium">로그아웃</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
