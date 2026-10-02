import { ecosystem } from '@/lib/site';

/**
 * Infinite logo/partner marquee. Duplicated track + 50% translate
 * gives a seamless loop; the clone is aria-hidden.
 */
export default function Marquee({ items = ecosystem, dark = false }) {
  const Track = ({ hidden = false }) => (
    <div className="flex gap-16 items-center" aria-hidden={hidden || undefined}>
      {items.map((label) => (
        <span
          key={label}
          className={`text-xl font-display font-bold whitespace-nowrap ${
            dark ? 'text-white/25' : 'text-navy/30'
          }`}
        >
          {label}
        </span>
      ))}
    </div>
  );

  return (
    <section
      className={`py-14 overflow-hidden ${
        dark ? 'bg-navy border-y border-white/10' : 'bg-white border-y border-borderc'
      }`}
    >
      <p
        className={`text-center text-sm font-medium mb-8 px-6 ${
          dark ? 'text-white/40' : 'text-muted'
        }`}
      >
        Built to integrate across Nigeria&apos;s trust ecosystem
      </p>
      <div className="relative">
        {/* edge fades */}
        <div
          aria-hidden="true"
          className="absolute inset-y-0 left-0 w-24 z-10 pointer-events-none"
          style={{
            background: `linear-gradient(90deg, ${
              dark ? '#0F2238' : '#ffffff'
            } 0%, transparent 100%)`,
          }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-y-0 right-0 w-24 z-10 pointer-events-none"
          style={{
            background: `linear-gradient(270deg, ${
              dark ? '#0F2238' : '#ffffff'
            } 0%, transparent 100%)`,
          }}
        />
        <div className="flex gap-16 marquee-track w-max">
          <Track />
          <Track hidden />
        </div>
      </div>
    </section>
  );
}
