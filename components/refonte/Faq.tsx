import { JsonLd } from './JsonLd';
import { FaqListe } from './FaqListe';

export type FaqItem = { q: string; a: string };

/**
 * FAQ dépliée sur ordinateur, accordéon natif sur téléphone (texte toujours dans le HTML) + FAQPage JSON-LD tirés de la même
 * source : texte et balisage ne divergent pas.
 */
export function Faq({ eyebrow, title, items, id }: { eyebrow?: string; title: string; items: FaqItem[]; id: string }) {
  return (
    <section className="sj2-wrap sj2-faq" aria-labelledby={id}>
      {eyebrow && <span className="sj2-eyebrow" style={{ display: 'block', marginBottom: 14 }}>{eyebrow}</span>}
      <h2 id={id} className="sj2-h2 sj2-h2--faq">{title}</h2>
      <FaqListe items={items} />
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: items.map((x) => ({ '@type': 'Question', name: x.q, acceptedAnswer: { '@type': 'Answer', text: x.a } })),
      }} />
    </section>
  );
}
