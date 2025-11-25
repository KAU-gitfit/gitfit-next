export default function Footer() {
  return (
    <footer className="bg-[#191919] text-white w-full mt-auto">
      <div className="max-w-[1920px] mx-auto px-[106px] py-[60px]">
        <div className="flex justify-between items-start">
          {/* 왼쪽 섹션 */}
          <div className="flex flex-col gap-[20px]">
            <h3 className="text-[32px] font-bold">Git-Fit</h3>
            <p className="text-[20px] text-[#b0b0b0]">
              개발자의 성장을 위한 플랫폼
            </p>
          </div>

          {/* 오른쪽 섹션 */}
          <div className="flex gap-[80px]">
            <div className="flex flex-col gap-[16px]">
              <h4 className="text-[24px] font-semibold mb-[8px]">서비스</h4>
              <a href="#" className="text-[20px] text-[#b0b0b0] hover:text-white transition-colors">
                레포지토리 분석
              </a>
              <a href="#" className="text-[20px] text-[#b0b0b0] hover:text-white transition-colors">
                개발자 매칭
              </a>
              <a href="#" className="text-[20px] text-[#b0b0b0] hover:text-white transition-colors">
                리포트
              </a>
            </div>

            <div className="flex flex-col gap-[16px]">
              <h4 className="text-[24px] font-semibold mb-[8px]">회사</h4>
              <a href="#" className="text-[20px] text-[#b0b0b0] hover:text-white transition-colors">
                소개
              </a>
              <a href="#" className="text-[20px] text-[#b0b0b0] hover:text-white transition-colors">
                블로그
              </a>
              <a href="#" className="text-[20px] text-[#b0b0b0] hover:text-white transition-colors">
                문의하기
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-[#404040] mt-[40px] pt-[24px] flex justify-between items-center">
          <p className="text-[18px] text-[#808080]">
            © 2024 Git-Fit. All rights reserved.
          </p>
          <div className="flex gap-[32px]">
            <a href="#" className="text-[18px] text-[#808080] hover:text-white transition-colors">
              이용약관
            </a>
            <a href="#" className="text-[18px] text-[#808080] hover:text-white transition-colors">
              개인정보처리방침
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
