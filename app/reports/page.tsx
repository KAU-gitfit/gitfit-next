"use client";

import Link from "next/link";
import { IconFileText } from "../components/icons";

export default function ReportsPage() {
  return (
    <div className="bg-[#181818] min-h-screen pt-[250px]">
      {/* Title Section */}
      <div className="px-[80px] py-[40px] h-[230px] flex items-start mb-[80px]">
        <div className="flex flex-col gap-[30px]">
          <h1 className="text-[96px] font-bold text-white">개발자 리포트</h1>
        </div>
      </div>

      {/* Empty State Section */}
      <div className="px-[80px] py-[24px]">
        <div className="bg-[#1f1f1f] border border-[#d9d9d9] rounded-[20px] h-[1078px] flex flex-col items-center justify-center gap-[100px] py-[154px]">
          {/* File Icon */}
          <div className="bg-[#4e6820] border-[5px] border-[#bbfb4c] rounded-full flex items-center justify-center p-[50px]">
            <IconFileText size={200} />
          </div>

          {/* Empty State Text and Button */}
          <div className="flex flex-col gap-[50px] items-center justify-center w-[1250px]">
            <h2 className="text-[64px] font-bold text-white text-center">
              아직 분석된 리포트가 없습니다
            </h2>
            <div className="text-[40px] font-bold text-[#d9d9d9] text-center">
              <p className="mb-0">GitHub 레포지토리를 선택하고 분석을 시작해보세요.</p>
              <p>코드 품질, 협업 능력, 성장 추세 등을 AI가 자동으로 분석합니다.</p>
            </div>
            <Link
              href="/repositories"
              className="bg-[#bbfb4c] rounded-[20px] px-[80px] py-[40px]"
            >
              <span className="text-[40px] font-semibold text-[#191919]">분석 시작하기</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
