export default function SakuraBranch({ flip = false }: { flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 300 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ transform: flip ? "scaleX(-1)" : undefined }}
    >
      <defs>
        <filter id="watercolor" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="4" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" xChannelSelector="R" yChannelSelector="G" />
        </filter>
        <filter id="softBlur">
          <feGaussianBlur stdDeviation="0.5" />
        </filter>
        <radialGradient id="blossomPink1" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fce4ec" stopOpacity="0.9" />
          <stop offset="40%" stopColor="#f8bbd0" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#f48fb1" stopOpacity="0.3" />
        </radialGradient>
        <radialGradient id="blossomPink2" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fff0f3" stopOpacity="0.95" />
          <stop offset="50%" stopColor="#ffcdd2" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#ef9a9a" stopOpacity="0.2" />
        </radialGradient>
        <radialGradient id="blossomWhite" cx="40%" cy="40%" r="55%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
          <stop offset="50%" stopColor="#fce4ec" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#f8bbd0" stopOpacity="0.15" />
        </radialGradient>
        <linearGradient id="branchGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#5d4037" />
          <stop offset="50%" stopColor="#795548" />
          <stop offset="100%" stopColor="#6d4c41" />
        </linearGradient>
      </defs>

      {/* Main branch - thick, organic */}
      <path
        d="M270 0 C260 30 250 50 240 70 C225 100 210 120 195 145 C180 170 165 190 148 215 C130 240 115 260 100 280 C90 295 80 310 70 330 C65 345 58 360 52 380 C50 390 48 395 46 400"
        stroke="url(#branchGrad)" strokeWidth="4" fill="none" opacity="0.85"
        strokeLinecap="round" filter="url(#watercolor)"
      />
      <path
        d="M270 0 C258 35 248 55 238 75 C222 105 208 125 193 148 C177 173 163 193 146 218 C128 243 113 263 98 283 C88 298 78 313 68 333 C62 348 56 363 50 383"
        stroke="#8d6e63" strokeWidth="1.5" fill="none" opacity="0.3"
        strokeLinecap="round"
      />

      {/* Sub-branches */}
      <path d="M240 70 C225 55 210 48 190 42" stroke="url(#branchGrad)" strokeWidth="2.5" fill="none" opacity="0.7" strokeLinecap="round" filter="url(#watercolor)" />
      <path d="M210 120 C230 110 245 108 260 112" stroke="url(#branchGrad)" strokeWidth="2" fill="none" opacity="0.65" strokeLinecap="round" filter="url(#watercolor)" />
      <path d="M175 175 C155 165 140 158 120 155" stroke="url(#branchGrad)" strokeWidth="2" fill="none" opacity="0.6" strokeLinecap="round" filter="url(#watercolor)" />
      <path d="M130 245 C145 235 160 232 175 238" stroke="url(#branchGrad)" strokeWidth="1.8" fill="none" opacity="0.55" strokeLinecap="round" />
      <path d="M85 305 C70 295 55 288 38 285" stroke="url(#branchGrad)" strokeWidth="1.5" fill="none" opacity="0.5" strokeLinecap="round" />

      {/* Twigs */}
      <path d="M195 42 C185 35 178 28 170 22" stroke="#8d6e63" strokeWidth="1" fill="none" opacity="0.4" strokeLinecap="round" />
      <path d="M260 112 C268 118 272 125 270 135" stroke="#8d6e63" strokeWidth="1" fill="none" opacity="0.4" strokeLinecap="round" />
      <path d="M120 155 C112 148 108 140 105 130" stroke="#8d6e63" strokeWidth="1" fill="none" opacity="0.35" strokeLinecap="round" />

      {/* Blossoms - detailed 5-petal flowers */}
      {[
        { cx: 250, cy: 45, r: 10, grad: "blossomPink1" },
        { cx: 195, cy: 40, r: 12, grad: "blossomPink2" },
        { cx: 170, cy: 22, r: 8, grad: "blossomWhite" },
        { cx: 235, cy: 82, r: 9, grad: "blossomPink1" },
        { cx: 215, cy: 110, r: 11, grad: "blossomPink2" },
        { cx: 255, cy: 110, r: 8, grad: "blossomWhite" },
        { cx: 270, cy: 130, r: 10, grad: "blossomPink1" },
        { cx: 180, cy: 160, r: 12, grad: "blossomPink2" },
        { cx: 155, cy: 170, r: 9, grad: "blossomWhite" },
        { cx: 125, cy: 152, r: 11, grad: "blossomPink1" },
        { cx: 108, cy: 130, r: 8, grad: "blossomPink2" },
        { cx: 140, cy: 230, r: 10, grad: "blossomWhite" },
        { cx: 170, cy: 238, r: 8, grad: "blossomPink1" },
        { cx: 95, cy: 280, r: 11, grad: "blossomPink2" },
        { cx: 72, cy: 300, r: 9, grad: "blossomWhite" },
        { cx: 42, cy: 282, r: 8, grad: "blossomPink1" },
        { cx: 55, cy: 350, r: 10, grad: "blossomPink2" },
        { cx: 60, cy: 375, r: 7, grad: "blossomWhite" },
      ].map((b, i) => (
        <g key={i} filter="url(#softBlur)">
          {[0, 72, 144, 216, 288].map((angle) => (
            <ellipse
              key={angle}
              cx={b.cx}
              cy={b.cy}
              rx={b.r}
              ry={b.r * 0.5}
              fill={`url(#${b.grad})`}
              transform={`rotate(${angle} ${b.cx} ${b.cy})`}
            />
          ))}
          {/* Stamen center */}
          <circle cx={b.cx} cy={b.cy} r={b.r * 0.2} fill="#d4a574" opacity="0.7" />
          {/* Stamen dots */}
          {[0, 60, 120, 180, 240, 300].map((a) => {
            const rad = (a * Math.PI) / 180;
            const dx = Math.cos(rad) * b.r * 0.35;
            const dy = Math.sin(rad) * b.r * 0.35;
            return (
              <circle
                key={`s-${a}`}
                cx={b.cx + dx}
                cy={b.cy + dy}
                r={0.8}
                fill="#c9a96e"
                opacity="0.6"
              />
            );
          })}
        </g>
      ))}

      {/* Buds */}
      {[
        { x: 185, y: 32, rot: -30 },
        { x: 245, y: 95, rot: 20 },
        { x: 160, y: 180, rot: -15 },
        { x: 115, y: 270, rot: 25 },
        { x: 48, y: 295, rot: -10 },
        { x: 38, y: 365, rot: 15 },
      ].map((bud, i) => (
        <g key={`bud-${i}`} transform={`translate(${bud.x},${bud.y}) rotate(${bud.rot})`}>
          <ellipse cx="0" cy="0" rx="3" ry="5" fill="#f48fb1" opacity="0.6" />
          <ellipse cx="-1" cy="-1" rx="2" ry="4" fill="#fce4ec" opacity="0.5" />
          <path d="M0 5 L0 12" stroke="#6d4c41" strokeWidth="0.8" opacity="0.4" />
        </g>
      ))}

      {/* Loose petals */}
      {[
        { x: 280, y: 60, rot: 35, op: 0.5 },
        { x: 150, y: 95, rot: 70, op: 0.4 },
        { x: 90, y: 200, rot: 45, op: 0.45 },
        { x: 180, y: 265, rot: 80, op: 0.35 },
        { x: 30, y: 330, rot: 55, op: 0.4 },
        { x: 75, y: 390, rot: 25, op: 0.3 },
      ].map((p, i) => (
        <ellipse
          key={`loose-${i}`}
          cx={p.x} cy={p.y}
          rx={5} ry={2.5}
          fill="url(#blossomPink2)"
          opacity={p.op}
          transform={`rotate(${p.rot} ${p.x} ${p.y})`}
          filter="url(#softBlur)"
        />
      ))}
    </svg>
  );
}
