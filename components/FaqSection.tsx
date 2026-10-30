import type { ReactNode } from 'react';

export type FaqItem = { q: string; a: string };

/**
 * Section FAQ avec balisage schema.org FAQPage.
 *
 * 2026-09-11 : aucune page du site ne portait de données structurées FAQ.
 * C'est ce qui permet à Google d'afficher les questions dépliables sous le
 * résultat — plus de surface dans la SERP, et une chance d'apparaître en
 * position zéro. Vérifié le 2026-09-11 : Welcomax, le concurrent direct sur
 * « PMS + ville », en porte déjà (FAQPage, Service, LocalBusiness…). Ce n'est
 * donc pas un avantage mais un prérequis pour rester comparable.
 *
 * Le JSON-LD doit refléter EXACTEMENT le texte visible, sinon Google
 * considère le balisage comme trompeur et peut pénaliser la page. D'où le
 * rendu des deux à partir de la même source `items`.
 */
export function FaqSection({
  title = 'Questions fréquentes',
  badge,
  items,
}: {
  title?: string;
  badge?: string;
  items: FaqItem[];
}): ReactNode {
  if (!items.length) return null;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((it) => ({
      '@type': 'Question',
      name: it.q,
      acceptedAnswer: { '@type': 'Answer', text: it.a },
    })),
  };

  return (
    <section style={{ padding: '40px 32px 80px' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        {badge ? (
          <div className="uppercase-sm" style={{ color: 'var(--text-3)', marginBottom: 12 }}>
            ● {badge}
          </div>
        ) : null}
        <h2
          style={{
            fontSize: 32,
            fontWeight: 700,
            letterSpacing: '-0.02em',
            marginBottom: 28,
          }}
        >
          {title}
        </h2>

        <div style={{ display: 'grid', gap: 12 }}>
          {items.map((it) => (
            <details key={it.q} className="card" style={{ padding: '18px 22px' }}>
              <summary
                style={{
                  cursor: 'pointer',
                  fontWeight: 600,
                  fontSize: 17,
                  listStyle: 'none',
                }}
              >
                {it.q}
              </summary>
              <p style={{ marginTop: 12, color: 'var(--text-2)', lineHeight: 1.6 }}>{it.a}</p>
            </details>
          ))}
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </section>
  );
}
