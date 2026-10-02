'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Scroll-triggered reveal wrapper. Replaces the IntersectionObserver
 * script from the original single-file page.
 *
 * @param delay 0-5, maps to the .reveal-delay-N stagger utilities
 * @param immediate skip observation and animate on mount (above-the-fold content)
 */
export default function Reveal({
  children,
  delay = 0,
  immediate = false,
  as: Tag = 'div',
  className = '',
  ...rest
}) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (immediate) {
      // Next frame so the transition has an initial state to animate from.
      const raf = requestAnimationFrame(() => setShown(true));
      return () => cancelAnimationFrame(raf);
    }

    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === 'undefined') {
      setShown(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShown(true);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    );

    io.observe(el);
    return () => io.disconnect();
  }, [immediate]);

  const classes = [
    'reveal',
    delay ? `reveal-delay-${delay}` : '',
    shown ? 'in' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <Tag ref={ref} className={classes} {...rest}>
      {children}
    </Tag>
  );
}
