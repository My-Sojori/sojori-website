'use client';

import { useSyncExternalStore } from 'react';
import type { FaqItem } from './Faq';

const TEL = '(max-width: 640px)';
const abonner = (cb: () => void) => {
  try { const m = window.matchMedia(TEL); m.addEventListener('change', cb); return () => m.removeEventListener('change', cb); } catch { return () => {}; }
};
const lire = () => { try { return window.matchMedia(TEL).matches; } catch { return false; } };

/**
 * Les questions et réponses. Sur ordinateur (et dans le HTML rendu côté serveur) : la liste dépliée habituelle.
 * Sur téléphone : un accordéon natif (`details` / `summary`), première question ouverte ; tout le texte reste dans le HTML.
 */
export function FaqListe({ items }: { items: FaqItem[] }) {
  const tel = useSyncExternalStore(abonner, lire, () => false);
  if (!tel) {
    return (
      <dl>
        {items.map((x) => (
          <div key={x.q} className="sj2-faq__item"><dt>{x.q}</dt><dd>{x.a}</dd></div>
        ))}
      </dl>
    );
  }
  return (
    <div className="sj2-faq__acc">
      {items.map((x, k) => (
        <details key={x.q} className="sj2-faq__item sj2-faq__item--acc" open={k === 0}>
          <summary>{x.q}</summary>
          <p>{x.a}</p>
        </details>
      ))}
    </div>
  );
}
