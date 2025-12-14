"use client";

import { useEffect, useState, useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
import { IconEye, IconCalendar } from "@/components/icons";
import { getRepositories } from "@/lib/api/repository";
import { generateReport, getReportStatus } from "@/lib/api/report";
import type { Repository } from "@/lib/types/repository";
import type { ReportStatus } from "@/lib/types/report";

const languages = [
  "전체",
  "TypeScript",
  "JavaScript",
  "Python",
  "Java",
  "Go",
  "C",
  "C++",
  "Ruby",
  "Django",
];

// 로딩 메시지 (폴링마다 변경)
const loadingMessages = [
  "코드 구조를 분석하고 있습니다...",
  "품질 지표를 측정하고 있습니다...",
  "테스트 커버리지를 확인하고 있습니다...",
  "문서화 수준을 평가하고 있습니다...",
  "AI가 인사이트를 생성하고 있습니다...",
  "최종 리포트를 작성하고 있습니다...",
];

// 로딩 오버레이 컴포넌트
function LoadingOverlay({
  progress,
  status,
  messageIndex,
}: {
  progress: number;
  status: ReportStatus | null;
  messageIndex: number;
}) {
  const statusText = status === "PROCESSING" ? "분석 중" : "준비 중";
  const message = loadingMessages[messageIndex % loadingMessages.length];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* 어두운 배경 */}
      <div className="absolute inset-0 bg-black/70" />

      {/* 로딩 컨텐츠 */}
      <div className="relative z-10 flex flex-col items-center gap-8 px-8">
        {/* 스피너 */}
        <div className="relative w-32 h-32">
          {/* 배경 원 */}
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="42"
              fill="none"
              stroke="#313131"
              strokeWidth="8"
            />
            {/* 진행 원 */}
            <circle
              cx="50"
              cy="50"
              r="42"
              fill="none"
              stroke="#bbfb4c"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 42}`}
              strokeDashoffset={`${2 * Math.PI * 42 * (1 - progress / 100)}`}
              className="transition-all duration-500 ease-out"
              style={{ transform: "rotate(-90deg)", transformOrigin: "center" }}
            />
          </svg>
          {/* 퍼센트 텍스트 */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-3xl font-bold text-white">{progress}%</span>
          </div>
        </div>

        {/* 상태 텍스트 */}
        <div className="flex flex-col items-center gap-3">
          <p className="text-2xl font-bold text-white">{statusText}</p>
          <p className="text-lg text-[#d9d9d9] text-center max-w-md animate-pulse">
            {message}
          </p>
        </div>

        {/* 프로그레스 바 */}
        <div className="w-80 bg-[#313131] rounded-full h-3 overflow-hidden">
          <div
            className="bg-[#bbfb4c] h-full rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}

/** 페이지 버튼 목록 만들기: 1 ... 7 8 9 ... 20 */
function buildPageItems(current: number, total: number) {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const items: Array<number | "..."> = [];
  const siblings = 1; // current 기준 양 옆 1개씩 보여줌

  const left = Math.max(2, current - siblings);
  const right = Math.min(total - 1, current + siblings);

  items.push(1);

  if (left > 2) items.push("...");

  for (let p = left; p <= right; p++) items.push(p);

  if (right < total - 1) items.push("...");

  items.push(total);

  return items;
}

export default function RepositoriesPage() {
  const router = useRouter();

  //기본 렌더링 정보
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState("전체");
  const [sortOrder, setSortOrder] = useState<"latest" | "oldest">("latest");
  const [currentPage, setCurrentPage] = useState(1);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [analysisStatus, setAnalysisStatus] = useState<ReportStatus | null>(null);
  const [messageIndex, setMessageIndex] = useState(0);

  const itemsPerPage = 10;

  // 레포지토리 목록 조회
  useEffect(() => {
    getRepositories()
      .then((repos) => setRepositories(repos))
      .catch((err) => console.error(err));
  }, []);

  // 리포트 상태 폴링
  const pollReportStatus = useCallback(
    async (reportId: number) => {
      const POLL_INTERVAL = 2000; // 2초
      const MAX_POLLS = 150; // 최대 5분 (2초 * 150)

      for (let i = 0; i < MAX_POLLS; i++) {
        try {
          const status = await getReportStatus(reportId.toString());
          setAnalysisProgress(status.progress);
          setAnalysisStatus(status.status);

          if (status.status === "COMPLETED") {
            return { success: true, reportId };
          }

          if (status.status === "FAILED") {
            return { success: false, error: status.errorMessage || "분석 실패" };
          }

          // PENDING 또는 PROCESSING 상태면 계속 폴링
          setMessageIndex((prev) => prev + 1);
          await new Promise((resolve) => setTimeout(resolve, POLL_INTERVAL));
        } catch (error) {
          console.error("Status polling error:", error);
          return { success: false, error: "상태 조회 실패" };
        }
      }

      return { success: false, error: "시간 초과" };
    },
    []
  );

  // 언어 필터링 및 정렬 로직
  const sortedRepositories = useMemo(() => {
    const filtered =
      selectedLanguage === "전체"
        ? repositories
        : repositories.filter((repo) => repo.language === selectedLanguage);

    // 정렬
    return filtered.sort((a, b) => {
      if (sortOrder === "latest") {
        return b.lastPush.localeCompare(a.lastPush);
      } else {
        return a.lastPush.localeCompare(b.lastPush);
      }
    });
  }, [repositories, selectedLanguage, sortOrder]);

  // 페이지네이션
  const totalPages = Math.max(
    1,
    Math.ceil(sortedRepositories.length / itemsPerPage)
  );
  const safeCurrentPage = Math.min(currentPage, totalPages);

  const pagedRepositories = useMemo(() => {
    const start = (safeCurrentPage - 1) * itemsPerPage;
    return sortedRepositories.slice(start, start + itemsPerPage);
  }, [sortedRepositories, safeCurrentPage]);

  const pageItems = useMemo(
    () => buildPageItems(safeCurrentPage, totalPages),
    [safeCurrentPage, totalPages]
  );

  const toggleSortOrder = () => {
    setSortOrder((prev) => (prev === "latest" ? "oldest" : "latest"));
    setCurrentPage(1); // 정렬 변경 시 첫 페이지로
  };

  const goPrev = () => setCurrentPage((p) => Math.max(1, p - 1));
  const goNext = () => setCurrentPage((p) => Math.min(totalPages, p + 1));

  const toggleRepository = (id: string) => {
    setRepositories((repos) =>
      repos.map((repo) =>
        repo.id === id ? { ...repo, isSelected: !repo.isSelected } : repo
      )
    );
  };

  // 언어 필터 변경 시 첫 페이지로
  const handleLanguageChange = (lang: string) => {
    setSelectedLanguage(lang);
    setCurrentPage(1);
  };

  const handleAnalyze = async () => {
    const selectedRepos = repositories.filter((repo) => repo.isSelected);
    if (selectedRepos.length === 0) {
      alert("분석할 레포지토리를 선택해주세요.");
      return;
    }

    setIsAnalyzing(true);
    setAnalysisProgress(0);
    setAnalysisStatus("PENDING");
    setMessageIndex(0);

    try {
      const repositoryIds = selectedRepos.map((repo) => parseInt(repo.id));
      const response = await generateReport(repositoryIds);

      // 폴링으로 상태 확인
      const result = await pollReportStatus(response.reportId);

      if (result.success) {
        router.push(`/reports/${result.reportId}`);
      } else {
        alert(`분석 실패: ${result.error}`);
      }
    } catch (error) {
      console.error("Analysis error:", error);
      const errorMessage = error instanceof Error ? error.message : "알 수 없는 오류";
      alert(`분석 중 오류가 발생했습니다.\n\n${errorMessage}`);
    } finally {
      setIsAnalyzing(false);
      setAnalysisProgress(0);
      setAnalysisStatus(null);
    }
  };

  return (
    <div className="bg-[#181818] min-h-screen pt-16 md:pt-18 lg:pt-20 xl:pt-20">
      {/* 로딩 오버레이 */}
      {isAnalyzing && (
        <LoadingOverlay
          progress={analysisProgress}
          status={analysisStatus}
          messageIndex={messageIndex}
        />
      )}

      <div className="pt-16 pb-12 max-w-7xl mx-auto">
        {/* Title Section */}
        <div className="px-4 md:px-6 lg:px-8 mb-10">
          <h1 className="text-3xl sm:text-3xl md:text-4xl lg:text-4xl font-bold text-white mb-3">
            레포지토리 선택
          </h1>
          <p className="text-base sm:text-base md:text-lg font-light text-white/80">
            분석할 레포지토리를 선택하세요
          </p>
        </div>

        {/* Language Filter Section */}
        <div className="px-4 md:px-6 lg:px-8 mb-8">
          <div className="bg-[#1f1f1f] border border-[#d9d9d9] rounded-xl p-4 md:p-6 lg:p-7">
            <div className="flex flex-col gap-4 md:gap-5">
              <h2 className="text-xl md:text-xl lg:text-2xl font-bold text-white">
                언어 필터
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-5 lg:gap-6">
                {languages.map((lang) => (
                  <button
                    key={lang}
                    onClick={() => handleLanguageChange(lang)}
                    className="flex gap-2 items-center"
                  >
                    <div className="w-6 h-6 flex items-center justify-center shrink-0">
                      {selectedLanguage === lang ? (
                        <svg
                          width="100%"
                          height="100%"
                          viewBox="0 0 48 48"
                          fill="none"
                        >
                          <circle
                            cx="24"
                            cy="24"
                            r="10"
                            fill="#BBFB4C"
                            stroke="#BBFB4C"
                            strokeWidth="2"
                          />
                          <circle
                            cx="24"
                            cy="24"
                            r="18"
                            stroke="#BBFB4C"
                            strokeWidth="2"
                          />
                        </svg>
                      ) : (
                        <svg
                          width="100%"
                          height="100%"
                          viewBox="0 0 48 48"
                          fill="none"
                        >
                          <circle
                            cx="24"
                            cy="24"
                            r="18"
                            stroke="#BBFB4C"
                            strokeWidth="2"
                          />
                        </svg>
                      )}
                    </div>
                    <span className="text-sm md:text-base lg:text-base font-bold text-white">
                      {lang}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Sort and Analyze Buttons */}
        <div className="px-4 md:px-6 lg:px-8 mb-6 flex flex-col sm:flex-row gap-3 md:gap-4 items-stretch sm:items-center">
          <button
            onClick={toggleSortOrder}
            className="bg-[#1f1f1f] border border-[#d9d9d9] rounded-xl px-4 md:px-5 lg:px-6 py-2 md:py-2.5 lg:py-3 hover:bg-[#2a2a2a] transition-colors"
          >
            <span className="text-sm md:text-base font-medium text-white">
              {sortOrder === "latest" ? "최신순 ▼" : "오래된순 ▲"}
            </span>
          </button>
          <button
            onClick={handleAnalyze}
            disabled={isAnalyzing}
            className="bg-[#bbfb4c] border border-[#bbfb4c] rounded-xl px-4 md:px-5 lg:px-6 py-2 md:py-2.5 lg:py-3 hover:bg-[#a8e535] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="text-sm md:text-base font-medium text-black">
              {isAnalyzing ? "분석 중..." : "분석하기"}
            </span>
          </button>
        </div>

        {/* Repository List */}
        <div className="px-4 md:px-6 lg:px-8">
          <div className="flex flex-col gap-4 md:gap-5">
            {pagedRepositories.map((repo) => (
              <div
                key={repo.id}
                className="bg-[#1f1f1f] border border-[#d9d9d9] rounded-xl px-4 md:px-5 py-4 md:py-5"
              >
                <div className="flex flex-col sm:flex-row gap-4 md:gap-5 items-start sm:items-center">
                  <div className="flex-1 flex flex-col gap-3 w-full">
                    <h3 className="text-lg md:text-xl font-bold text-white">
                      {repo.name}
                    </h3>
                    <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2 md:gap-3 items-start sm:items-center">
                      <div className="bg-[#4e6820] border border-[#bbfb4c] rounded-lg px-3 md:px-4 py-1 min-w-[100px] md:min-w-[120px] flex items-center justify-center">
                        <span className="text-sm md:text-base font-bold text-[#bbfb4c]">
                          {repo.language}
                        </span>
                      </div>
                      <div className="flex gap-1.5 md:gap-2 items-center">
                        <IconEye size={16} />
                        <span className="text-sm md:text-base font-medium text-[#d9d9d9]">
                          {repo.visibility}
                        </span>
                      </div>
                      <div className="flex gap-1.5 md:gap-2 items-center">
                        <IconCalendar size={16} />
                        <span className="text-sm md:text-base font-medium text-[#d9d9d9]">
                          최근 푸시: {repo.lastPush}
                        </span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleRepository(repo.id)}
                    className="w-6 h-6 flex items-center justify-center shrink-0"
                  >
                    {repo.isSelected ? (
                      <svg
                        width="100%"
                        height="100%"
                        viewBox="0 0 48 48"
                        fill="none"
                      >
                        <rect
                          x="6"
                          y="6"
                          width="36"
                          height="36"
                          rx="4"
                          stroke="white"
                          strokeWidth="2"
                          fill="white"
                        />
                        <path
                          d="M14 24L22 32L34 16"
                          stroke="#1f1f1f"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    ) : (
                      <svg
                        width="100%"
                        height="100%"
                        viewBox="0 0 48 48"
                        fill="none"
                      >
                        <rect
                          x="6"
                          y="6"
                          width="36"
                          height="36"
                          rx="4"
                          stroke="white"
                          strokeWidth="2"
                        />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pagination */}
        {sortedRepositories.length > itemsPerPage && (
          <div className="px-4 md:px-6 lg:px-8 pt-6 md:pt-8 flex justify-center">
            <div className="flex gap-2 md:gap-3 items-center flex-wrap justify-center">
              <button
                onClick={goPrev}
                disabled={safeCurrentPage === 1}
                className="flex gap-1.5 md:gap-2 items-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 50 50"
                  className="-rotate-90 md:w-5 md:h-5"
                >
                  <path
                    d="M15 31.25L25 18.75L35 31.25"
                    stroke="white"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="text-sm md:text-base font-bold text-white hidden sm:inline">
                  Previous
                </span>
              </button>

              {pageItems.map((item, idx) => {
                if (item === "...") {
                  return (
                    <span
                      key={`dots-${idx}`}
                      className="px-1.5 md:px-2 text-white/70 font-bold text-sm md:text-base"
                    >
                      ...
                    </span>
                  );
                }

                const p = item;
                const active = p === safeCurrentPage;

                return (
                  <button
                    key={p}
                    onClick={() => setCurrentPage(p)}
                    className={
                      active
                        ? "bg-[#1f1f1f] border border-[#d9d9d9] rounded-lg px-3 md:px-4 py-1.5 md:py-2"
                        : "px-3 md:px-4 py-1.5 md:py-2 hover:bg-[#2a2a2a] rounded-lg transition-colors"
                    }
                  >
                    <span className="text-sm md:text-base font-medium text-white">
                      {p}
                    </span>
                  </button>
                );
              })}

              <button
                onClick={goNext}
                disabled={safeCurrentPage === totalPages}
                className="flex gap-1.5 md:gap-2 items-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="text-sm md:text-base font-bold text-white hidden sm:inline">
                  Next
                </span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 50 50"
                  className="rotate-90 md:w-5 md:h-5"
                >
                  <path
                    d="M15 31.25L25 18.75L35 31.25"
                    stroke="white"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
