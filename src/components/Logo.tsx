const img = "/logo.png";

export default function Logo({ className }: { className?: string }) {
  return (
    <div className={className}>
      <img alt="Git-Fit Logo" className="block max-w-none size-full" height="52" src={img} width="52" />
    </div>
  );
}

