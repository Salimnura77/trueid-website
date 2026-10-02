import ArtDefs from './defs';

/**
 * Layered shield: nested glass plates over a fingerprint core, with an
 * animated scan sweep and orbiting consent tokens. Replaces the flat
 * single-stroke shield from the original page.
 */
export default function SecurityArt({ className = '' }) {
  const p = 'sec';
  return (
    <svg
      viewBox="0 0 400 400"
      className={`w-full h-full ${className}`}
      role="img"
      aria-label="Layered shield illustration representing encrypted, consent-based identity protection"
    >
      <ArtDefs p={p} />

      <ellipse cx="200" cy="196" rx="160" ry="160" fill={`url(#${p}-glow)`} opacity="0.55" />

      {/* orbit rings */}
      <g className="spin-slow" opacity="0.5">
        <circle
          cx="200"
          cy="200"
          r="176"
          fill="none"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="1.2"
          strokeDasharray="3 10"
        />
      </g>
      <g className="spin-slow-rev" opacity="0.45">
        <circle
          cx="200"
          cy="200"
          r="150"
          fill="none"
          stroke="rgba(66,165,245,0.28)"
          strokeWidth="1.4"
          strokeDasharray="24 16"
        />
      </g>

      <g className="float-slow">
        {/* ---- back plate, offset for depth ---- */}
        <path
          d="M200 58 306 96v98c0 70-44 116-106 142-62-26-106-72-106-142V96L200 58Z"
          transform="translate(10 10)"
          fill="#0A1A2D"
          opacity="0.55"
        />

        {/* ---- outer glass shield ---- */}
        <path
          d="M200 58 306 96v98c0 70-44 116-106 142-62-26-106-72-106-142V96L200 58Z"
          fill={`url(#${p}-glass)`}
          stroke="rgba(255,255,255,0.32)"
          strokeWidth="2.2"
        />

        {/* ---- middle plate ---- */}
        <path
          d="M200 88 278 116v76c0 54-34 90-78 110-44-20-78-56-78-110v-76L200 88Z"
          fill="rgba(30,136,245,0.1)"
          stroke="rgba(255,255,255,0.2)"
          strokeWidth="1.6"
        />

        {/* ---- inner core plate ---- */}
        <path
          d="M200 116 254 136v56c0 40-25 66-54 80-29-14-54-40-54-80v-56L200 116Z"
          fill="rgba(66,165,245,0.14)"
          stroke="rgba(66,165,245,0.4)"
          strokeWidth="1.4"
        />

        {/* ---- fingerprint core ---- */}
        <g
          stroke={`url(#${p}-brand)`}
          strokeWidth="3.4"
          fill="none"
          strokeLinecap="round"
        >
          <path className="fp-draw d1" d="M200 148c-18 0-26 12-26 26s5 24 16 30" />
          <path className="fp-draw d2" d="M200 148c18 0 26 12 26 26s-5 24-16 30" />
          <path className="fp-draw d3" d="M200 166c-9 0-13 6-13 14s3 12 8 16" />
          <path className="fp-draw d4" d="M200 166c9 0 13 6 13 14s-3 12-8 16" />
          <path className="fp-draw d5" d="M200 182v22" />
        </g>

        {/* ---- scan sweep across the shield ---- */}
        <g clipPath={`url(#${p}-shieldClip)`}>
          <defs>
            <clipPath id={`${p}-shieldClip`}>
              <path d="M200 58 306 96v98c0 70-44 116-106 142-62-26-106-72-106-142V96L200 58Z" />
            </clipPath>
            <linearGradient id={`${p}-scan`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#42A5F5" stopOpacity="0" />
              <stop offset="50%" stopColor="#42A5F5" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#42A5F5" stopOpacity="0" />
            </linearGradient>
          </defs>
          <rect
            className="scan-sweep"
            x="94"
            y="70"
            width="212"
            height="52"
            fill={`url(#${p}-scan)`}
          />
        </g>

        {/* specular highlight on the glass edge */}
        <path
          d="M200 58 306 96v20L200 80 94 116V96L200 58Z"
          fill="rgba(255,255,255,0.14)"
        />
      </g>

      {/* ---- orbiting consent tokens ---- */}
      <g className="spin-slow">
        <g transform="translate(200 24)">
          <circle r="17" fill="#12294A" stroke="rgba(66,165,245,0.5)" strokeWidth="1.5" />
          <path
            d="M-6 0 -2 4.6 6.5 -4.5"
            stroke="#42A5F5"
            strokeWidth="2.4"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
        <g transform="translate(352 240)">
          <circle r="15" fill="#12294A" stroke="rgba(66,165,245,0.4)" strokeWidth="1.5" />
          <rect x="-5" y="-2" width="10" height="8" rx="2" fill="#42A5F5" />
          <path
            d="M-3 -2v-2.5a3 3 0 0 1 6 0V-2"
            stroke="#42A5F5"
            strokeWidth="1.8"
            fill="none"
          />
        </g>
        <g transform="translate(48 240)">
          <circle r="15" fill="#12294A" stroke="rgba(66,165,245,0.4)" strokeWidth="1.5" />
          <circle r="4.5" cy="-2" fill="#42A5F5" />
          <path d="M-7 8c0-4.4 3.1-7 7-7s7 2.6 7 7" fill="#42A5F5" opacity="0.8" />
        </g>
      </g>
    </svg>
  );
}
