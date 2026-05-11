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
          {/* Timeline + Metrics - FIRST (text before image) */}
          <div data-carousel-slide className="wa-split-copy" style={{ width: 360, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div className="uppercase-sm" style={{ color: 'var(--text-3)', marginBottom: 20 }}>
                {t('timeline.title')}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 32 }}>
                {[
                  { t: t('timeline.actions.0.t'), icon: t('timeline.actions.0.icon'), text: t('timeline.actions.0.text') },
                  { t: t('timeline.actions.1.t'), icon: t('timeline.actions.1.icon'), text: t('timeline.actions.1.text') },
                  { t: t('timeline.actions.2.t'), icon: t('timeline.actions.2.icon'), text: t('timeline.actions.2.text') },
                  { t: t('timeline.actions.3.t'), icon: t('timeline.actions.3.icon'), text: t('timeline.actions.3.text') },
                  { t: t('timeline.actions.4.t'), icon: t('timeline.actions.4.icon'), text: t('timeline.actions.4.text') },
                ].map((a) => (
                  <div key={a.text} style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.6 }}>
                    <span style={{ fontSize: 11, color: 'var(--text-3)', fontFamily: 'Geist Mono' }}>{a.t}</span>
                    <br />
                    <span style={{ fontSize: 16 }}>{a.icon}</span> {a.text}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', gap: 12, marginBottom: 24 }}>
                {[
                  { k: t('metrics.response.k'), l: t('metrics.response.l') },
                  { k: t('metrics.rating.k'), l: t('metrics.rating.l') },
                  { k: t('metrics.intervention.k'), l: t('metrics.intervention.l') },
                ].map((s) => (
                  <div key={s.l} style={{ flex: 1, textAlign: 'center' }}>
                    <div style={{ fontSize: 28, fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--text)' }}>
                      {s.k}
                    </div>
                    <div style={{ fontSize: 10, color: 'var(--text-3)', marginTop: 6, lineHeight: 1.3 }}>{s.l}</div>
                  </div>
                ))}
              </div>
              <Link href={{ pathname: '/whatsapp', query: { source: 'homepage-whatsapp-case' } }} className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                {t('cta')}
              </Link>
            </div>
          </div>

          {/* Phone - SECOND (image after text) */}
          <div data-carousel-slide className="wa-split-phone" style={{ display: 'flex', justifyContent: 'center' }}>
            <div
              style={{
                width: 340,
                height: 680,
                borderRadius: 38,
                padding: 10,
                background: 'linear-gradient(180deg, #f5f5f5, #e8e8e8)',
                boxShadow: '0 30px 60px rgba(0,0,0,0.2), 0 0 0 1px rgba(0,0,0,0.08) inset',
                border: '1px solid rgba(0,0,0,0.08)',
              }}
            >
              <div style={{ width: '100%', height: '100%', borderRadius: 32, background: '#fff', overflow: 'hidden', display: 'flex', flexDirection: 'column', position: 'relative' }}>
                {/* Dynamic Island */}
                <div style={{ position: 'absolute', top: 8, left: '50%', transform: 'translateX(-50%)', width: 110, height: 28, borderRadius: 14, background: '#000', zIndex: 10 }} />

                {/* Status Bar */}
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '14px 24px 8px', fontSize: 11, color: '#000', fontWeight: 600, fontFamily: 'var(--font-mono)' }}>
                  <span>14:32</span>
                  <span>📶 5G ⚡ 87%</span>
                </div>

                {/* WhatsApp Header */}
                <div style={{ background: '#075e54', padding: '14px 14px 12px', display: 'flex', alignItems: 'center', gap: 10, borderBottom: '1px solid rgba(0,0,0,0.1)' }}>
                  <span style={{ color: '#fff', fontSize: 18 }}>‹</span>
                  <div style={{ width: 38, height: 38, borderRadius: '50%', background: 'linear-gradient(135deg, #f4cf5e, #e6b022)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15, fontWeight: 700, color: '#1a1408', position: 'relative' }}>
                    S
                    <span style={{ position: 'absolute', bottom: 0, right: 0, width: 11, height: 11, borderRadius: '50%', background: '#10b981', border: '2px solid #075e54' }} />
                  </div>
                  <div style={{ flex: 1, lineHeight: 1.2 }}>
                    <div style={{ color: '#fff', fontSize: 13.5, fontWeight: 600 }}>{t('header.name')}</div>
                    <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: 10.5 }}>{t('header.status')}</div>
                  </div>
                  <span style={{ color: '#fff', fontSize: 15, opacity: 0.9 }}>📞</span>
                  <span style={{ color: '#fff', fontSize: 15, opacity: 0.9 }}>⋮</span>
                </div>

                {/* Messages Area */}
                <div style={{
                  flex: 1,
                  background: '#ece5dd',
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Cg fill='%23d9d2c5' opacity='0.4'%3E%3Cpath d='M30 5 L35 15 L30 25 L25 15 Z'/%3E%3Ccircle cx='10' cy='40' r='3'/%3E%3Ccircle cx='50' cy='30' r='2'/%3E%3C/g%3E%3C/svg%3E")`,
                  padding: '12px 10px',
                  overflowY: 'auto',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 6
                }}>
                  {visible.map((m, i) => (
                    <div
                      key={i}
                      style={{
                        alignSelf: m.from === 'guest' ? 'flex-end' : 'flex-start',
                        maxWidth: '80%',
                        background: m.from === 'guest' ? '#dcf8c6' : '#fff',
                        borderRadius: m.from === 'guest' ? '13px 13px 2px 13px' : '13px 13px 13px 2px',
                        padding: '8px 11px 5px',
                        fontSize: 13,
                        color: '#111',
                        lineHeight: 1.45,
                        boxShadow: '0 1px 2px rgba(0,0,0,0.15)',
                        animation: 'fade-up 0.4s ease both',
                        position: 'relative',
                        border: m.from === 'sojori' ? '1px solid rgba(244,207,94,0.2)' : 'none',
                      }}
                    >
                      {m.from === 'sojori' && <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 4, color: '#f4cf5e', fontSize: 9, fontWeight: 600, fontFamily: 'var(--font-mono)', letterSpacing: '0.6px' }}>✨ SOJORI AI</div>}
                      {m.text}
                      <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 3, marginTop: 3, fontSize: 9.5, color: '#667781' }}>
                        <span>{m.t}</span>
                        {m.from === 'guest' && <span style={{ color: '#53bdeb' }}>✓✓</span>}
                      </div>
                    </div>
                  ))}
                  {step < messages.length && (
                    <div style={{ alignSelf: 'flex-start', background: '#fff', borderRadius: '13px 13px 13px 2px', padding: '8px 11px', fontSize: 11, color: '#999', boxShadow: '0 1px 2px rgba(0,0,0,0.1)' }}>
                      <span style={{ animation: 'pulse-soft 1.2s ease-in-out infinite' }}>● ● ●</span>
                    </div>
                  )}
                </div>

                {/* Input Area */}
                <div style={{ background: '#f0f0f0', padding: '8px 10px', display: 'flex', alignItems: 'center', gap: 6, borderTop: '1px solid rgba(0,0,0,0.08)' }}>
                  <div style={{ flex: 1, background: '#fff', borderRadius: 22, padding: '9px 14px', color: 'rgba(0,0,0,0.5)', fontSize: 12.5, display: 'flex', alignItems: 'center', gap: 8, border: '1px solid rgba(0,0,0,0.08)' }}>
                    <span>😊</span>
                    <span>Message</span>
                    <span style={{ marginLeft: 'auto', opacity: 0.7 }}>📎 📷</span>
                  </div>
                  <div style={{ width: 38, height: 38, borderRadius: '50%', background: '#00a884', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 16 }}>🎤</div>
                </div>
              </div>
            </div>
          </div>
        </ScrollPaginationDots>
      </div>
      <style jsx>{`
        @media (max-width: 768px) {
          .whatsapp-case-section {
            padding: 60px 20px !important;
          }
          .whatsapp-case-grid-carousel {
            margin-top: 28px !important;
            gap: 24px !important;
          }
          /* Text before image on mobile */
          .wa-split-copy {
            order: -1;
          }
          .wa-split-phone {
            order: 1;
          }
        }

        @media (min-width: 769px) {
          .wa-split-copy,
          .wa-split-phone {
            order: unset !important;
          }
        }
      `}</style>
    </section>
  );
}
