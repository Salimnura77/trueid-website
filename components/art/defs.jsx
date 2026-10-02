/**
 * Shared gradient / filter definitions for the illustration set.
 *
 * Every illustration gets depth from the same small palette of
 * gradients so the whole set reads as one system:
 *   - `faceTop`   lit top surface of an extruded solid
 *   - `faceSide`  shaded side wall
 *   - `glass`     translucent panel over a dark background
 *   - `brandFill` the blue accent gradient from the brand palette
 *
 * IDs are namespaced per-instance via the `id` prefix so multiple
 * illustrations on one page never collide.
 */
export default function ArtDefs({ p }) {
  return (
    <defs>
      {/* brand accent, 135deg to match .grad-cta */}
      <linearGradient id={`${p}-brand`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#42A5F5" />
        <stop offset="100%" stopColor="#1E88F5" />
      </linearGradient>

      {/* lit top face of an extruded card */}
      <linearGradient id={`${p}-faceTop`} x1="0" y1="0" x2="0.6" y2="1">
        <stop offset="0%" stopColor="#2E4E76" />
        <stop offset="100%" stopColor="#16304F" />
      </linearGradient>

      {/* darker side wall, sells the extrusion */}
      <linearGradient id={`${p}-faceSide`} x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#0C1E33" />
        <stop offset="100%" stopColor="#132A46" />
      </linearGradient>

      {/* frosted glass panel */}
      <linearGradient id={`${p}-glass`} x1="0" y1="0" x2="0.8" y2="1">
        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.16" />
        <stop offset="55%" stopColor="#ffffff" stopOpacity="0.05" />
        <stop offset="100%" stopColor="#ffffff" stopOpacity="0.02" />
      </linearGradient>

      {/* specular streak swept across glass */}
      <linearGradient id={`${p}-sheen`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
        <stop offset="45%" stopColor="#ffffff" stopOpacity="0.34" />
        <stop offset="60%" stopColor="#ffffff" stopOpacity="0" />
      </linearGradient>

      {/* white card on light backgrounds */}
      <linearGradient id={`${p}-paper`} x1="0" y1="0" x2="0.4" y2="1">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="100%" stopColor="#EEF4FB" />
      </linearGradient>

      {/* radial glow behind focal elements */}
      <radialGradient id={`${p}-glow`} cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#42A5F5" stopOpacity="0.42" />
        <stop offset="70%" stopColor="#1E88F5" stopOpacity="0.08" />
        <stop offset="100%" stopColor="#1E88F5" stopOpacity="0" />
      </radialGradient>

      {/* contact shadow under floating objects */}
      <radialGradient id={`${p}-shadow`} cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#050D18" stopOpacity="0.5" />
        <stop offset="100%" stopColor="#050D18" stopOpacity="0" />
      </radialGradient>

      {/* soft blur used for glows and shadows */}
      <filter id={`${p}-blur`} x="-40%" y="-40%" width="180%" height="180%">
        <feGaussianBlur stdDeviation="9" />
      </filter>

      <filter id={`${p}-blurSm`} x="-40%" y="-40%" width="180%" height="180%">
        <feGaussianBlur stdDeviation="3.2" />
      </filter>

      {/* drop shadow for cards floating over light backgrounds */}
      <filter id={`${p}-cardShadow`} x="-30%" y="-30%" width="170%" height="170%">
        <feDropShadow
          dx="0"
          dy="14"
          stdDeviation="14"
          floodColor="#0F2238"
          floodOpacity="0.22"
        />
      </filter>

      {/* fine grain so large flat fills don't band */}
      <filter id={`${p}-grain`}>
        <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" />
        <feColorMatrix type="saturate" values="0" />
        <feComponentTransfer>
          <feFuncA type="linear" slope="0.05" />
        </feComponentTransfer>
        <feComposite in2="SourceGraphic" operator="over" />
      </filter>

      {/* clip for the sheen sweep on the hero credential */}
      <clipPath id={`${p}-clipCard`}>
        <rect x="96" y="150" width="208" height="132" rx="14" />
      </clipPath>
    </defs>
  );
}
