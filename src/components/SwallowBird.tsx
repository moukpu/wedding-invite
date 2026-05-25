export default function SwallowBird() {
  return (
    <svg viewBox="0 0 80 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Body */}
      <ellipse cx="40" cy="30" rx="12" ry="8" fill="#2d3436" opacity="0.8" />

      {/* Head */}
      <circle cx="52" cy="26" r="5" fill="#2d3436" opacity="0.8" />

      {/* Beak */}
      <polygon points="57,25 62,26 57,27" fill="#c9a96e" />

      {/* Left wing */}
      <path
        d="M35 28 Q15 10 5 15 Q12 22 28 30"
        fill="#3d4852"
        opacity="0.7"
      />

      {/* Right wing */}
      <path
        d="M35 32 Q15 50 5 45 Q12 38 28 32"
        fill="#3d4852"
        opacity="0.7"
      />

      {/* Tail */}
      <path
        d="M28 28 Q18 25 10 20"
        stroke="#2d3436"
        strokeWidth="2"
        fill="none"
        opacity="0.6"
      />
      <path
        d="M28 32 Q18 35 10 40"
        stroke="#2d3436"
        strokeWidth="2"
        fill="none"
        opacity="0.6"
      />

      {/* Eye */}
      <circle cx="54" cy="25" r="1" fill="white" />

      {/* White belly */}
      <ellipse cx="42" cy="33" rx="8" ry="4" fill="white" opacity="0.5" />
    </svg>
  );
}
