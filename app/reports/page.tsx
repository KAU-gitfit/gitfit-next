"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { IconFileText } from "../components/icons";
import LoadingSpinner from "../components/LoadingSpinner";

export default function ReportsPage() {
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      window.location.href = "https://api.gitfit.site/oauth2/authorization/github";
      return;
    }

    setIsCheckingAuth(false);
  }, []);

  if (isCheckingAuth) {
    return <LoadingSpinner message="로그인 확인 중..." />;
  }

  return (
    <div className="bg-[#181818] min-h-screen pt-16 md:pt-18 lg:pt-20 xl:pt-20">
      {/* Title Section */}
      <div className="px-4 md:px-8 lg:px-12 xl:px-16 py-6 md:py-8 lg:py-8 min-h-[120px] md:min-h-[140px] lg:min-h-[150px] flex items-start mt-16 md:mt-18 lg:mt-20 xl:mt-20">
        <div className="flex flex-col gap-4 md:gap-5 lg:gap-5">
          <h1 className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl xl:text-6xl font-bold text-white">개발자 리포트</h1>
        </div>
      </div>

      {/* Empty State Section */}
      <div className="px-4 md:px-8 lg:px-12 xl:px-16 py-4 md:py-6">
        <div className="bg-[#1f1f1f] border border-[#d9d9d9] rounded-xl md:rounded-2xl min-h-[500px] md:min-h-[600px] lg:min-h-[650px] xl:min-h-[650px] flex flex-col items-center justify-center gap-12 md:gap-14 lg:gap-16 xl:gap-16 py-16 md:py-20 lg:py-20 xl:py-20">
          {/* File Icon */}
          <div className="bg-[#4e6820] border-4 md:border-[5px] border-[#bbfb4c] rounded-full flex items-center justify-center p-8 md:p-10 lg:p-10 xl:p-10">
            <div className="w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 flex items-center justify-center">
              <IconFileText size={100} />
            </div>
          </div>

          {/* Empty State Text and Button */}
          <div className="flex flex-col gap-8 md:gap-8 lg:gap-10 items-center justify-center w-full max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-4xl px-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-4xl font-bold text-white text-center">
              아직 분석된 리포트가 없습니다
            </h2>
            <div className="text-base sm:text-lg md:text-xl lg:text-xl xl:text-xl font-bold text-[#d9d9d9] text-center space-y-2">
              <p>GitHub 레포지토리를 선택하고 분석을 시작해보세요.</p>
              <p>코드 품질, 협업 능력, 성장 추세 등을 AI가 자동으로 분석합니다.</p>
            </div>
            <Link
              href="/repositories"
              className="bg-[#bbfb4c] rounded-xl md:rounded-2xl px-8 md:px-12 lg:px-14 xl:px-16 py-4 md:py-5 lg:py-5 xl:py-5"
            >
              <span className="text-lg md:text-xl lg:text-xl xl:text-xl font-semibold text-[#191919]">분석 시작하기</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
