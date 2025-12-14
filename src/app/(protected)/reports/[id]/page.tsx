"use client";

import { useParams } from "next/navigation";
import { useRef, useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { getReportDetail } from "@/lib/api/report";
import type { Report } from "@/lib/types/report";

// 점수 카드 컴포넌트
function ScoreCard({
  title,
  score,
  delayMs = 0,
}: {
  title: string;
  score: number;
  delayMs?: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [run, setRun] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          requestAnimationFrame(() => setRun(true));
          io.disconnect();
        }
      },
      {
        root: null,
        rootMargin: "-25% 0px -25% 0px",
        threshold: 0.25,
      }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  const clamped = Math.max(0, Math.min(100, score));

  return (
    <div
      ref={ref}
      className="bg-[#1f1f1f] border border-[#d9d9d9] rounded-xl p-4 md:p-6"
    >
      <div className="flex flex-col gap-3 md:gap-4">
        <p className="text-4xl md:text-5xl font-bold text-white">{score}</p>
        <p className="text-base md:text-lg font-bold text-[#d9d9d9]">
          {title}
        </p>

        {/* 진행 바 */}
        <div className="bg-[#313131] rounded-full h-2 overflow-hidden">
          <div
            className="bg-[#bbfb4c] h-full rounded-full"
            style={{
              width: run ? `${clamped}%` : "0%",
              transitionProperty: "width",
              transitionDuration: "900ms",
              transitionTimingFunction: "cubic-bezier(0.22, 0.61, 0.36, 1)",
              transitionDelay: `${delayMs}ms`,
              willChange: "width",
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default function ReportDetailPage() {
  const params = useParams();
  const reportId = params.id as string;
  const contentRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();
  const [report, setReport] = useState<Report | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getReportDetail(reportId)
      .then((data) => setReport(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [reportId]);

  const displayName = user?.displayName || user?.githubUsername || "개발자";

  const handleDownloadPDF = async () => {
    if (!contentRef.current || !report) return;

    try {
      const fillPageBg = () => {
        pdf.setFillColor(24, 24, 24); // #181818
        pdf.rect(0, 0, pdfWidth, pdfHeight, "F");
      };
      // 동적으로 html2canvas와 jsPDF import
      const html2canvas = (await import("html2canvas")).default;
      const { jsPDF } = await import("jspdf");

      const element = contentRef.current;

      // 화면 전체 리포트를 캡처
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#181818",
        allowTaint: true,
        logging: false,
        windowHeight: element.scrollHeight,
        windowWidth: element.scrollWidth,
        ignoreElements: (el) => el.classList?.contains("pdf-hide"),

        onclone: (doc) => {
          const score = doc.querySelector(
            "[data-score-center]"
          ) as HTMLElement | null;
          if (score) {
            score.style.transform = "translateY(-0.36em)"; // <- 여기만 조절
          }
        },
      });

      const imgData = canvas.toDataURL("image/png");

      // A4 사이즈 기준 PDF 생성
      const pdfWidth = 210; // A4 가로 (mm)
      const pdfHeight = 297; // A4 세로 (mm)

      const imgWidth = pdfWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      // 첫 번째 페이지 생성
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      let position = 0;

      // 첫 페이지에 이미지 추가
      fillPageBg();
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);

      let heightLeft = imgHeight - pdfHeight;

      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        fillPageBg();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pdfHeight;
      }

      // PDF 다운로드
      const filename = `${report.repoName}_리포트_${report.createdAt}.pdf`;
      pdf.save(filename);
    } catch (error) {
      console.error("PDF 생성 중 오류 발생:", error);
      alert("PDF 다운로드에 실패했습니다. 잠시 후 다시 시도해주세요.");
    }
  };

  if (!report) {
    return (
      <div className="bg-[#181818] min-h-screen pt-16 md:pt-18 lg:pt-20 xl:pt-20 px-4 md:px-8 lg:px-12 xl:px-16">
        <div className="flex items-center justify-center min-h-[400px]">
          <p className="text-white text-2xl font-bold">
            리포트를 찾을 수 없습니다.
          </p>
        </div>
      </div>
    );
  }

  return (
    <main className="bg-[#181818] min-h-screen pt-16 md:pt-18 lg:pt-20 xl:pt-20">
      <div ref={contentRef} className="pt-16 pb-12 max-w-7xl mx-auto">
        {/* 헤더 섹션 */}
        <div className="px-4 md:px-6 lg:px-8 mb-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 md:gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <h1 className="text-3xl md:text-4xl lg:text-4xl font-bold text-white">
                  개발자 리포트
                </h1>
                <button className="pdf-hide p-1.5 hover:bg-[#2a2a2a] rounded-lg transition-colors">
                  <svg
                    className="w-6 h-6 md:w-7 md:h-7 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                </button>
              </div>
              <p className="text-lg md:text-xl lg:text-2xl font-bold text-[#d9d9d9]">
                {displayName}님의 분석 결과
              </p>
            </div>

            {/* PDF 다운로드 버튼 */}
            <button
              onClick={handleDownloadPDF}
              className="pdf-hide bg-[#1f1f1f] border border-[#d9d9d9] rounded-xl px-4 md:px-5 py-2.5 md:py-3 hover:bg-[#252525] transition-colors flex items-center gap-2 w-fit"
            >
              <svg
                className="w-5 h-5 md:w-6 md:h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                />
              </svg>
              <span className="text-sm md:text-base font-semibold text-white">
                PDF 다운로드
              </span>
            </button>
          </div>
        </div>

        {/* 종합 점수 섹션 */}
        <div className="px-4 md:px-6 lg:px-8 mb-8">
          <div className="bg-[#1f1f1f] border border-[#d9d9d9] rounded-2xl p-6 md:p-8 lg:p-10">
            <div className="flex flex-col items-center gap-6 md:gap-8">
              {/* 종합 점수 원형 */}
              <div className="bg-[#4e6820] border-4 border-[#bbfb4c] rounded-full w-32 md:w-40 lg:w-48 h-32 md:h-40 lg:h-48 relative">
                <span
                  data-score-center
                  className="absolute inset-0 flex items-center justify-center text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-none"
                >
                  {report.overallScore}
                </span>
              </div>

              <h2 className="text-2xl md:text-3xl lg:text-3xl font-bold text-white text-center">
                종합 개발자 점수
              </h2>
            </div>
          </div>
        </div>

        {/* 세부 점수 카드 섹션 */}
        <div className="px-4 md:px-6 lg:px-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
            <ScoreCard title="구조" score={report.scores.structure} />
            <ScoreCard title="품질" score={report.scores.quality} />
            <ScoreCard title="테스트" score={report.scores.testing} />
            <ScoreCard title="문서화" score={report.scores.documentation} />
          </div>
        </div>

        {report.analysis && (
          <>
            {/* 인재 분석 섹션 */}
            <div className="px-4 md:px-6 lg:px-8 mb-8">
              <h2 className="text-2xl md:text-3xl lg:text-3xl font-bold text-white mb-5 md:mb-6">
                인재 분석
              </h2>
              <div className="flex flex-col gap-4 md:gap-5">
                {report.analysis.talent.map((card, idx) => (
                  <AnalysisCardComponent key={idx} card={card} />
                ))}
              </div>
            </div>

            {/* 강점 분석 섹션 */}
            <div className="px-4 md:px-6 lg:px-8 mb-8">
              <h2 className="text-2xl md:text-3xl lg:text-3xl font-bold text-white mb-5 md:mb-6">
                강점 분석
              </h2>
              <div className="flex flex-col gap-4 md:gap-5">
                {report.analysis.strengths.map((card, idx) => (
                  <AnalysisCardComponent key={idx} card={card} />
                ))}
              </div>
            </div>

            {/* 약점 분석 섹션 */}
            <div className="px-4 md:px-6 lg:px-8 mb-8">
              <h2 className="text-2xl md:text-3xl lg:text-3xl font-bold text-white mb-5 md:mb-6">
                약점 분석
              </h2>
              <div className="flex flex-col gap-4 md:gap-5">
                {report.analysis.weaknesses.map((card, idx) => (
                  <AnalysisCardComponent key={idx} card={card} />
                ))}
              </div>
            </div>

            {/* 위험 신호 감지 섹션 */}
            <div className="px-4 md:px-6 lg:px-8 mb-8">
              <h2 className="text-2xl md:text-3xl lg:text-3xl font-bold text-white mb-5 md:mb-6">
                위험 신호 감지
              </h2>
              <div className="flex flex-col gap-4 md:gap-5">
                {report.analysis.signals.map((card, idx) => (
                  <AnalysisCardComponent key={idx} card={card} />
                ))}
              </div>
            </div>

            {/* AI 추천 실천 가이드 섹션 */}
            <div className="px-4 md:px-6 lg:px-8 mb-8">
              <div className="bg-[#1f1f1f] border border-[#d9d9d9] rounded-2xl p-6 md:p-8 lg:p-10">
                <h2 className="text-2xl md:text-3xl lg:text-3xl font-bold text-white mb-5 md:mb-6">
                  AI 추천 실천 가이드
                </h2>
                <ol className="space-y-3 md:space-y-4">
                  {report.analysis.recommendations.map((recommendation, idx) => (
                    <li key={idx} className="flex items-start gap-3 md:gap-4">
                      <span className="text-lg md:text-xl lg:text-2xl font-bold text-[#bbfb4c] flex-shrink-0">
                        {idx + 1}.
                      </span>
                      <span className="text-base md:text-lg lg:text-xl font-bold text-white pt-0.5">
                        {recommendation}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </>
        )}
      </div>
    </main>
  );
}

// 분석 카드 컴포넌트
function AnalysisCardComponent({
  card,
}: {
  card: {
    title: string;
    description: string;
  };
}) {
  return (
    <div className="bg-[#1f1f1f] border border-[#d9d9d9] rounded-xl p-5 md:p-6">
      <div className="flex flex-col gap-3 md:gap-4">
        <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-white">
          {card.title}
        </h3>
        <p className="text-sm md:text-base lg:text-lg text-[#c9c9c9] leading-relaxed">
          {card.description}
        </p>
      </div>
    </div>
  );
}
