"use client";

import { useTranslations } from 'next-intl';
import { SectionHead } from '../SharedComponents';
import { ScrollPaginationDots } from '@/components/shared/ScrollPaginationDots';

export function SocialProof() {
  const t = useTranslations('home.socialProof');
  const testimonials = [
    {
      stars: 5,
      quote: t('testimonials.0.quote'),
      name: t('testimonials.0.name'),
      role: t('testimonials.0.role'),
      loc: t('testimonials.0.loc'),
      initials: 'ML',
      color: 'linear-gradient(135deg, #f4cf5e, #e6b022)',
    },
    {
      stars: 5,
      quote: t('testimonials.1.quote'),
      name: t('testimonials.1.name'),
      role: t('testimonials.1.role'),
      loc: t('testimonials.1.loc'),
      initials: 'TD',
      color: 'linear-gradient(135deg, #8b5cf6, #6d28d9)',
    },
    {
      stars: 5,
      quote: t('testimonials.2.quote'),
      name: t('testimonials.2.name'),
      role: t('testimonials.2.role'),
      loc: t('testimonials.2.loc'),
      initials: 'TR',
      color: 'linear-gradient(135deg, #06b6d4, #0891b2)',
    },
  ];

  const metrics = [
    { k: t('metrics.0.k'), l: t('metrics.0.l') },
    { k: t('metrics.1.k'), l: t('metrics.1.l') },
    { k: t('metrics.2.k'), l: t('metrics.2.l') },
    { k: t('metrics.3.k'), l: t('metrics.3.l') },
  ];

  return (
    <section style={{ padding: '80px 32px' }} className="social-proof-section">
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <SectionHead badge={t('badge')} title={t('title')} />

        <ScrollPaginationDots
          itemCount={testimonials.length}
          gap={16}
          peekCarousel
          className="testimonials-carousel"
          style={{ marginTop: 56 }}
        >
          <div className="testimonials-desktop-row">
            {testimonials.map((tm, i) => (
              <div
                key={i}
                data-carousel-slide
                className="glass testimonial-card"
                style={{
                  padding: 32,
                  borderRadius: 20,
                  minHeight: 280,
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 0.3s ease',
                }}
              >
                <div style={{ display: 'flex', gap: 2, marginBottom: 18 }}>
                  {Array.from({ length: tm.stars }).map((_, k) => (
                    <span key={k} style={{ color: '#fbbf24', fontSize: 16, textShadow: '0 0 8px rgba(251,191,36,0.4)' }}>
                      ★
                    </span>
                  ))}
                </div>
                <p style={{ fontSize: 16, lineHeight: 1.55, color: 'var(--text)', marginBottom: 24, flex: 1 }}>« {tm.quote} »</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, paddingTop: 18, borderTop: '1px solid var(--glass-border)' }} className="testimonial-author">
                  <div
                    style={{
                      width: 42,
                      height: 42,
                      borderRadius: '50%',
                      background: tm.color,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 700,
                      fontSize: 13,
                      color: '#1a1408',
                    }}
                  >
                    {tm.initials}
                  </div>
                  <div style={{ flex: 1, lineHeight: 1.3 }}>
                    <div style={{ fontWeight: 600, fontSize: 14 }}>{tm.name}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-3)' }}>{tm.role}</div>
                  </div>
                  <div className="mono testimonial-loc" style={{ fontSize: 10, color: 'var(--text-3)', letterSpacing: 0.6 }}>
                    {tm.loc}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollPaginationDots>

        <ScrollPaginationDots
          itemCount={metrics.length}
          gap={12}
          peekCarousel
          className="sj-peek-sm metrics-carousel"
          style={{ marginTop: 64 }}
        >
          <div className="metrics-desktop-row">
            {metrics.map((s, i) => (
              <div
                key={i}
                data-carousel-slide
                style={{ textAlign: 'center', padding: '20px 12px', borderLeft: i ? '1px solid var(--glass-border)' : 'none' }}
                className="metric-item"
              >
                <div style={{ fontSize: 48, fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1 }} className="gradient-text metric-value">
                  {s.k}
                </div>
                <div style={{ fontSize: 13, color: 'var(--text-3)', marginTop: 8 }}>{s.l}</div>
              </div>
            ))}
          </div>
        </ScrollPaginationDots>
      </div>
      <style jsx>{`
        .testimonials-desktop-row,
        .metrics-desktop-row {
          display: grid;
          gap: 20px;
          width: 100%;
        }
        .testimonials-desktop-row {
          grid-template-columns: repeat(3, 1fr);
        }
        .metrics-desktop-row {
          grid-template-columns: repeat(4, 1fr);
        }

        @media (max-width: 768px) {
          .social-proof-section { padding: 56px 20px !important; }
          .testimonials-carousel { margin-top: 36px !important; }
          .testimonial-card {
            padding: 24px !important;
            min-height: auto !important;
          }
          .testimonial-loc { display: none !important; }
          .metrics-carousel { margin-top: 48px !important; }
          .metric-item { border-left: none !important; border-top: none !important; padding: 16px 8px !important; }
          .metric-value { font-size: 36px !important; }
        }
      `}</style>
    </section>
  );
}
