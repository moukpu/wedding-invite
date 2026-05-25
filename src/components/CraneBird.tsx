export default function CraneBird({ flip = false }: { flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 100 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ transform: flip ? "scaleX(-1)" : undefined }}
    >
      {/* Body */}
      <ellipse cx="50" cy="60" rx="18" ry="22" fill="#f5f0e8" opacity="0.9" />

      {/* Wing */}
      <path
        d="M35 55 Q20 40 15 30 Q18 35 25 42 Q30 48 35 55"
        fill="#2d3436"
        opacity="0.5"
      />
      <path
        d="M35 60 Q22 50 12 42 Q20 52 35 60"
        fill="#3d4852"
        opacity="0.4"
      />

      {/* Neck */}
      <path
        d="M60 45 Q65 30 68 18 Q70 12 72 8"
        stroke="#f5f0e8"
        strokeWidth="5"
        fill="none"
        strokeLinecap="round"
      />

      {/* Head */}
      <circle cx="72" cy="8" r="5" fill="#f5f0e8" />

      {/* Red crown */}
      <circle cx="72" cy="5" r="3" fill="#e53935" opacity="0.7" />

      {/* Beak */}
      <polygon points="77,7 85,8 77,9" fill="#5c6b5e" />

      {/* Eye */}
      <circle cx="74" cy="7" r="1" fill="#2d3436" />

      {/* Legs */}
      <line x1="45" y1="80" x2="42" y2="110" stroke="#5c6b5e" strokeWidth="1.5" />
      <line x1="55" y1="80" x2="52" y2="110" stroke="#5c6b5e" strokeWidth="1.5" />

      {/* Feet */}
      <path d="M42 110 L38 114 M42 110 L45 114 M42 110 L42 115" stroke="#5c6b5e" strokeWidth="1" />
      <path d="M52 110 L48 114 M52 110 L55 114 M52 110 L52 115" stroke="#5c6b5e" strokeWidth="1" />

      {/* Tail feathers */}
      <path
        d="M32 65 Q20 70 15 80"
        stroke="#2d3436"
        strokeWidth="1.5"
        fill="none"
        opacity="0.4"
      />
      <path
        d="M30 62 Q18 65 10 72"
        stroke="#2d3436"
        strokeWidth="1.5"
        fill="none"
        opacity="0.3"
      />
    </svg>
  );
}
