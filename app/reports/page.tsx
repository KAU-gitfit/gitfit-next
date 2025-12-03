"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { IconFileText } from "../components/icons";
import LoadingSpinner from "../components/LoadingSpinner";
import { mockDeveloperReports, DeveloperReport } from "@/mock/devReports";
import Image from "next/image";

// EmptyState 컴포넌트
function EmptyState() {
  return (
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
          className="bg-[#bbfb4c] rounded-xl md:rounded-2xl px-8 md:px-12 lg:px-14 xl:px-16 py-4 md:py-5 lg:py-5 xl:py-5 hover:bg-[#a8e535] transition-colors"
        >
          <span className="text-lg md:text-xl lg:text-xl xl:text-xl font-semibold text-[#191919]">
            분석 시작하기
          </span>
        </Link>
      </div>
    </div>
  );
}

// ReportCard 컴포넌트
function ReportCard({ report }: { report: DeveloperReport }) {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push(`/reports/${report.id}`)}
      className="bg-[#1f1f1f] border border-[#d9d9d9] rounded-xl md:rounded-2xl p-8 md:p-10 lg:p-12 xl:p-12 hover:bg-[#252525] transition-colors w-full text-left"
    >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 md:gap-8 lg:gap-10">
        {/* Left: Report Info */}
        <div className="flex flex-col gap-4 md:gap-5 lg:gap-6 flex-1">
          <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white">
            {report.repoName} 리포트
          </h3>
          <div className="flex flex-wrap items-center gap-3 md:gap-4">
            {/* Language Badge */}
            <div className="bg-[#4e6820] border border-[#bbfb4c] rounded-xl px-4 md:px-6 py-2 md:py-2.5">
              <p className="text-[#bbfb4c] font-bold text-sm md:text-base lg:text-lg">
                {report.language}
              </p>
            </div>
            {/* Created Date */}
            <div className="flex items-center gap-2 md:gap-3">
              <Image
                src="/Calendar.svg"
                alt="생성일 아이콘"
                width={16}
                height={16}
                className="w-4 h-4 md:w-5 md:h-5"
              />
              <p className="text-[#d9d9d9] font-semibold text-sm md:text-base lg:text-lg">
                생성일자: {report.createdAt}
              </p>
            </div>
          </div>
        </div>

        {/* Right: Score Badge */}
        <div className="bg-[#4e6820] border border-[#bbfb4c] rounded-full w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 flex items-center justify-center flex-shrink-0">
          <p className="text-white font-bold text-2xl md:text-3xl lg:text-4xl">
            {report.overallScore}
          </p>
        </div>
      </div>
    </button>
  );
}

export default function ReportsPage() {
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      window.location.href =
        "https://api.gitfit.site/oauth2/authorization/github";
      return;
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect
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
          <h1 className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl xl:text-6xl font-bold text-white">
            리포트 목록
          </h1>
          {mockDeveloperReports.length > 0 && (
            <p className="text-xl md:text-2xl lg:text-3xl font-bold text-[#d9d9d9]">
              전체 리포트 수 : {mockDeveloperReports.length}
            </p>
          )}
        </div>
      </div>

      {/* Content Section */}
      <div className="px-4 md:px-8 lg:px-12 xl:px-16 py-4 md:py-6 pb-12 md:pb-16 lg:pb-20">
        {mockDeveloperReports.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="flex flex-col gap-6 md:gap-8 lg:gap-10">
            {mockDeveloperReports.map((report) => (
              <ReportCard key={report.id} report={report} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
