export default function MountainSilhouette() {
  return (
    <svg
      viewBox="0 0 430 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full"
      preserveAspectRatio="xMidYMax meet"
    >
      <defs>
        <linearGradient id="mtnFar" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#b0bec5" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#cfd8dc" stopOpacity="0.05" />
        </linearGradient>
        <linearGradient id="mtnMid" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#90a4ae" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#b0bec5" stopOpacity="0.08" />
        </linearGradient>
        <linearGradient id="mtnNear" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#78909c" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#90a4ae" stopOpacity="0.04" />
        </linearGradient>
        <filter id="mtnBlur">
          <feGaussianBlur stdDeviation="1.5" />
        </filter>
      </defs>

      {/* Far mountains */}
      <path
        d="M0 120 L0 80 C20 75 40 60 70 45 C90 35 110 40 140 50 C160 55 180 42 210 30 C230 22 250 28 280 40 C310 52 330 48 360 38 C380 32 400 45 430 55 L430 120 Z"
        fill="url(#mtnFar)" filter="url(#mtnBlur)"
      />

      {/* Mid mountains */}
      <path
        d="M0 120 L0 90 C30 82 50 70 80 58 C100 50 120 55 150 65 C175 72 195 58 220 48 C245 40 265 50 290 60 C315 68 340 55 370 50 C395 46 415 58 430 68 L430 120 Z"
        fill="url(#mtnMid)" filter="url(#mtnBlur)"
      />

      {/* Near mountains */}
      <path
        d="M0 120 L0 95 C40 88 70 78 100 72 C130 67 155 75 185 82 C210 88 235 75 260 68 C290 62 310 72 340 80 C365 86 390 78 430 82 L430 120 Z"
        fill="url(#mtnNear)"
      />
    </svg>
  );
}
