"use client";

//import { useRouter, useParams } from "next/navigation";
import { useParams } from "next/navigation";
//import Link from "next/link";
import { mockDeveloperReports } from "@/mock/devReports";
import { useRef, useEffect, useState } from "react";
import { useDeveloperName } from "@/app/context/DeveloperNameContext";

export default function ReportDetailPage() {
  //  const router = useRouter();
  const params = useParams();
  const reportId = params.id as string;
  const contentRef = useRef<HTMLDivElement>(null);
  const { developerName } = useDeveloperName();
  const [displayName, setDisplayName] = useState("");

  // mock 데이터에서 해당 id의 리포트 찾기
  const report = mockDeveloperReports.find((r) => r.id === reportId);

  // developerName이 변경되면 displayName 업데이트
  useEffect(() => {
    setDisplayName(developerName);
  }, [developerName]);

  const handleDownloadPDF = async () => {
    if (!contentRef.current || !report) return;

    try {
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
        // 전체 요소의 실제 높이를 기반으로 캡처
        windowHeight: element.scrollHeight,
        windowWidth: element.scrollWidth,
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
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);

      // 남은 부분을 여러 페이지에 나누어 추가
      let heightLeft = imgHeight - pdfHeight;

      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
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
      <div ref={contentRef}>
        {/* 헤더 섹션 */}
        <div className="px-4 md:px-8 lg:px-12 xl:px-16 py-8 md:py-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-6">
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white">
                  개발자 리포트
                </h1>
                <button className="p-2 hover:bg-[#2a2a2a] rounded-lg transition-colors">
                  <svg
                    className="w-8 h-8 md:w-10 md:h-10 text-white"
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
              <p className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#d9d9d9]">
                {displayName}님의 분석 결과
              </p>
            </div>

            {/* PDF 다운로드 버튼 */}
            <button
              onClick={handleDownloadPDF}
              className="bg-[#1f1f1f] border border-[#d9d9d9] rounded-xl px-6 md:px-8 py-4 md:py-5 hover:bg-[#252525] transition-colors flex items-center gap-3 w-fit"
            >
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
                  d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                />
              </svg>
              <span className="text-lg md:text-xl font-semibold text-white">
                PDF 다운로드
              </span>
            </button>
          </div>
        </div>

        {/* 종합 점수 섹션 */}
        <div className="px-4 md:px-8 lg:px-12 xl:px-16 py-8 md:py-10">
          <div className="bg-[#1f1f1f] border border-[#d9d9d9] rounded-2xl p-8 md:p-12 lg:p-16">
            <div className="flex flex-col items-center gap-8 md:gap-12">
              {/* 종합 점수 원형 */}
              <div className="bg-[#4e6820] border-4 md:border-5 border-[#bbfb4c] rounded-full w-48 md:w-56 lg:w-64 h-48 md:h-56 lg:h-64 flex items-center justify-center">
                <p className="text-7xl md:text-8xl lg:text-9xl font-bold text-white">
                  {report.overallScore}
                </p>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center">
                종합 개발자 점수
              </h2>
            </div>
          </div>
        </div>

        {/* 세부 점수 카드 섹션 */}
        <div className="px-4 md:px-8 lg:px-12 xl:px-16 py-8 md:py-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {/* 코드 품질 */}
            <ScoreCard title="코드 품질" score={report.scores.codeQuality} />
            {/* 협업 */}
            <ScoreCard title="협업" score={report.scores.collaboration} />
            {/* 꾸준함 */}
            <ScoreCard title="꾸준함" score={report.scores.consistency} />
            {/* 성장 */}
            <ScoreCard title="성장" score={report.scores.growth} />
          </div>
        </div>

        {/* 인재 분석 섹션 */}
        <div className="px-4 md:px-8 lg:px-12 xl:px-16 py-8 md:py-10">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8 md:mb-10">
            인재 분석
          </h2>
          <div className="flex flex-col gap-6 md:gap-8">
            {report.analysis.talent.map((card, idx) => (
              <AnalysisCardComponent key={idx} card={card} />
            ))}
          </div>
        </div>

        {/* 강점 분석 섹션 */}
        <div className="px-4 md:px-8 lg:px-12 xl:px-16 py-8 md:py-10">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8 md:mb-10">
            강점 분석
          </h2>
          <div className="flex flex-col gap-6 md:gap-8">
            {report.analysis.strengths.map((card, idx) => (
              <AnalysisCardComponent key={idx} card={card} />
            ))}
          </div>
        </div>

        {/* 약점 분석 섹션 */}
        <div className="px-4 md:px-8 lg:px-12 xl:px-16 py-8 md:py-10">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8 md:mb-10">
            약점 분석
          </h2>
          <div className="flex flex-col gap-6 md:gap-8">
            {report.analysis.weaknesses.map((card, idx) => (
              <AnalysisCardComponent key={idx} card={card} />
            ))}
          </div>
        </div>

        {/* 위험 신호 감지 섹션 */}
        <div className="px-4 md:px-8 lg:px-12 xl:px-16 py-8 md:py-10">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8 md:mb-10">
            위험 신호 감지
          </h2>
          <div className="flex flex-col gap-6 md:gap-8">
            {report.analysis.signals.map((card, idx) => (
              <AnalysisCardComponent key={idx} card={card} />
            ))}
          </div>
        </div>

        {/* AI 추천 실천 가이드 섹션 */}
        <div className="px-4 md:px-8 lg:px-12 xl:px-16 py-8 md:py-10">
          <div className="bg-[#1f1f1f] border border-[#d9d9d9] rounded-2xl p-8 md:p-12 lg:p-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8 md:mb-10">
              AI 추천 실천 가이드
            </h2>
            <ol className="space-y-4 md:space-y-6 lg:space-y-8">
              {report.analysis.recommendations.map((recommendation, idx) => (
                <li key={idx} className="flex items-start gap-4 md:gap-6">
                  <span className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#bbfb4c] flex-shrink-0">
                    {idx + 1}.
                  </span>
                  <span className="text-xl md:text-2xl lg:text-3xl font-bold text-white pt-1">
                    {recommendation}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
      {/* 하단 여백 */}
      <div className="h-12 md:h-16" />
    </main>
  );
}

// 점수 카드 컴포넌트
function ScoreCard({ title, score }: { title: string; score: number }) {
  const progressPercentage = (score / 100) * 100;

  return (
    <div className="bg-[#1f1f1f] border border-[#d9d9d9] rounded-xl p-6 md:p-8">
      <div className="flex flex-col gap-4 md:gap-5">
        <p className="text-6xl md:text-7xl font-bold text-white">{score}</p>
        <p className="text-lg md:text-xl lg:text-2xl font-bold text-[#d9d9d9]">
          {title}
        </p>
        {/* 진행 바 */}
        <div className="bg-[#313131] rounded-full h-2 md:h-3 overflow-hidden">
          <div
            className="bg-[#bbfb4c] h-full rounded-full transition-all"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>
    </div>
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
    <div className="bg-[#1f1f1f] border border-[#d9d9d9] rounded-xl p-8 md:p-10 lg:p-12">
      <div className="flex flex-col gap-4 md:gap-5 lg:gap-6">
        <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white">
          {card.title}
        </h3>
        <p className="text-lg md:text-xl lg:text-2xl text-[#c9c9c9] leading-relaxed">
          {card.description}
        </p>
      </div>
    </div>
  );
}
