export default function CraneBird({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 180 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="craneWing" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#eceff1" />
          <stop offset="60%" stopColor="#cfd8dc" />
          <stop offset="100%" stopColor="#263238" />
        </linearGradient>
        <filter id="craneSoft">
          <feGaussianBlur stdDeviation="0.4" />
        </filter>
        <radialGradient id="craneBody" cx="50%" cy="40%" r="50%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="80%" stopColor="#f5f5f5" />
          <stop offset="100%" stopColor="#e0e0e0" />
        </radialGradient>
      </defs>

      {/* Body */}
      <ellipse cx="90" cy="120" rx="28" ry="35" fill="url(#craneBody)" opacity="0.95" />
      <ellipse cx="90" cy="120" rx="26" ry="33" fill="#ffffff" opacity="0.5" />

      {/* Left wing */}
      <path
        d="M62 110 C50 100 35 88 15 80 C20 90 30 100 45 108 C55 114 60 116 62 117"
        fill="url(#craneWing)" opacity="0.8"
      />
      <path
        d="M15 80 C10 78 5 78 2 80 C8 82 14 85 20 88"
        fill="#37474f" opacity="0.7"
      />
      {/* Wing feather details */}
      <path d="M15 80 C18 82 25 88 32 94" stroke="#90a4ae" strokeWidth="0.5" opacity="0.4" fill="none" />
      <path d="M22 82 C24 85 30 92 38 98" stroke="#90a4ae" strokeWidth="0.5" opacity="0.35" fill="none" />
      <path d="M30 84 C32 88 36 96 44 102" stroke="#90a4ae" strokeWidth="0.5" opacity="0.3" fill="none" />

      {/* Right wing */}
      <path
        d="M118 110 C130 100 145 88 165 80 C160 90 150 100 135 108 C125 114 120 116 118 117"
        fill="url(#craneWing)" opacity="0.8"
      />
      <path
        d="M165 80 C170 78 175 78 178 80 C172 82 166 85 160 88"
        fill="#37474f" opacity="0.7"
      />
      {/* Wing feather details */}
      <path d="M165 80 C162 82 155 88 148 94" stroke="#90a4ae" strokeWidth="0.5" opacity="0.4" fill="none" />
      <path d="M158 82 C156 85 150 92 142 98" stroke="#90a4ae" strokeWidth="0.5" opacity="0.35" fill="none" />

      {/* Black tail feathers */}
      <path
        d="M80 150 C75 160 68 172 55 185 C65 178 73 168 80 155"
        fill="#263238" opacity="0.75"
      />
      <path
        d="M85 152 C82 162 78 174 70 190 C75 180 80 170 85 158"
        fill="#37474f" opacity="0.65"
      />
      <path
        d="M100 150 C105 160 112 172 125 185 C115 178 107 168 100 155"
        fill="#263238" opacity="0.75"
      />
      <path
        d="M95 152 C98 162 102 174 110 190 C105 180 100 170 95 158"
        fill="#37474f" opacity="0.65"
      />

      {/* Neck */}
      <path
        d="M88 88 C86 75 84 60 82 48 C80 36 78 25 78 18"
        stroke="#f5f5f5" strokeWidth="6" fill="none" opacity="0.9"
        strokeLinecap="round"
      />
      <path
        d="M88 88 C86 75 84 60 82 48 C80 36 78 25 78 18"
        stroke="#ffffff" strokeWidth="4" fill="none" opacity="0.6"
        strokeLinecap="round"
      />

      {/* Black neck stripe */}
      <path
        d="M85 70 C84 62 83 55 82 48"
        stroke="#263238" strokeWidth="2" fill="none" opacity="0.3"
        strokeLinecap="round"
      />

      {/* Head */}
      <ellipse cx="78" cy="16" rx="7" ry="8" fill="#f5f5f5" opacity="0.95" />

      {/* Red crown */}
      <ellipse cx="78" cy="11" rx="4" ry="3" fill="#c62828" opacity="0.85" />
      <ellipse cx="78" cy="11" rx="3" ry="2" fill="#e53935" opacity="0.5" />

      {/* Eye */}
      <circle cx="75" cy="15" r="1.2" fill="#263238" opacity="0.9" />
      <circle cx="75.3" cy="14.7" r="0.3" fill="#ffffff" opacity="0.7" />

      {/* Beak */}
      <path d="M72 16 L62 18 L72 19" fill="#37474f" opacity="0.8" />
      <path d="M72 17 L64 18" stroke="#546e7a" strokeWidth="0.5" opacity="0.5" fill="none" />

      {/* Legs */}
      <path d="M82 152 L78 195 L72 200" stroke="#546e7a" strokeWidth="1.5" fill="none" opacity="0.6" strokeLinecap="round" />
      <path d="M98 152 L100 195 L106 200" stroke="#546e7a" strokeWidth="1.5" fill="none" opacity="0.6" strokeLinecap="round" />
      {/* Feet */}
      <path d="M72 200 L68 203 M72 200 L72 204 M72 200 L76 203" stroke="#546e7a" strokeWidth="0.8" opacity="0.5" fill="none" />
      <path d="M106 200 L102 203 M106 200 L106 204 M106 200 L110 203" stroke="#546e7a" strokeWidth="0.8" opacity="0.5" fill="none" />

      {/* Red markings on wings */}
      <ellipse cx="75" cy="125" rx="4" ry="6" fill="#c62828" opacity="0.2" />
      <ellipse cx="105" cy="125" rx="4" ry="6" fill="#c62828" opacity="0.2" />
    </svg>
  );
}
