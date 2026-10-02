import ArtDefs from './defs';

/**
 * Isometric trust network: one credential at the centre, extruded
 * sector nodes on an isometric plane, animated data flowing along the
 * connections. Used on the ecosystem / partners / government pages.
 */
export default function NetworkArt({ className = '' }) {
  const p = 'net';

  // Isometric node positions with sector glyphs.
  const nodes = [
    { x: 200, y: 92, label: 'Banking' },
    { x: 322, y: 158, label: 'Government' },
    { x: 322, y: 268, label: 'Telecom' },
    { x: 200, y: 334, label: 'Healthcare' },
    { x: 78, y: 268, label: 'Insurance' },
    { x: 78, y: 158, label: 'Fintech' },
  ];

  return (
    <svg
      viewBox="0 0 400 420"
      className={`w-full h-full ${className}`}
      role="img"
      aria-label="Isometric network diagram showing one TrueID credential connected to banking, government, telecom, healthcare, insurance, and fintech sectors"
    >
      <ArtDefs p={p} />

      <ellipse cx="200" cy="213" rx="170" ry="150" fill={`url(#${p}-glow)`} opacity="0.4" />

      {/* isometric ground grid */}
      <g opacity="0.16" stroke="rgba(255,255,255,0.45)" strokeWidth="0.9" fill="none">
        {[0, 1, 2, 3, 4, 5, 6].map((i) => (
          <line key={`a${i}`} x1={40 + i * 53} y1="120" x2={40 + i * 53 - 60} y2="330" />
        ))}
        {[0, 1, 2, 3, 4, 5, 6].map((i) => (
          <line key={`b${i}`} x1={40 + i * 53 - 60} y1="120" x2={40 + i * 53} y2="330" />
        ))}
      </g>

      {/* connection paths with flowing dashes */}
      <g fill="none">
        {nodes.map((n, i) => (
          <g key={n.label}>
            <path
              d={`M200 213 L${n.x} ${n.y}`}
              stroke="rgba(255,255,255,0.14)"
              strokeWidth="6"
              strokeLinecap="round"
            />
            <path
              className="dash-flow"
              d={`M200 213 L${n.x} ${n.y}`}
              stroke="#42A5F5"
              strokeWidth="2"
              strokeLinecap="round"
              opacity="0.85"
              style={{ animationDelay: `${i * 0.18}s` }}
            />
          </g>
        ))}
      </g>

      {/* sector nodes — extruded hexagonal pads */}
      {nodes.map((n, i) => (
        <g key={`node-${n.label}`} className={i % 2 ? 'float-slower' : 'float-slow'}>
          {/* contact shadow */}
          <ellipse cx={n.x} cy={n.y + 30} rx="30" ry="9" fill={`url(#${p}-shadow)`} />
          {/* side wall */}
          <path
            d={`M${n.x - 30} ${n.y} l30 -17 30 17 v14 l-30 17 -30 -17 Z`}
            fill={`url(#${p}-faceSide)`}
          />
          {/* top face */}
          <path
            d={`M${n.x - 30} ${n.y} l30 -17 30 17 -30 17 Z`}
            fill={`url(#${p}-faceTop)`}
            stroke="rgba(255,255,255,0.28)"
            strokeWidth="1.3"
          />
          {/* glyph plate */}
          <circle
            cx={n.x}
            cy={n.y - 1}
            r="10"
            fill="rgba(66,165,245,0.22)"
            stroke="rgba(66,165,245,0.6)"
            strokeWidth="1.2"
          />
          <circle cx={n.x} cy={n.y - 1} r="3.4" fill="#42A5F5" className="pulse-soft" />
          <text
            x={n.x}
            y={n.y + 42}
            textAnchor="middle"
            fill="rgba(255,255,255,0.55)"
            fontSize="11"
            fontWeight="600"
            fontFamily="Inter, system-ui, sans-serif"
          >
            {n.label}
          </text>
        </g>
      ))}

      {/* ---- centre credential, extruded ---- */}
      <g className="float-slow">
        <ellipse cx="200" cy="262" rx="52" ry="14" fill={`url(#${p}-shadow)`} />
        {/* extrusion wall */}
        <path
          d="M150 213 l50 -29 50 29 v22 l-50 29 -50 -29 Z"
          fill={`url(#${p}-faceSide)`}
        />
        {/* top face */}
        <path
          d="M150 213 l50 -29 50 29 -50 29 Z"
          fill={`url(#${p}-brand)`}
          stroke="rgba(255,255,255,0.5)"
          strokeWidth="1.6"
        />
        {/* embossed shield mark */}
        <path
          d="M200 196 l17 6.5v15c0 11-7 18.5-17 22.5-10-4-17-11.5-17-22.5v-15L200 196Z"
          fill="rgba(255,255,255,0.28)"
          stroke="#fff"
          strokeWidth="1.4"
        />
        <path
          d="m193 213 4.6 4.6L209 206"
          stroke="#fff"
          strokeWidth="2.2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>

      {/* halo pulse around the centre */}
      <circle
        cx="200"
        cy="213"
        r="66"
        fill="none"
        stroke="rgba(66,165,245,0.45)"
        strokeWidth="1.4"
        className="pulse-soft"
      />
    </svg>
  );
}
