interface ScoreCircleProps {
  score: number;
}

export function ScoreCircle({ score }: ScoreCircleProps) {
  return (
    <div className="bg-[#4e6820] border border-[#bbfb4c] rounded-full w-28 h-28 flex items-center justify-center flex-shrink-0">
      <span className="font-bold text-white text-5xl">{score}</span>
    </div>
  );
}
