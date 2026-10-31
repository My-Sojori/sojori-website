'use client';

import { useId, useRef, useState } from 'react';

type Item = { id: string; title: string; sub?: string };

/**
 * Onglets accessibles dont TOUS les panneaux sont dans le HTML (les fermés portent `hidden`) :
 * un robot lit chaque agent, chaque module, sans exécuter de JavaScript.
 * Les panneaux sont des nœuds serveur passés en props.
 */
export function Tabs({ label, items, panels, orientation = 'vertical', className = '' }: {
  label: string; items: Item[]; panels: React.ReactNode[]; orientation?: 'vertical' | 'horizontal'; className?: string;
}) {
  const base = useId();
  const [actif, setActif] = useState(0);
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  const aller = (k: number) => {
    const n = (k + items.length) % items.length;
    setActif(n);
    refs.current[n]?.focus();
  };
  const surTouche = (e: React.KeyboardEvent, k: number) => {
    const suiv = orientation === 'vertical' ? 'ArrowDown' : 'ArrowRight';
    const prec = orientation === 'vertical' ? 'ArrowUp' : 'ArrowLeft';
    if (e.key === suiv) { e.preventDefault(); aller(k + 1); }
    else if (e.key === prec) { e.preventDefault(); aller(k - 1); }
    else if (e.key === 'Home') { e.preventDefault(); aller(0); }
    else if (e.key === 'End') { e.preventDefault(); aller(items.length - 1); }
  };

  return (
    <div className={`sj2-tabs sj2-tabs--${orientation} ${className}`}>
      <div role="tablist" aria-label={label} aria-orientation={orientation} className="sj2-tabs__list">
        {items.map((it, k) => (
          <button
            key={it.id}
            ref={(el) => { refs.current[k] = el; }}
            type="button"
            role="tab"
            id={`${base}-t${k}`}
            aria-selected={actif === k}
            aria-controls={`${base}-p${k}`}
            tabIndex={actif === k ? 0 : -1}
            className="sj2-tab"
            onClick={() => setActif(k)}
            onKeyDown={(e) => surTouche(e, k)}
          >
            <span className="sj2-tab__title">{it.title}</span>
            {it.sub && <span className="sj2-tab__sub">{it.sub}</span>}
          </button>
        ))}
      </div>
      <div className="sj2-tabs__panels">
        {panels.map((p, k) => (
          <div key={items[k].id} role="tabpanel" id={`${base}-p${k}`} aria-labelledby={`${base}-t${k}`} hidden={actif !== k} className="sj2-tabs__panel">
            {p}
          </div>
        ))}
      </div>
    </div>
  );
}
