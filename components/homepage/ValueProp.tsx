"use client";

import { Check, SectionHead } from '../SharedComponents';

export function ValueProp() {
  const pillars = [
    {
      icon: '⚙️',
      accent: 'var(--accent)',
      accentRgb: '6, 182, 212',
      title: 'Modules d\'opération',
      sub: 'Le socle.',
      items: ['PMS · calendrier multi-bien', 'Channel Manager · 20+ OTAs', 'Pricing dynamique', 'Owner Portal', 'Analytics temps réel'],
      cta: 'Voir les modules',
    },
    {
      icon: '🧠',
      accent: 'var(--primary)',
      accentRgb: '230, 176, 34',
      title: 'Orchestration IA',
      sub: 'Le moteur.',
      items: ['Comprend chaque réservation', 'Décide qui fait quoi, quand, pourquoi', 'Coordonne voyageur, staff, propriétaire', 'Apprend de chaque séjour', '+20 décisions par séjour, sans intervention'],
      cta: 'Voir le moteur en action',
      featured: true,
    },
    {
      icon: '💬',
      accent: 'var(--secondary)',
      accentRgb: '139, 92, 246',
      title: 'WhatsApp · 4 apps',
      sub: 'Les surfaces.',
      items: ['Guest — le voyageur, en 12 langues', 'Staff — l\'équipe terrain', 'Admin — votre PMS dans la poche', 'Booking Direct — la résa sans intermédiaire'],
      cta: 'Voir les 4 surfaces',
    },
  ];

  return (
    <section style={{ padding: '110px 32px' }} id="features">
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <SectionHead
          badge="Architecture"
          title={
            <>
              Trois couches.
              <br />
              <span style={{ color: 'var(--text-3)', fontWeight: 600 }}>Une seule conversation.</span>
            </>
          }
          subtitle="Le moteur d'orchestration au centre. Les surfaces WhatsApp en façade. Les modules d'opération en fondation."
        />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, marginTop: 56 }} className="grid-resp">
          {pillars.map((p, i) => (
            <div
              key={i}
              className="glass"
              style={{
                padding: 32,
                borderRadius: 20,
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                borderColor: p.featured ? `rgba(${p.accentRgb}, 0.4)` : undefined,
                background: p.featured ? `linear-gradient(180deg, rgba(${p.accentRgb}, 0.06) 0%, rgba(255,255,255,0.02) 100%)` : undefined,
                position: 'relative',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.borderColor = `rgba(${p.accentRgb}, 0.6)`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = '';
                if (!p.featured) e.currentTarget.style.borderColor = '';
              }}
            >
              {p.featured && (
                <span
                  style={{
                    position: 'absolute',
                    top: 14,
                    right: 14,
                    padding: '3px 9px',
                    borderRadius: 999,
                    background: 'rgba(230,176,34,0.15)',
                    border: '1px solid rgba(230,176,34,0.4)',
                    color: 'var(--primary)',
                    fontSize: 10,
                    fontWeight: 600,
                    letterSpacing: 0.5,
                  }}
                >
                  SIGNATURE
                </span>
              )}
              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: 14,
                  background: `linear-gradient(135deg, rgba(${p.accentRgb}, 0.25), rgba(${p.accentRgb}, 0.08))`,
                  border: `1px solid rgba(${p.accentRgb}, 0.35)`,
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 24,
                  marginBottom: 18,
                }}
              >
                {p.icon}
              </div>
              <h3 style={{ marginBottom: 4 }}>{p.title}</h3>
              <div style={{ fontSize: 13, color: p.accent, fontWeight: 500, marginBottom: 18 }}>{p.sub}</div>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 22px', display: 'flex', flexDirection: 'column', gap: 10 }}>
                {p.items.map((it) => (
                  <li key={it} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 14, color: 'var(--text-2)', lineHeight: 1.5 }}>
                    <Check />
                    <span style={{ flex: 1, minWidth: 0 }}>{it}</span>
                  </li>
                ))}
              </ul>
              <a href="#" style={{ color: p.accent, textDecoration: 'none', fontSize: 13, fontWeight: 500 }}>
                {p.cta} →
              </a>
            </div>
          ))}
        </div>
      </div>
      <style>{`@media (max-width: 900px) { .grid-resp { grid-template-columns: 1fr !important; } }`}</style>
    </section>
  );
}
