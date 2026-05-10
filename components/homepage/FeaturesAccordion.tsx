"use client";

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { Check, SectionHead } from '../SharedComponents';

export function FeaturesAccordion() {
  const t = useTranslations('home.featuresAccordion');
  const [open, setOpen] = useState(2);

  const features = [
    {
      icon: t('features.0.icon'),
      title: t('features.0.title'),
      items: [
        t('features.0.items.0'),
        t('features.0.items.1'),
        t('features.0.items.2'),
        t('features.0.items.3'),
        t('features.0.items.4')
      ],
      link: '/dashboard-app' as const,
    },
    {
      icon: t('features.1.icon'),
      title: t('features.1.title'),
      items: [
        t('features.1.items.0'),
        t('features.1.items.1'),
        t('features.1.items.2'),
        t('features.1.items.3'),
        t('features.1.items.4')
      ],
      link: '/channel-manager' as const,
    },
    {
      icon: t('features.2.icon'),
      title: t('features.2.title'),
      items: [
        t('features.2.items.0'),
        t('features.2.items.1'),
        t('features.2.items.2'),
        t('features.2.items.3'),
        t('features.2.items.4')
      ],
      link: '/whatsapp' as const,
    },
    {
      icon: t('features.3.icon'),
      title: t('features.3.title'),
      items: [
        t('features.3.items.0'),
        t('features.3.items.1'),
        t('features.3.items.2'),
        t('features.3.items.3'),
        t('features.3.items.4')
      ],
      link: '/dynamic-pricing' as const,
    },
    {
      icon: t('features.4.icon'),
      title: t('features.4.title'),
      items: [
        t('features.4.items.0'),
        t('features.4.items.1'),
        t('features.4.items.2'),
        t('features.4.items.3'),
        t('features.4.items.4')
      ],
      link: '/owner-portal' as const,
    },
    {
      icon: t('features.5.icon'),
      title: t('features.5.title'),
      items: [
        t('features.5.items.0'),
        t('features.5.items.1'),
        t('features.5.items.2'),
        t('features.5.items.3'),
        t('features.5.items.4')
      ],
      link: undefined,
    },
  ];

  return (
    <section style={{ padding: '110px 32px' }} className="features-accordion-section">
      <div style={{ maxWidth: 920, margin: '0 auto' }}>
        <SectionHead
          badge={t('badge')}
          title={t('title')}
          subtitle={t('subtitle')}
        />
        <div style={{ marginTop: 48, display: 'flex', flexDirection: 'column', gap: 12 }}>
          {features.map((f, i) => {
            const isOpen = open === i;
            return (
              <div
                key={i}
                className="glass"
                style={{
                  borderRadius: 16,
                  overflow: 'hidden',
                  borderColor: isOpen ? 'rgba(230,176,34,0.4)' : undefined,
                  transition: 'all 0.3s ease',
                }}
              >
                <button
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  className="accordion-button"
                  style={{
                    width: '100%',
                    textAlign: 'left',
                    background: 'transparent',
                    border: 'none',
                    padding: '20px 28px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 16,
                    cursor: 'pointer',
                    color: '#fff',
                    fontFamily: 'inherit',
                    minHeight: 44,
                  }}
                >
                  <span style={{ fontSize: 22 }} className="accordion-icon">{f.icon}</span>
                  <span style={{ flex: 1, fontSize: 16, fontWeight: 600 }} className="accordion-title">{f.title}</span>
                  <span
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: '50%',
                      background: isOpen ? 'var(--primary)' : 'rgba(255,255,255,0.06)',
                      color: isOpen ? '#1a1408' : '#fff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 14,
                      fontWeight: 700,
                      transition: 'all 0.3s ease',
                      transform: isOpen ? 'rotate(45deg)' : 'rotate(0)',
                    }}
                  >
                    +
                  </span>
                </button>
                {isOpen && (
                  <div style={{ padding: '0 28px 24px 68px', animation: 'fade-up 0.4s ease' }} className="accordion-content">
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px 24px' }} className="accordion-items sj-mobile-hscroll">
                      {f.items.map((it) => (
                        <li key={it} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 14, color: 'var(--text-2)' }}>
                          <Check />
                          <span>{it}</span>
                        </li>
                      ))}
                    </ul>
                    {f.link ? (
                      <Link
                        href={{ pathname: f.link, query: { source: 'homepage-features-accordion' } }}
                        style={{
                          color: 'var(--primary)',
                          textDecoration: 'none',
                          fontSize: 13,
                          fontWeight: 600,
                          marginTop: 16,
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 6,
                          padding: '8px 14px',
                          borderRadius: 7,
                          background: 'rgba(244,207,94,0.1)',
                          border: '1px solid rgba(244,207,94,0.3)',
                        }}
                      >
                        {t('features.0.cta')}
                      </Link>
                    ) : (
                      <span style={{ color: 'var(--text-3)', fontSize: 13, fontWeight: 500, marginTop: 16, display: 'inline-block', fontStyle: 'italic' }}>
                        {t('features.0.comingSoon')}
                      </span>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      <style jsx>{`
        @media (max-width: 900px) {
          .accordion-items {
            display: flex !important;
            overflow-x: auto !important;
            scroll-snap-type: x mandatory !important;
            -webkit-overflow-scrolling: touch !important;
            gap: 16px !important;
            padding-bottom: 20px !important;
          }
          .accordion-items > * {
            min-width: min(280px, 85vw) !important;
            max-width: min(300px, 90vw) !important;
            flex-shrink: 0 !important;
            scroll-snap-align: center !important;
          }
        }
        @media (max-width: 768px) {
          .features-accordion-section { padding: 70px 20px !important; }
          .accordion-button { padding: 16px 20px !important; gap: 12px !important; }
          .accordion-icon { font-size: 20px !important; }
          .accordion-title { font-size: 15px !important; }
          .accordion-content { padding: 0 20px 20px 20px !important; }
        }
      `}</style>
    </section>
  );
}
