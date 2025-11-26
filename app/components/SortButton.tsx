interface SortButtonProps {
  label?: string;
  onClick?: () => void;
}

export function SortButton({ label = "최신순 ▼", onClick }: SortButtonProps) {
  return (
    <button
      onClick={onClick}
      className="bg-[#1f1f1f] border border-[#d9d9d9] rounded-3xl px-12 py-7 font-medium text-4xl text-white hover:bg-[#2a2a2a] transition-colors whitespace-nowrap"
    >
      {label}
    </button>
  );
}
