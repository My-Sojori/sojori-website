'use client';

import { BackgroundEffects } from '@/components/BackgroundEffects';
import { PageHeader, PageFooter } from '@/components/SharedComponents';
import { Link } from '@/i18n/routing';
import React from 'react';
import { useTranslations } from 'next-intl';

export default function TermsPage() {
  const t = useTranslations('legal');

  const sections = t.raw('terms.sections') as { title: string; content: string }[];

  return (
    <>
      <style jsx>{`
        .legal-page { max-width: 760px; margin: 0 auto; }
        .legal-date {
          display: inline-block;
          font-size: 13px;
          color: var(--text-3);
          font-family: var(--font-mono);
          border: 1px solid var(--glass-border);
          border-radius: 6px;
          padding: 4px 12px;
          margin-bottom: 24px;
        }
        .legal-intro {
          font-size: 17px;
          line-height: 1.7;
          color: var(--text-2);
          margin-bottom: 40px;
          padding-bottom: 24px;
          border-bottom: 1px solid var(--glass-border);
        }
        .legal-section {
          margin-bottom: 32px;
        }
        .legal-section h2 {
          font-size: 18px;
          font-weight: 600;
          color: var(--text-1);
          margin-bottom: 12px;
          letter-spacing: -0.01em;
        }
        .legal-section p {
          font-size: 15px;
          line-height: 1.75;
          color: var(--text-2);
          white-space: pre-line;
        }
        .legal-contact {
          margin-top: 48px;
          padding: 20px 24px;
          background: var(--glass-bg);
          border: 1px solid var(--glass-border);
          border-radius: 12px;
          font-size: 14px;
          color: var(--text-2);
          font-family: var(--font-mono);
        }
        @media (max-width: 768px) {
          .legal-page { padding: 0 4px; }
          .legal-intro { font-size: 15px; margin-bottom: 28px; }
          .legal-section h2 { font-size: 16px; }
          .legal-section p { font-size: 14px; }
        }
      `}</style>

      <BackgroundEffects />
      <PageHeader />

      <main style={{ padding: '100px 24px 40px' }}>
        <div className="legal-page">
          <div style={{ marginBottom: 12 }}>
            <Link href="/" style={{ fontSize: 13, color: 'var(--accent)', textDecoration: 'none', fontFamily: 'var(--font-mono)' }}>
              ← {t('nav.backHome')}
            </Link>
          </div>

          <h1 style={{
            fontSize: 32,
            fontWeight: 700,
            color: 'var(--text-1)',
            marginBottom: 16,
            letterSpacing: '-0.02em',
          }}>
            {t('terms.pageTitle')}
          </h1>

          <span className="legal-date">{t('terms.effectiveDate')}</span>

          <p className="legal-intro">{t('terms.intro')}</p>

          {sections.map((section, i) => (
            <div key={i} className="legal-section">
              <h2>{section.title}</h2>
              <p>{section.content}</p>
            </div>
          ))}

          <div className="legal-contact">
            {t('terms.contact')}
          </div>
        </div>
      </main>

      <PageFooter />
    </>
  );
}
