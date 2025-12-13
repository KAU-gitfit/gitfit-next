"use client";

import { useEffect, useRef, useState } from "react";
import { IconCheckCircle } from "../components/icons";

// 이미지 상수들
const imgImage36 = "/feather1.png";
const imgImage32 = "/feather2.png";
const imgImage48 = "/icon1.png";
const imgImage49 = "/icon2.png";
const imgImage50 = "/icon3.png";
const imgImage51 = "/icon4.png";
const imgImage52 = "/icon5.png";
// 프레임 및 프로필 이미지는 필요시 추가

type Testimonial = {
  initial: string;
  name: string;
  role: string;
  quote: string;
};

const TESTIMONIALS: Testimonial[] = [
  {
    initial: "김",
    name: "김기준",
    role: "토* 백엔드 개발자",
    quote:
      "제 코드를 객관적으로 평가받을 수 있어서 좋았어요. 강점과 약점을 파악하고 원하는 회사에 합격할 수 있었습니다. 자신의 개발 역량을 잘 모르시는 분들은 꼭 사용해보시고 취업에 성공하면 좋겠습니다!",
  },
  {
    initial: "안",
    name: "안라면",
    role: "카*크 백엔드 개발자",
    quote:
      "제 코드를 객관적으로 평가받을 수 있어서 좋았어요. 강점과 약점을 파악하고 원하는 회사에 합격할 수 있었습니다. 자신의 개발 역량을 잘 모르시는 분들은 꼭 사용해보시고 취업에 성공하면 좋겠습니다!",
  },
  {
    initial: "박",
    name: "박네이",
    role: "네*버페이 프론트엔드 개발자",
    quote:
      "제 코드를 객관적으로 평가받을 수 있어서 좋았어요. 강점과 약점을 파악하고 원하는 회사에 합격할 수 있었습니다. 자신의 개발 역량을 잘 모르시는 분들은 꼭 사용해보시고 취업에 성공하면 좋겠습니다!",
  },
];

function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <div className="bg-white rounded-2xl p-6 md:p-7 lg:p-7 shadow-[0_8px_24px_rgba(0,0,0,0.25)]">
      <div className="flex flex-col gap-6">
        <div className="flex gap-4 items-center">
          <div className="shrink-0 size-14 md:size-16 rounded-full bg-[#bbfb4c] flex items-center justify-center">
            <span className="text-[#1d1b20] text-xl font-bold">
              {t.initial}
            </span>
          </div>
          <div className="flex flex-col items-start justify-center text-black">
            <p className="font-bold text-2xl md:text-3xl">{t.name}</p>
            <p className="font-normal text-sm md:text-base">{t.role}</p>
          </div>
        </div>

        <p className="font-normal text-sm md:text-base text-black tracking-wide leading-relaxed">
          &quot;{t.quote}&quot;
        </p>
      </div>
    </div>
  );
}

