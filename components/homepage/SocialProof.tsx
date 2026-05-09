"use client";

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { SectionHead } from '../SharedComponents';

export function SocialProof() {
  const t = useTranslations('home.socialProof');
  const [active, setActive] = useState(0);
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

  useEffect(() => {
    const t = setInterval(() => setActive((a) => (a + 1) % testimonials.length), 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <section style={{ padding: '110px 32px' }} className="social-proof-section">
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <SectionHead badge={t('badge')} title={t('title')} />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, marginTop: 56 }} className="grid-resp testimonials-grid">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="glass testimonial-card"
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
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, paddingTop: 18, borderTop: '1px solid var(--glass-border)' }} className="testimonial-author">
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
                <div className="mono testimonial-loc" style={{ fontSize: 10, color: 'var(--text-3)', letterSpacing: 0.6 }}>
                  {t.loc}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dots */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 28 }} className="testimonial-dots">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              style={{
                width: active === i ? 24 : 8,
                height: 8,
                minHeight: 44,
                minWidth: 44,
                borderRadius: 4,
                background: active === i ? 'var(--primary)' : 'rgba(255,255,255,0.18)',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
              aria-label={`View testimonial ${i + 1}`}
            />
          ))}
        </div>

        {/* Metrics */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20, marginTop: 64 }} className="grid-resp metrics-grid">
          {[
            { k: t('metrics.0.k'), l: t('metrics.0.l') },
            { k: t('metrics.1.k'), l: t('metrics.1.l') },
            { k: t('metrics.2.k'), l: t('metrics.2.l') },
            { k: t('metrics.3.k'), l: t('metrics.3.l') },
          ].map((s, i) => (
            <div key={i} style={{ textAlign: 'center', padding: '20px 12px', borderLeft: i ? '1px solid var(--glass-border)' : 'none' }} className="metric-item">
              <div style={{ fontSize: 48, fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1 }} className="gradient-text metric-value">
                {s.k}
              </div>
              <div style={{ fontSize: 13, color: 'var(--text-3)', marginTop: 8 }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>
      <style jsx>{`
        @media (max-width: 900px) {
          .testimonials-grid {
            display: flex !important;
            overflow-x: auto !important;
            scroll-snap-type: x mandatory !important;
            -webkit-overflow-scrolling: touch !important;
            gap: 16px !important;
            padding-bottom: 20px !important;
          }
          .testimonials-grid > * {
            min-width: 300px !important;
            max-width: 320px !important;
            flex-shrink: 0 !important;
            scroll-snap-align: start !important;
          }
          .metrics-grid {
            display: flex !important;
            overflow-x: auto !important;
            scroll-snap-type: x mandatory !important;
            -webkit-overflow-scrolling: touch !important;
            gap: 16px !important;
            padding-bottom: 20px !important;
          }
          .metrics-grid > * {
            min-width: 160px !important;
            max-width: 180px !important;
            flex-shrink: 0 !important;
            scroll-snap-align: start !important;
          }
        }
        @media (max-width: 768px) {
          .social-proof-section { padding: 70px 20px !important; }
          .testimonials-grid { gap: 16px !important; margin-top: 40px !important; }
          .testimonial-card {
            padding: 24px !important;
            min-height: auto !important;
            transform: none !important;
          }
          .testimonial-loc { display: none !important; }
          .testimonial-dots button {
            min-height: 44px !important;
            min-width: 44px !important;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .metrics-grid { gap: 16px !important; margin-top: 48px !important; }
          .metric-item { border-left: none !important; border-top: none !important; padding: 16px 8px !important; }
          .metric-value { font-size: 36px !important; }
        }
        ::-webkit-scrollbar { height: 8px; }
        ::-webkit-scrollbar-track { background: rgba(255,255,255,0.05); border-radius: 4px; }
        ::-webkit-scrollbar-thumb { background: rgba(244,207,94,0.3); border-radius: 4px; }
      `}</style>
    </section>
  );
}
