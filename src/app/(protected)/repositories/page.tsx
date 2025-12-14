"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { IconEye, IconCalendar } from "@/components/icons";
import { getRepositories, analyzeRepositories } from "@/lib/api/repository";
import type { Repository } from "@/lib/types/repository";

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

export default function RepositoriesPage() {
  const router = useRouter();

  //기본 렌더링 정보
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState("전체");
  const [sortOrder, setSortOrder] = useState<"latest" | "oldest">("latest");
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // 레포지토리 목록 조회
  useEffect(() => {
    getRepositories()
      .then((repos) => setRepositories(repos))
      .catch((err) => console.error(err));
  }, []);

  // 언어 필터링 및 정렬 로직
  const filteredRepositories = useMemo(() => {
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

  const toggleSortOrder = () => {
    setSortOrder((prev) => (prev === "latest" ? "oldest" : "latest"));
  };

  const toggleRepository = (id: string) => {
    setRepositories((repos) =>
      repos.map((repo) =>
        repo.id === id ? { ...repo, isSelected: !repo.isSelected } : repo
      )
    );
  };

  const handleAnalyze = async () => {
    const selectedRepos = repositories.filter((repo) => repo.isSelected);
    if (selectedRepos.length === 0) {
      alert("분석할 레포지토리를 선택해주세요.");
      return;
    }

    setIsAnalyzing(true);

    try {
      const repositoryIds = selectedRepos.map((repo) => parseInt(repo.id));
      await analyzeRepositories(repositoryIds);

      alert("분석이 완료되었습니다!");
      router.push("/reports");
    } catch (error) {
      console.error("Analysis error:", error);
      alert("분석 중 오류가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="bg-[#181818] min-h-screen pt-16 md:pt-18 lg:pt-20 xl:pt-20">
      {/* Title Section */}
      <div className="px-4 md:px-8 lg:px-12 xl:px-16 py-4 md:py-6 lg:py-6 min-h-[120px] md:min-h-[140px] lg:min-h-[150px] flex items-end mb-10 md:mb-12 lg:mb-16 xl:mb-16 mt-16 md:mt-18 lg:mt-20 xl:mt-20">
        <div className="flex flex-col gap-4 md:gap-5 lg:gap-6 text-white w-full max-w-4xl">
          <h1 className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl xl:text-6xl font-bold">
            레포지토리 선택
          </h1>
          <p className="text-lg sm:text-xl md:text-xl lg:text-2xl xl:text-2xl font-light text-white/80">
            분석할 레포지토리를 선택하세요
          </p>
        </div>
      </div>

      {/* Language Filter Section */}
      <div className="px-4 md:px-8 lg:px-12 xl:px-16 mb-10 md:mb-12 lg:mb-16 xl:mb-16">
        <div className="bg-[#1f1f1f] border border-[#d9d9d9] rounded-xl md:rounded-2xl lg:rounded-2xl p-6 md:p-8 lg:p-10 xl:p-12">
          <div className="flex flex-col gap-6 md:gap-6 lg:gap-8">
            <h2 className="text-2xl md:text-2xl lg:text-3xl xl:text-3xl font-bold text-white">
              언어 필터
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 md:gap-6 lg:gap-8 xl:gap-10">
              {languages.map((lang) => (
                <button
                  key={lang}
                  onClick={() => setSelectedLanguage(lang)}
                  className="flex gap-2 md:gap-2.5 items-center"
                >
                  <div className="w-8 h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 flex items-center justify-center shrink-0">
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
                  <span className="text-base md:text-base lg:text-lg xl:text-xl font-bold text-white">
                    {lang}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Sort and Analyze Buttons */}
      <div className="px-4 md:px-8 lg:px-12 xl:px-16 mb-6 md:mb-8 lg:mb-10 flex flex-col sm:flex-row gap-4 md:gap-5 lg:gap-6 xl:gap-8 items-stretch sm:items-center">
        <button
          onClick={toggleSortOrder}
          className="bg-[#1f1f1f] border border-[#d9d9d9] rounded-xl md:rounded-xl px-6 md:px-7 lg:px-8 xl:px-9 py-3 md:py-3.5 lg:py-4 xl:py-4 hover:bg-[#2a2a2a] transition-colors"
        >
          <span className="text-lg md:text-lg lg:text-xl xl:text-xl font-medium text-white">
            {sortOrder === "latest" ? "최신순 ▼" : "오래된순 ▲"}
          </span>
        </button>
        <button
          onClick={handleAnalyze}
          disabled={isAnalyzing}
          className="bg-[#bbfb4c] border border-[#bbfb4c] rounded-xl md:rounded-xl px-6 md:px-7 lg:px-8 xl:px-9 py-3 md:py-3.5 lg:py-4 xl:py-4 hover:bg-[#a8e535] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span className="text-lg md:text-lg lg:text-xl xl:text-xl font-medium text-black">
            {isAnalyzing ? "분석 중..." : "분석하기"}
          </span>
        </button>
      </div>

      {/* Repository List */}
      <div className="px-4 md:px-8 lg:px-12 xl:px-16 mb-10 md:mb-12 lg:mb-16 xl:mb-16">
        <div className="flex flex-col gap-6 md:gap-6 lg:gap-8 xl:gap-8">
          {filteredRepositories.map((repo) => (
            <div
              key={repo.id}
              className="bg-[#1f1f1f] border border-[#d9d9d9] rounded-xl md:rounded-xl px-4 md:px-5 lg:px-6 xl:px-7 py-6 md:py-6 lg:py-7 xl:py-7"
            >
              <div className="flex flex-col sm:flex-row gap-6 md:gap-6 lg:gap-8 xl:gap-10 items-start sm:items-center">
                <div className="flex-1 flex flex-col gap-4 md:gap-4 lg:gap-5 w-full">
                  <h3 className="text-xl md:text-xl lg:text-2xl xl:text-2xl font-bold text-white">
                    {repo.name}
                  </h3>
                  <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 md:gap-3 lg:gap-4 xl:gap-5 items-start sm:items-center">
                    <div className="bg-[#4e6820] border border-[#bbfb4c] rounded-lg md:rounded-lg lg:rounded-xl px-4 md:px-4 lg:px-5 xl:px-6 py-1 md:py-1 lg:py-1.5 min-w-[120px] md:min-w-[140px] lg:min-w-[150px] xl:min-w-[160px] flex items-center justify-center">
                      <span className="text-base md:text-base lg:text-lg xl:text-lg font-bold text-[#bbfb4c]">
                        {repo.language}
                      </span>
                    </div>
                    <div className="flex gap-2 md:gap-2 lg:gap-2.5 items-center">
                      <IconEye size={20} />
                      <span className="text-base md:text-base lg:text-lg xl:text-lg font-medium text-[#d9d9d9]">
                        {repo.visibility}
                      </span>
                    </div>
                    <div className="flex gap-2 md:gap-2 lg:gap-2.5 items-center">
                      <IconCalendar size={20} />
                      <span className="text-base md:text-base lg:text-lg xl:text-lg font-medium text-[#d9d9d9]">
                        최근 푸시: {repo.lastPush}
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => toggleRepository(repo.id)}
                  className="w-8 h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 flex items-center justify-center shrink-0"
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
      <div className="px-4 md:px-8 lg:px-12 xl:px-16 pb-10 md:pb-12 lg:pb-16 xl:pb-16 flex justify-center">
        <div className="flex gap-4 md:gap-5 lg:gap-6 items-center flex-wrap justify-center">
          <button className="flex gap-2 md:gap-2.5 items-center opacity-50">
            <svg
              width="20"
              height="20"
              viewBox="0 0 50 50"
              className="rotate-90 md:w-6 md:h-6 lg:w-7 lg:h-7"
            >
              <path
                d="M15 31.25L25 18.75L35 31.25"
                stroke="white"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="text-base md:text-lg lg:text-lg xl:text-xl font-bold text-white hidden sm:inline">
              Previous
            </span>
          </button>
          <button className="bg-[#1f1f1f] border border-[#d9d9d9] rounded-lg md:rounded-lg lg:rounded-xl px-4 md:px-5 lg:px-6 xl:px-7 py-2 md:py-2.5 lg:py-3 xl:py-3">
            <span className="text-base md:text-lg lg:text-lg xl:text-xl font-medium text-white">
              1
            </span>
          </button>
          <button className="px-4 md:px-5 lg:px-6 xl:px-7 py-2 md:py-2.5 lg:py-3 xl:py-3">
            <span className="text-base md:text-lg lg:text-lg xl:text-xl font-medium text-white">
              2
            </span>
          </button>
          <button className="px-4 md:px-5 lg:px-6 xl:px-7 py-2 md:py-2.5 lg:py-3 xl:py-3">
            <span className="text-base md:text-lg lg:text-lg xl:text-xl font-medium text-white">
              3
            </span>
          </button>
          <button className="flex gap-2 md:gap-2.5 items-center">
            <span className="text-base md:text-lg lg:text-lg xl:text-xl font-bold text-white hidden sm:inline">
              Next
            </span>
            <svg
              width="20"
              height="20"
              viewBox="0 0 50 50"
              className="-rotate-90 md:w-6 md:h-6 lg:w-7 lg:h-7"
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
    </div>
  );
}
