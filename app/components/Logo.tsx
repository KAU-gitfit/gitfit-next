const img = "http://localhost:3845/assets/d931e8fd7de66946336f1565ae5583c64ff39b10.png";

export default function Logo({ className }: { className?: string }) {
  return (
    <div className={className}>
      <img alt="Git-Fit Logo" className="block max-w-none size-full" height="52" src={img} width="52" />
    </div>
  );
}

