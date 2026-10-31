'use client';

import { useId, useState, useSyncExternalStore, type ReactNode } from 'react';

const TEL = '(max-width: 640px)';
const abonner = (cb: () => void) => {
  try { const m = window.matchMedia(TEL); m.addEventListener('change', cb); return () => m.removeEventListener('change', cb); } catch { return () => {}; }
};
const lire = () => { try { return window.matchMedia(TEL).matches; } catch { return false; } };

/**
 * Une colonne du pied de page. Sur ordinateur (et dans le HTML rendu côté serveur) elle est toujours ouverte ;
 * sur téléphone elle est repliée sous son titre, qui devient un bouton.
 */
export function FooterCol({ id, titre, children }: { id: string; titre: string; children: ReactNode }) {
  const tel = useSyncExternalStore(abonner, lire, () => false);
  const [ouvert, setOuvert] = useState(false);
  const liste = useId();
  return (
    <nav className="sj2-footer__col sj2-footer__col--pliable" aria-labelledby={id}>
      <h2 id={id} className="sj2-eyebrow sj2-eyebrow--sm sj2-eyebrow--dim sj2-footer__titre">
        {tel ? (
          <button type="button" className="sj2-footer__bascule" aria-expanded={ouvert} aria-controls={liste} onClick={() => setOuvert(!ouvert)}>
            <span>{titre}</span><span aria-hidden="true">{ouvert ? '−' : '+'}</span>
          </button>
        ) : titre}
      </h2>
      <div id={liste} hidden={tel && !ouvert}>{children}</div>
    </nav>
  );
}
