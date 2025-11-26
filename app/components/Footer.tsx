export default function Footer() {
  return (
    <footer className="bg-[#191919] text-white w-full mt-auto">
      <div className="max-w-[1920px] mx-auto px-4 md:px-8 lg:px-16 xl:px-20 py-8 md:py-12 lg:py-14 xl:py-16">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8 md:gap-12">
          {/* 왼쪽 섹션 */}
          <div className="flex flex-col gap-3 md:gap-4 lg:gap-5">
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold">Git-Fit</h3>
            <p className="text-base md:text-lg lg:text-xl text-[#b0b0b0]">
              개발자의 성장을 위한 플랫폼
            </p>
          </div>

          {/* 오른쪽 섹션 */}
          <div className="flex gap-12 md:gap-16 lg:gap-20">
            <div className="flex flex-col gap-3 md:gap-4">
              <h4 className="text-lg md:text-xl lg:text-2xl font-semibold mb-1 md:mb-2">서비스</h4>
              <a href="#" className="text-sm md:text-base lg:text-lg xl:text-xl text-[#b0b0b0] hover:text-white transition-colors">
                레포지토리 분석
              </a>
              <a href="#" className="text-sm md:text-base lg:text-lg xl:text-xl text-[#b0b0b0] hover:text-white transition-colors">
                개발자 매칭
              </a>
              <a href="#" className="text-sm md:text-base lg:text-lg xl:text-xl text-[#b0b0b0] hover:text-white transition-colors">
                리포트
              </a>
            </div>

            <div className="flex flex-col gap-3 md:gap-4">
              <h4 className="text-lg md:text-xl lg:text-2xl font-semibold mb-1 md:mb-2">회사</h4>
              <a href="#" className="text-sm md:text-base lg:text-lg xl:text-xl text-[#b0b0b0] hover:text-white transition-colors">
                소개
              </a>
              <a href="#" className="text-sm md:text-base lg:text-lg xl:text-xl text-[#b0b0b0] hover:text-white transition-colors">
                블로그
              </a>
              <a href="#" className="text-sm md:text-base lg:text-lg xl:text-xl text-[#b0b0b0] hover:text-white transition-colors">
                문의하기
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-[#404040] mt-6 md:mt-8 lg:mt-10 pt-4 md:pt-5 lg:pt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <p className="text-xs md:text-sm lg:text-base text-[#808080]">
            © 2024 Git-Fit. All rights reserved.
          </p>
          <div className="flex gap-6 md:gap-8">
            <a href="#" className="text-xs md:text-sm lg:text-base text-[#808080] hover:text-white transition-colors">
              이용약관
            </a>
            <a href="#" className="text-xs md:text-sm lg:text-base text-[#808080] hover:text-white transition-colors">
              개인정보처리방침
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
