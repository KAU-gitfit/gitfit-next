export default function LoadingSpinner({ message = "로딩 중..." }: { message?: string }) {
  return (
    <div className="bg-[#181818] min-h-screen w-full flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-[#bbfb4c] border-t-transparent rounded-full animate-spin"></div>
        <p className="text-white text-xl">{message}</p>
      </div>
    </div>
  );
}
