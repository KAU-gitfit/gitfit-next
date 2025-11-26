import { LanguageBadge } from "./LanguageBadge";
import { ScoreCircle } from "./ScoreCircle";
import { CalendarIcon } from "./CalendarIcon";

interface ReportCardProps {
  title: string;
  language: string;
  date: string;
  score: number;
}

export function ReportCard({ title, language, date, score }: ReportCardProps) {
  return (
    <div className="bg-[#1f1f1f] border border-[#d9d9d9] rounded-3xl px-11 py-14 flex gap-28 items-center">
      <div className="flex-1 flex flex-col gap-6 items-start justify-center">
        <h3 className="font-bold text-5xl text-white leading-snug">{title}</h3>
        <div className="flex gap-14 items-center">
          <LanguageBadge language={language} />
          <div className="flex gap-3 items-center">
            <CalendarIcon />
            <span className="font-medium text-[#d9d9d9] text-3xl whitespace-nowrap">
              생성일자: {date}
            </span>
          </div>
        </div>
      </div>
      <ScoreCircle score={score} />
    </div>
  );
}
