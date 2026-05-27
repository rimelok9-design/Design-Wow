export function LogoIcon({ size = 36 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="DevBenin logo"
    >
      {/* ── Green arc: top-circle to bottom-left, passing right ── */}
      <path
        d="M 50 16
           C 72 22, 82 42, 74 60
           C 67 74, 52 80, 38 78"
        stroke="#008751"
        strokeWidth="15"
        strokeLinecap="round"
        fill="none"
      />
      {/* ── Yellow arc: bottom-left to bottom-right, passing top ── */}
      <path
        d="M 38 78
           C 24 76, 14 64, 18 50
           C 22 38, 36 28, 50 16"
        stroke="#FCD116"
        strokeWidth="15"
        strokeLinecap="round"
        fill="none"
      />
      {/* ── Red arc: bottom-right to top, passing bottom-left ── */}
      <path
        d="M 74 60
           C 82 70, 76 84, 62 86
           C 50 88, 38 80, 38 78"
        stroke="#E8112D"
        strokeWidth="15"
        strokeLinecap="round"
        fill="none"
      />

      {/* ── Head circles (white) ── */}
      <circle cx="50" cy="14" r="10" fill="white" stroke="#008751" strokeWidth="2" />
      <circle cx="34" cy="79" r="10" fill="white" stroke="#FCD116" strokeWidth="2" />
      <circle cx="68" cy="65" r="10" fill="white" stroke="#E8112D" strokeWidth="2" />
    </svg>
  );
}
