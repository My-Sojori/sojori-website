"use client";

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { Check, SectionHead } from '../SharedComponents';
import { ScrollPaginationDots } from '@/components/shared/ScrollPaginationDots';

export function ValueProp() {
  const t = useTranslations('home.valueProp');
  const pillars = [
    {
      icon: t('modules.icon'),
      accent: 'var(--accent)',
      accentRgb: '6, 182, 212',
      title: t('modules.title'),
      sub: t('modules.sub'),
      items: [
        t('modules.items.0'),
        t('modules.items.1'),
        t('modules.items.2'),
        t('modules.items.3'),
        t('modules.items.4')
      ],
      cta: t('modules.cta'),
      href: '/pms' as const,
    },
    {
      icon: t('orchestration.icon'),
      accent: 'var(--primary)',
      accentRgb: '230, 176, 34',
      title: t('orchestration.title'),
      sub: t('orchestration.sub'),
      items: [
        t('orchestration.items.0'),
        t('orchestration.items.1'),
        t('orchestration.items.2'),
        t('orchestration.items.3'),
        t('orchestration.items.4')
      ],
      cta: t('orchestration.cta'),
      featured: true,
      href: '/inbox' as const,
    },
    {
      icon: t('whatsapp.icon'),
      accent: 'var(--secondary)',
      accentRgb: '139, 92, 246',
      title: t('whatsapp.title'),
      sub: t('whatsapp.sub'),
      items: [
        t('whatsapp.items.0'),
        t('whatsapp.items.1'),
        t('whatsapp.items.2'),
        t('whatsapp.items.3')
      ],
      cta: t('whatsapp.cta'),
      href: '/whatsapp' as const,
    },
  ];

  return (
    <section style={{ padding: '110px 32px' }} id="features" className="value-prop-section">
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <SectionHead
          badge={t('badge')}
          title={
            <>
              {t('title')}
              <br />
              <span style={{ color: 'var(--text-3)', fontWeight: 600 }}>{t('titleSub')}</span>
            </>
          }
          subtitle={t('subtitle')}
        />

        <ScrollPaginationDots
          itemCount={pillars.length}
          gap={16}
          peekCarousel
          className="value-prop-carousel"
          style={{ marginTop: 56 }}
        >
          <div className="value-prop-slides-row">
          {pillars.map((p, i) => (
            <div
              key={i}
              data-carousel-slide
              className="glass value-prop-card"
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
                  {t('orchestration.badge')}
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
              <Link
                href={{ pathname: p.href, query: { source: 'homepage-value-prop' } }}
                style={{ color: p.accent, textDecoration: 'none', fontSize: 13, fontWeight: 500 }}
              >
                {p.cta} →
              </Link>
            </div>
          ))}
          </div>
        </ScrollPaginationDots>
      </div>
      <style jsx>{`
        .value-prop-slides-row {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          width: 100%;
        }

        @media (max-width: 768px) {
          .value-prop-section { padding: 48px 20px 20px !important; }
          .value-prop-carousel {
            margin-top: 32px !important;
          }
          .value-prop-card { padding: 24px !important; }
          .value-prop-card:hover { transform: none !important; }
        }
      `}</style>
    </section>
  );
}
