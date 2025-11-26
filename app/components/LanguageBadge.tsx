interface LanguageBadgeProps {
  language: string;
}

export function LanguageBadge({ language }: LanguageBadgeProps) {
  return (
    <div className="bg-[#4e6820] border border-[#bbfb4c] rounded-2xl px-8 py-1 inline-flex items-center justify-center whitespace-nowrap">
      <span className="font-bold text-[#bbfb4c] text-3xl">{language}</span>
    </div>
  );
}