function TestimonialsMarquee() {
  const items = TESTIMONIALS;
  if (items.length === 0) return null;

  // 같은 트랙을 2번 이어붙여서 "끊김 없이" 반복
  const doubled = [...items, ...items];

  return (
    <div className="relative w-full max-w-7xl mx-auto">
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-24 bg-gradient-to-r from-[#181818] to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-24 bg-gradient-to-l from-[#181818] to-transparent z-10" />

      <div className="marquee overflow-hidden w-full">
        <div className="marqueeTrack flex w-max gap-6 md:gap-8 py-2">
          {doubled.map((t, i) => (
            <div
              key={`${t.name}-${i}`}
              className="shrink-0 w-[280px] sm:w-[320px] md:w-[360px] lg:w-[380px]"
            >
              <TestimonialCard t={t} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function InsightsScrollHighlight() {
  const cardsRef = useRef<Array<HTMLDivElement | null>>([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const nodes = cardsRef.current.filter(Boolean) as HTMLDivElement[];
    if (nodes.length === 0) return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length === 0) return;

        visible.sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        const top = visible[0].target as HTMLDivElement;
        const idx = nodes.indexOf(top);
        if (idx >= 0) setActive(idx);
      },
      {
        root: null,
        rootMargin: "-40% 0px -40% 0px",
        threshold: [0.1, 0.25, 0.4, 0.55, 0.7],
      }
    );

    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, []);

  const borderClass = (i: number) =>
    i === active ? "border-[#bbfb4c]" : "border-[#d9d9d9]";

  return (
    <div className="flex flex-col gap-6 md:gap-6 items-center justify-center w-full max-w-5xl px-4 md:px-8 lg:px-8 pt-8 md:pt-8 lg:pt-8">
      {/* 1 */}
      <div
        ref={(el) => {
          cardsRef.current[0] = el;
        }}
        className={[
          "bg-[#1f1f1f] border-2 flex flex-col md:flex-row gap-6 md:gap-6 items-start p-6 md:p-8 lg:p-8 rounded-2xl w-full",
          "transition-colors duration-300",
          borderClass(0),
        ].join(" ")}
      >
        <div className="shrink-0">
          <IconCheckCircle size={40} />
        </div>
        <div className="flex flex-col gap-6 md:gap-6 lg:gap-8 grow">
          <p className="font-bold text-2xl md:text-2xl lg:text-3xl text-white">
            깊이 있는 개발자 선호
          </p>
          <p className="text-[#c9c9c9] text-base md:text-lg lg:text-lg xl:text-xl">
            코드 품질 우수하고 성실히 개발하는 스타일입니다. 복잡한 비즈니스
            로직을 다루는 백엔드 개발자로 적합합니다.
          </p>
        </div>
      </div>

      {/* 2 */}
      <div
        ref={(el) => {
          cardsRef.current[1] = el;
        }}
        className={[
          "bg-[#1f1f1f] border-2 flex flex-col md:flex-row gap-6 md:gap-6 items-start p-6 md:p-8 lg:p-8 rounded-2xl w-full",
          "transition-colors duration-300",
          borderClass(1),
        ].join(" ")}
      >
        <div className="shrink-0">
          <IconCheckCircle size={40} />
        </div>
        <div className="flex flex-col gap-6 md:gap-6 lg:gap-8 grow">
          <p className="font-bold text-2xl md:text-2xl lg:text-3xl text-white">
            노력과 성장 여지 모두 존재
          </p>
          <p className="text-[#c9c9c9] text-base md:text-lg lg:text-lg xl:text-xl">
            현재도 충분히 뛰어나지만, 꾸준한 노력으로 더 높은 수준을 달성할 수
            있습니다.
          </p>
        </div>
      </div>

      {/* 3 */}
      <div
        ref={(el) => {
          cardsRef.current[2] = el;
        }}
        className={[
          "bg-[#1f1f1f] border-2 flex flex-col md:flex-row gap-6 md:gap-6 items-start p-6 md:p-8 lg:p-8 rounded-2xl w-full",
          "transition-colors duration-300",
          borderClass(2),
        ].join(" ")}
      >
        <div className="shrink-0">
          <IconCheckCircle size={40} />
        </div>
        <div className="flex flex-col gap-6 md:gap-6 lg:gap-8 grow">
          <p className="font-bold text-2xl md:text-2xl lg:text-3xl text-white">
            최근 6개월 기여 내역 분포
          </p>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 md:gap-12 lg:gap-16 items-center w-full">
            <AnimatedProgressBar value={75} />

            <p className="font-bold text-2xl md:text-2xl lg:text-3xl text-white whitespace-nowrap">
              75%
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function AnimatedProgressBar({
  value, // 0~100
  durationMs = 900,
}: {
  value: number;
  durationMs?: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [run, setRun] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRun(true);
          io.disconnect();
        }
      },
      {
        root: null,
        rootMargin: "-35% 0px -35% 0px",
        threshold: 0.2,
      }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  const clamped = Math.max(0, Math.min(100, value));

  return (
    <div
      ref={ref}
      className="bg-[#313131] flex grow h-8 rounded-2xl w-full overflow-hidden"
    >
      <div
        className="bg-[#bbfb4c] h-full rounded-2xl"
        style={{
          width: run ? `${clamped}%` : "0%",
          transition: `width ${durationMs}ms cubic-bezier(0.22, 0.61, 0.36, 1)`,
          willChange: "width",
        }}
      />
    </div>
  );
}

export default function Home() {
  const handleGithubLogin = () => {
    window.location.href =
      "https://api.gitfit.site/oauth2/authorization/github";
  };

  const handleGoToRepositories = () => {
    window.location.href = "/repositories";
  };

  return (
    <div className="bg-[#181818] min-h-screen flex flex-col relative w-full">
      {/* 배경 깃털 장식 - 대형 화면에서만 표시 */}
      <div className="hidden lg:block absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute flex items-center justify-center left-0 size-[480px] top-[585px]">
          <div className="flex-none rotate-[223deg]">
            <div className="relative size-[340px]">
              <img
                alt=""
                className="block max-w-none size-full opacity-30"
                src={imgImage36}
              />
            </div>
          </div>
        </div>
        <div className="absolute flex items-center justify-center left-[160px] size-[435px] top-[223px]">
          <div className="flex-none rotate-[340deg]">
            <div className="relative size-[340px]">
              <img
                alt=""
                className="block max-w-none size-full opacity-30"
                src={imgImage36}
              />
            </div>
          </div>
        </div>
        <div className="absolute flex items-center justify-center left-[943px] size-[479px] top-0">
          <div className="flex-none rotate-[40deg]">
            <div className="relative size-[340px]">
              <img
                alt=""
                className="block max-w-none size-full opacity-30"
                src={imgImage36}
              />
            </div>
          </div>
        </div>
        <div className="absolute flex items-center justify-center left-[906px] size-[431px] top-[713px]">
          <div className="flex-none rotate-[70deg]">
            <div className="relative size-[336px]">
              <img
                alt=""
                className="block max-w-none size-full opacity-30"
                src={imgImage32}
              />
            </div>
          </div>
        </div>
        <div className="absolute flex items-center justify-center left-[1460px] size-[459px] top-[370px]">
          <div className="flex-none rotate-[242deg]">
            <div className="relative size-[340px]">
              <img
                alt=""
                className="block max-w-none size-full opacity-30"
                src={imgImage36}
              />
            </div>
          </div>
        </div>
      </div>

      {/* 메인 컨텐츠 */}
      <main className="flex flex-col gap-16 md:gap-24 lg:gap-32 items-center justify-center w-full pt-32 md:pt-36 lg:pt-36 xl:pt-36 pb-32 md:pb-36 lg:pb-40 relative z-10 mt-16 md:mt-18 lg:mt-20 xl:mt-20">
        {/* 히어로 섹션 */}
        <section className="flex flex-col gap-8 md:gap-10 lg:gap-10 items-center justify-center px-4 md:px-8 py-2 w-full">
          <div className="flex flex-col gap-4 md:gap-5 items-center justify-center text-center w-full">
            <h1 className="font-black text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-6xl text-white leading-tight">
              <span className="text-white">개발자 역량, </span>
              <span className="text-[#bbfb4c]">깃허브</span>
              <span className="text-white">에서 찾고</span>
              <br />
              <span className="text-white">커리어 매칭까지!</span>
            </h1>
            <p className="flex flex-col font-light justify-center text-base md:text-lg lg:text-lg xl:text-xl text-white max-w-4xl">
              Git-Fit으로 당신의 진짜 실력을 증명하고 최고의 기업에 지원하세요.
            </p>
          </div>
          <button
            onClick={handleGoToRepositories}
            className="bg-[#bbfb4c] flex gap-2 md:gap-3 items-center justify-center px-8 py-4 md:px-10 md:py-5 lg:px-10 lg:py-5 rounded-2xl md:rounded-2xl w-full sm:w-auto"
          >
            <span className="font-semibold text-[#3a3a3c] text-lg md:text-xl lg:text-xl whitespace-pre">
              역량 강화하기
            </span>
          </button>
        </section>

        {/* 코드 분석 섹션 */}
        <section className="flex flex-col gap-8 md:gap-10 lg:gap-10 items-center justify-center w-full px-4 md:px-8">
          <div className="flex flex-col gap-4 md:gap-5 items-center justify-center text-center">
            <h2 className="font-black text-3xl sm:text-4xl md:text-4xl lg:text-5xl text-white">
              <span>내 코드, 객관적으로 </span>
              <span className="text-[#bbfb4c]">얼마나 잘 짰을까?</span>
            </h2>
            <p className="flex flex-col font-normal justify-center text-[#d9d9d9] text-base md:text-lg lg:text-lg xl:text-xl text-center max-w-4xl">
              Git-Fit은 당신의 깃허브를 분석해 실제 코딩 능력을 정확하게
              측정합니다
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 md:gap-6 lg:gap-8 xl:gap-8 w-full max-w-7xl">
            <div className="bg-[#1f1f1f] border-2 border-[#d9d9d9] flex flex-col items-center justify-center px-8 md:px-8 py-6 md:py-6 rounded-2xl">
              <div className="flex flex-col gap-4 md:gap-4 items-center w-full">
                <p className="font-bold text-[#bbfb4c] text-6xl md:text-6xl lg:text-7xl">
                  85
                </p>
                <p className="font-bold text-[#d9d9d9] text-xl md:text-xl">
                  코드 품질
                </p>
              </div>
            </div>
            <div className="bg-[#1f1f1f] border-2 border-[#d9d9d9] flex flex-col items-center justify-center px-8 md:px-8 py-6 md:py-6 rounded-2xl">
              <div className="flex flex-col gap-4 md:gap-4 items-center w-full">
                <p className="font-bold text-[#bbfb4c] text-6xl md:text-6xl lg:text-7xl">
                  92
                </p>
                <p className="font-bold text-[#d9d9d9] text-xl md:text-xl">
                  협업
                </p>
              </div>
            </div>
            <div className="bg-[#1f1f1f] border-2 border-[#d9d9d9] flex flex-col items-center justify-center px-8 md:px-8 py-6 md:py-6 rounded-2xl">
              <div className="flex flex-col gap-4 md:gap-4 items-center w-full">
                <p className="font-bold text-[#bbfb4c] text-6xl md:text-6xl lg:text-7xl">
                  78
                </p>
                <p className="font-bold text-[#d9d9d9] text-xl md:text-xl">
                  꾸준함
                </p>
              </div>
            </div>
            <div className="bg-[#1f1f1f] border-2 border-[#d9d9d9] flex flex-col items-center justify-center px-8 md:px-8 py-6 md:py-6 rounded-2xl">
              <div className="flex flex-col gap-4 md:gap-4 items-center w-full">
                <p className="font-bold text-[#bbfb4c] text-6xl md:text-6xl lg:text-7xl">
                  88
                </p>
                <p className="font-bold text-[#d9d9d9] text-xl md:text-xl">
                  성장
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 정밀 코드 진단 섹션 */}
        <section className="flex flex-col gap-10 md:gap-10 lg:gap-12 items-center w-full px-4 md:px-8">
          <div className="flex flex-col gap-3 md:gap-4 items-center justify-center text-center">
            <h2 className="flex flex-col font-black justify-center text-3xl sm:text-4xl md:text-4xl lg:text-5xl text-white">
              <span>강점·약점·리스크 지표로 보는 </span>
              <span className="text-[#bbfb4c]">정밀 코드 진단</span>
            </h2>
            <p className="flex flex-col font-light justify-center text-[#d9d9d9] text-base md:text-lg lg:text-lg xl:text-xl max-w-4xl">
              정밀한 분석으로 당신의 코딩 강점과 개선점을 발견하세요
            </p>
          </div>

          <InsightsScrollHighlight />
        </section>

        {/* Git-Fit이 당신의 커리어를 어떻게 변화시킬까요? 섹션 */}
        <section className="flex flex-col gap-10 md:gap-10 lg:gap-12 items-center justify-center w-full px-4 md:px-8">
          <div className="flex flex-col gap-3 md:gap-4 items-center justify-center text-center">
            <h2 className="font-extrabold justify-center text-3xl sm:text-4xl md:text-4xl lg:text-5xl text-white">
              <span className="text-[#bbfb4c]">Git-Fit이</span>
              <span> 당신의 커리어를</span>
              <br />
              <span>어떻게 변화시킬까요?</span>
            </h2>
            <p className="flex flex-col font-light justify-center text-[#d9d9d9] text-base md:text-lg lg:text-lg xl:text-xl max-w-4xl">
              코드분석에 멈추지 않고 커리어 분석의 핵심 가치를 제공
            </p>
          </div>
          <div className="flex items-start gap-4 md:gap-5">
            {/* 왼쪽 화살표 컬럼 - 데스크톱에서만 표시 */}
            <div className="hidden lg:flex flex-col items-center pt-6 gap-7">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="70"
                viewBox="0 0 40 86"
                fill="none"
              >
                <path
                  d="M21.6265 0.000134505C18.7208 0.197323 17.0246 -0.0791832 16.3248 0.429883C13.719 2.32565 10.9594 4.22809 9.13211 6.58486C4.20082 12.9453 2.60097 20.3479 2.65005 28.1858C2.73329 41.5183 7.56493 54.5888 14.3248 67.5627C15.0467 68.9483 15.68 70.3514 16.3213 71.7514C16.3612 71.8386 16.1098 71.9705 15.8258 72.243C13.1439 70.9678 10.438 69.5575 7.60174 68.3829C6.09501 67.7588 4.32569 67.2922 2.74509 67.2341C1.73361 67.1971 0.244132 67.8685 0.058544 68.5232C-0.188467 69.3944 0.383981 70.6387 1.06511 71.5687C1.53665 72.2124 2.75599 72.6404 3.69303 73.0889C11.0306 76.6009 18.316 80.1969 25.7463 83.5627C32.1166 86.4484 34.6606 85.4879 35.5497 80.5771C36.4596 75.5513 37.7343 70.6066 38.7649 65.6067C39.0837 64.0597 39.1256 62.4477 39.3164 60.6585C35.3768 60.866 31.4133 65.8522 27.426 75.6171C21.1276 66.9352 17.6475 58.3765 14.578 49.7716C11.5061 41.16 10.2132 32.584 10.6361 24.05C11.0701 15.2935 15.4361 7.92632 21.6265 0.000134505Z"
                  fill="#BBFB4C"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="70"
                viewBox="0 0 40 86"
                fill="none"
              >
                <path
                  d="M21.6265 0.000134505C18.7208 0.197323 17.0246 -0.0791832 16.3248 0.429883C13.719 2.32565 10.9594 4.22809 9.13211 6.58486C4.20082 12.9453 2.60097 20.3479 2.65005 28.1858C2.73329 41.5183 7.56493 54.5888 14.3248 67.5627C15.0467 68.9483 15.68 70.3514 16.3213 71.7514C16.3612 71.8386 16.1098 71.9705 15.8258 72.243C13.1439 70.9678 10.438 69.5575 7.60174 68.3829C6.09501 67.7588 4.32569 67.2922 2.74509 67.2341C1.73361 67.1971 0.244132 67.8685 0.058544 68.5232C-0.188467 69.3944 0.383981 70.6387 1.06511 71.5687C1.53665 72.2124 2.75599 72.6404 3.69303 73.0889C11.0306 76.6009 18.316 80.1969 25.7463 83.5627C32.1166 86.4484 34.6606 85.4879 35.5497 80.5771C36.4596 75.5513 37.7343 70.6066 38.7649 65.6067C39.0837 64.0597 39.1256 62.4477 39.3164 60.6585C35.3768 60.866 31.4133 65.8522 27.426 75.6171C21.1276 66.9352 17.6475 58.3765 14.578 49.7716C11.5061 41.16 10.2132 32.584 10.6361 24.05C11.0701 15.2935 15.4361 7.92632 21.6265 0.000134505Z"
                  fill="#BBFB4C"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="70"
                viewBox="0 0 40 86"
                fill="none"
              >
                <path
                  d="M21.6265 0.000134505C18.7208 0.197323 17.0246 -0.0791832 16.3248 0.429883C13.719 2.32565 10.9594 4.22809 9.13211 6.58486C4.20082 12.9453 2.60097 20.3479 2.65005 28.1858C2.73329 41.5183 7.56493 54.5888 14.3248 67.5627C15.0467 68.9483 15.68 70.3514 16.3213 71.7514C16.3612 71.8386 16.1098 71.9705 15.8258 72.243C13.1439 70.9678 10.438 69.5575 7.60174 68.3829C6.09501 67.7588 4.32569 67.2922 2.74509 67.2341C1.73361 67.1971 0.244132 67.8685 0.058544 68.5232C-0.188467 69.3944 0.383981 70.6387 1.06511 71.5687C1.53665 72.2124 2.75599 72.6404 3.69303 73.0889C11.0306 76.6009 18.316 80.1969 25.7463 83.5627C32.1166 86.4484 34.6606 85.4879 35.5497 80.5771C36.4596 75.5513 37.7343 70.6066 38.7649 65.6067C39.0837 64.0597 39.1256 62.4477 39.3164 60.6585C35.3768 60.866 31.4133 65.8522 27.426 75.6171C21.1276 66.9352 17.6475 58.3765 14.578 49.7716C11.5061 41.16 10.2132 32.584 10.6361 24.05C11.0701 15.2935 15.4361 7.92632 21.6265 0.000134505Z"
                  fill="#BBFB4C"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="70"
                viewBox="0 0 40 86"
                fill="none"
              >
                <path
                  d="M21.6265 0.000134505C18.7208 0.197323 17.0246 -0.0791832 16.3248 0.429883C13.719 2.32565 10.9594 4.22809 9.13211 6.58486C4.20082 12.9453 2.60097 20.3479 2.65005 28.1858C2.73329 41.5183 7.56493 54.5888 14.3248 67.5627C15.0467 68.9483 15.68 70.3514 16.3213 71.7514C16.3612 71.8386 16.1098 71.9705 15.8258 72.243C13.1439 70.9678 10.438 69.5575 7.60174 68.3829C6.09501 67.7588 4.32569 67.2922 2.74509 67.2341C1.73361 67.1971 0.244132 67.8685 0.058544 68.5232C-0.188467 69.3944 0.383981 70.6387 1.06511 71.5687C1.53665 72.2124 2.75599 72.6404 3.69303 73.0889C11.0306 76.6009 18.316 80.1969 25.7463 83.5627C32.1166 86.4484 34.6606 85.4879 35.5497 80.5771C36.4596 75.5513 37.7343 70.6066 38.7649 65.6067C39.0837 64.0597 39.1256 62.4477 39.3164 60.6585C35.3768 60.866 31.4133 65.8522 27.426 75.6171C21.1276 66.9352 17.6475 58.3765 14.578 49.7716C11.5061 41.16 10.2132 32.584 10.6361 24.05C11.0701 15.2935 15.4361 7.92632 21.6265 0.000134505Z"
                  fill="#BBFB4C"
                />
              </svg>
            </div>

            {/* 오른쪽 텍스트 컬럼 */}
            <div className="flex flex-col gap-8 md:gap-10 lg:gap-10 w-full">
              <div className="flex gap-4 md:gap-5 items-center">
                <div className="relative shrink-0 size-10 md:size-11 lg:size-12">
                  <img
                    alt=""
                    className="absolute inset-0 object-cover size-full"
                    src={imgImage48}
                  />
                </div>
                <div className="flex flex-col font-bold justify-center text-lg md:text-xl lg:text-xl xl:text-2xl text-white">
                  <p>깃허브 레포지토리 분석</p>
                </div>
              </div>

              <div className="flex gap-4 md:gap-5 items-center">
                <div className="relative shrink-0 size-10 md:size-11 lg:size-12">
                  <img
                    alt=""
                    className="absolute inset-0 object-cover size-full"
                    src={imgImage49}
                  />
                </div>
                <div className="flex flex-col font-bold justify-center text-lg md:text-xl lg:text-xl xl:text-2xl text-white">
                  <p>코드 정밀 분석</p>
                </div>
              </div>

              <div className="flex gap-4 md:gap-5 items-center">
                <div className="relative shrink-0 size-10 md:size-11 lg:size-12">
                  <img
                    alt=""
                    className="absolute inset-0 object-cover size-full"
                    src={imgImage50}
                  />
                </div>
                <div className="flex flex-col font-bold justify-center text-lg md:text-xl lg:text-xl xl:text-2xl text-white">
                  <p>개발자 리포트 생성</p>
                </div>
              </div>

              <div className="flex gap-4 md:gap-5 items-center">
                <div className="relative shrink-0 size-10 md:size-11 lg:size-12">
                  <img
                    alt=""
                    className="absolute inset-0 object-cover size-full"
                    src={imgImage51}
                  />
                </div>
                <div className="flex flex-col font-bold justify-center text-lg md:text-xl lg:text-xl xl:text-2xl text-white">
                  <p>강약점 분석 / 위험 신호 감지</p>
                </div>
              </div>

              <div className="flex gap-4 md:gap-5 items-center">
                <div className="relative shrink-0 size-10 md:size-11 lg:size-12">
                  <img
                    alt=""
                    className="absolute inset-0 object-cover size-full"
                    src={imgImage52}
                  />
                </div>
                <div className="flex flex-col font-bold justify-center text-lg md:text-xl lg:text-xl xl:text-2xl text-white">
                  <p>AI 실천 행동 가이드</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Git-Fit과 성장한 개발자들 섹션 */}
        <section className="flex flex-col gap-10 md:gap-10 lg:gap-12 items-center justify-center w-full px-4 md:px-8 pb-16 md:pb-18 lg:pb-20">
          <div className="flex flex-col gap-3 md:gap-4 items-center justify-center text-center">
            <h2 className="font-black justify-center text-3xl sm:text-4xl md:text-4xl lg:text-5xl text-white">
              <span>Git-Fit과 </span>
              <span className="text-[#bbfb4c]">성장</span>한 개발자들
            </h2>
            <p className="flex flex-col font-medium justify-center text-[#d9d9d9] text-base md:text-lg lg:text-lg xl:text-xl max-w-4xl">
              이제 그들만이 아닌, 여러분의 이야기입니다
            </p>
          </div>
          <div className="w-full max-w-7xl mx-auto">
            <TestimonialsMarquee />
          </div>
        </section>

        {/* 최종 CTA 섹션 */}
        <section className="flex flex-col gap-6 md:gap-6 items-center justify-center pt-16 md:pt-16 lg:pt-20 w-full max-w-4xl px-4 md:px-8">
          <div className="flex flex-col gap-3 md:gap-4 items-center justify-center text-center w-full">
            <h2 className="font-bold justify-center text-3xl sm:text-4xl md:text-4xl lg:text-5xl text-white">
              <span>이제 당신의 </span>
              <span className="text-[#bbfb4c]">진짜 실력</span>을
              <br />
              <span>보여줄 시간입니다.</span>
            </h2>
            <p className="justify-center text-[#acacac] text-base md:text-lg lg:text-lg xl:text-xl">
              <span className="text-[#bbfb4c]">Git-Fit</span>과 함께 성공적인
              취업의 첫 걸음을 내딛으세요.
            </p>
          </div>
          <button
            onClick={handleGithubLogin}
            className="bg-[#bbfb4c] flex gap-2 md:gap-3 items-center justify-center px-8 py-4 md:px-10 md:py-5 lg:px-10 lg:py-5 rounded-xl md:rounded-2xl w-full sm:w-auto"
          >
            <span className="font-bold text-lg md:text-xl lg:text-xl text-black whitespace-pre">
              깃허브 계정 연동하기
            </span>
          </button>
        </section>
      </main>
    </div>
  );
}
