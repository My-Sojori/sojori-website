"use client";

import { useState, useEffect } from 'react';
import { SectionHead } from '../SharedComponents';

export function SocialProof() {
  const [active, setActive] = useState(0);
  const testimonials = [
    {
      stars: 5,
      quote: 'Avant Sojori : 4h/jour sur les messages WhatsApp. Après Sojori : 20 min/jour. Le reste est automatique.',
      name: 'Marie L.',
      role: 'Property Manager · 12 propriétés',
      loc: 'Paris',
      initials: 'ML',
      color: 'linear-gradient(135deg, #f4cf5e, #e6b022)',
    },
    {
      stars: 5,
      quote: 'Le seul PMS qui parle vraiment aux guests. Mes 5★ sont passés de 78% à 94% en 3 mois.',
      name: 'Thomas D.',
      role: 'Property owner · 7 propriétés',
      loc: 'Paris',
      initials: 'KT',
      color: 'linear-gradient(135deg, #8b5cf6, #6d28d9)',
    },
    {
      stars: 5,
      quote: 'Channel Manager, AI, staff coordination… on a remplacé 4 outils par Sojori. Et ça marche mieux.',
      name: 'Thomas R.',
      role: 'CEO · 84 propriétés',
      loc: 'Lisbonne',
      initials: 'TR',
      color: 'linear-gradient(135deg, #06b6d4, #0891b2)',
    },
  ];

  useEffect(() => {
    const t = setInterval(() => setActive((a) => (a + 1) % testimonials.length), 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <section style={{ padding: '110px 32px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <SectionHead badge="⭐ Ils nous font confiance" title="Des property managers qui automatisent déjà." />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, marginTop: 56 }} className="grid-resp">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="glass"
              style={{
                padding: 32,
                borderRadius: 20,
                minHeight: 280,
                display: 'flex',
                flexDirection: 'column',
                transition: 'all 0.3s ease',
                borderColor: active === i ? 'rgba(230,176,34,0.35)' : undefined,
                transform: active === i ? 'translateY(-4px)' : undefined,
                boxShadow: active === i ? '0 20px 40px rgba(0,0,0,0.4)' : undefined,
              }}
            >
              <div style={{ display: 'flex', gap: 2, marginBottom: 18 }}>
                {Array.from({ length: t.stars }).map((_, k) => (
                  <span key={k} style={{ color: '#fbbf24', fontSize: 16, textShadow: '0 0 8px rgba(251,191,36,0.4)' }}>
                    ★
                  </span>
                ))}
              </div>
              <p style={{ fontSize: 16, lineHeight: 1.55, color: 'var(--text)', marginBottom: 24, flex: 1 }}>« {t.quote} »</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, paddingTop: 18, borderTop: '1px solid var(--glass-border)' }}>
                <div
                  style={{
                    width: 42,
                    height: 42,
                    borderRadius: '50%',
                    background: t.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontSize: 13,
                    color: '#1a1408',
                  }}
                >
                  {t.initials}
                </div>
                <div style={{ flex: 1, lineHeight: 1.3 }}>
                  <div style={{ fontWeight: 600, fontSize: 14 }}>{t.name}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-3)' }}>{t.role}</div>
                </div>
                <div className="mono" style={{ fontSize: 10, color: 'var(--text-3)', letterSpacing: 0.6 }}>
                  {t.loc}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dots */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 28 }}>
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              style={{
                width: active === i ? 24 : 8,
                height: 8,
                borderRadius: 4,
                background: active === i ? 'var(--primary)' : 'rgba(255,255,255,0.18)',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
            />
          ))}
        </div>

        {/* Metrics */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20, marginTop: 64 }} className="grid-resp">
          {[
            { k: '94%', l: 'Tâches automatisées' },
            { k: '<30s', l: 'Réponse moyenne' },
            { k: '4.9/5', l: 'Rating guests' },
            { k: '850+', l: 'Property Managers' },
          ].map((s, i) => (
            <div key={i} style={{ textAlign: 'center', padding: '20px 12px', borderLeft: i ? '1px solid var(--glass-border)' : 'none' }}>
              <div style={{ fontSize: 48, fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1 }} className="gradient-text">
                {s.k}
              </div>
              <div style={{ fontSize: 13, color: 'var(--text-3)', marginTop: 8 }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
