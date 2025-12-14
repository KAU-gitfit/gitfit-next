"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { IconFileText } from "@/components/icons";
import { getReports, deleteReport } from "@/lib/api/report";
import type { Report } from "@/lib/types/report";
import Image from "next/image";

// EmptyState 컴포넌트
function EmptyState() {
  return (
    <div className="bg-[#1f1f1f] border border-[#d9d9d9] rounded-xl min-h-[400px] flex flex-col items-center justify-center gap-8 md:gap-10 py-12 md:py-16">
      {/* File Icon */}
      <div className="bg-[#4e6820] border-4 border-[#bbfb4c] rounded-full flex items-center justify-center p-6 md:p-8">
        <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center">
          <IconFileText size={64} />
        </div>
      </div>

      {/* Empty State Text and Button */}
      <div className="flex flex-col gap-6 md:gap-7 items-center justify-center w-full max-w-xs sm:max-w-md md:max-w-2xl px-4">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white text-center">
          아직 분석된 리포트가 없습니다
        </h2>
        <div className="text-sm sm:text-base md:text-lg font-bold text-[#d9d9d9] text-center space-y-1.5">
          <p>GitHub 레포지토리를 선택하고 분석을 시작해보세요.</p>
          <p>코드 품질, 협업 능력, 성장 추세 등을 AI가 자동으로 분석합니다.</p>
        </div>
        <Link
          href="/repositories"
          className="bg-[#bbfb4c] rounded-xl px-6 md:px-8 py-2.5 md:py-3 hover:bg-[#a8e535] transition-colors"
        >
          <span className="text-base md:text-lg font-semibold text-[#191919]">
            분석 시작하기
          </span>
        </Link>
      </div>
    </div>
  );
}

