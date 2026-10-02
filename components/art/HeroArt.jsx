import ArtDefs from './defs';

/**
 * Hero illustration — an isometric, layered credential stack.
 *
 * Replaces the flat single-plane fingerprint/shield of the original page.
 * Depth comes from three real techniques rather than a drop shadow:
 *   1. extruded side walls on the shield and card (lit top, dark side)
 *   2. stacked parallax planes with contact shadows between them
 *   3. a swept specular sheen clipped to the card face
 *
 * Designed for the navy hero gradient.
 */
export default function HeroArt({ className = '' }) {
  const p = 'hero';

  return (
    <div className={`relative w-full max-w-[480px] aspect-square ${className}`}>
      {/* ambient bloom behind the whole composition */}
      <div
        aria-hidden="true"
        className="absolute inset-[12%] rounded-full blur-3xl opacity-60"
        style={{
          background:
            'radial-gradient(circle, rgba(66,165,245,0.32) 0%, rgba(30,136,245,0.06) 55%, transparent 75%)',
        }}
      />

      <svg
        viewBox="0 0 400 400"
        className="relative w-full h-full"
        role="img"
        aria-label="A layered digital identity credential secured inside a shield, with biometric and verification data orbiting it."
      >
        <ArtDefs p={p} />

        {/* ---------- orbital rings (depth cue, slow counter-rotation) ---------- */}
        <g className="spin-slow" opacity="0.5">
          <ellipse
            cx="200"
            cy="200"
            rx="186"
            ry="66"
            fill="none"
            stroke="rgba(255,255,255,0.14)"
            strokeWidth="1"
            transform="rotate(-18 200 200)"
          />
          <circle cx="386" cy="200" r="3.5" fill="#42A5F5" transform="rotate(-18 200 200)" />
        </g>
        <g className="spin-slow-rev" opacity="0.4">
          <ellipse
            cx="200"
            cy="200"
            rx="168"
            ry="58"
            fill="none"
            stroke="rgba(66,165,245,0.28)"
            strokeWidth="1"
            strokeDasharray="3 7"
            transform="rotate(24 200 200)"
          />
          <circle cx="32" cy="200" r="3" fill="#fff" opacity="0.7" transform="rotate(24 200 200)" />
        </g>

        {/* ---------- ground contact shadow ---------- */}
        <ellipse cx="200" cy="352" rx="112" ry="20" fill={`url(#${p}-shadow)`} />

        <g className="float-slow">
          {/* ================= SHIELD (extruded) ================= */}
          {/* side wall — offset down-right creates the extrusion */}
          <path
            d="M206 44 L310 82 V188 C310 262 264 312 206 340 C148 312 104 262 104 188 V82 Z"
            fill={`url(#${p}-faceSide)`}
            opacity="0.95"
          />
          {/* top face */}
          <path
            d="M200 40 L302 78 V184 C302 258 256 308 200 336 C144 308 98 258 98 184 V78 Z"
            fill={`url(#${p}-faceTop)`}
            stroke="rgba(255,255,255,0.28)"
            strokeWidth="2"
          />
          {/* inner bevel */}
          <path
            d="M200 56 L288 89 V184 C288 250 248 295 200 320 C152 295 112 250 112 184 V89 Z"
            fill="none"
            stroke="rgba(255,255,255,0.09)"
            strokeWidth="1.5"
          />
          {/* top-edge highlight */}
          <path
            d="M200 40 L302 78 L200 56 L98 78 Z"
            fill="#fff"
            opacity="0.12"
          />

          {/* faint circuitry inside the shield, sells "infrastructure" */}
          <g stroke="rgba(66,165,245,0.35)" strokeWidth="1" fill="none">
            <path d="M132 120 h26 v-16 h30" />
            <path d="M268 132 h-24 v18 h-22" />
            <path d="M126 232 h30 v20 h24" />
            <path d="M274 224 h-28 v-18" />
            <circle cx="132" cy="120" r="2.2" fill="#42A5F5" stroke="none" />
            <circle cx="268" cy="132" r="2.2" fill="#42A5F5" stroke="none" />
            <circle cx="126" cy="232" r="2.2" fill="#42A5F5" stroke="none" />
            <circle cx="274" cy="224" r="2.2" fill="#42A5F5" stroke="none" />
          </g>

          {/* ================= FINGERPRINT (recessed into shield) ================= */}
          <g transform="translate(0,-6)">
            {/* recess well */}
            <ellipse cx="200" cy="150" rx="52" ry="52" fill="#0B1B2E" opacity="0.45" />
            <g
              stroke={`url(#${p}-brand)`}
              strokeWidth="3.2"
              fill="none"
              strokeLinecap="round"
            >
              <path className="fp-draw d1" d="M200 104 C170 104 156 124 156 150 C156 172 166 190 182 198" />
              <path className="fp-draw d2" d="M200 104 C230 104 244 124 244 150 C244 172 234 190 218 198" />
              <path className="fp-draw d3" d="M200 120 C180 120 172 134 172 152 C172 166 178 178 188 184" />
              <path className="fp-draw d4" d="M200 120 C220 120 228 134 228 152 C228 166 222 178 212 184" />
              <path className="fp-draw d5" d="M200 136 C190 136 186 144 186 154 C186 162 190 168 196 171" />
            </g>
            {/* core */}
            <circle cx="200" cy="152" r="5" fill="#fff" opacity="0.9" />
            {/* biometric scan line sweeping the print */}
            <g clipPath={`url(#${p}-clipPrint)`}>
              <rect
                className="scan-sweep"
                x="150"
                y="104"
                width="100"
                height="2.5"
                fill="#42A5F5"
                opacity="0.9"
                style={{ filter: `url(#${p}-blurSm)` }}
              />
            </g>
          </g>

          {/* ================= CREDENTIAL CARD (glass, extruded) ================= */}
          <g className="float-slower">
            {/* card shadow cast onto the shield below it */}
            <rect
              x="100"
              y="164"
              width="208"
              height="132"
              rx="14"
              fill="#050D18"
              opacity="0.4"
              style={{ filter: `url(#${p}-blur)` }}
            />
            {/* extruded bottom edge */}
            <rect
              x="98"
              y="156"
              width="208"
              height="132"
              rx="14"
              fill={`url(#${p}-faceSide)`}
            />
            {/* glass face */}
            <rect
              x="96"
              y="150"
              width="208"
              height="132"
              rx="14"
              fill={`url(#${p}-glass)`}
              stroke="rgba(255,255,255,0.3)"
              strokeWidth="1.6"
            />
            {/* swept sheen, clipped to the card */}
            <g clipPath={`url(#${p}-clipCard)`}>
              <rect
                x="60"
                y="130"
                width="90"
                height="180"
                fill={`url(#${p}-sheen)`}
                transform="rotate(18 200 216)"
                className="pulse-soft"
              />
            </g>

            {/* --- card contents --- */}
            {/* portrait chip */}
            <rect
              x="112"
              y="166"
              width="46"
              height="54"
              rx="8"
              fill="rgba(66,165,245,0.2)"
              stroke="rgba(255,255,255,0.28)"
            />
            <circle cx="135" cy="185" r="9.5" fill="rgba(255,255,255,0.55)" />
            <path
              d="M120 212c2.5-11 8-16 15-16s12.5 5 15 16z"
              fill="rgba(255,255,255,0.45)"
            />

            {/* EMV-style gold chip */}
            <rect x="112" y="230" width="26" height="19" rx="4" fill="#E8C271" opacity="0.9" />
            <g stroke="#A9863C" strokeWidth="0.9" opacity="0.8">
              <path d="M112 236h26M112 243h26M121 230v19M129 230v19" />
            </g>

            {/* data lines */}
            <rect x="170" y="168" width="94" height="7" rx="3.5" fill="rgba(255,255,255,0.72)" />
            <rect x="170" y="182" width="70" height="5.5" rx="2.75" fill="rgba(255,255,255,0.34)" />
            <rect x="170" y="194" width="82" height="5.5" rx="2.75" fill="rgba(255,255,255,0.24)" />
            <rect x="170" y="206" width="56" height="5.5" rx="2.75" fill="rgba(255,255,255,0.18)" />

            {/* verified pill */}
            <g transform="translate(170,224)">
              <rect width="98" height="24" rx="12" fill="rgba(30,136,245,0.28)" stroke="rgba(66,165,245,0.6)" />
              <circle cx="15" cy="12" r="7" fill="#42A5F5" />
              <path
                d="m11.6 12.2 2.2 2.2 4.4-4.6"
                stroke="#0F2238"
                strokeWidth="1.9"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
              <text
                x="30"
                y="16"
                fill="#EAF4FE"
                fontSize="10.5"
                fontWeight="700"
                fontFamily="Inter, system-ui, sans-serif"
                letterSpacing="0.4"
              >
                VERIFIED
              </text>
            </g>

            {/* QR glyph, bottom-right */}
            <g transform="translate(268,232)" opacity="0.9">
              <rect width="26" height="26" rx="4" fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.3)" />
              <g fill="#EAF4FE">
                <rect x="4" y="4" width="6" height="6" rx="1" />
                <rect x="16" y="4" width="6" height="6" rx="1" />
                <rect x="4" y="16" width="6" height="6" rx="1" />
                <rect x="15" y="15" width="2.5" height="2.5" />
                <rect x="19" y="19" width="2.5" height="2.5" />
                <rect x="15" y="19" width="2.5" height="2.5" />
              </g>
            </g>
          </g>

          {/* ================= ORBITING DOCUMENT TOKENS ================= */}
          {/* NIN */}
          <g className="float-slower" transform="translate(46,96)">
            <rect
              x="0"
              y="4"
              width="62"
              height="34"
              rx="9"
              fill="#0B1B2E"
              opacity="0.55"
            />
            <rect
              width="62"
              height="34"
              rx="9"
              fill={`url(#${p}-glass)`}
              stroke="rgba(255,255,255,0.3)"
            />
            <text
              x="31"
              y="22"
              textAnchor="middle"
              fill="#EAF4FE"
              fontSize="12"
              fontWeight="800"
              fontFamily="Inter, system-ui, sans-serif"
            >
              NIN
            </text>
            <circle cx="53" cy="8" r="3.5" fill="#42A5F5" className="pulse-soft" />
          </g>

          {/* BVN */}
          <g className="float-slow" transform="translate(296,116)">
            <rect x="0" y="4" width="62" height="34" rx="9" fill="#0B1B2E" opacity="0.55" />
            <rect
              width="62"
              height="34"
              rx="9"
              fill={`url(#${p}-glass)`}
              stroke="rgba(255,255,255,0.3)"
            />
            <text
              x="31"
              y="22"
              textAnchor="middle"
              fill="#EAF4FE"
              fontSize="12"
              fontWeight="800"
              fontFamily="Inter, system-ui, sans-serif"
            >
              BVN
            </text>
            <circle cx="9" cy="8" r="3.5" fill="#42A5F5" className="pulse-soft" />
          </g>

          {/* connective data flow from tokens into the card */}
          <g stroke="rgba(66,165,245,0.55)" strokeWidth="1.6" fill="none">
            <path className="dash-flow" d="M108 130 C140 142 150 150 164 158" />
            <path className="dash-flow" d="M296 150 C270 158 258 162 244 168" />
          </g>
        </g>

        {/* clip for the fingerprint scan sweep */}
        <clipPath id={`${p}-clipPrint`}>
          <ellipse cx="200" cy="144" rx="52" ry="52" />
        </clipPath>
      </svg>
    </div>
  );
}
