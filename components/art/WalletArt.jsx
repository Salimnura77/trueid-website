import ArtDefs from './defs';

/**
 * Isometric credential wallet: an extruded card stack rising out of a
 * wallet shell, with a floating verified-fact chip. Used on /wallet and
 * the solution section of the home page.
 */
export default function WalletArt({ className = '' }) {
  const p = 'wl';
  return (
    <svg
      viewBox="0 0 400 400"
      className={`w-full h-full ${className}`}
      role="img"
      aria-label="Isometric illustration of a digital identity wallet holding stacked credentials"
    >
      <ArtDefs p={p} />

      {/* ambient glow + contact shadow */}
      <ellipse cx="200" cy="200" rx="150" ry="150" fill={`url(#${p}-glow)`} opacity="0.5" />
      <ellipse cx="200" cy="330" rx="118" ry="20" fill={`url(#${p}-shadow)`} />

      <g className="float-slow">
        {/* ---- back credential (deepest in stack) ---- */}
        <g opacity="0.55">
          <path
            d="M112 156 200 112 288 156 200 200Z"
            fill={`url(#${p}-faceTop)`}
            stroke="rgba(255,255,255,0.18)"
            strokeWidth="1.5"
          />
        </g>

        {/* ---- middle credential ---- */}
        <g opacity="0.8">
          <path
            d="M104 178 200 130 296 178 200 226Z"
            fill={`url(#${p}-faceTop)`}
            stroke="rgba(255,255,255,0.22)"
            strokeWidth="1.5"
          />
          <path d="M104 178 200 226v14L104 192Z" fill={`url(#${p}-faceSide)`} />
          <path d="M296 178 200 226v14l96-48Z" fill="#0A1A2D" opacity="0.75" />
        </g>

        {/* ---- front credential: full detail ---- */}
        <g>
          {/* top face */}
          <path
            d="M96 204 200 152 304 204 200 256Z"
            fill={`url(#${p}-faceTop)`}
            stroke="rgba(255,255,255,0.3)"
            strokeWidth="1.6"
          />
          {/* extruded walls */}
          <path
            d="M96 204 200 256v18L96 222Z"
            fill={`url(#${p}-faceSide)`}
            stroke="rgba(255,255,255,0.12)"
            strokeWidth="1"
          />
          <path d="M304 204 200 256v18l104-52Z" fill="#0A1A2D" />

          {/* portrait chip on the card face, sheared to match the plane */}
          <g transform="translate(132 200) skewY(26.6)">
            <rect width="34" height="34" rx="7" fill="rgba(66,165,245,0.32)" />
            <circle cx="17" cy="13" r="6" fill="rgba(255,255,255,0.75)" />
            <path
              d="M6 30c0-6.2 4.9-10 11-10s11 3.8 11 10"
              fill="rgba(255,255,255,0.6)"
            />
          </g>

          {/* data lines */}
          <g transform="translate(180 214) skewY(26.6)" opacity="0.85">
            <rect width="72" height="6" rx="3" fill="rgba(255,255,255,0.5)" />
            <rect y="14" width="52" height="5" rx="2.5" fill="rgba(255,255,255,0.28)" />
            <rect y="26" width="60" height="5" rx="2.5" fill="rgba(255,255,255,0.2)" />
          </g>

          {/* NFC / contactless glyph */}
          <g transform="translate(258 226) skewY(26.6)" opacity="0.7">
            <path
              d="M2 14a10 10 0 0 1 0-14"
              stroke="#42A5F5"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M8 18a16 16 0 0 0 0-22"
              stroke="#42A5F5"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
            />
          </g>
        </g>

        {/* ---- floating verified-fact chip ---- */}
        <g className="float-slower">
          <g filter={`url(#${p}-blurSm)`} opacity="0.4">
            <rect x="228" y="112" width="118" height="44" rx="12" fill="#050D18" />
          </g>
          <rect
            x="228"
            y="106"
            width="118"
            height="44"
            rx="12"
            fill={`url(#${p}-glass)`}
            stroke="rgba(255,255,255,0.28)"
            strokeWidth="1.4"
          />
          <circle cx="252" cy="128" r="11" fill="url(#wl-brand)" />
          <path
            d="m247 128 3.4 3.4 6-6.4"
            stroke="#fff"
            strokeWidth="2.2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <rect x="270" y="119" width="56" height="6" rx="3" fill="rgba(255,255,255,0.62)" />
          <rect x="270" y="131" width="38" height="5" rx="2.5" fill="rgba(255,255,255,0.3)" />
        </g>

        {/* ---- consent padlock chip, lower left ---- */}
        <g className="float-slower" style={{ animationDelay: '1.4s' }}>
          <rect
            x="54"
            y="246"
            width="76"
            height="40"
            rx="11"
            fill={`url(#${p}-glass)`}
            stroke="rgba(255,255,255,0.24)"
            strokeWidth="1.3"
          />
          <path
            d="M78 266v-5a6 6 0 0 1 12 0v5"
            stroke="#42A5F5"
            strokeWidth="2.2"
            fill="none"
            strokeLinecap="round"
          />
          <rect x="74" y="265" width="20" height="14" rx="3.5" fill="rgba(66,165,245,0.6)" />
          <rect x="100" y="262" width="20" height="5" rx="2.5" fill="rgba(255,255,255,0.4)" />
          <rect x="100" y="272" width="14" height="4" rx="2" fill="rgba(255,255,255,0.22)" />
        </g>
      </g>

      {/* orbit ring for depth */}
      <ellipse
        cx="200"
        cy="216"
        rx="164"
        ry="64"
        fill="none"
        stroke="rgba(255,255,255,0.09)"
        strokeWidth="1.2"
      />
    </svg>
  );
}
