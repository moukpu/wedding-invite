export default function SakuraBranch({ flip = false }: { flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 200 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ transform: flip ? "scaleX(-1)" : undefined }}
    >
      {/* Branch */}
      <path
        d="M180 0 Q160 60 130 100 Q100 140 80 180 Q60 220 50 260 Q45 280 40 300"
        stroke="#8B7355"
        strokeWidth="2"
        fill="none"
        opacity="0.6"
      />
      <path
        d="M130 100 Q110 90 90 85"
        stroke="#8B7355"
        strokeWidth="1.5"
        fill="none"
        opacity="0.5"
      />
      <path
        d="M100 150 Q120 140 140 145"
        stroke="#8B7355"
        strokeWidth="1.5"
        fill="none"
        opacity="0.5"
      />
      <path
        d="M70 200 Q50 190 35 185"
        stroke="#8B7355"
        strokeWidth="1.2"
        fill="none"
        opacity="0.4"
      />

      {/* Blossoms */}
      {[
        { cx: 160, cy: 40, r: 6 },
        { cx: 145, cy: 65, r: 5 },
        { cx: 125, cy: 95, r: 7 },
        { cx: 95, cy: 82, r: 5 },
        { cx: 110, cy: 120, r: 6 },
        { cx: 135, cy: 142, r: 5 },
        { cx: 85, cy: 170, r: 7 },
        { cx: 70, cy: 195, r: 5 },
        { cx: 40, cy: 182, r: 4 },
        { cx: 55, cy: 240, r: 6 },
        { cx: 65, cy: 210, r: 4 },
      ].map((b, i) => (
        <g key={i}>
          {[0, 72, 144, 216, 288].map((angle) => (
            <ellipse
              key={angle}
              cx={b.cx}
              cy={b.cy}
              rx={b.r}
              ry={b.r * 0.45}
              fill={i % 3 === 0 ? "#ffcdd2" : i % 3 === 1 ? "#f8bbd0" : "#fce4ec"}
              opacity={0.7}
              transform={`rotate(${angle} ${b.cx} ${b.cy})`}
            />
          ))}
          <circle cx={b.cx} cy={b.cy} r={b.r * 0.25} fill="#e8a0a0" opacity="0.8" />
        </g>
      ))}

      {/* Falling petals */}
      {[
        { x: 170, y: 55, rot: 30 },
        { x: 100, y: 130, rot: 60 },
        { x: 30, y: 220, rot: 45 },
        { x: 75, y: 260, rot: 75 },
      ].map((p, i) => (
        <ellipse
          key={`petal-${i}`}
          cx={p.x}
          cy={p.y}
          rx={4}
          ry={2}
          fill="#ffb7c5"
          opacity={0.5}
          transform={`rotate(${p.rot} ${p.x} ${p.y})`}
        />
      ))}
    </svg>
  );
}
