"use client";

import { useState, useEffect, useRef } from "react";
import Logo from "./components/Logo";
import { IconCheckCircle, IconUser } from "./components/icons";

// 이미지 상수들
const imgImage36 = "/feather1.png";
const imgImage32 = "/feather2.png";
const imgImage48 = "/icon1.png";
const imgImage49 = "/icon2.png";
const imgImage50 = "/icon3.png";
const imgImage51 = "/icon4.png";
const imgImage52 = "/icon5.png";
// 프레임 및 프로필 이미지는 필요시 추가

export default function Home() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <div className="bg-[#181818] min-h-screen flex flex-col relative w-full">
      {/* 배경 깃털 장식 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute flex items-center justify-center left-0 size-[480px] top-[585px]">
          <div className="flex-none rotate-[223deg]">
            <div className="relative size-[340px]">
              <img alt="" className="block max-w-none size-full opacity-30" src={imgImage36} />
            </div>
          </div>
        </div>
        <div className="absolute flex items-center justify-center left-[160px] size-[435px] top-[223px]">
          <div className="flex-none rotate-[340deg]">
            <div className="relative size-[340px]">
              <img alt="" className="block max-w-none size-full opacity-30" src={imgImage36} />
            </div>
          </div>
        </div>
        <div className="absolute flex items-center justify-center left-[943px] size-[479px] top-0">
          <div className="flex-none rotate-[40deg]">
            <div className="relative size-[340px]">
              <img alt="" className="block max-w-none size-full opacity-30" src={imgImage36} />
            </div>
          </div>
        </div>
        <div className="absolute flex items-center justify-center left-[906px] size-[431px] top-[713px]">
          <div className="flex-none rotate-[70deg]">
            <div className="relative size-[336px]">
              <img alt="" className="block max-w-none size-full opacity-30" src={imgImage32} />
            </div>
          </div>
        </div>
        <div className="absolute flex items-center justify-center left-[1460px] size-[459px] top-[370px]">
          <div className="flex-none rotate-[242deg]">
            <div className="relative size-[340px]">
              <img alt="" className="block max-w-none size-full opacity-30" src={imgImage36} />
            </div>
          </div>
        </div>
      </div>

      {/* 헤더 */}
      <header className="absolute bg-white border-b border-black top-0 left-0 w-full h-[150px] z-50">
        <div className="flex items-center justify-between h-full px-[106px] max-w-[1920px] mx-auto">
          <div className="flex gap-[5px] items-center">
            <Logo className="relative shrink-0 size-[100px]" />
            <div className="flex flex-col font-bold justify-center text-[#3a3a3a] text-[40px]">
              <p>Git-Fit</p>
            </div>
          </div>
          <div className="flex gap-[40px] items-center">
            <p className="font-semibold text-[#191919] text-[40px]">레포지토리</p>
            <p className="font-semibold text-[#191919] text-[40px]">리포트</p>
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex gap-[10px] items-center"
              >
                <div className="bg-[#bbfb4c] flex items-center justify-center rounded-full size-[100px]">
                  <IconUser size={48} />
                </div>
                <div className="flex items-center justify-center size-[24px]">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className={`transition-transform ${isDropdownOpen ? 'rotate-[-90deg]' : 'rotate-90'}`}>
                    <path d="M9 18L15 12L9 6" stroke="#1d1b20" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </button>

              {/* 드롭다운 메뉴 */}
              {isDropdownOpen && (
                <div className="absolute right-0 top-[110px] bg-white border-2 border-[#e0e0e0] rounded-[12px] shadow-lg w-[280px] py-[8px] z-50">
                  <button className="w-full px-[24px] py-[16px] text-left hover:bg-[#f5f5f5] transition-colors">
                    <span className="text-[#191919] text-[28px] font-medium">마이페이지</span>
                  </button>
                  <button className="w-full px-[24px] py-[16px] text-left hover:bg-[#f5f5f5] transition-colors">
                    <span className="text-[#191919] text-[28px] font-medium">설정</span>
                  </button>
                  <div className="border-t border-[#e0e0e0] my-[8px]" />
                  <button className="w-full px-[24px] py-[16px] text-left hover:bg-[#f5f5f5] transition-colors">
                    <span className="text-[#191919] text-[28px] font-medium">로그아웃</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* 메인 컨텐츠 */}
      <main className="flex flex-col gap-[250px] items-center justify-center w-full pt-[200px] pb-[200px] relative z-10">
        {/* 히어로 섹션 */}
        <section className="flex flex-col gap-[50px] items-center justify-center px-4 py-[10px] w-full">
          <div className="flex flex-col gap-[20px] items-center justify-center text-center w-full">
            <h1 className="flex flex-col font-black justify-center text-[96px] text-white leading-tight">
              <span className="text-white">개발자 역량, </span>
              <span className="text-[#bbfb4c]">깃허브</span>
              <span className="text-white">에서 찾고</span>
              <span className="text-white">커리어 매칭까지!</span>
            </h1>
            <p className="flex flex-col font-light justify-center text-[36px] text-white">
              Git-Fit으로 당신의 진짜 실력을 증명하고 최고의 기업에 지원하세요.
            </p>
          </div>
          <button className="bg-[#bbfb4c] flex gap-[10px] items-center justify-center px-[50px] py-[30px] rounded-[32px]">
            <span className="font-semibold text-[#3a3a3c] text-[40px] whitespace-pre">역량 강화하기</span>
          </button>
        </section>

        {/* 코드 분석 섹션 */}
        <section className="flex flex-col gap-[50px] items-center justify-center w-full px-4">
          <div className="flex flex-col gap-[19px] items-center justify-center text-center">
            <h2 className="flex flex-col font-black justify-center text-[64px] text-white">
              <span>내 코드, 객관적으로 </span>
              <span className="text-[#bbfb4c]">얼마나 잘</span>
              <span className="text-[#bbfb4c]"> 짰을까?</span>
            </h2>
            <p className="flex flex-col font-normal justify-center text-[#d9d9d9] text-[36px] text-center">
              Git-Fit은 당신의 깃허브를 분석해 실제 코딩 능력을 정확하게 측정합니다
            </p>
          </div>
          <div className="flex flex-wrap gap-[50px] items-center justify-center w-full max-w-[1800px]">
            <div className="bg-[#1f1f1f] border-2 border-[#d9d9d9] flex flex-col items-center justify-center px-[40px] py-[25px] rounded-[20px] w-[400px]">
              <div className="flex flex-col gap-[20px] items-center w-full">
                <p className="font-bold text-[#bbfb4c] text-[96px]">85</p>
                <p className="font-bold text-[#d9d9d9] text-[32px]">코드 품질</p>
              </div>
            </div>
            <div className="bg-[#1f1f1f] border-2 border-[#d9d9d9] flex flex-col items-center justify-center px-[40px] py-[25px] rounded-[20px] w-[400px]">
              <div className="flex flex-col gap-[20px] items-center w-full">
                <p className="font-bold text-[#bbfb4c] text-[96px]">92</p>
                <p className="font-bold text-[#d9d9d9] text-[32px]">협업</p>
              </div>
            </div>
            <div className="bg-[#1f1f1f] border-2 border-[#d9d9d9] flex flex-col items-center justify-center px-[40px] py-[25px] rounded-[20px] w-[400px]">
              <div className="flex flex-col gap-[20px] items-center w-full">
                <p className="font-bold text-[#bbfb4c] text-[96px]">78</p>
                <p className="font-bold text-[#d9d9d9] text-[32px]">꾸준함</p>
              </div>
            </div>
            <div className="bg-[#1f1f1f] border-2 border-[#d9d9d9] flex flex-col items-center justify-center px-[40px] py-[25px] rounded-[20px] w-[400px]">
              <div className="flex flex-col gap-[20px] items-center w-full">
                <p className="font-bold text-[#bbfb4c] text-[96px]">88</p>
                <p className="font-bold text-[#d9d9d9] text-[32px]">성장</p>
              </div>
            </div>
          </div>
        </section>

        {/* 정밀 코드 진단 섹션 */}
        <section className="flex flex-col gap-[60px] items-center w-full px-4">
          <div className="flex flex-col gap-[16px] items-center justify-center text-center">
            <h2 className="flex flex-col font-black justify-center text-[64px] text-white">
              <span>강점·약점·리스크 지표로 보는 </span>
              <span className="text-[#bbfb4c]">정밀 코드 진단</span>
            </h2>
            <p className="flex flex-col font-light justify-center text-[#d9d9d9] text-[36px]">
              정밀한 분석으로 당신의 코딩 강점과 개선점을 발견하세요
            </p>
          </div>
          <div className="flex flex-col gap-[30px] items-center justify-center min-w-[760px] max-w-[1200px] w-full px-[80px] pt-[50px]">
            <div className="bg-[#1f1f1f] border-2 border-[#bbfb4c] flex gap-[30px] items-start p-[50px] rounded-[20px] w-full">
              <IconCheckCircle size={48} />
              <div className="flex flex-col gap-[50px] grow">
                <p className="font-bold text-[40px] text-white">깊이 있는 개발자 선호</p>
                <p className="text-[#c9c9c9] text-[32px]">
                  코드 품질 우수하고 성실히 개발하는 스타일입니다. 복잡한 비즈니스 로직을 다루는 백엔드 개발자로 적합합니다.
                </p>
              </div>
            </div>
            <div className="bg-[#1f1f1f] border-2 border-[#d9d9d9] flex gap-[30px] items-start p-[50px] rounded-[20px] w-full">
              <IconCheckCircle size={48} />
              <div className="flex flex-col gap-[50px] grow">
                <p className="font-bold text-[40px] text-white">노력과 성장 여지 모두 존재</p>
                <p className="text-[#c9c9c9] text-[32px]">
                  현재도 충분히 뛰어나지만, 꾸준한 노력으로 더 높은 수준을 달성할 수 있습니다.
                </p>
              </div>
            </div>
            <div className="bg-[#1f1f1f] border-2 border-[#d9d9d9] flex gap-[30px] items-start p-[50px] rounded-[20px] w-full">
              <IconCheckCircle size={48} />
              <div className="flex flex-col gap-[50px] grow">
                <p className="font-bold text-[40px] text-white">최근 6개월 기여 내역 분포</p>
                <div className="flex gap-[148px] h-[30px] items-center w-full">
                  <div className="bg-[#313131] flex gap-[100px] grow h-full rounded-[20px]">
                    <div className="bg-[#bbfb4c] h-full rounded-bl-[20px] rounded-tl-[20px] w-[75%]" />
                  </div>
                  <p className="font-bold text-[40px] text-white whitespace-pre">75%</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Git-Fit이 당신의 커리어를 어떻게 변화시킬까요? 섹션 */}
        <section className="flex flex-col gap-[60px] items-center justify-center w-full px-4">
          <div className="flex flex-col gap-[16px] items-center justify-center text-center">
            <h2 className="flex flex-col font-extrabold justify-center text-[64px] text-white">
              <span className="text-[#bbfb4c]">Git-Fit이</span>
              <span> 당신의 커리어를</span>
              <span>어떻게 변화시킬까요?</span>
            </h2>
            <p className="flex flex-col font-light justify-center text-[#d9d9d9] text-[36px]">
              코드분석에 멈추지 않고 커리어 분석의 핵심 가치를 제공
            </p>
          </div>
          <div className="flex gap-[2px] items-center">
            <div className="h-[448px] shrink-0 w-[88px] flex items-center justify-center">
              {/* 연결선 - SVG로 구현 */}
              <svg width="88" height="448" viewBox="0 0 88 448" fill="none" className="opacity-50">
                <path
                  d="M44 0 Q44 112 44 224 T44 448"
                  stroke="#bbfb4c"
                  strokeWidth="4"
                  strokeLinecap="round"
                  fill="none"
                />
              </svg>
            </div>
            <div className="flex flex-col gap-[60px] items-start justify-center py-[10px]">
              <div className="flex gap-[24px] items-center">
                <div className="relative shrink-0 size-[52px]">
                  <img alt="" className="absolute inset-0 object-cover size-full" src={imgImage48} />
                </div>
                <div className="flex flex-col font-bold justify-center text-[36px] text-white">
                  <p>깃허브 레포지토리 분석</p>
                </div>
              </div>
              <div className="flex gap-[24px] items-center">
                <div className="relative shrink-0 size-[52px]">
                  <img alt="" className="absolute inset-0 object-cover size-full" src={imgImage49} />
                </div>
                <div className="flex flex-col font-bold justify-center text-[36px] text-white">
                  <p>코드 정밀 분석</p>
                </div>
              </div>
              <div className="flex gap-[24px] items-center">
                <div className="relative shrink-0 size-[52px]">
                  <img alt="" className="absolute inset-0 object-cover size-full" src={imgImage50} />
                </div>
                <div className="flex flex-col font-bold justify-center text-[36px] text-white">
                  <p>개발자 리포트 생성</p>
                </div>
              </div>
              <div className="flex gap-[24px] items-center">
                <div className="relative shrink-0 size-[52px]">
                  <img alt="" className="absolute inset-0 object-cover size-full" src={imgImage51} />
                </div>
                <div className="flex flex-col font-bold justify-center text-[36px] text-white">
                  <p>강약점 분석 / 위험 신호 감지</p>
                </div>
              </div>
              <div className="flex gap-[24px] items-center">
                <div className="relative shrink-0 size-[52px]">
                  <img alt="" className="absolute inset-0 object-cover size-full" src={imgImage52} />
                </div>
                <div className="flex flex-col font-bold justify-center text-[36px] text-white">
                  <p>AI 실천 행동 가이드</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Git-Fit과 성장한 개발자들 섹션 */}
        <section className="flex flex-col gap-[60px] items-center justify-center w-full px-4 pb-[100px]">
          <div className="flex flex-col gap-[16px] items-center justify-center text-center">
            <h2 className="flex flex-col font-black justify-center text-[64px] text-white">
              <span>Git-Fit과 </span>
              <span className="text-[#bbfb4c]">성장</span>한 개발자들
            </h2>
            <p className="flex flex-col font-medium justify-center text-[#d9d9d9] text-[36px]">
              이제 그들만이 아닌, 여러분의 이야기입니다
            </p>
          </div>
          <div className="flex flex-col gap-[88px] items-start justify-center w-full">
            <div className="flex gap-[70px] items-center justify-center w-full flex-wrap">
              <div className="h-[300px] relative shrink-0 w-[520px]">
                <div className="absolute bg-white inset-0 rounded-[15px]" />
                <div className="absolute flex flex-col gap-[32px] h-[300px] items-start justify-center left-0 px-[35px] top-0 w-[520px]">
                  <div className="flex gap-[20px] items-center">
                    <div className="relative shrink-0 size-[70px]">
                      <div className="bg-[#bbfb4c] rounded-full size-full flex items-center justify-center">
                        <span className="text-[#1d1b20] text-[24px] font-bold">김</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-start justify-center text-black">
                      <div className="flex flex-col font-bold justify-center text-[36px]">
                        <p>김기준</p>
                      </div>
                      <div className="flex flex-col font-normal justify-center text-[20px]">
                        <p>토* 백엔드 개발자</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col font-normal justify-center text-[20px] text-black tracking-wide">
                    <p className="leading-[20px]">
                      &quot;제 코드를 객관적으로 평가받을 수 있어서 좋았어요. 강점과 약점을 파악하고 원하는 회사에 합격할 수 있었습니다. 자신의 개발 역량을 잘 모르시는 분들은 꼭 사용해보시고 취업에 성공하면 좋겠습니다!&quot;
                    </p>
                  </div>
                </div>
              </div>
              <div className="h-[300px] relative shrink-0 w-[520px]">
                <div className="absolute bg-white inset-0 rounded-[15px]" />
                <div className="absolute flex flex-col gap-[32px] h-[300px] items-start justify-center left-0 px-[35px] top-0 w-[520px]">
                  <div className="flex gap-[20px] items-center">
                    <div className="relative shrink-0 size-[70px]">
                      <div className="bg-[#bbfb4c] rounded-full size-full flex items-center justify-center">
                        <span className="text-[#1d1b20] text-[24px] font-bold">안</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-start justify-center text-black">
                      <div className="flex flex-col font-bold justify-center text-[36px]">
                        <p>안라면</p>
                      </div>
                      <div className="flex flex-col font-normal justify-center text-[20px]">
                        <p>카*크 백엔드 개발자</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col font-normal justify-center text-[20px] text-black tracking-wide">
                    <p className="leading-[20px]">
                      &quot;제 코드를 객관적으로 평가받을 수 있어서 좋았어요. 강점과 약점을 파악하고 원하는 회사에 합격할 수 있었습니다. 자신의 개발 역량을 잘 모르시는 분들은 꼭 사용해보시고 취업에 성공하면 좋겠습니다!&quot;
                    </p>
                  </div>
                </div>
              </div>
              <div className="h-[300px] relative shrink-0 w-[520px]">
                <div className="absolute bg-white inset-0 rounded-[15px]" />
                <div className="absolute flex flex-col gap-[32px] h-[300px] items-start justify-center left-0 px-[35px] top-0 w-[520px]">
                  <div className="flex gap-[20px] items-center">
                    <div className="relative shrink-0 size-[70px]">
                      <div className="bg-[#bbfb4c] rounded-full size-full flex items-center justify-center">
                        <span className="text-[#1d1b20] text-[24px] font-bold">박</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-start justify-center text-black">
                      <div className="flex flex-col font-bold justify-center text-[36px]">
                        <p>박네이</p>
                      </div>
                      <div className="flex flex-col font-normal justify-center text-[20px]">
                        <p>네*버페이 프론트엔드 개발자</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col font-normal justify-center text-[20px] text-black tracking-wide">
                    <p className="leading-[20px]">
                      &quot;제 코드를 객관적으로 평가받을 수 있어서 좋았어요. 강점과 약점을 파악하고 원하는 회사에 합격할 수 있었습니다. 자신의 개발 역량을 잘 모르시는 분들은 꼭 사용해보시고 취업에 성공하면 좋겠습니다!&quot;
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 최종 CTA 섹션 */}
        <section className="flex flex-col gap-[28px] items-center justify-center pt-[100px] w-full max-w-[817px] px-4">
          <div className="flex flex-col gap-[16px] items-center justify-center text-center w-full">
            <h2 className="flex flex-col font-bold justify-center text-[64px] text-white">
              <span>이제 당신의 </span>
              <span className="text-[#bbfb4c]">진짜 실력</span>을
              <span>보여줄 시간입니다.</span>
            </h2>
            <p className="flex flex-col justify-center text-[#acacac] text-[36px]">
              <span className="text-[#bbfb4c]">Git-Fit</span>과 함께 성공적인 취업의 첫 걸음을 내딛으세요.
            </p>
          </div>
          <button className="bg-[#bbfb4c] flex gap-[10px] items-center justify-center px-[50px] py-[30px] rounded-[15px]">
            <span className="font-bold text-[40px] text-black whitespace-pre">깃허브 계정 연동하기</span>
          </button>
        </section>
      </main>

      {/* 푸터 */}
      <footer className="bg-white flex gap-[120px] items-center justify-center px-[374px] py-[62px] text-[32px] text-black w-full mt-auto">
        <div className="flex flex-col justify-center">
          <p className="font-bold">이용약관</p>
        </div>
        <div className="flex flex-col justify-center">
          <p className="font-bold">개인정보처리방침</p>
        </div>
        <div className="flex flex-col justify-center">
          <p className="font-bold">고객센터</p>
        </div>
      </footer>
    </div>
  );
}

