"use client";

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { HeroAnimationJourney } from './HeroAnimationJourney';

export function Hero() {
  const t = useTranslations('home.hero');

  return (
    <section style={{ padding: '80px 32px 60px', position: 'relative' }} className="hero-section">
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', maxWidth: 880, margin: '0 auto 48px' }}>
          <span className="badge" style={{ marginBottom: 22 }}>
            <span className="badge-dot"></span>
            {t('badge')}
          </span>
          <h1 style={{ marginBottom: 20, textWrap: 'balance' }}>
            {t('title')}<br />
            <span className="gradient-text">{t('titleGradient')}</span>
          </h1>
          <p style={{ fontSize: 19, lineHeight: 1.55, color: 'var(--text-2)', maxWidth: 680, margin: '0 auto', textWrap: 'pretty' }} className="hero-subtitle">
            {t('subtitle')}
            <strong style={{ color: 'var(--text)' }}> {t('subtitleStrong')}</strong>
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 32, flexWrap: 'wrap' }} className="hero-cta-buttons">
            <a href="#animation" className="btn btn-primary btn-lg">{t('ctaPrimary')}</a>
            <Link href={{ pathname: '/demo', query: { source: 'homepage-hero' } }} className="btn btn-ghost btn-lg">{t('ctaSecondary')}</Link>
          </div>
        </div>

        <div id="animation" className="hero-journey-bleed">
          <HeroAnimationJourney />
        </div>

        <div style={{ textAlign: 'center', marginTop: 18 }} className="mono">
          <span style={{ fontSize: 11, color: 'var(--text-3)', letterSpacing: 1.2 }}>
            {t('flow')}
          </span>
        </div>
      </div>
      <style jsx>{`
        @media (max-width: 768px) {
          .hero-section {
            padding: 60px 20px 40px !important;
          }

          /* Titre principal plus impactant sur mobile */
          .hero-section h1 {
            font-size: clamp(36px, 9vw, 52px) !important;
            line-height: 1.15 !important;
            margin-bottom: 18px !important;
          }

          .hero-subtitle {
            font-size: 16px !important;
            line-height: 1.5 !important;
            padding: 0 10px;
          }

          .hero-cta-buttons {
            flex-direction: column !important;
            gap: 10px !important;
            align-items: center !important;
          }

          .hero-cta-buttons .btn {
            width: 100%;
            max-width: 320px;
            min-height: 44px;
            font-size: 15px;
          }

          /* Badge plus petit sur mobile */
          .hero-section .badge {
            font-size: 11px !important;
            padding: 6px 12px !important;
          }

          /* Orchestration graph: pleine largeur viewport (centrage via calc) */
          .hero-journey-bleed {
            width: 100vw;
            max-width: 100vw;
            margin-left: calc(50% - 50vw);
            margin-right: calc(50% - 50vw);
            position: relative;
            left: auto;
            right: auto;
          }
        }
      `}</style>
    </section>
  );
}

export function TrustBar() {
  const t = useTranslations('home.trustBar');
  const otas = [
    { name: 'Airbnb', color: '#FF5A5F' },
    { name: 'Booking.com', color: '#003580' },
    { name: 'Expedia', color: '#FFC72C' },
    { name: 'Vrbo', color: '#3D67FF' },
    { name: 'Google Travel', color: '#4285F4' },
    { name: 'Agoda', color: '#FF6F00' },
    { name: 'TripAdvisor', color: '#34E0A1' },
  ];

  return (
    <section style={{ padding: '50px 32px', borderTop: '1px solid var(--glass-border)', borderBottom: '1px solid var(--glass-border)' }} className="trust-bar-section">
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div className="uppercase-sm" style={{ textAlign: 'center', color: 'var(--text-3)', marginBottom: 28 }}>
          {t('title')}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 28, opacity: 0.65 }} className="trust-bar-logos">
          {otas.map(o => (
            <div
              key={o.name}
              className="trust-bar-logo"
              style={{
                fontSize: 18,
                fontWeight: 700,
                letterSpacing: '-0.02em',
                color: 'var(--text-2)',
                transition: 'all 0.25s ease',
                cursor: 'pointer',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.color = o.color;
                e.currentTarget.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.color = 'var(--text-2)';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              {o.name}
            </div>
          ))}
          <div style={{ fontSize: 13, color: 'var(--text-3)', fontWeight: 500 }}>{t('moreChannels')}</div>
        </div>
        <div style={{ textAlign: 'center', marginTop: 22, fontSize: 13, color: 'var(--text-3)' }}>
          {t('features')}
        </div>
      </div>
      <style jsx>{`
        @media (max-width: 768px) {
          .trust-bar-section { padding: 36px 20px !important; }
          .trust-bar-logos {
            justify-content: center !important;
            gap: 16px !important;
            row-gap: 12px !important;
          }
          .trust-bar-logo { font-size: 15px !important; }
        }
      `}</style>
    </section>
  );
}
