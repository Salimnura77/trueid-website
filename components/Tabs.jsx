'use client';

import { useId, useState } from 'react';

/**
 * Accessible tab set used on the product / audience pages.
 * Panels are rendered eagerly and hidden so content stays
 * crawlable and in-DOM for anchor links.
 */
export default function Tabs({ tabs }) {
  const [active, setActive] = useState(0);
  const base = useId();

  return (
    <div>
      <div
        role="tablist"
        aria-label="Product views"
        className="flex flex-wrap gap-2 justify-center"
      >
        {tabs.map((tab, i) => (
          <button
            key={tab.label}
            role="tab"
            id={`${base}-tab-${i}`}
            aria-selected={active === i}
            aria-controls={`${base}-panel-${i}`}
            tabIndex={active === i ? 0 : -1}
            onClick={() => setActive(i)}
            onKeyDown={(e) => {
              if (e.key === 'ArrowRight') setActive((active + 1) % tabs.length);
              if (e.key === 'ArrowLeft') setActive((active - 1 + tabs.length) % tabs.length);
            }}
            className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition focus-ring ${
              active === i
                ? 'btn-primary text-white'
                : 'chip text-navy/70 hover:text-navy'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="mt-10">
        {tabs.map((tab, i) => (
          <div
            key={tab.label}
            role="tabpanel"
            id={`${base}-panel-${i}`}
            aria-labelledby={`${base}-tab-${i}`}
            hidden={active !== i}
          >
            {tab.content}
          </div>
        ))}
      </div>
    </div>
  );
}
