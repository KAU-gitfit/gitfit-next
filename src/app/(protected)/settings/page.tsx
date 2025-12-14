"use client";

import Image from "next/image";
import { useAuth } from "@/context/AuthContext";

export default function SettingsPage() {
  const { user } = useAuth();

  const handleAccountDeletion = () => {
    if (
      window.confirm(
        "정말로 계정을 탈퇴하시겠습니까? 이 작업은 되돌릴 수 없습니다."
      )
    ) {
      alert("계정이 삭제되었습니다.");
    }
  };

  return (
    <div className="min-h-screen bg-[#181818] pt-16 md:pt-18 lg:pt-20 xl:pt-20">
      <div className="pt-16 pb-12 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* 제목 섹션 */}
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl lg:text-4xl font-bold text-white mb-3">
            설정
          </h1>
          <p className="text-base md:text-lg lg:text-xl text-[#d9d9d9]">
            프로필 정보를 확인하고 계정을 관리하세요
          </p>
        </div>

        {/* 프로필 정보 섹션 */}
        <div className="bg-[#1f1f1f] border border-[#d9d9d9] rounded-2xl p-6 md:p-8 lg:p-10 mb-8">
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl lg:text-3xl font-bold text-white mb-2">
              프로필 정보
            </h2>
          </div>

          {/* 프로필 이미지 영역 */}
          <div className="flex flex-col items-center gap-6 md:gap-8 mb-10">
            <div className="w-32 md:w-40 lg:w-48 aspect-square bg-[#4e6820] border-4 border-[#bbfb4c] rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden">
              {user?.avatarUrl ? (
                <Image
                  src={user.avatarUrl}
                  alt="프로필"
                  width={192}
                  height={192}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-20 md:w-24 lg:w-28 h-20 md:h-24 lg:h-28 flex items-center justify-center">
                  <svg
                    className="w-full h-full text-[#bbfb4c]"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                  </svg>
                </div>
              )}
            </div>
          </div>

          {/* 사용자 정보 */}
          <div className="space-y-5">
            <div>
              <label className="block text-[#d9d9d9] font-bold text-sm md:text-base mb-1.5">
                이름
              </label>
              <p className="text-white font-bold text-base md:text-lg">
                {user?.displayName || user?.githubUsername || "-"}
              </p>
            </div>
            <div>
              <label className="block text-[#d9d9d9] font-bold text-sm md:text-base mb-1.5">
                GitHub 사용자명
              </label>
              <p className="text-white font-bold text-base md:text-lg">
                {user?.githubUsername || "-"}
              </p>
            </div>
            <div>
              <label className="block text-[#d9d9d9] font-bold text-sm md:text-base mb-1.5">
                이메일
              </label>
              <p className="text-white font-bold text-base md:text-lg">
                {user?.email || "이메일 없음"}
              </p>
            </div>
          </div>
        </div>

        {/* 탈퇴 섹션 */}
        <div className="bg-[#1f1f1f] border border-[#d9d9d9] rounded-2xl p-6 md:p-8 lg:p-10">
          <div className="mb-6">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-3">
              탈퇴
            </h2>
            <p className="text-[#d9d9d9] font-bold text-sm md:text-base lg:text-lg">
              계정을 영구적으로 삭제합니다
            </p>
          </div>

          <button
            onClick={handleAccountDeletion}
            className="w-full bg-[#191919] border border-[#d9d9d9] rounded-xl py-2.5 md:py-3 hover:bg-[#2a2a2a] transition-colors font-bold text-base md:text-lg text-white"
          >
            계정 탈퇴
          </button>
        </div>
      </div>
    </div>
  );
}
