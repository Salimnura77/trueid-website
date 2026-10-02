'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Count-up statistics band. Replaces the `.num-tick` script from the
 * original page. Respects prefers-reduced-motion by jumping straight
 * to the final value.
 */
function Counter({ target, prefix = '', suffix = '', duration = 1600 }) {
  const ref = useRef(null);
  const [value, setValue] = useState(0);
  const done = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduced || typeof IntersectionObserver === 'undefined') {
      setValue(target);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting || done.current) return;
          done.current = true;
          io.unobserve(entry.target);

          const start = performance.now();
          const tick = (now) => {
            const p = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            setValue(target < 10 ? Math.round(target * eased) : Math.floor(target * eased));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        });
      },
      { threshold: 0.4 },
    );

    io.observe(el);
    return () => io.disconnect();
  }, [target, duration]);

  return (
    <span ref={ref} className="font-display font-extrabold text-4xl sm:text-5xl grad-text">
      {prefix}
      {value}
      {suffix}
    </span>
  );
}

export default function Stats({ items, note }) {
  return (
    <section className="py-20 lg:py-24 bg-navy relative overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {items.map((s) => (
            <div key={s.label}>
              <Counter target={s.target} prefix={s.prefix} suffix={s.suffix} />
              <p className="text-white/50 text-sm mt-2">{s.label}</p>
            </div>
          ))}
        </div>
        {note ? (
          <p className="text-white/35 text-xs text-center mt-10 max-w-2xl mx-auto leading-relaxed">
            {note}
          </p>
        ) : null}
      </div>
    </section>
  );
}
