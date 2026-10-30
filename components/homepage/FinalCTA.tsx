"use client";

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

export function FinalCTA() {
  const t = useTranslations('home.finalCTA');

  return (
    <section
      style={{
        padding: '90px 32px',
        background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(230,176,34,0.14) 0%, transparent 70%)',
        textAlign: 'center',
      }}
      className="final-cta-section"
    >
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <h2 style={{ fontSize: 'clamp(36px, 5vw, 56px)', marginBottom: 18, textWrap: 'balance' }}>
          {t('title')} <span className="gradient-text">{t('titleGradient')}</span>
          <br />
          {t('titleEnd')}
        </h2>
        <p style={{ fontSize: 18, color: 'var(--text-2)', marginBottom: 36, maxWidth: 540, margin: '0 auto 36px' }}>
          {t('subtitle')}
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href={{ pathname: '/demo', query: { source: 'homepage-cta' } }} className="btn btn-primary btn-xl">
            {t('ctaPrimary')}
          </Link>
          <Link href="/pricing" className="btn btn-ghost btn-xl">
            {t('ctaSecondary')}
          </Link>
        </div>
        <div style={{ marginTop: 24, fontSize: 13, color: 'var(--text-3)' }}>
          {t('footer')}
        </div>
      </div>
      <style jsx>{`
        @media (max-width: 768px) {
          .final-cta-section {
            padding: 60px 20px !important;
          }
        }
      `}</style>
    </section>
  );
}
