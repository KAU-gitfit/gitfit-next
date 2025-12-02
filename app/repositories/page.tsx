"use client";

import {useEffect, useState} from "react";
import {useRouter} from "next/navigation"; //로그인 실패할 경우에 리다이렉트 경로
import { IconEye, IconCalendar } from "../components/icons";

//백엔드에서 보내는 JSON 구조
type BackendRepo = {
  id: number;
  name: string;
  language: string | null;
  private : boolean;
  updated_at : string;
};

//프론트 UI에서 사용하는 데이터 구조
type Repository = {
  id : string;
  name : string;
  language : string;
  visibility : "Public" | "Private";
  lastPush : string;
  isSelected : boolean;

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
  const router = useRouter();

  //기본 렌더링 정보
  const [repositories, setRepositories] = useState<Repository[]>(mockRepositories);
  const [selectedLanguage, setSelectedLanguage] = useState("전체");
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  //로그인 토큰 확인 및 백엔드 API 요청
  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if(!token){
      window.location.href = "https://api.gitfit.site/oauth2/authorization/github";
      return;
    }

    setIsCheckingAuth(false);
    fetch("https://api.gitfit.site/api/repositories",{
      headers:{
        Authorization : `Bearer ${token}`,
      },
    })
        .then(res => res.json())
        .then(data => {
          if(!data.data) return ; {
            //백엔드를 프론트 타입으로 변환
            const converted : Repository[] = data.data.map((repo:BackendRepo) =>({
              id: repo.id.toString(),
              name: repo.name,
              language : repo.language ?? "Unknown",
              visibility : repo.private ? "Private" : "Public",
              lastPush : repo.updated_at.slice(0,10),
              isSelected:false,
            }));
            setRepositories(converted);
          }
        })
        .catch(err =>{
          console.error(err);
        });
  }, [router])

  const toggleRepository = (id: string) => {
    setRepositories(repos =>
      repos.map(repo =>
        repo.id === id ? { ...repo, isSelected: !repo.isSelected } : repo
      )
    );
  };

  if (isCheckingAuth) {
    return (
      <div className="bg-[#181818] min-h-screen w-full flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-[#bbfb4c] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-white text-xl">로그인 확인 중...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#181818] min-h-screen pt-16 md:pt-18 lg:pt-20 xl:pt-20">
      {/* Title Section */}
      <div className="px-4 md:px-8 lg:px-12 xl:px-16 py-4 md:py-6 lg:py-6 min-h-[120px] md:min-h-[140px] lg:min-h-[150px] flex items-end mb-10 md:mb-12 lg:mb-16 xl:mb-16 mt-16 md:mt-18 lg:mt-20 xl:mt-20">
        <div className="flex flex-col gap-4 md:gap-5 lg:gap-6 text-white w-full max-w-4xl">
          <h1 className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl xl:text-6xl font-bold">레포지토리 선택</h1>
          <p className="text-lg sm:text-xl md:text-xl lg:text-2xl xl:text-2xl font-light text-white/80">분석할 레포지토리를 선택하세요</p>
        </div>
      </div>

      {/* Language Filter Section */}
      <div className="px-4 md:px-8 lg:px-12 xl:px-16 mb-10 md:mb-12 lg:mb-16 xl:mb-16">
        <div className="bg-[#1f1f1f] border border-[#d9d9d9] rounded-xl md:rounded-2xl lg:rounded-2xl p-6 md:p-8 lg:p-10 xl:p-12">
          <div className="flex flex-col gap-6 md:gap-6 lg:gap-8">
            <h2 className="text-2xl md:text-2xl lg:text-3xl xl:text-3xl font-bold text-white">언어 필터</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 md:gap-6 lg:gap-8 xl:gap-10">
              {languages.map((lang) => (
                <button
                  key={lang}
                  onClick={() => setSelectedLanguage(lang)}
                  className="flex gap-2 md:gap-2.5 items-center"
                >
                  <div className="w-8 h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 flex items-center justify-center shrink-0">
                    {selectedLanguage === lang ? (
                      <svg width="100%" height="100%" viewBox="0 0 48 48" fill="none">
                        <circle cx="24" cy="24" r="10" fill="#BBFB4C" stroke="#BBFB4C" strokeWidth="2"/>
                        <circle cx="24" cy="24" r="18" stroke="#BBFB4C" strokeWidth="2"/>
                      </svg>
                    ) : (
                      <svg width="100%" height="100%" viewBox="0 0 48 48" fill="none">
                        <circle cx="24" cy="24" r="18" stroke="#BBFB4C" strokeWidth="2"/>
                      </svg>
                    )}
                  </div>
                  <span className="text-base md:text-base lg:text-lg xl:text-xl font-bold text-white">{lang}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Sort and Analyze Buttons */}
      <div className="px-4 md:px-8 lg:px-12 xl:px-16 mb-6 md:mb-8 lg:mb-10 flex flex-col sm:flex-row gap-4 md:gap-5 lg:gap-6 xl:gap-8 items-stretch sm:items-center">
        <button className="bg-[#1f1f1f] border border-[#d9d9d9] rounded-xl md:rounded-xl px-6 md:px-7 lg:px-8 xl:px-9 py-3 md:py-3.5 lg:py-4 xl:py-4">
          <span className="text-lg md:text-lg lg:text-xl xl:text-xl font-medium text-white">최신순 ▼</span>
        </button>
        <button className="bg-[#bbfb4c] border border-[#bbfb4c] rounded-xl md:rounded-xl px-6 md:px-7 lg:px-8 xl:px-9 py-3 md:py-3.5 lg:py-4 xl:py-4">
          <span className="text-lg md:text-lg lg:text-xl xl:text-xl font-medium text-black">분석하기</span>
        </button>
      </div>

      {/* Repository List */}
      <div className="px-4 md:px-8 lg:px-12 xl:px-16 mb-10 md:mb-12 lg:mb-16 xl:mb-16">
        <div className="flex flex-col gap-6 md:gap-6 lg:gap-8 xl:gap-8">
          {repositories.map((repo) => (
            <div
              key={repo.id}
              className="bg-[#1f1f1f] border border-[#d9d9d9] rounded-xl md:rounded-xl px-4 md:px-5 lg:px-6 xl:px-7 py-6 md:py-6 lg:py-7 xl:py-7"
            >
              <div className="flex flex-col sm:flex-row gap-6 md:gap-6 lg:gap-8 xl:gap-10 items-start sm:items-center">
                <div className="flex-1 flex flex-col gap-4 md:gap-4 lg:gap-5 w-full">
                  <h3 className="text-xl md:text-xl lg:text-2xl xl:text-2xl font-bold text-white">{repo.name}</h3>
                  <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 md:gap-3 lg:gap-4 xl:gap-5 items-start sm:items-center">
                    <div className="bg-[#4e6820] border border-[#bbfb4c] rounded-lg md:rounded-lg lg:rounded-xl px-4 md:px-4 lg:px-5 xl:px-6 py-1 md:py-1 lg:py-1.5 min-w-[120px] md:min-w-[140px] lg:min-w-[150px] xl:min-w-[160px] flex items-center justify-center">
                      <span className="text-base md:text-base lg:text-lg xl:text-lg font-bold text-[#bbfb4c]">{repo.language}</span>
                    </div>
                    <div className="flex gap-2 md:gap-2 lg:gap-2.5 items-center">
                      <IconEye size={20} />
                      <span className="text-base md:text-base lg:text-lg xl:text-lg font-medium text-[#d9d9d9]">{repo.visibility}</span>
                    </div>
                    <div className="flex gap-2 md:gap-2 lg:gap-2.5 items-center">
                      <IconCalendar size={20} />
                      <span className="text-base md:text-base lg:text-lg xl:text-lg font-medium text-[#d9d9d9]">최근 푸시: {repo.lastPush}</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => toggleRepository(repo.id)}
                  className="w-8 h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 flex items-center justify-center shrink-0"
                >
                  {repo.isSelected ? (
                    <svg width="100%" height="100%" viewBox="0 0 48 48" fill="none">
                      <rect x="6" y="6" width="36" height="36" rx="4" stroke="white" strokeWidth="2" fill="white"/>
                      <path d="M14 24L22 32L34 16" stroke="#1f1f1f" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  ) : (
                    <svg width="100%" height="100%" viewBox="0 0 48 48" fill="none">
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
      <div className="px-4 md:px-8 lg:px-12 xl:px-16 pb-10 md:pb-12 lg:pb-16 xl:pb-16 flex justify-center">
        <div className="flex gap-4 md:gap-5 lg:gap-6 items-center flex-wrap justify-center">
          <button className="flex gap-2 md:gap-2.5 items-center opacity-50">
            <svg width="20" height="20" viewBox="0 0 50 50" className="rotate-90 md:w-6 md:h-6 lg:w-7 lg:h-7">
              <path d="M15 31.25L25 18.75L35 31.25" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="text-base md:text-lg lg:text-lg xl:text-xl font-bold text-white hidden sm:inline">Previous</span>
          </button>
          <button className="bg-[#1f1f1f] border border-[#d9d9d9] rounded-lg md:rounded-lg lg:rounded-xl px-4 md:px-5 lg:px-6 xl:px-7 py-2 md:py-2.5 lg:py-3 xl:py-3">
            <span className="text-base md:text-lg lg:text-lg xl:text-xl font-medium text-white">1</span>
          </button>
          <button className="px-4 md:px-5 lg:px-6 xl:px-7 py-2 md:py-2.5 lg:py-3 xl:py-3">
            <span className="text-base md:text-lg lg:text-lg xl:text-xl font-medium text-white">2</span>
          </button>
          <button className="px-4 md:px-5 lg:px-6 xl:px-7 py-2 md:py-2.5 lg:py-3 xl:py-3">
            <span className="text-base md:text-lg lg:text-lg xl:text-xl font-medium text-white">3</span>
          </button>
          <button className="flex gap-2 md:gap-2.5 items-center">
            <span className="text-base md:text-lg lg:text-lg xl:text-xl font-bold text-white hidden sm:inline">Next</span>
            <svg width="20" height="20" viewBox="0 0 50 50" className="-rotate-90 md:w-6 md:h-6 lg:w-7 lg:h-7">
              <path d="M15 31.25L25 18.75L35 31.25" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
