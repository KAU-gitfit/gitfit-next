"use client";

import { useState, useMemo } from "react";
import { ReportCard } from "../components/ReportCard";
import { SortButton } from "../components/SortButton";
import { Pagination } from "../components/Pagination";

const reports = [
  {
    id: 1,
    title: "Next.js 대시보드 리포트",
    language: "TypeScript",
    date: "2025-01-17",
    score: 87,
  },
  {
    id: 2,
    title: "FastAPI 인증 서버 리포트",
    language: "Python",
    date: "2025-01-15",
    score: 87,
  },
  {
    id: 3,
    title: "SpringBoot User Service 리포트",
    language: "Java",
    date: "2025-01-11",
    score: 87,
  },
  {
    id: 4,
    title: "React Native Onboarding 리포트",
    language: "TypeScript",
    date: "2025-01-11",
    score: 87,
  },
  {
    id: 5,
    title: "Go Microservice Template 리포트",
    language: "Go",
    date: "2025-01-11",
    score: 87,
  },
  {
    id: 6,
    title: "Node Express API 리포트",
    language: "JavaScript",
    date: "2025-01-08",
    score: 87,
  },
  {
    id: 7,
    title: "Django Blog Engine 리포트",
    language: "Django",
    date: "2025-01-05",
    score: 87,
  },
  {
    id: 8,
    title: "Algorithm Practice 리포트",
    language: "C++",
    date: "2025-01-01",
    score: 87,
  },
];

export default function ReportsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");
  const reportsPerPage = 8;

  const sortedReports = useMemo(() => {
    return [...reports].sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
    });
  }, [sortOrder]);

  const totalPages = Math.ceil(sortedReports.length / reportsPerPage);
  const startIndex = (currentPage - 1) * reportsPerPage;
  const endIndex = startIndex + reportsPerPage;
  const paginatedReports = sortedReports.slice(startIndex, endIndex);

  const sortLabel = sortOrder === "newest" ? "최신순 ▼" : "오래된 순 ▲";

  const toggleSort = () => {
    setSortOrder((prev) => (prev === "newest" ? "oldest" : "newest"));
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-[#181818] flex flex-col">
      {/* Header spacing */}
      <div className="h-[200px] flex-shrink-0"></div>

      {/* Title Section */}
      <section className="flex-shrink-0 px-20 py-8">
        <div className="max-w-6xl mx-auto w-full">
          <div className="flex items-start justify-between gap-20">
            <div className="flex-1">
              <h1 className="font-bold text-9xl text-white mb-8 leading-tight">
                리포트 목록
              </h1>
              <p className="font-bold text-6xl text-[#d9d9d9] leading-tight">
                전체 리포트 수 : {reports.length}
              </p>
            </div>
            <div className="flex-shrink-0 pt-4">
              <SortButton label={sortLabel} onClick={toggleSort} />
            </div>
          </div>
        </div>
      </section>

      {/* Reports Grid */}
      <section className="flex-grow px-20 py-16">
        <div className="max-w-6xl mx-auto w-full">
          <div className="space-y-12">
            {paginatedReports.map((report) => (
              <ReportCard
                key={report.id}
                title={report.title}
                language={report.language}
                date={report.date}
                score={report.score}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Pagination */}
      <section className="flex-shrink-0 px-20 py-20">
        <div className="flex justify-center">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </section>
    </div>
  );
}
