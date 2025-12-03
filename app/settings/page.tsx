"use client";
import { useState, useRef } from "react";
import Header from "../components/Header";
import { useProfile } from "@/app/context/ProfileContext";

export default function SettingsPage() {
  const [userName, setUserName] = useState("김아무개");
  const { profileImage, setProfileImage } = useProfile();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.size <= 5 * 1024 * 1024) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      alert("파일 크기는 5MB 이하여야 합니다.");
    }
  };

  const handleImageChangeClick = () => {
    fileInputRef.current?.click();
  };

  const handleSaveChanges = () => {
    alert(`사용자 이름이 "${userName}"으로 변경되었습니다.`);
  };

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
    <main className="min-h-screen bg-[#181818]">
      <Header />

      <div className="pt-32 pb-16 px-8 md:px-16 lg:px-20 max-w-7xl mx-auto">
        {/* 제목 섹션 */}
        <div className="mb-16">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
            설정
          </h1>
          <p className="text-xl md:text-2xl lg:text-3xl text-[#d9d9d9]">
            프로필 설정을 관리하고 계정 설정을 변경하세요
          </p>
        </div>

        {/* 프로필 수정 섹션 */}
        <div className="bg-[#1f1f1f] border border-[#d9d9d9] rounded-3xl p-12 md:p-16 lg:p-20 mb-12">
          <div className="mb-12">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2">
              프로필 수정
            </h2>
          </div>

          {/* 프로필 이미지 영역 */}
          <div className="flex flex-col items-center gap-8 md:gap-10 lg:gap-12 mb-16">
            {/* 프로필 원형 */}
            <div className="w-48 md:w-56 lg:w-64 aspect-square bg-[#4e6820] border-4 md:border-5 border-[#bbfb4c] rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden">
              {profileImage ? (
                <img
                  src={profileImage}
                  alt="프로필"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-32 md:w-40 lg:w-48 h-32 md:h-40 lg:h-48 flex items-center justify-center">
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

            {/* 이미지 변경 버튼 */}
            <button
              onClick={handleImageChangeClick}
              className="bg-[#191919] border border-[#d9d9d9] rounded-2xl px-8 md:px-10 lg:px-12 py-4 md:py-5 lg:py-6 hover:bg-[#2a2a2a] transition-colors"
            >
              <span className="text-white font-bold text-lg md:text-xl lg:text-2xl">
                이미지 변경
              </span>
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png"
              onChange={handleImageUpload}
              className="hidden"
            />

            {/* 파일 정보 */}
            <p className="text-[#d9d9d9] font-bold text-lg md:text-xl lg:text-2xl">
              JPG, PNG (최대 5MB)
            </p>
          </div>

          {/* 이름 입력 섹션 */}
          <div className="mb-8">
            <label className="block text-[#d9d9d9] font-bold text-2xl md:text-3xl lg:text-4xl mb-6">
              이름
            </label>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="w-full bg-[#191919] border border-[#d9d9d9] rounded-2xl px-6 md:px-8 lg:px-8 py-4 md:py-5 lg:py-6 text-white font-bold text-xl md:text-2xl lg:text-3xl focus:outline-none focus:ring-2 focus:ring-[#bbfb4c]"
            />
          </div>

          {/* 변경사항 저장 버튼 */}
          <button
            onClick={handleSaveChanges}
            className="w-full bg-[#bbfb4c] rounded-2xl py-4 md:py-5 lg:py-6 hover:bg-[#a8e535] transition-colors font-bold text-2xl md:text-3xl lg:text-4xl text-[#191919]"
          >
            변경사항 저장
          </button>
        </div>

        {/* 탈퇴 섹션 */}
        <div className="bg-[#1f1f1f] border border-[#d9d9d9] rounded-3xl p-12 md:p-16 lg:p-20">
          <div className="mb-8">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              탈퇴
            </h2>
            <p className="text-[#d9d9d9] font-bold text-xl md:text-2xl lg:text-3xl">
              계정을 영구적으로 삭제합니다
            </p>
          </div>

          {/* 계정 탈퇴 버튼 */}
          <button
            onClick={handleAccountDeletion}
            className="w-full bg-[#191919] border border-[#d9d9d9] rounded-2xl py-4 md:py-5 lg:py-6 hover:bg-[#2a2a2a] transition-colors font-bold text-xl md:text-2xl lg:text-3xl text-white"
          >
            계정 탈퇴
          </button>
        </div>
      </div>
    </main>
  );
}
