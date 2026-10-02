'use client';

import { useState } from 'react';

/**
 * Accessible single-open accordion. Replaces the inline FAQ script,
 * using grid-template-rows instead of max-height so content of any
 * length animates correctly.
 */
export default function Accordion({ items, className = '' }) {
  const [open, setOpen] = useState(null);

  return (
    <div className={`space-y-3 ${className}`}>
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div
            key={item.q}
            className={`card overflow-hidden transition-colors ${
              isOpen ? 'border-brand/35' : ''
            }`}
          >
            <h3>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="w-full flex items-center justify-between gap-4 text-left px-6 py-5 focus-ring rounded-[20px]"
              >
                <span className="font-semibold text-navy">{item.q}</span>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                  className={`shrink-0 text-brand transition-transform duration-300 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                >
                  <path
                    d="m6 9 6 6 6-6"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </h3>
            <div
              className="grid transition-all duration-300 ease-out"
              style={{
                gridTemplateRows: isOpen ? '1fr' : '0fr',
              }}
            >
              <div className="overflow-hidden">
                <p className="text-muted text-sm leading-relaxed px-6 pb-6 max-w-2xl">
                  {item.a}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
