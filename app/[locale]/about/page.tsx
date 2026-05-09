'use client';

import { BackgroundEffects } from '@/components/BackgroundEffects';
import { PageHeader, PageFooter } from '@/components/SharedComponents';
import Link from 'next/link';
import React from 'react';
import { useTranslations } from 'next-intl';

export default function AboutPage() {
  const t = useTranslations('about');
  const tCommon = useTranslations('common');

  const marqueeItems = t.raw('marquee.items') as string[];

  return (
    <>
      <style jsx>{`
        @keyframes scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }

        @media (max-width: 920px) {
          .hero-grid { grid-template-columns: 1fr !important; }
          .values-grid { grid-template-columns: 1fr !important; }
          .timeline-track { grid-template-columns: 1fr !important; }
          .timeline-track::before { display: none !important; }
          .team-grid { grid-template-columns: 1fr !important; }
          .founder-card { grid-template-columns: 1fr !important; text-align: center !important; }
        }

        @media (max-width: 768px) {
          section { padding: 60px 20px 40px !important; }

          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }

          div[style*="padding: '80px 32px 40px'"] { padding: 60px 20px 28px !important; }
          div[style*="padding: '120px 32px 100px'"] { padding: 80px 20px 60px !important; }
          div[style*="padding: '100px 32px'"] { padding: 60px 20px !important; }
          div[style*="padding: '110px 32px'"] { padding: 70px 20px !important; }
          div[style*="padding: '80px 32px'"] { padding: 60px 20px !important; }
          div[style*="padding: '120px 32px'"] { padding: 80px 20px !important; }

          div[style*="gridTemplateColumns: '1.4fr 1fr'"] {
            grid-template-columns: 1fr !important;
          }

          div[style*="gridTemplateColumns: '1fr 1fr'"] {
            display: flex !important;
            overflow-x: auto !important;
            scroll-snap-type: x mandatory !important;
            -webkit-overflow-scrolling: touch !important;
            gap: 16px !important;
            padding-bottom: 20px !important;
          }

          div[style*="gridTemplateColumns: '1fr 1fr'"] > * {
            min-width: 300px !important;
            max-width: 320px !important;
            flex-shrink: 0 !important;
            scroll-snap-align: start !important;
          }

          div[style*="gridTemplateColumns: 'repeat(3, 1fr)'"] {
            display: flex !important;
            overflow-x: auto !important;
            scroll-snap-type: x mandatory !important;
            -webkit-overflow-scrolling: touch !important;
            gap: 16px !important;
            padding-bottom: 20px !important;
          }

          div[style*="gridTemplateColumns: 'repeat(3, 1fr)'"] > * {
            min-width: 280px !important;
            max-width: 300px !important;
            flex-shrink: 0 !important;
            scroll-snap-align: start !important;
          }

          .values-grid {
            display: flex !important;
            overflow-x: auto !important;
            scroll-snap-type: x mandatory !important;
            -webkit-overflow-scrolling: touch !important;
            gap: 16px !important;
            padding-bottom: 20px !important;
          }

          .values-grid > div {
            min-width: 300px !important;
            max-width: 320px !important;
            flex-shrink: 0 !important;
            scroll-snap-align: start !important;
            grid-column: auto !important;
          }

          div[style*="gridTemplateColumns: '80px 1fr'"] {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
          }

          .timeline-track {
            display: flex !important;
            overflow-x: auto !important;
            scroll-snap-type: x mandatory !important;
            -webkit-overflow-scrolling: touch !important;
            gap: 16px !important;
            padding-bottom: 20px !important;
          }

          .timeline-track > * {
            min-width: 280px !important;
            max-width: 300px !important;
            flex-shrink: 0 !important;
            scroll-snap-align: start !important;
          }

          .team-grid {
            grid-template-columns: 1fr !important;
          }

          .founder-card {
            grid-template-columns: 1fr !important;
            text-align: center !important;
            padding: 32px 20px !important;
          }

          div[style*="gridTemplateColumns: 'repeat(3, 1fr)'"][style*="gap: 4"] {
            display: flex !important;
            overflow-x: auto !important;
            scroll-snap-type: x mandatory !important;
            -webkit-overflow-scrolling: touch !important;
            gap: 16px !important;
            padding-bottom: 20px !important;
          }

          div[style*="gridTemplateColumns: 'repeat(3, 1fr)'"][style*="gap: 4"] > * {
            min-width: 120px !important;
            max-width: 140px !important;
            flex-shrink: 0 !important;
            scroll-snap-align: start !important;
          }

          .btn {
            min-height: 44px !important;
            padding: 12px 20px !important;
          }

          ::-webkit-scrollbar { height: 8px; }
          ::-webkit-scrollbar-track { background: rgba(255,255,255,0.05); border-radius: 4px; }
          ::-webkit-scrollbar-thumb { background: rgba(244,207,94,0.3); border-radius: 4px; }
        }
      `}</style>

      <BackgroundEffects />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <PageHeader pageTitle={t('pageTitle')} />

        {/* HERO */}
        <section style={{ padding: '80px 32px 40px', position: 'relative' }}>
          <div style={{ maxWidth: 1300, margin: '0 auto' }}>
            <span className="badge" style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '6px 14px',
              borderRadius: 999,
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: 0.2,
              background: 'linear-gradient(90deg, rgba(230,176,34,0.10), rgba(139,92,246,0.10))',
              border: '1px solid rgba(230,176,34,0.25)',
              color: 'var(--text-2)',
              marginBottom: 28
            }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--primary)', boxShadow: '0 0 8px var(--primary)' }} />
              {t('hero.badge')}
            </span>

            <div className="hero-grid" style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 60, alignItems: 'end' }}>
              <div>
                <h1 style={{
                  fontWeight: 700,
                  fontSize: 'clamp(44px, 6.4vw, 88px)',
                  lineHeight: 0.96,
                  letterSpacing: '-0.035em',
                  margin: '0 0 32px',
                  textWrap: 'balance'
                }}>
                  {t('hero.titlePart1')}<span className="gradient-text">{t('hero.titleGradient')}</span><br/>
                  {t('hero.titlePart2')}<br/>
                  {t('hero.titlePart3')}
                </h1>
              </div>
              <div style={{ paddingBottom: 12 }}>
                <p style={{ fontSize: 17, lineHeight: 1.6, color: 'var(--text-2)', margin: '0 0 24px', textWrap: 'pretty' }}>
                  {t('hero.description')}<strong style={{ color: 'var(--text)' }}>{t('hero.descriptionStrong')}</strong>{t('hero.descriptionEnd')}
                </p>
                <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 24 }}>
                  <Link href="/demo" className="btn btn-primary btn-lg">{t('hero.ctaDemo')}</Link>
                  <Link href="#contact" className="btn btn-ghost btn-lg">{t('hero.ctaContact')}</Link>
                </div>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: 4,
                  borderTop: '1px solid var(--border)',
                  paddingTop: 24
                }}>
                  <div style={{ paddingRight: 12 }}>
                    <div style={{ fontSize: 28, fontWeight: 600, lineHeight: 1, letterSpacing: '-0.03em' }}>{t('hero.stats.launch.value')}</div>
                    <div className="mono" style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 6, fontFamily: 'var(--font-mono)', letterSpacing: 0.3, textTransform: 'uppercase' }}>
                      {t('hero.stats.launch.label')}
                    </div>
                  </div>
                  <div style={{ paddingRight: 12 }}>
                    <div style={{ fontSize: 28, fontWeight: 600, lineHeight: 1, letterSpacing: '-0.03em' }}>{t('hero.stats.cities.value')}</div>
                    <div className="mono" style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 6, fontFamily: 'var(--font-mono)', letterSpacing: 0.3, textTransform: 'uppercase' }}>
                      {t('hero.stats.cities.label')}
                    </div>
                  </div>
                  <div style={{ paddingRight: 12 }}>
                    <div style={{ fontSize: 22, fontWeight: 600, lineHeight: 1, letterSpacing: '-0.03em', whiteSpace: 'nowrap' }}>{t('hero.stats.multiCountry.value')}</div>
                    <div className="mono" style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 6, fontFamily: 'var(--font-mono)', letterSpacing: 0.3, textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
                      {t('hero.stats.multiCountry.label')}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Marquee */}
          <div style={{
            marginTop: 80,
            padding: '24px 0',
            borderTop: '1px solid var(--border)',
            borderBottom: '1px solid var(--border)',
            background: 'rgba(255,255,255,0.4)',
            backdropFilter: 'blur(10px)',
            overflow: 'hidden',
            position: 'relative',
            maskImage: 'linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent)'
          }}>
            <div style={{
              display: 'flex',
              gap: 64,
              animation: 'scroll 28s linear infinite',
              whiteSpace: 'nowrap',
              width: 'max-content'
            }}>
              {[...Array(2)].map((_, i) => (
                <React.Fragment key={i}>
                  {marqueeItems.map((item: string, idx: number) => (
                    <span key={`${i}-${idx}`} style={{
                      fontSize: 20,
                      fontWeight: 600,
                      color: 'var(--text-2)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 64
                    }}>
                      {item}
                      <span style={{ color: 'var(--primary)', fontStyle: 'normal' }}>✦</span>
                    </span>
                  ))}
                </React.Fragment>
              ))}
            </div>
          </div>
        </section>

        {/* MISSION */}
        <section style={{ padding: '120px 32px 100px', textAlign: 'center' }}>
          <div style={{ maxWidth: 980, margin: '0 auto' }}>
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: 1.6,
              textTransform: 'uppercase',
              color: 'var(--text-3)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              marginBottom: 20
            }}>
              <span style={{ width: 24, height: 1, background: 'var(--text-3)' }} />
              {t('mission.badge')}
            </div>
            <h2 style={{
              fontWeight: 700,
              fontSize: 'clamp(34px, 4.8vw, 56px)',
              lineHeight: 1.08,
              letterSpacing: '-0.02em',
              margin: '0 0 18px',
              textWrap: 'balance'
            }}>
              {t('mission.title')}<span className="gradient-text">{t('mission.titleGradient')}</span>{t('mission.titleEnd')}
            </h2>
            <p style={{ fontSize: 18, color: 'var(--text-2)', margin: '0 0 32px' }}>
              {t('mission.subtitle')}
            </p>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 16,
              padding: '18px 26px',
              borderRadius: 999,
              background: 'var(--glass)',
              border: '1px solid var(--glass-border)',
              backdropFilter: 'blur(20px)',
              boxShadow: '0 1px 0 rgba(255,255,255,0.9) inset, 0 8px 24px rgba(230,176,34,0.10)',
              marginTop: 24
            }}>
              <div style={{ fontSize: 22 }}>🎯</div>
              <p style={{ margin: 0, fontSize: 15, color: 'var(--text-2)', textAlign: 'left', maxWidth: 560, lineHeight: 1.55 }}>
                {t('mission.goalTitle')}
              </p>
            </div>
          </div>
        </section>

        {/* ORIGIN STORY — Magazine style */}
        <section style={{
          padding: '100px 32px',
          background: 'rgba(255,255,255,0.5)',
          borderTop: '1px solid var(--border)',
          borderBottom: '1px solid var(--border)'
        }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 56 }}>
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: 1.6,
                textTransform: 'uppercase',
                color: 'var(--text-3)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                marginBottom: 20
              }}>
                <span style={{ width: 24, height: 1, background: 'var(--text-3)' }} />
                {t('origin.badge')}
              </div>
              <h2 style={{
                fontWeight: 700,
                fontSize: 'clamp(34px, 4.6vw, 52px)',
                lineHeight: 1.08,
                letterSpacing: '-0.02em',
                margin: 0,
                textWrap: 'balance'
              }}>
                {t('origin.title')}<span className="gradient-text">{t('origin.titleGradient')}</span>{t('origin.titleEnd')}
              </h2>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 56 }}>
              {/* Chapter i */}
              <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr', gap: 32, alignItems: 'start' }}>
                <div style={{
                  color: 'var(--primary)',
                  letterSpacing: '-0.04em'
                }}>{t('origin.chapters.ch1.number')}</div>
                <div>
                  <h3 style={{
                    fontWeight: 700,
                    fontSize: 30,
                    lineHeight: 1.15,
                    letterSpacing: '-0.02em',
                    margin: '0 0 16px'
                  }}>
                    {t('origin.chapters.ch1.title')}
                  </h3>
                  <p style={{ fontSize: 19, lineHeight: 1.6, color: 'var(--text-2)', margin: '0 0 14px', textWrap: 'pretty' }}>
                    {t('origin.chapters.ch1.p1')}<strong style={{ color: 'var(--text)', fontWeight: 600 }}>{t('origin.chapters.ch1.p1Strong')}</strong>{t('origin.chapters.ch1.p1End')}
                  </p>
                  <p style={{ fontSize: 19, lineHeight: 1.6, color: 'var(--text-2)', margin: 0, textWrap: 'pretty' }}>
                    {t('origin.chapters.ch1.p2')}<strong style={{ color: 'var(--text)' }}>{t('origin.chapters.ch1.p2Strong')}</strong>{t('origin.chapters.ch1.p2End')}
                  </p>
                </div>
              </div>

              {/* Chapter ii */}
              <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr', gap: 32, alignItems: 'start' }}>
                <div style={{
                  color: 'var(--primary)',
                  letterSpacing: '-0.04em'
                }}>{t('origin.chapters.ch2.number')}</div>
                <div>
                  <h3 style={{
                    fontWeight: 700,
                    fontSize: 30,
                    lineHeight: 1.15,
                    letterSpacing: '-0.02em',
                    margin: '0 0 16px'
                  }}>
                    {t('origin.chapters.ch2.title')}
                  </h3>
                  <p style={{ fontSize: 19, lineHeight: 1.6, color: 'var(--text-2)', margin: '0 0 14px', textWrap: 'pretty' }}>
                    {t('origin.chapters.ch2.p1')}<strong style={{ color: 'var(--text)', fontWeight: 600 }}>{t('origin.chapters.ch2.p1Strong')}</strong>{t('origin.chapters.ch2.p1End')}
                  </p>
                  <p style={{ fontSize: 19, lineHeight: 1.6, color: 'var(--text-2)', margin: 0, textWrap: 'pretty' }}>
                    {t('origin.chapters.ch2.p2')}
                  </p>
                </div>
              </div>

              {/* Chapter iii */}
              <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr', gap: 32, alignItems: 'start' }}>
                <div style={{
                  color: 'var(--primary)',
                  letterSpacing: '-0.04em'
                }}>{t('origin.chapters.ch3.number')}</div>
                <div>
                  <h3 style={{
                    fontWeight: 700,
                    fontSize: 30,
                    lineHeight: 1.15,
                    letterSpacing: '-0.02em',
                    margin: '0 0 16px'
                  }}>
                    {t('origin.chapters.ch3.title')}<span className="gradient-text">{t('origin.chapters.ch3.titleGradient')}</span>{t('origin.chapters.ch3.titleEnd')}
                  </h3>
                  <p style={{ fontSize: 19, lineHeight: 1.6, color: 'var(--text-2)', margin: '0 0 18px', textWrap: 'pretty' }}>
                    {t('origin.chapters.ch3.p1')}<strong style={{ color: 'var(--text)', fontWeight: 600 }}>{t('origin.chapters.ch3.p1Strong')}</strong>{t('origin.chapters.ch3.p1End')}
                  </p>
                  <div style={{
                    marginTop: 18,
                    padding: '18px 22px',
                    background: 'linear-gradient(135deg, rgba(230,176,34,0.10), rgba(139,92,246,0.06))',
                    borderLeft: '3px solid var(--primary)',
                    borderRadius: '0 12px 12px 0',
                    fontSize: 14.5,
                    color: 'var(--text-2)',
                    lineHeight: 1.55
                  }}>
                    <strong style={{ color: 'var(--text)' }}>{t('origin.chapters.ch3.commitmentLabel')}</strong>{t('origin.chapters.ch3.commitment')}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* VALUES — Asymmetric grid */}
        <section style={{ padding: '100px 32px' }}>
          <div style={{ maxWidth: 1280, margin: '0 auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'end', marginBottom: 56 }}>
              <div>
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: 1.6,
                  textTransform: 'uppercase',
                  color: 'var(--text-3)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  marginBottom: 20
                }}>
                  <span style={{ width: 24, height: 1, background: 'var(--text-3)' }} />
                  {t('values.badge')}
                </div>
                <h2 style={{
                  fontWeight: 700,
                  fontSize: 'clamp(36px, 4.4vw, 56px)',
                  lineHeight: 1.05,
                  letterSpacing: '-0.02em',
                  margin: 0,
                  textWrap: 'balance'
                }}>
                  {t('values.title')}<strong style={{ color: 'var(--text)' }}>{t('values.titleStrong')}</strong>{t('values.titleEnd')}
                </h2>
              </div>
              <p style={{ fontSize: 16, color: 'var(--text-2)', lineHeight: 1.6, margin: 0, textWrap: 'pretty' }}>
                {t('values.subtitle')}
              </p>
            </div>

            <div className="values-grid" style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(12, 1fr)',
              gap: 20,
              gridAutoRows: 'minmax(200px, auto)'
            }}>
              {/* Value 1 - span 7 */}
              <div style={{
                gridColumn: 'span 7',
                background: 'linear-gradient(135deg, rgba(230,176,34,0.10), rgba(255,255,255,0.78))',
                backdropFilter: 'blur(20px) saturate(150%)',
                border: '1px solid var(--glass-border)',
                borderRadius: 24,
                padding: 32,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative',
                overflow: 'hidden',
                transition: 'transform 0.3s, box-shadow 0.3s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 1px 0 rgba(255,255,255,0.9) inset, 0 20px 40px -16px rgba(230,176,34,0.18)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 1px 0 rgba(255,255,255,0.9) inset, 0 4px 20px rgba(26,20,8,0.04)';
              }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-3)', letterSpacing: 1.6, textTransform: 'uppercase' }}>
                  {t('values.value1.number')}
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 28, lineHeight: 1.15, letterSpacing: '-0.02em', margin: '18px 0 12px', textWrap: 'balance' }}>
                    {t('values.value1.title')}<strong style={{ color: 'var(--text)' }}>{t('values.value1.titleStrong')}</strong>{t('values.value1.titleEnd')}
                  </div>
                  <div style={{ fontSize: 14.5, color: 'var(--text-2)', lineHeight: 1.55, textWrap: 'pretty' }}>
                    {t('values.value1.description')}
                  </div>
                </div>
                <div style={{ position: 'absolute', top: 24, right: 24, fontSize: 32, opacity: 0.4 }}>🎯</div>
              </div>

              {/* Value 2 - span 5 */}
              <div style={{
                gridColumn: 'span 5',
                background: 'var(--glass)',
                backdropFilter: 'blur(20px) saturate(150%)',
                border: '1px solid var(--glass-border)',
                borderRadius: 24,
                padding: 32,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative',
                overflow: 'hidden',
                transition: 'transform 0.3s, box-shadow 0.3s',
                boxShadow: '0 1px 0 rgba(255,255,255,0.9) inset, 0 4px 20px rgba(26,20,8,0.04)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 1px 0 rgba(255,255,255,0.9) inset, 0 20px 40px -16px rgba(230,176,34,0.18)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 1px 0 rgba(255,255,255,0.9) inset, 0 4px 20px rgba(26,20,8,0.04)';
              }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-3)', letterSpacing: 1.6, textTransform: 'uppercase' }}>
                  {t('values.value2.number')}
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 28, lineHeight: 1.15, letterSpacing: '-0.02em', margin: '18px 0 12px', textWrap: 'balance' }}>
                    {t('values.value2.title')}<strong style={{ color: 'var(--text)' }}>{t('values.value2.titleStrong')}</strong>{t('values.value2.titleEnd')}
                  </div>
                  <div style={{ fontSize: 14.5, color: 'var(--text-2)', lineHeight: 1.55, textWrap: 'pretty' }}>
                    {t('values.value2.description')}
                  </div>
                </div>
                <div style={{ position: 'absolute', top: 24, right: 24, fontSize: 32, opacity: 0.4 }}>🔬</div>
              </div>

              {/* Value 3 - span 5 */}
              <div style={{
                gridColumn: 'span 5',
                background: 'var(--glass)',
                backdropFilter: 'blur(20px) saturate(150%)',
                border: '1px solid var(--glass-border)',
                borderRadius: 24,
                padding: 32,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative',
                overflow: 'hidden',
                transition: 'transform 0.3s, box-shadow 0.3s',
                boxShadow: '0 1px 0 rgba(255,255,255,0.9) inset, 0 4px 20px rgba(26,20,8,0.04)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 1px 0 rgba(255,255,255,0.9) inset, 0 20px 40px -16px rgba(230,176,34,0.18)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 1px 0 rgba(255,255,255,0.9) inset, 0 4px 20px rgba(26,20,8,0.04)';
              }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-3)', letterSpacing: 1.6, textTransform: 'uppercase' }}>
                  {t('values.value3.number')}
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 28, lineHeight: 1.15, letterSpacing: '-0.02em', margin: '18px 0 12px', textWrap: 'balance' }}>
                    {t('values.value3.title')}<strong style={{ color: 'var(--text)' }}>{t('values.value3.titleStrong')}</strong>{t('values.value3.titleEnd')}
                  </div>
                  <div style={{ fontSize: 14.5, color: 'var(--text-2)', lineHeight: 1.55, textWrap: 'pretty' }}>
                    {t('values.value3.description')}
                  </div>
                </div>
                <div style={{ position: 'absolute', top: 24, right: 24, fontSize: 32, opacity: 0.4 }}>🌍</div>
              </div>

              {/* Value 4 - span 7 */}
              <div style={{
                gridColumn: 'span 7',
                background: 'linear-gradient(135deg, rgba(139,92,246,0.08), rgba(255,255,255,0.78))',
                backdropFilter: 'blur(20px) saturate(150%)',
                border: '1px solid var(--glass-border)',
                borderRadius: 24,
                padding: 32,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative',
                overflow: 'hidden',
                transition: 'transform 0.3s, box-shadow 0.3s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 1px 0 rgba(255,255,255,0.9) inset, 0 20px 40px -16px rgba(230,176,34,0.18)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 1px 0 rgba(255,255,255,0.9) inset, 0 4px 20px rgba(26,20,8,0.04)';
              }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-3)', letterSpacing: 1.6, textTransform: 'uppercase' }}>
                  {t('values.value4.number')}
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 28, lineHeight: 1.15, letterSpacing: '-0.02em', margin: '18px 0 12px', textWrap: 'balance' }}>
                    {t('values.value4.title')}<strong style={{ color: 'var(--text)' }}>{t('values.value4.titleStrong')}</strong>{t('values.value4.titleEnd')}
                  </div>
                  <div style={{ fontSize: 14.5, color: 'var(--text-2)', lineHeight: 1.55, textWrap: 'pretty' }}>
                    {t('values.value4.description')}
                  </div>
                </div>
                <div style={{ position: 'absolute', top: 24, right: 24, fontSize: 32, opacity: 0.4 }}>⚡</div>
              </div>
            </div>
          </div>
        </section>

        {/* TIMELINE */}
        <section style={{
          padding: '100px 0',
          background: 'linear-gradient(180deg, transparent, rgba(245,243,236,0.6))',
          borderTop: '1px solid var(--border)'
        }}>
          <div style={{ maxWidth: 1280, margin: '0 auto 48px', padding: '0 32px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'end' }}>
              <div>
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: 1.6,
                  textTransform: 'uppercase',
                  color: 'var(--text-3)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  marginBottom: 20
                }}>
                  <span style={{ width: 24, height: 1, background: 'var(--text-3)' }} />
                  {t('timeline.badge')}
                </div>
                <h2 style={{
                  fontWeight: 700,
                  fontSize: 'clamp(36px, 4.4vw, 56px)',
                  lineHeight: 1.05,
                  letterSpacing: '-0.02em',
                  margin: 0
                }}>
                  {t('timeline.title')}<strong style={{ color: 'var(--text)' }}>{t('timeline.titleStrong')}</strong>{t('timeline.titleEnd')}
                </h2>
              </div>
              <p style={{ color: 'var(--text-2)', fontSize: 16, margin: 0, lineHeight: 1.6 }}>
                {t('timeline.subtitle')}
              </p>
            </div>
          </div>

          <div className="timeline-track" style={{
            padding: '0 32px',
            display: 'grid',
            gridTemplateColumns: 'repeat(3, minmax(280px, 1fr))',
            gap: 24,
            maxWidth: 1280,
            margin: '0 auto',
            position: 'relative'
          }}>
            {/* Connecting line */}
            <div style={{
              content: '',
              position: 'absolute',
              left: 32,
              right: 32,
              top: 38,
              height: 2,
              background: 'repeating-linear-gradient(90deg, var(--primary) 0 8px, transparent 8px 16px)',
              opacity: 0.4,
              zIndex: 0
            }} />

            {/* 2024 */}
            <div style={{ position: 'relative', zIndex: 1, paddingTop: 60 }}>
              <div style={{
                position: 'absolute',
                top: 28,
                left: 0,
                width: 22,
                height: 22,
                borderRadius: '50%',
                background: '#fbfaf6',
                border: '3px solid var(--primary)',
                boxShadow: '0 0 0 6px rgba(230,176,34,0.12)'
              }} />
              <div style={{
                fontSize: 56,
                fontWeight: 600,
                lineHeight: 1,
                letterSpacing: '-0.03em',
                color: 'var(--text)',
                marginBottom: 14
              }}>{t('timeline.milestones.2024.year')}</div>
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: 1.6,
                textTransform: 'uppercase',
                color: 'var(--primary-deep)',
                marginBottom: 10
              }}>{t('timeline.milestones.2024.label')}</div>
              <div style={{ fontSize: 14, color: 'var(--text-2)', lineHeight: 1.6, textWrap: 'pretty' }}>
                {t('timeline.milestones.2024.description')}
              </div>
            </div>

            {/* 2025 */}
            <div style={{ position: 'relative', zIndex: 1, paddingTop: 60 }}>
              <div style={{
                position: 'absolute',
                top: 28,
                left: 0,
                width: 22,
                height: 22,
                borderRadius: '50%',
                background: '#fbfaf6',
                border: '3px solid var(--primary)',
                boxShadow: '0 0 0 6px rgba(230,176,34,0.12)'
              }} />
              <div style={{
                fontSize: 56,
                fontWeight: 600,
                lineHeight: 1,
                letterSpacing: '-0.03em',
                color: 'var(--text)',
                marginBottom: 14
              }}>{t('timeline.milestones.2025.year')}</div>
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: 1.6,
                textTransform: 'uppercase',
                color: 'var(--primary-deep)',
                marginBottom: 10
              }}>{t('timeline.milestones.2025.label')}</div>
              <div style={{ fontSize: 14, color: 'var(--text-2)', lineHeight: 1.6, textWrap: 'pretty' }}>
                {t('timeline.milestones.2025.description')}
              </div>
            </div>

            {/* Today - Active */}
            <div style={{ position: 'relative', zIndex: 1, paddingTop: 60 }}>
              <div style={{
                position: 'absolute',
                top: 28,
                left: 0,
                width: 22,
                height: 22,
                borderRadius: '50%',
                background: 'var(--primary)',
                border: '3px solid var(--primary)',
                boxShadow: '0 0 0 6px rgba(230,176,34,0.25)'
              }} />
              <div style={{
                fontSize: 56,
                fontWeight: 600,
                lineHeight: 1,
                letterSpacing: '-0.03em',
                color: 'var(--primary-deep)',
                marginBottom: 14
              }}>{t('timeline.milestones.today.year')}</div>
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: 1.6,
                textTransform: 'uppercase',
                color: 'var(--primary-deep)',
                marginBottom: 10
              }}>{t('timeline.milestones.today.label')}</div>
              <div style={{ fontSize: 14, color: 'var(--text-2)', lineHeight: 1.6, textWrap: 'pretty' }}>
                {t('timeline.milestones.today.description')}
              </div>
            </div>
          </div>
        </section>

        {/* FOUNDER */}
        <section style={{ padding: '110px 32px' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <div className="team-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'end', marginBottom: 48 }}>
              <div>
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: 1.6,
                  textTransform: 'uppercase',
                  color: 'var(--text-3)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  marginBottom: 20
                }}>
                  <span style={{ width: 24, height: 1, background: 'var(--text-3)' }} />
                  {t('founder.badge')}
                </div>
                <h2 style={{
                  fontWeight: 700,
                  fontSize: 'clamp(36px, 4.4vw, 56px)',
                  lineHeight: 1.05,
                  letterSpacing: '-0.02em',
                  margin: 0
                }}>
                  {t('founder.title')}<strong style={{ color: 'var(--text)' }}>{t('founder.titleStrong')}</strong>{t('founder.titleEnd')}
                </h2>
              </div>
              <p style={{ color: 'var(--text-2)', fontSize: 16, margin: 0, lineHeight: 1.6 }}>
                {t('founder.subtitle')}
              </p>
            </div>

            <div className="founder-card" style={{
              background: 'var(--bg-1)',
              border: '1px solid var(--border)',
              borderRadius: 28,
              padding: 48,
              display: 'grid',
              gridTemplateColumns: '200px 1fr',
              gap: 40,
              alignItems: 'center',
              boxShadow: '0 1px 0 rgba(255,255,255,0.9) inset, 0 12px 40px -20px rgba(26,20,8,0.10)'
            }}>
              <div style={{
                width: 200,
                height: 200,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #f4cf5e, #b8881a)',
                color: '#1a1408',
                fontWeight: 700,
                fontSize: 72,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 12px 32px rgba(230,176,34,0.30)'
              }}>TG</div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 36, letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: 6 }}>
                  {t('founder.name')}
                </div>
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: 1.6,
                  textTransform: 'uppercase',
                  color: 'var(--primary-deep)',
                  marginBottom: 18
                }}>{t('founder.role')}</div>
                <div style={{ fontSize: 18, lineHeight: 1.55, color: 'var(--text-2)', marginBottom: 22, textWrap: 'pretty' }}>
                  {t('founder.bio')}<strong style={{ color: 'var(--text)' }}>{t('founder.bioStrong')}</strong>{t('founder.bioEnd')}
                </div>
                <Link href="https://www.linkedin.com/in/tawfiq-gouach-77158a21/" target="_blank" rel="noopener noreferrer" style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  fontSize: 13,
                  fontWeight: 600,
                  color: 'var(--text)',
                  padding: '10px 18px',
                  borderRadius: 999,
                  background: 'rgba(230,176,34,0.10)',
                  border: '1px solid rgba(230,176,34,0.25)',
                  transition: 'all 0.2s',
                  textDecoration: 'none'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(230,176,34,0.18)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(230,176,34,0.10)'; }}>
                  {t('founder.linkedinCta')}
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* SOCIAL */}
        <section style={{
          padding: '80px 32px',
          background: 'rgba(255,255,255,0.5)',
          borderTop: '1px solid var(--border)',
          borderBottom: '1px solid var(--border)'
        }}>
          <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: 1.6,
              textTransform: 'uppercase',
              color: 'var(--text-3)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              marginBottom: 20
            }}>
              <span style={{ width: 24, height: 1, background: 'var(--text-3)' }} />
              {t('social.badge')}
            </div>
            <h2 style={{
              fontWeight: 700,
              fontSize: 'clamp(30px, 3.8vw, 44px)',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              margin: '0 0 36px'
            }}>
              {t('social.title')}<strong style={{ color: 'var(--text)' }}>{t('social.titleStrong')}</strong>{t('social.titleEnd')}
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
              <Link href="https://www.linkedin.com/company/108488739" target="_blank" rel="noopener noreferrer" style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 20,
                padding: '24px 28px',
                background: 'var(--bg-1)',
                border: '1px solid var(--border)',
                borderRadius: 16,
                transition: 'all 0.2s',
                textAlign: 'left',
                textDecoration: 'none'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--primary)';
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 12px 28px -12px rgba(230,176,34,0.20)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}>
                <div style={{
                  width: 48,
                  height: 48,
                  borderRadius: 12,
                  background: 'linear-gradient(135deg, rgba(230,176,34,0.15), rgba(139,92,246,0.12))',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 22,
                  flexShrink: 0
                }}>in</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 4 }}>{t('social.linkedin.title')}</div>
                  <div style={{ fontSize: 13, color: 'var(--text-3)' }}>{t('social.linkedin.description')}</div>
                </div>
                <div style={{ fontSize: 18, color: 'var(--primary-deep)' }}>→</div>
              </Link>

              <Link href="https://instagram.com/sojoriapp" target="_blank" rel="noopener noreferrer" style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 20,
                padding: '24px 28px',
                background: 'var(--bg-1)',
                border: '1px solid var(--border)',
                borderRadius: 16,
                transition: 'all 0.2s',
                textAlign: 'left',
                textDecoration: 'none'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--primary)';
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 12px 28px -12px rgba(230,176,34,0.20)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}>
                <div style={{
                  width: 48,
                  height: 48,
                  borderRadius: 12,
                  background: 'linear-gradient(135deg, rgba(230,176,34,0.15), rgba(139,92,246,0.12))',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 22,
                  flexShrink: 0
                }}>📷</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 4 }}>{t('social.instagram.title')}</div>
                  <div style={{ fontSize: 13, color: 'var(--text-3)' }}>{t('social.instagram.description')}</div>
                </div>
                <div style={{ fontSize: 18, color: 'var(--primary-deep)' }}>→</div>
              </Link>
            </div>
          </div>
        </section>

        {/* BIG STATS */}
        <section style={{
          padding: '80px 32px',
          background: 'linear-gradient(180deg, rgba(245,243,236,0.6), transparent)'
        }}>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: 1.6,
              textTransform: 'uppercase',
              color: 'var(--text-3)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8
            }}>
              <span style={{ width: 24, height: 1, background: 'var(--text-3)' }} />
              {t('bigStats.badge')}
            </div>
          </div>
          <div style={{
            maxWidth: 1100,
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 0
          }}>
            <div style={{ textAlign: 'center', padding: '0 16px', borderLeft: 'none' }}>
              <div style={{
                fontWeight: 600,
                fontSize: 'clamp(48px, 6vw, 84px)',
                lineHeight: 1,
                letterSpacing: '-0.04em',
                background: 'linear-gradient(135deg, #e6b022 0%, #8b5cf6 100%)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent'
              }}>{t('bigStats.stat1.value')}</div>
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 11,
                color: 'var(--text-3)',
                letterSpacing: 1.4,
                textTransform: 'uppercase',
                marginTop: 14
              }}>{t('bigStats.stat1.label')}</div>
            </div>
            <div style={{ textAlign: 'center', padding: '0 16px', borderLeft: '1px solid var(--border)' }}>
              <div style={{
                fontWeight: 600,
                fontSize: 'clamp(48px, 6vw, 84px)',
                lineHeight: 1,
                letterSpacing: '-0.04em',
                background: 'linear-gradient(135deg, #e6b022 0%, #8b5cf6 100%)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent'
              }}>{t('bigStats.stat2.value')}</div>
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 11,
                color: 'var(--text-3)',
                letterSpacing: 1.4,
                textTransform: 'uppercase',
                marginTop: 14
              }}>{t('bigStats.stat2.label')}</div>
            </div>
            <div style={{ textAlign: 'center', padding: '0 16px', borderLeft: '1px solid var(--border)' }}>
              <div style={{
                fontWeight: 600,
                fontSize: 'clamp(38px, 5vw, 68px)',
                lineHeight: 1,
                letterSpacing: '-0.04em',
                background: 'linear-gradient(135deg, #e6b022 0%, #8b5cf6 100%)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
                whiteSpace: 'nowrap'
              }}>{t('bigStats.stat3.value')}</div>
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 11,
                color: 'var(--text-3)',
                letterSpacing: 1.4,
                textTransform: 'uppercase',
                marginTop: 14
              }}>{t('bigStats.stat3.label')}</div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section id="contact" style={{
          padding: '120px 32px',
          textAlign: 'center',
          background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(230,176,34,0.16), transparent 70%)'
        }}>
          <h2 style={{
            fontWeight: 700,
            fontSize: 'clamp(40px, 5.6vw, 72px)',
            lineHeight: 1.04,
            letterSpacing: '-0.025em',
            maxWidth: 800,
            margin: '0 auto 20px',
            textWrap: 'balance'
          }}>
            {t('finalCTA.title')}<strong style={{ color: 'var(--text)' }}>{t('finalCTA.titleStrong')}</strong>{t('finalCTA.titleEnd')}
          </h2>
          <p style={{ fontSize: 17, color: 'var(--text-2)', maxWidth: 620, margin: '0 auto 36px', lineHeight: 1.6 }}>
            {t('finalCTA.subtitle')}
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/demo" className="btn btn-primary btn-lg">{t('finalCTA.ctaDemo')}</Link>
            <Link href="/" className="btn btn-ghost btn-lg">{t('finalCTA.ctaHome')}</Link>
          </div>
        </section>

        <PageFooter />
      </div>
    </>
  );
}
