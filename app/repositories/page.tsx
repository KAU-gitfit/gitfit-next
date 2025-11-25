"use client";

import { useState } from "react";
import { IconEye, IconCalendar } from "../components/icons";

type Repository = {
  id: string;
  name: string;
  language: string;
  visibility: "Public" | "Private";
  lastPush: string;
  isSelected: boolean;
};

const mockRepositories: Repository[] = [
  { id: "1", name: "next-commerce-starter", language: "TypeScript", visibility: "Public", lastPush: "2025-01-17", isSelected: true },
  { id: "2", name: "awesome-js-utils", language: "JavaScript", visibility: "Public", lastPush: "2025-01-16", isSelected: false },
  { id: "3", name: "fastapi-microservice-template", language: "Python", visibility: "Public", lastPush: "2025-01-15", isSelected: false },
  { id: "4", name: "rust-cli-boilerplate", language: "Rust", visibility: "Private", lastPush: "2025-01-14", isSelected: false },
  { id: "5", name: "react-native-login-kit", language: "TypeScript", visibility: "Public", lastPush: "2025-01-13", isSelected: false },
  { id: "6", name: "node-express-auth", language: "JavaScript", visibility: "Public", lastPush: "2025-01-12", isSelected: false },
  { id: "7", name: "springboot-user-service", language: "Java", visibility: "Private", lastPush: "2025-01-11", isSelected: false },
  { id: "8", name: "algo-playground", language: "C++", visibility: "Public", lastPush: "2025-01-10", isSelected: false },
  { id: "9", name: "django-blog-engine", language: "Django", visibility: "Public", lastPush: "2025-01-09", isSelected: false },
  { id: "10", name: "cpp-image-processor", language: "C++", visibility: "Public", lastPush: "2025-01-08", isSelected: false },
];

const languages = ["전체", "TypeScript", "JavaScript", "Python", "Java", "Go", "C", "C++", "Ruby", "Django"];

export default function RepositoriesPage() {
  const [repositories, setRepositories] = useState<Repository[]>(mockRepositories);
  const [selectedLanguage, setSelectedLanguage] = useState("전체");
  const [currentPage, setCurrentPage] = useState(1);

  const toggleRepository = (id: string) => {
    setRepositories(repos =>
      repos.map(repo =>
        repo.id === id ? { ...repo, isSelected: !repo.isSelected } : repo
      )
    );
  };

  return (
    <div className="bg-[#181818] min-h-screen pt-[250px]">
      {/* Title Section */}
      <div className="px-[80px] py-[20px] h-[230px] flex items-end mb-[100px]">
        <div className="flex flex-col gap-[30px] text-white w-[619px]">
          <h1 className="text-[96px] font-bold">레포지토리 선택</h1>
          <p className="text-[36px] font-light text-white/80">분석할 레포지토리를 선택하세요</p>
        </div>
      </div>

      {/* Language Filter Section */}
      <div className="px-[80px] mb-[100px]">
        <div className="bg-[#1f1f1f] border border-[#d9d9d9] rounded-[20px] p-[80px]">
          <div className="flex flex-col gap-[40px]">
            <h2 className="text-[40px] font-bold text-white">언어 필터</h2>
            <div className="flex flex-wrap gap-[85px] items-center">
              {languages.map((lang) => (
                <button
                  key={lang}
                  onClick={() => setSelectedLanguage(lang)}
                  className="flex gap-[12px] items-center w-[15rem]"
                >
                  <div className="w-[48px] h-[48px] flex items-center justify-center">
                    {selectedLanguage === lang ? (
                      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                        <circle cx="24" cy="24" r="10" fill="#BBFB4C" stroke="#BBFB4C" strokeWidth="2"/>
                        <circle cx="24" cy="24" r="18" stroke="#BBFB4C" strokeWidth="2"/>
                      </svg>
                    ) : (
                      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                        <circle cx="24" cy="24" r="18" stroke="#BBFB4C" strokeWidth="2"/>
                      </svg>
                    )}
                  </div>
                  <span className="text-[28px] font-bold text-white">{lang}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Sort and Analyze Buttons */}
      <div className="px-[80px] mb-[50px] flex gap-[50px] items-center">
        <button className="bg-[#1f1f1f] border border-[#d9d9d9] rounded-[20px] px-[50px] py-[30px]">
          <span className="text-[36px] font-medium text-white">최신순 ▼</span>
        </button>
        <button className="bg-[#bbfb4c] border border-[#bbfb4c] rounded-[20px] px-[50px] py-[30px]">
          <span className="text-[36px] font-medium text-black">분석하기</span>
        </button>
      </div>

      {/* Repository List */}
      <div className="px-[80px] mb-[100px]">
        <div className="flex flex-col gap-[50px]">
          {repositories.map((repo) => (
            <div
              key={repo.id}
              className="bg-[#1f1f1f] border border-[#d9d9d9] rounded-[20px] px-[43px] py-[50px]"
            >
              <div className="flex gap-[109px] items-center">
                <div className="flex-1 flex flex-col gap-[24px]">
                  <h3 className="text-[40px] font-bold text-white">{repo.name}</h3>
                  <div className="flex gap-[50px] items-center">
                    <div className="bg-[#4e6820] border border-[#bbfb4c] rounded-[20px] px-[30px] py-[5px] w-[250px] flex items-center justify-center">
                      <span className="text-[32px] font-bold text-[#bbfb4c]">{repo.language}</span>
                    </div>
                    <div className="flex gap-[10px] items-center">
                      <IconEye size={48} />
                      <span className="text-[32px] font-medium text-[#d9d9d9]">{repo.visibility}</span>
                    </div>
                    <div className="flex gap-[10px] items-center">
                      <IconCalendar size={48} />
                      <span className="text-[32px] font-medium text-[#d9d9d9]">최근 푸시: {repo.lastPush}</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => toggleRepository(repo.id)}
                  className="w-[48px] h-[48px] flex items-center justify-center"
                >
                  {repo.isSelected ? (
                    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                      <rect x="6" y="6" width="36" height="36" rx="4" stroke="white" strokeWidth="2" fill="white"/>
                      <path d="M14 24L22 32L34 16" stroke="#1f1f1f" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  ) : (
                    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                      <rect x="6" y="6" width="36" height="36" rx="4" stroke="white" strokeWidth="2"/>
                    </svg>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination */}
      <div className="px-[80px] pb-[100px] flex justify-center">
        <div className="flex gap-[30px] items-center">
          <button className="flex gap-[10px] items-center opacity-50">
            <svg width="50" height="50" viewBox="0 0 50 50" className="rotate-90">
              <path d="M15 31.25L25 18.75L35 31.25" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="text-[40px] font-bold text-white">Previous</span>
          </button>
          <button className="bg-[#1f1f1f] border border-[#d9d9d9] rounded-[20px] px-[40px] py-[22px]">
            <span className="text-[40px] font-medium text-white">1</span>
          </button>
          <button className="px-[40px] py-[22px]">
            <span className="text-[40px] font-medium text-white">2</span>
          </button>
          <button className="px-[40px] py-[22px]">
            <span className="text-[40px] font-medium text-white">3</span>
          </button>
          <button className="flex gap-[10px] items-center">
            <span className="text-[40px] font-bold text-white">Next</span>
            <svg width="50" height="50" viewBox="0 0 50 50" className="-rotate-90">
              <path d="M15 31.25L25 18.75L35 31.25" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
