export default function SwallowBird({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="swallowBody" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1a237e" />
          <stop offset="50%" stopColor="#283593" />
          <stop offset="100%" stopColor="#0d1b3e" />
        </linearGradient>
        <filter id="swallowSoft">
          <feGaussianBlur stdDeviation="0.3" />
        </filter>
      </defs>

      {/* Left wing */}
      <path
        d="M60 30 C50 22 35 12 8 3 C12 8 20 16 35 22 C45 26 52 28 58 29"
        fill="url(#swallowBody)" opacity="0.85"
      />
      <path
        d="M8 3 C5 2 2 1 0 1 C3 4 8 7 15 11"
        fill="#1a237e" opacity="0.6"
      />

      {/* Right wing */}
      <path
        d="M60 30 C70 22 85 12 112 3 C108 8 100 16 85 22 C75 26 68 28 62 29"
        fill="url(#swallowBody)" opacity="0.85"
      />
      <path
        d="M112 3 C115 2 118 1 120 1 C117 4 112 7 105 11"
        fill="#1a237e" opacity="0.6"
      />

      {/* Wing highlights */}
      <path
        d="M60 29 C50 24 38 17 18 8 C20 10 30 18 42 24 C50 27 55 28 58 29"
        fill="#3949ab" opacity="0.3"
      />
      <path
        d="M60 29 C70 24 82 17 102 8 C100 10 90 18 78 24 C70 27 65 28 62 29"
        fill="#3949ab" opacity="0.3"
      />

      {/* Body */}
      <ellipse cx="60" cy="31" rx="10" ry="6" fill="url(#swallowBody)" opacity="0.9" />

      {/* White belly */}
      <ellipse cx="60" cy="33" rx="5" ry="3" fill="#eceff1" opacity="0.7" />

      {/* Red-orange throat */}
      <ellipse cx="60" cy="28" rx="3.5" ry="2.5" fill="#bf360c" opacity="0.6" />

      {/* Head */}
      <circle cx="60" cy="26" r="4" fill="#0d1b3e" opacity="0.9" />
      {/* Eye */}
      <circle cx="58.5" cy="25.5" r="0.6" fill="#ffffff" opacity="0.8" />
      {/* Beak */}
      <path d="M56 25.5 L54 26 L56 26.5" fill="#37474f" opacity="0.8" />

      {/* Forked tail */}
      <path
        d="M60 37 C58 42 55 50 50 58 C54 52 57 45 60 40"
        fill="#1a237e" opacity="0.7"
      />
      <path
        d="M60 37 C62 42 65 50 70 58 C66 52 63 45 60 40"
        fill="#1a237e" opacity="0.7"
      />
      {/* Tail center */}
      <path
        d="M59 37 L60 45 L61 37"
        fill="#283593" opacity="0.5"
      />
    </svg>
  );
}
