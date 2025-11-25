export function IconCheckCircle({ size = 48 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="24" cy="24" r="24" fill="#bbfb4c" />
      <path
        d="M16 24L22 30L32 18"
        stroke="#1d1b20"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IconUser({ size = 48 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="24" cy="24" r="24" fill="#bbfb4c" />
      <circle cx="24" cy="18" r="6" fill="#1d1b20" />
      <path
        d="M12 36C12 30 16 26 24 26C32 26 36 30 36 36"
        stroke="#1d1b20"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

