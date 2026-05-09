"use client";

import { Check, SectionHead } from '../SharedComponents';

export function Pricing() {
  const tiers = [
    {
      name: 'STARTER',
      tagline: 'Pour démarrer.',
      range: '2-10 propriétés',
      price: '49',
      period: '/propriété/mois',
      items: ['Module PMS', 'Channel Manager (5 OTAs)', 'WhatsApp AI basique', 'Support email', '1 utilisateur staff'],
      cta: 'Essayer gratuitement',
      popular: false,
    },
    {
      name: 'GROWTH',
      tagline: 'Pour orchestrer.',
      range: '11-50 propriétés',
      price: '39',
      period: '/propriété/mois',
      items: ['Tout Starter +', 'Channel Manager illimité (20+ OTAs)', 'WhatsApp AI avancé', 'API access', 'White label', 'Multi-utilisateurs', 'Support prioritaire 24/7'],
      cta: 'Essayer gratuitement',
      popular: true,
    },
    {
      name: 'SCALE',
      tagline: 'Pour piloter à l\'échelle.',
      range: '51-2000+ propriétés',
      price: 'Sur mesure',
      period: '',
      items: ['Tout Growth +', 'Account manager dédié', 'SLA premium 99.99%', 'Intégrations custom', 'Onboarding sur site', 'Formation équipe'],
      cta: 'Contacter les ventes',
      popular: false,
    },
  ];

  return (
    <section
      style={{
        padding: '110px 32px',
        // Aurora Soft : remplace l'ancien fond dark `rgba(15,15,20,0.6)`
        background: 'linear-gradient(180deg, transparent, rgba(245,243,236,0.6) 30%, rgba(245,243,236,0.6) 70%, transparent)',
      }}
      id="pricing"
    >
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <SectionHead
          badge="Tarification"
          title="Transparente. Sans surprises."
          subtitle="Pas de frais cachés. Annulation facile à tout moment. 14 jours d'essai gratuit."
        />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, marginTop: 56, alignItems: 'stretch' }} className="grid-resp">
          {tiers.map((t, i) => (
            <div
              key={i}
              className="glass"
              style={{
                padding: '36px 30px',
                borderRadius: 20,
                position: 'relative',
                borderColor: t.popular ? 'rgba(230,176,34,0.55)' : undefined,
                borderWidth: t.popular ? 2 : 1,
                background: t.popular
                  ? 'linear-gradient(180deg, rgba(244,207,94,0.18) 0%, rgba(255,255,255,0.85) 100%)'
                  : undefined,
                transform: t.popular ? 'scale(1.03)' : 'none',
                zIndex: t.popular ? 2 : 1,
                display: 'flex',
                flexDirection: 'column',
                boxShadow: t.popular
                  ? '0 1px 0 rgba(255,255,255,.9) inset, 0 30px 60px -20px rgba(230,176,34,0.30)'
                  : undefined,
              }}
            >
              {t.popular && (
                <span style={{
                  position: 'absolute', top: -14, left: '50%', transform: 'translateX(-50%)',
                  padding: '5px 14px', borderRadius: 999,
                  background: 'linear-gradient(135deg, #f4cf5e, #e6b022)',
                  color: '#1a1408', fontSize: 11, fontWeight: 700, letterSpacing: 0.6,
                  whiteSpace: 'nowrap',
                  boxShadow: '0 6px 16px rgba(230,176,34,0.4)',
                }}>★ POPULAR</span>
              )}
              <div className="uppercase-sm" style={{ color: t.popular ? 'var(--primary-deep)' : 'var(--text-3)', marginBottom: 8 }}>
                {t.name}
              </div>
              <div style={{ fontSize: 13, color: 'var(--text-3)', fontStyle: 'italic', marginBottom: 8 }}>{t.tagline}</div>
              <div style={{ fontSize: 14, color: 'var(--text-2)', marginBottom: 20 }}>{t.range}</div>
              <div style={{ marginBottom: 28, display: 'flex', alignItems: 'baseline', gap: 4 }}>
                {t.price === 'Sur mesure' ? (
                  <span style={{ fontSize: 32, fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--text)' }}>{t.price}</span>
                ) : (
                  <>
                    <span style={{ fontSize: 18, color: 'var(--text-3)' }}>€</span>
                    <span style={{ fontSize: 48, fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1, color: 'var(--text)' }}>{t.price}</span>
                    <span style={{ fontSize: 13, color: 'var(--text-3)', marginLeft: 4 }}>{t.period}</span>
                  </>
                )}
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 28px', flex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}>
                {t.items.map((it) => (
                  <li key={it} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 14, color: 'var(--text-2)', lineHeight: 1.5 }}>
                    <Check />
                    <span style={{ flex: 1, minWidth: 0 }}>{it}</span>
                  </li>
                ))}
              </ul>
              <a href="#" className={`btn ${t.popular ? 'btn-primary' : 'btn-ghost'}`} style={{ width: '100%', justifyContent: 'center' }}>
                {t.cta} →
              </a>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: 32, fontSize: 13, color: 'var(--text-3)' }}>
          ✓ 14 jours d&apos;essai gratuit · ✓ Annulation facile · ✓ Setup en moins de 7 jours
        </div>
      </div>
    </section>
  );
}
