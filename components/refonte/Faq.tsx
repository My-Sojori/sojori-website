import { JsonLd } from './JsonLd';

export type FaqItem = { q: string; a: string };

/** FAQ visible (jamais repliée) + FAQPage JSON-LD tirés de la même source : texte et balisage ne divergent pas. */
export function Faq({ eyebrow, title, items, id }: { eyebrow?: string; title: string; items: FaqItem[]; id: string }) {
  return (
    <section className="sj2-wrap sj2-faq" aria-labelledby={id}>
      {eyebrow && <span className="sj2-eyebrow" style={{ display: 'block', marginBottom: 14 }}>{eyebrow}</span>}
      <h2 id={id} className="sj2-h2 sj2-h2--faq">{title}</h2>
      <dl>
        {items.map((x) => (
          <div key={x.q} className="sj2-faq__item"><dt>{x.q}</dt><dd>{x.a}</dd></div>
        ))}
      </dl>
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: items.map((x) => ({ '@type': 'Question', name: x.q, acceptedAnswer: { '@type': 'Answer', text: x.a } })),
      }} />
    </section>
  );
}
