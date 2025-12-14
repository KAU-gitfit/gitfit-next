export default function Footer() {
  return (
    <footer className="bg-[#191919] text-white w-full mt-auto">
      <div className="max-w-[1920px] mx-auto px-4 md:px-8 lg:px-12 xl:px-16 py-8 md:py-10 lg:py-12 xl:py-12">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8 md:gap-10 w-full">
          {/* 왼쪽 섹션 */}
          <div className="flex flex-col gap-3 md:gap-3 lg:gap-4 w-full md:w-auto">
            <h3 className="text-2xl md:text-2xl lg:text-3xl font-bold">Git-Fit</h3>
            <p className="text-base md:text-base lg:text-lg text-[#b0b0b0]">
              개발자의 성장을 위한 플랫폼
            </p>
          </div>

          {/* 오른쪽 섹션 */}
          <div className="flex gap-12 md:gap-14 lg:gap-16 w-full md:w-auto justify-between md:justify-start">
            <div className="flex flex-col gap-3 md:gap-3">
              <h4 className="text-lg md:text-lg lg:text-xl font-semibold mb-1 md:mb-1.5">서비스</h4>
              <a href="#" className="text-sm md:text-base lg:text-base xl:text-lg text-[#b0b0b0] hover:text-white transition-colors">
                레포지토리 분석
              </a>
              <a href="#" className="text-sm md:text-base lg:text-base xl:text-lg text-[#b0b0b0] hover:text-white transition-colors">
                개발자 매칭
              </a>
              <a href="#" className="text-sm md:text-base lg:text-base xl:text-lg text-[#b0b0b0] hover:text-white transition-colors">
                리포트
              </a>
            </div>

            <div className="flex flex-col gap-3 md:gap-3">
              <h4 className="text-lg md:text-lg lg:text-xl font-semibold mb-1 md:mb-1.5">회사</h4>
              <a href="#" className="text-sm md:text-base lg:text-base xl:text-lg text-[#b0b0b0] hover:text-white transition-colors">
                소개
              </a>
              <a href="#" className="text-sm md:text-base lg:text-base xl:text-lg text-[#b0b0b0] hover:text-white transition-colors">
                블로그
              </a>
              <a href="#" className="text-sm md:text-base lg:text-base xl:text-lg text-[#b0b0b0] hover:text-white transition-colors">
                문의하기
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-[#404040] mt-6 md:mt-7 lg:mt-8 pt-4 md:pt-4 lg:pt-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <p className="text-xs md:text-sm lg:text-sm text-[#808080]">
            © 2025 Git-Fit. All rights reserved.
          </p>
          <div className="flex gap-6 md:gap-6">
            <a href="#" className="text-xs md:text-sm lg:text-sm text-[#808080] hover:text-white transition-colors">
              이용약관
            </a>
            <a href="#" className="text-xs md:text-sm lg:text-sm text-[#808080] hover:text-white transition-colors">
              개인정보처리방침
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
