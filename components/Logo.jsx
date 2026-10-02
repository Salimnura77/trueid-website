/**
 * Wordmark + monogram. The original page used a base64 WebP raster;
 * this is a crisp vector version that scales and themes cleanly.
 */
export default function Logo({ dark = false, className = '' }) {
  return (
    <span className={`flex items-center gap-2.5 ${className}`}>
      <svg width="34" height="34" viewBox="0 0 40 40" fill="none" aria-hidden="true">
        <defs>
          <linearGradient id="logoGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#1E88F5" />
            <stop offset="100%" stopColor="#42A5F5" />
          </linearGradient>
        </defs>
        <rect width="40" height="40" rx="11" fill="url(#logoGrad)" />
        {/* shield */}
        <path
          d="M20 9.5 28.5 12.7v7.6c0 5.3-3.5 8.9-8.5 10.7-5-1.8-8.5-5.4-8.5-10.7v-7.6L20 9.5Z"
          fill="rgba(255,255,255,0.16)"
          stroke="#fff"
          strokeWidth="1.5"
        />
        {/* fingerprint arcs inside the shield */}
        <path
          d="M20 16.2c-2.4 0-3.6 1.6-3.6 3.6s.7 3.3 2.1 4"
          stroke="#fff"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M20 19.1c-.7 0-1 .5-1 1.1 0 1 .3 1.9 1 2.6"
          stroke="#fff"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M20 16.2c2.4 0 3.6 1.6 3.6 3.6s-.7 3.3-2.1 4"
          stroke="rgba(255,255,255,0.65)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
      <span
        className={`font-display font-extrabold text-lg tracking-tight ${
          dark ? 'text-white' : 'text-navy'
        }`}
      >
        True<span className={dark ? 'text-brand-2' : 'text-brand'}>ID</span>.me
      </span>
    </span>
  );
}
