import ArtDefs from './defs';

/**
 * Verification scan: a document being read by a scan beam, with
 * government-source checks resolving in sequence. Used on
 * /how-it-works and /features.
 */
export default function VerifyArt({ className = '' }) {
  const p = 'ver';

  const sources = [
    { label: 'NIMC · NIN', y: 300 },
    { label: 'NIBSS · BVN', y: 330 },
    { label: 'FRSC · Licence', y: 360 },
  ];

  return (
    <svg
      viewBox="0 0 400 400"
      className={`w-full h-full ${className}`}
      role="img"
      aria-label="An identity document being scanned, with checks resolving against NIMC, NIBSS, and FRSC government sources"
    >
      <ArtDefs p={p} />

      <ellipse cx="200" cy="180" rx="150" ry="140" fill={`url(#${p}-glow)`} opacity="0.34" />

      {/* ---- document, tilted in 3D ---- */}
      <g transform="rotate(-6 200 170)">
        <ellipse cx="200" cy="288" rx="90" ry="16" fill={`url(#${p}-shadow)`} />

        {/* side wall for thickness */}
        <rect x="112" y="66" width="176" height="216" rx="16" fill={`url(#${p}-faceSide)`} />
        {/* face */}
        <rect
          x="108"
          y="60"
          width="176"
          height="216"
          rx="16"
          fill={`url(#${p}-faceTop)`}
          stroke="rgba(255,255,255,0.3)"
          strokeWidth="1.6"
        />

        {/* portrait block */}
        <rect
          x="128"
          y="82"
          width="58"
          height="68"
          rx="9"
          fill="rgba(66,165,245,0.16)"
          stroke="rgba(66,165,245,0.45)"
          strokeWidth="1.2"
        />
        <circle cx="157" cy="105" r="13" fill="rgba(255,255,255,0.5)" />
        <path
          d="M137 143c3-13 10-19 20-19s17 6 20 19Z"
          fill="rgba(255,255,255,0.4)"
        />

        {/* data lines */}
        <g fill="rgba(255,255,255,0.4)">
          <rect x="196" y="86" width="70" height="7" rx="3.5" />
          <rect x="196" y="102" width="54" height="6" rx="3" opacity="0.7" />
          <rect x="196" y="116" width="62" height="6" rx="3" opacity="0.5" />
          <rect x="196" y="130" width="44" height="6" rx="3" opacity="0.35" />
        </g>

        {/* MRZ / machine-readable strip */}
        <rect x="128" y="166" width="138" height="30" rx="6" fill="rgba(0,0,0,0.22)" />
        <g fill="rgba(255,255,255,0.42)" fontFamily="monospace" fontSize="9">
          <text x="134" y="180">NGA&lt;&lt;TRUEID&lt;&lt;VERIFIED&lt;&lt;</text>
          <text x="134" y="192">2201&lt;&lt;9814&lt;&lt;NIN&lt;&lt;0912&lt;&lt;</text>
        </g>

        {/* chip */}
        <rect
          x="128"
          y="210"
          width="34"
          height="26"
          rx="5"
          fill={`url(#${p}-brand)`}
          opacity="0.85"
        />
        <g stroke="rgba(255,255,255,0.6)" strokeWidth="1">
          <path d="M136 210v26M154 210v26M128 223h34" />
        </g>

        {/* hologram diamond */}
        <path
          d="M245 216l14 14-14 14-14-14Z"
          fill="rgba(66,165,245,0.3)"
          stroke="rgba(255,255,255,0.5)"
          strokeWidth="1.2"
          className="pulse-soft"
        />

        {/* scan beam */}
        <g clipPath="none">
          <rect
            className="scan-sweep"
            x="108"
            y="70"
            width="176"
            height="4"
            fill="#42A5F5"
          />
          <rect
            className="scan-sweep"
            x="108"
            y="60"
            width="176"
            height="24"
            fill={`url(#${p}-sheen)`}
            opacity="0.5"
          />
        </g>
      </g>

      {/* ---- source checks resolving ---- */}
      {sources.map((s, i) => (
        <g key={s.label}>
          <rect
            x="96"
            y={s.y - 15}
            width="208"
            height="26"
            rx="13"
            fill="rgba(255,255,255,0.06)"
            stroke="rgba(255,255,255,0.14)"
            strokeWidth="1"
          />
          <circle
            cx="115"
            cy={s.y - 2}
            r="7.5"
            fill="rgba(66,165,245,0.25)"
            stroke="#42A5F5"
            strokeWidth="1.3"
          />
          <path
            className="fp-draw"
            style={{ animationDelay: `${0.6 + i * 0.45}s`, strokeDasharray: 14, strokeDashoffset: 14 }}
            d={`m111.5 ${s.y - 2.5} 2.6 2.6 4.6-5.2`}
            stroke="#fff"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <text
            x="132"
            y={s.y + 2}
            fill="rgba(255,255,255,0.7)"
            fontSize="11.5"
            fontWeight="600"
            fontFamily="Inter, system-ui, sans-serif"
          >
            {s.label}
          </text>
          <text
            x="288"
            y={s.y + 2}
            textAnchor="end"
            fill="#42A5F5"
            fontSize="10.5"
            fontWeight="700"
            fontFamily="Inter, system-ui, sans-serif"
          >
            MATCH
          </text>
        </g>
      ))}
    </svg>
  );
}
