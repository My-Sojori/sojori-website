'use client';

import { useState } from 'react';

/**
 * La liste des modules du PMS. Sur ordinateur, chaque carte montre son titre et son détail. Sur téléphone la liste est
 * compacte (deux colonnes de titres) et le détail s'ouvre au toucher ; le texte reste dans le HTML.
 */
export function PmsListe({ items }: { items: { name: string; desc: string }[] }) {
  const [ouvert, setOuvert] = useState<number | null>(null);
  return (
    <ul className="sj2-pms">
      {items.map((m, k) => (
        <li key={m.name} className={ouvert === k ? 'is-ouvert' : undefined}>
          <h3>{m.name}</h3>
          <p>{m.desc}</p>
          <button type="button" className="sj2-pms__bascule" aria-expanded={ouvert === k} aria-label={m.name} onClick={() => setOuvert(ouvert === k ? null : k)} />
        </li>
      ))}
    </ul>
  );
}
