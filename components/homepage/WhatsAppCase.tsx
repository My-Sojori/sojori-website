"use client";

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { SojoriMark } from '../Logo';
import { SectionHead } from '../SharedComponents';
import { ScrollPaginationDots } from '@/components/shared/ScrollPaginationDots';

export function WhatsAppCase() {
  const t = useTranslations('home.whatsappCase');
  const [step, setStep] = useState(0);
  const messages = [
    { from: 'sojori', t: 'J-7', text: "👋 Hi Sarah! Welcome to Paris Montmartre. I'm Sojori, your AI concierge. I'll help you check in." },
    { from: 'guest', t: 'J-7', text: 'Hi! Thanks. Do I need to send anything?' },
    { from: 'sojori', t: 'J-3', text: "Just snap a photo of your passport — I'll handle the rest. KYC takes ~30s ✨" },
    { from: 'guest', t: 'J+2', text: "AC isn't cooling well, can you help?" },
    { from: 'sojori', t: 'J+2', text: "On it. Sophie (maintenance) ETA 25 min. I'll notify you when she's 5 min away 🛠️" },
    { from: 'sojori', t: 'J+1', text: 'Hope you had an amazing stay! Mind dropping a quick review? ⭐' },
  ];

  useEffect(() => {
    const t = setInterval(() => setStep((s) => (s + 1) % (messages.length + 1)), 2400);
    return () => clearInterval(t);
  }, []);

  const visible = messages.slice(0, step);

  return (
    <section
      className="whatsapp-case-section"
      style={{ padding: '110px 32px', background: 'linear-gradient(180deg, transparent, rgba(139,92,246,0.04) 50%, transparent)' }}
      id="whatsapp-ai"
    >
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <SectionHead
          badge={t('badge')}
          title={
            <>
              {t('title')} <span className="gradient-text">{t('titleGradient')}</span>
            </>
          }
          subtitle={t('subtitle')}
        />

        <ScrollPaginationDots
          itemCount={2}
          gap={16}
          peekCarousel
          className="whatsapp-case-grid-carousel"
          style={{ gap: 48, marginTop: 56, alignItems: 'center' }}
        >
          {/* Phone */}
          <div data-carousel-slide style={{ display: 'flex', justifyContent: 'center' }}>
            <div
              style={{
                width: 360,
                background: '#0a0a0a',
                borderRadius: 36,
                padding: 12,
                boxShadow: '0 30px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.06) inset',
                border: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              <div
                style={{
                  background: '#ece5dd',
                  borderRadius: 26,
                  minHeight: 560,
                  position: 'relative',
                  overflow: 'hidden',
                  backgroundImage:
                    'url("data:image/svg+xml;utf8,<svg xmlns=%27http://www.w3.org/2000/svg%27 width=%2740%22 height=%2740%22><path fill=%22%23d9d2c5%22 d=%22M0 0h2v2H0zm10 10h2v2h-2zm20 20h2v2h-2zm-10-10h2v2h-2z%22/></svg>")',
                }}
              >
                {/* WA header */}
                <div style={{ background: '#075e54', color: '#fff', padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 10 }}>
                  <SojoriMark size={28} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 600 }}>{t('header.name')}</div>
                    <div style={{ fontSize: 10.5, opacity: 0.85 }}>{t('header.status')}</div>
                  </div>
                  <span style={{ fontSize: 16 }}>📞</span>
                </div>
                {/* Messages */}
                <div style={{ padding: '14px 12px', display: 'flex', flexDirection: 'column', gap: 8, maxHeight: 480, overflow: 'hidden' }}>
                  {visible.map((m, i) => (
                    <div
                      key={i}
                      style={{
                        alignSelf: m.from === 'guest' ? 'flex-end' : 'flex-start',
                        maxWidth: '78%',
                        background: m.from === 'guest' ? '#dcf8c6' : '#fff',
                        borderRadius: m.from === 'guest' ? '12px 12px 2px 12px' : '12px 12px 12px 2px',
                        padding: '8px 11px',
                        fontSize: 12.5,
                        color: '#111',
                        lineHeight: 1.4,
                        boxShadow: '0 1px 1px rgba(0,0,0,0.1)',
                        animation: 'fade-up 0.4s ease both',
                      }}
                    >
                      {m.text}
                      <div style={{ fontSize: 9, color: '#667781', marginTop: 3, textAlign: 'right' }}>
                        {m.t} {m.from === 'sojori' && <span style={{ color: '#53bdeb' }}>✓✓</span>}
                      </div>
                    </div>
                  ))}
                  {step < messages.length && (
                    <div style={{ alignSelf: 'flex-start', background: '#fff', borderRadius: '12px 12px 12px 2px', padding: '8px 11px', fontSize: 11, color: '#999' }}>
                      <span style={{ animation: 'pulse-soft 1.2s ease-in-out infinite' }}>● ● ●</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Timeline + Metrics */}
          <div data-carousel-slide>
            <div className="uppercase-sm" style={{ color: 'var(--text-3)', marginBottom: 16 }}>
              {t('timeline.title')}
            </div>
            <div className="timeline-actions-grid" style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 32 }}>
              {[
                { t: t('timeline.actions.0.t'), icon: t('timeline.actions.0.icon'), text: t('timeline.actions.0.text'), color: 'var(--accent)' },
                { t: t('timeline.actions.1.t'), icon: t('timeline.actions.1.icon'), text: t('timeline.actions.1.text'), color: 'var(--primary)' },
                { t: t('timeline.actions.2.t'), icon: t('timeline.actions.2.icon'), text: t('timeline.actions.2.text'), color: 'var(--success)' },
                { t: t('timeline.actions.3.t'), icon: t('timeline.actions.3.icon'), text: t('timeline.actions.3.text'), color: 'var(--accent)' },
                { t: t('timeline.actions.4.t'), icon: t('timeline.actions.4.icon'), text: t('timeline.actions.4.text'), color: 'var(--primary)' },
              ].map((a) => (
                <div key={a.text} className="timeline-action-item" style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  <div className="mono" style={{ fontSize: 11, color: 'var(--text-3)', width: 32, letterSpacing: 0.6 }}>
                    {a.t}
                  </div>
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: 8,
                      background: 'var(--glass-strong)',
                      border: '1px solid var(--glass-border)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 14,
                    }}
                  >
                    {a.icon}
                  </div>
                  <div className="timeline-action-text" style={{ flex: 1, fontSize: 14, color: 'var(--text-2)' }}>{a.text}</div>
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: a.color, boxShadow: `0 0 8px ${a.color}` }} />
                </div>
              ))}
            </div>
            <ScrollPaginationDots
              itemCount={3}
              gap={12}
              peekCarousel
              className="sj-peek-sm whatsapp-metrics-carousel sj-mobile-hscroll"
              style={{ gap: 12, marginBottom: 24 }}
            >
              {[
                { k: t('metrics.response.k'), l: t('metrics.response.l') },
                { k: t('metrics.rating.k'), l: t('metrics.rating.l') },
                { k: t('metrics.intervention.k'), l: t('metrics.intervention.l') },
              ].map((s) => (
                <div key={s.l} data-carousel-slide className="glass" style={{ padding: 14, borderRadius: 12, textAlign: 'center' }}>
                  <div style={{ fontSize: 22, fontWeight: 700 }} className="gradient-text">
                    {s.k}
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 2 }}>{s.l}</div>
                </div>
              ))}
            </ScrollPaginationDots>
            <Link href={{ pathname: '/whatsapp', query: { source: 'homepage-whatsapp-case' } }} className="btn btn-primary">
              {t('cta')}
            </Link>
          </div>
        </ScrollPaginationDots>
      </div>
      <style jsx>{`
        @media (max-width: 768px) {
          .whatsapp-case-section {
            padding: 28px 20px 56px !important;
          }
          .whatsapp-case-grid-carousel {
            margin-top: 28px !important;
            gap: 16px !important;
          }

          /* Timeline 2-column layout on mobile */
          .timeline-actions-grid {
            display: grid !important;
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 10px !important;
            margin-bottom: 24px !important;
          }

          .timeline-action-item {
            gap: 8px !important;
          }

          .timeline-action-item .mono {
            font-size: 9px !important;
            width: 24px !important;
          }

          .timeline-action-item > div:nth-child(2) {
            width: 24px !important;
            height: 24px !important;
            font-size: 12px !important;
          }

          .timeline-action-text {
            font-size: 11px !important;
            line-height: 1.3 !important;
          }

          .timeline-action-item > div:last-child {
            width: 4px !important;
            height: 4px !important;
          }
        }
      `}</style>
    </section>
  );
}