// ReportCard 컴포넌트
function ReportCard({
  report,
  onDelete,
}: {
  report: Report;
  onDelete: (id: string) => void;
}) {
  const router = useRouter();

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirm("정말 이 리포트를 삭제하시겠습니까?")) return;

    try {
      await deleteReport(report.id);
      onDelete(report.id);
    } catch (error) {
      console.error("Delete error:", error);
      alert("삭제 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="relative group">
      <button
        onClick={() => router.push(`/reports/${report.id}`)}
        className="bg-[#1f1f1f] border border-[#d9d9d9] rounded-xl p-5 md:p-6 hover:bg-[#252525] transition-colors w-full text-left"
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-5">
          <div className="flex flex-col gap-3 md:gap-4 flex-1">
            <h3 className="text-xl md:text-2xl font-bold text-white">
              {report.repoName} 리포트
            </h3>
            <div className="flex flex-wrap items-center gap-2 md:gap-3">
              <div className="bg-[#4e6820] border border-[#bbfb4c] rounded-lg px-3 md:px-4 py-1 md:py-1.5">
                <p className="text-[#bbfb4c] font-bold text-xs md:text-sm">
                  {report.language}
                </p>
              </div>

              <div className="flex items-center gap-1.5 md:gap-2">
                <Image
                  src="/Calendar.svg"
                  alt="생성일 아이콘"
                  width={14}
                  height={14}
                  className="w-3.5 h-3.5 md:w-4 md:h-4"
                />
                <p className="text-[#d9d9d9] font-semibold text-xs md:text-sm">
                  생성일자: {report.createdAt}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-[#4e6820] border border-[#bbfb4c] rounded-full w-16 h-16 md:w-20 md:h-20 flex items-center justify-center flex-shrink-0">
            <p className="text-white font-bold text-xl md:text-2xl">
              {report.overallScore}
            </p>
          </div>
        </div>
      </button>

      {/* 삭제 버튼 */}
      <button
        onClick={handleDelete}
        className="absolute top-4 right-4 p-2 rounded-lg bg-[#2a2a2a] hover:bg-red-600 transition-colors opacity-0 group-hover:opacity-100"
        title="리포트 삭제"
      >
        <svg
          className="w-5 h-5 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
      </button>
    </div>
  );
}

/** createdAt이 "YYYY-MM-DD"가 아니어도 최대한 정렬되게 숫자로 변환 */
function toTime(createdAt: string) {
  const normalized = createdAt.replaceAll(".", "-").replaceAll("/", "-");
  const t = Date.parse(normalized);
  return Number.isNaN(t) ? 0 : t;
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

export default function ReportsPage() {
  const [reports, setReports] = useState<Report[]>([]);
  const [sortOrder, setSortOrder] = useState<"latest" | "oldest">("latest");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // 리포트 목록 조회
  useEffect(() => {
    getReports()
      .then((data) => setReports(data))
      .catch((err) => console.error(err));
  }, []);

  // 리포트 삭제 핸들러
  const handleDeleteReport = (id: string) => {
    setReports((prev) => prev.filter((r) => r.id !== id));
  };

  const toggleSortOrder = () => {
    setSortOrder((prev) => (prev === "latest" ? "oldest" : "latest"));
    setCurrentPage(1);
  };

  // 정렬된 전체 리스트
  const sortedReports = useMemo(() => {
    const arr = [...reports];
    arr.sort((a, b) => {
      const ta = toTime(a.createdAt);
      const tb = toTime(b.createdAt);
      return sortOrder === "latest" ? tb - ta : ta - tb;
    });
    return arr;
  }, [reports, sortOrder]);

  // ✅ totalPages는 데이터 많아지면 자동으로 늘어남
  const totalPages = Math.max(
    1,
    Math.ceil(sortedReports.length / itemsPerPage)
  );
  const safeCurrentPage = Math.min(currentPage, totalPages);

  const pagedReports = useMemo(() => {
    const start = (safeCurrentPage - 1) * itemsPerPage;
    return sortedReports.slice(start, start + itemsPerPage);
  }, [sortedReports, safeCurrentPage]);

  const pageItems = useMemo(
    () => buildPageItems(safeCurrentPage, totalPages),
    [safeCurrentPage, totalPages]
  );

  const goPrev = () => setCurrentPage((p) => Math.max(1, p - 1));
  const goNext = () => setCurrentPage((p) => Math.min(totalPages, p + 1));

  return (
    <div className="bg-[#181818] min-h-screen pt-16 md:pt-18 lg:pt-20 xl:pt-20">
      <div className="pt-16 pb-12 max-w-7xl mx-auto">
        {/* Title Section */}
        <div className="px-4 md:px-6 lg:px-8 mb-10">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3">
            <h1 className="text-3xl sm:text-3xl md:text-4xl lg:text-4xl font-bold text-white">
              리포트 목록
            </h1>

            {sortedReports.length > 0 && (
              <button
                onClick={toggleSortOrder}
                className="bg-[#1f1f1f] border border-[#d9d9d9] rounded-xl px-4 md:px-5 lg:px-6 py-2 md:py-2.5 hover:bg-[#2a2a2a] transition-colors w-full sm:w-auto"
              >
                <span className="text-sm md:text-base font-medium text-white">
                  {sortOrder === "latest" ? "최신순 ▼" : "오래된순 ▲"}
                </span>
              </button>
            )}
          </div>

          {sortedReports.length > 0 && (
            <p className="text-base md:text-lg lg:text-xl font-bold text-[#d9d9d9]">
              전체 리포트 수 : {sortedReports.length}
            </p>
          )}
        </div>

        {/* Content Section */}
        <div className="px-4 md:px-6 lg:px-8">
          {sortedReports.length === 0 ? (
            <EmptyState />
          ) : (
            <>
              <div className="flex flex-col gap-4 md:gap-5">
                {pagedReports.map((report) => (
                  <ReportCard key={report.id} report={report} onDelete={handleDeleteReport} />
                ))}
              </div>

              {/* 자동으로 페이지 수 늘어남 */}
              <div className="pt-6 md:pt-8 flex justify-center">
                <div className="flex gap-2 md:gap-3 items-center flex-wrap justify-center">
                  <button
                    onClick={goPrev}
                    disabled={safeCurrentPage === 1}
                    className="flex gap-1.5 md:gap-2 items-center disabled:opacity-50"
                  >
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
                            : "px-3 md:px-4 py-1.5 md:py-2"
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
                    className="flex gap-1.5 md:gap-2 items-center disabled:opacity-50"
                  >
                    <span className="text-sm md:text-base font-bold text-white hidden sm:inline">
                      Next
                    </span>
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
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
