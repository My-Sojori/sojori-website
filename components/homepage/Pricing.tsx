"use client";

import { useTranslations } from 'next-intl';
import { Check, SectionHead } from '../SharedComponents';

export function Pricing() {
  const t = useTranslations('home.pricingPreview');
  const tiers = [
    {
      name: t('tiers.0.name'),
      tagline: t('tiers.0.tagline'),
      range: t('tiers.0.range'),
      price: t('tiers.0.price'),
      period: t('tiers.0.period'),
      items: [
        t('tiers.0.items.0'),
        t('tiers.0.items.1'),
        t('tiers.0.items.2'),
        t('tiers.0.items.3'),
        t('tiers.0.items.4')
      ],
      cta: t('tiers.0.cta'),
      popular: false,
    },
    {
      name: t('tiers.1.name'),
      tagline: t('tiers.1.tagline'),
      range: t('tiers.1.range'),
      price: t('tiers.1.price'),
      period: t('tiers.1.period'),
      items: [
        t('tiers.1.items.0'),
        t('tiers.1.items.1'),
        t('tiers.1.items.2'),
        t('tiers.1.items.3'),
        t('tiers.1.items.4'),
        t('tiers.1.items.5'),
        t('tiers.1.items.6')
      ],
      cta: t('tiers.1.cta'),
      popular: true,
      badge: t('tiers.1.badge'),
    },
    {
      name: t('tiers.2.name'),
      tagline: t('tiers.2.tagline'),
      range: t('tiers.2.range'),
      price: t('tiers.2.price'),
      period: '',
      items: [
        t('tiers.2.items.0'),
        t('tiers.2.items.1'),
        t('tiers.2.items.2'),
        t('tiers.2.items.3'),
        t('tiers.2.items.4'),
        t('tiers.2.items.5')
      ],
      cta: t('tiers.2.cta'),
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
      className="pricing-section"
    >
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <SectionHead
          badge={t('badge')}
          title={t('title')}
          subtitle={t('subtitle')}
        />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, marginTop: 56, alignItems: 'stretch' }} className="grid-resp pricing-grid">
          {tiers.map((t, i) => (
            <div
              key={i}
              className="glass pricing-card"
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
                }}>{t.badge}</span>
              )}
              <div className="uppercase-sm" style={{ color: t.popular ? 'var(--primary-deep)' : 'var(--text-3)', marginBottom: 8 }}>
                {t.name}
              </div>
              <div style={{ fontSize: 13, color: 'var(--text-3)', fontStyle: 'italic', marginBottom: 8 }}>{t.tagline}</div>
              <div style={{ fontSize: 14, color: 'var(--text-2)', marginBottom: 20 }}>{t.range}</div>
              <div style={{ marginBottom: 28, display: 'flex', alignItems: 'baseline', gap: 4 }} className="pricing-amount">
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
          {t('footer')}
        </div>
      </div>
      <style jsx>{`
        @media (max-width: 900px) {
          .pricing-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 768px) {
          .pricing-section { padding: 70px 20px !important; }
          .pricing-grid { gap: 24px !important; margin-top: 40px !important; }
          .pricing-card {
            padding: 28px 24px !important;
            transform: none !important;
            width: 100%;
            max-width: 420px;
            margin: 0 auto;
          }
          .pricing-amount span:nth-child(2) { font-size: 40px !important; }
        }
      `}</style>
    </section>
  );
}
