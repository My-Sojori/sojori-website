"use client";

import { Metadata } from 'next';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { BackgroundEffects } from '@/components/BackgroundEffects';
import { PageHeader, PageFooter, PageHero, StatsBar, FinalCTA } from '@/components/SharedComponents';

interface Category {
  id: string;
  l: string;
  n: number;
  c?: string;
}

type ConnectMode = 'native' | 'automatable' | 'config';

interface Integration {
  n: string;
  cat: string;
  s: string;
  logo: string;
  color: string;
  popular?: boolean;
  /** native = connecté stack Sojori ; automatable = Zapier/Make ; config = selon matériel */
  connectMode?: ConnectMode;
}

export default function IntegrationsPage() {
  const t = useTranslations('integrations');
  const [cat, setCat] = useState('all');

  const CATEGORIES: Category[] = [
    { id: 'all', l: t('categories.all'), n: 17 },
    { id: 'core', l: t('categories.core'), n: 6, c: '#f4cf5e' },
    { id: 'msg', l: t('categories.msg'), n: 3, c: '#25D366' },
    { id: 'pay', l: t('categories.pay'), n: 1, c: '#10b981' },
    { id: 'data', l: t('categories.data'), n: 3, c: '#8b5cf6' },
    { id: 'ai', l: t('categories.ai'), n: 4, c: '#ec4899' },
  ];

  const INTEGRATIONS: Integration[] = [
    // Intégrations natives (vraies)
    { n: 'Rentals United', cat: 'core', s: t('integrationDescriptions.rentalsUnited'), logo: 'R', color: '#6c5ce7', popular: true },
    { n: 'Channex', cat: 'core', s: t('integrationDescriptions.channex'), logo: 'C', color: '#0052cc', popular: true },
    { n: 'Minut', cat: 'core', s: t('integrationDescriptions.minut'), logo: 'M', color: '#00c9a7', popular: true },
    { n: 'Chekin', cat: 'core', s: t('integrationDescriptions.chekin'), logo: 'C', color: '#0ea5e9', popular: true },
    { n: 'TTLock', cat: 'core', s: t('integrationDescriptions.ttlock'), logo: 'T', color: '#ff6b35', popular: true, connectMode: 'config' },
    { n: 'Hostaway', cat: 'core', s: t('integrationDescriptions.hostaway'), logo: 'H', color: '#4a90e2' },

    // Messagerie
    { n: 'WhatsApp Business', cat: 'msg', s: t('integrationDescriptions.whatsapp'), logo: 'W', color: '#25D366', popular: true },
    { n: 'SMS / Twilio', cat: 'msg', s: t('integrationDescriptions.sms'), logo: 'T', color: '#F22F46' },
    { n: 'Email', cat: 'msg', s: t('integrationDescriptions.email'), logo: '✉', color: '#6366f1' },

    // Paiements
    { n: 'Stripe', cat: 'pay', s: t('integrationDescriptions.stripe'), logo: 'S', color: '#635BFF', popular: true },

    // Automation & API
    { n: 'Zapier', cat: 'data', s: t('integrationDescriptions.zapier'), logo: 'Z', color: '#FF4A00', popular: true, connectMode: 'automatable' },
    { n: 'Make.com', cat: 'data', s: t('integrationDescriptions.make'), logo: 'M', color: '#6D00CC', connectMode: 'automatable' },
    { n: 'REST API', cat: 'data', s: t('integrationDescriptions.restApi'), logo: '{}', color: '#8b5cf6', popular: true },

    // IA & Analytics
    { n: 'OpenAI GPT-4', cat: 'ai', s: t('integrationDescriptions.openai'), logo: '🤖', color: '#10a37f', popular: true },
    { n: 'Anthropic Claude', cat: 'ai', s: t('integrationDescriptions.claude'), logo: 'C', color: '#D97757', popular: true },
    { n: 'Google Gemini', cat: 'ai', s: t('integrationDescriptions.gemini'), logo: 'G', color: '#4285F4' },
    { n: 'Google Analytics', cat: 'ai', s: t('integrationDescriptions.analytics'), logo: 'G', color: '#4285F4' },
  ];

  function footerForMode(mode: ConnectMode | undefined): { label: string; detail: string; color: string } {
    if (mode === 'automatable') return { label: t('connectModes.automatable.label'), detail: t('connectModes.automatable.detail'), color: '#60a5fa' };
    if (mode === 'config') return { label: t('connectModes.config.label'), detail: t('connectModes.config.detail'), color: '#fbbf24' };
    return { label: t('connectModes.native.label'), detail: t('connectModes.native.detail'), color: '#10b981' };
  }

  interface CardProps {
    i: Integration;
  }

  function Card({ i }: CardProps) {
    const foot = footerForMode(i.connectMode);
    return (
      <div className="card" style={{ padding: 18, position: 'relative' }}>
        {i.popular && (
          <div style={{
            position: 'absolute',
            top: 10,
            right: 10,
            fontSize: 9,
            padding: '2px 6px',
            background: 'rgba(244,207,94,0.18)',
            color: '#f4cf5e',
            borderRadius: 4,
            fontWeight: 700,
            letterSpacing: 0.5
          }}>
            {t('popular')}
          </div>
        )}
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <div style={{
            width: 44,
            height: 44,
            borderRadius: 10,
            background: i.color,
            color: '#fff',
            fontSize: 18,
            fontWeight: 800,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}>
            {i.logo}
          </div>
          <div style={{ minWidth: 0, flex: 1 }}>
            <div style={{
              fontSize: 14,
              fontWeight: 600,
              color: 'var(--text-1)',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}>
              {i.n}
            </div>
            <div style={{ fontSize: 11.5, color: 'var(--text-3)', marginTop: 2 }}>{i.s}</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8, marginTop: 12, fontSize: 10, color: 'var(--text-3)' }}>
          <span style={{ color: foot.color }}>● {foot.label}</span>
          <span>·</span>
          <span style={{ fontFamily: 'Geist Mono' }}>{foot.detail}</span>
        </div>
      </div>
    );
  }

  const list = cat === 'all' ? INTEGRATIONS : INTEGRATIONS.filter(i => i.cat === cat);

  return (
    <>
      <style jsx>{`
        @media (max-width: 768px) {
          section { padding: 60px 20px !important; }

          div[style*="padding: '20px 32px 40px'"] { padding: 20px 20px 40px !important; }
          div[style*="padding: '70px 32px'"] { padding: 60px 20px !important; }

          div[style*="gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))'"] {
            display: flex !important;
            overflow-x: auto !important;
            scroll-snap-type: x mandatory !important;
            -webkit-overflow-scrolling: touch !important;
            gap: 16px !important;
            padding-bottom: 20px !important;
          }

          div[style*="gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))'"] > * {
            min-width: 280px !important;
            max-width: 300px !important;
            flex-shrink: 0 !important;
            scroll-snap-align: start !important;
          }

          div[style*="gridTemplateColumns: '1fr 1fr'"] {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }

          div[style*="display: 'flex'"][style*="flexWrap: 'wrap'"] {
            gap: 6px !important;
          }

          .btn {
            min-height: 44px !important;
            padding: 12px 20px !important;
          }

          button {
            min-height: 44px !important;
          }

          ::-webkit-scrollbar { height: 8px; }
          ::-webkit-scrollbar-track { background: rgba(255,255,255,0.05); border-radius: 4px; }
          ::-webkit-scrollbar-thumb { background: rgba(244,207,94,0.3); border-radius: 4px; }
        }
      `}</style>
      <BackgroundEffects />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <PageHeader pageTitle={t('pageTitle')} />
        <PageHero
          badge={t('hero.badge')}
          title={<>{t('hero.title')}<br /><span className="gradient-text">{t('hero.titleGradient')}</span></>}
          subtitle={t('hero.subtitle')}
          cta1={t('hero.cta1')}
          cta2={t('hero.cta2')}
        />

        <section style={{ padding: '20px 32px 40px' }}>
          <div style={{ maxWidth: 1280, margin: '0 auto' }}>
            {/* Filters */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 32 }}>
              {CATEGORIES.map(c => (
                <button
                  key={c.id}
                  onClick={() => setCat(c.id)}
                  style={{
                    padding: '8px 14px',
                    borderRadius: 999,
                    fontSize: 12,
                    fontWeight: 600,
                    cursor: 'pointer',
                    background: cat === c.id ? 'rgba(244,207,94,0.14)' : 'rgba(255,255,255,0.03)',
                    border: '1px solid',
                    borderColor: cat === c.id ? 'rgba(244,207,94,0.4)' : 'var(--glass-border)',
                    color: cat === c.id ? '#f4cf5e' : 'var(--text-2)',
                    display: 'flex',
                    gap: 6,
                    alignItems: 'center',
                  }}
                >
                  {c.c && <span style={{ width: 8, height: 8, borderRadius: '50%', background: c.c }}></span>}
                  {c.l} <span style={{ opacity: 0.6, fontFamily: 'Geist Mono', fontSize: 10 }}>{c.n}</span>
                </button>
              ))}
            </div>
            {/* Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 14 }}>
              {list.map(i => <Card key={i.n} i={i} />)}
            </div>
          </div>
        </section>

        {/* API CTA */}
        <section style={{ padding: '70px 32px', borderTop: '1px solid var(--glass-border)' }}>
          <div style={{
            maxWidth: 1100,
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 50,
            alignItems: 'center'
          }}>
            <div>
              <div className="uppercase-sm" style={{ color: 'var(--text-3)', marginBottom: 12 }}>
                {t('apiSection.label')}
              </div>
              <h2 style={{ fontSize: 36, marginBottom: 16, letterSpacing: '-0.02em' }}>
                {t('apiSection.title')} <span className="gradient-text">{t('apiSection.titleGradient')}</span>
              </h2>
              <p style={{ color: 'var(--text-3)', lineHeight: 1.7, fontSize: 15, marginBottom: 24 }}>
                {t('apiSection.description')}
              </p>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                <a href="/demo?source=integrations-api-docs" className="btn btn-primary">{t('apiSection.cta1')}</a>
                <a href="https://zapier.com" target="_blank" rel="noopener noreferrer" className="btn btn-ghost">{t('apiSection.cta2')}</a>
              </div>
            </div>
            <div style={{
              background: '#0a0a10',
              border: '1px solid var(--glass-border)',
              borderRadius: 12,
              overflow: 'hidden',
              fontFamily: 'Geist Mono',
              fontSize: 12
            }}>
              <div style={{
                background: 'rgba(255,255,255,0.04)',
                padding: '8px 14px',
                borderBottom: '1px solid var(--glass-border)',
                display: 'flex',
                gap: 6,
                alignItems: 'center'
              }}>
                <span style={{ width: 9, height: 9, borderRadius: '50%', background: '#ef4444' }}></span>
                <span style={{ width: 9, height: 9, borderRadius: '50%', background: '#f59e0b' }}></span>
                <span style={{ width: 9, height: 9, borderRadius: '50%', background: '#10b981' }}></span>
                <span style={{ marginLeft: 10, color: 'var(--text-3)', fontSize: 11 }}>Exemple illustratif</span>
              </div>
              <pre style={{ padding: 18, margin: 0, color: 'var(--text-2)', lineHeight: 1.6 }}>
{`${t('apiSection.codeComment1')}
curl -X POST \\
  "https://<votre-environnement>/api/v1/..." \\
  -H "Authorization: Bearer $TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{ "listing_id": "...", "from": "2026-05-01" }'

`}<span style={{ color: '#94a3b8' }}>{t('apiSection.codeComment2')}</span>
              </pre>
            </div>
          </div>
        </section>

        <StatsBar stats={[
          { k: t('stats.stat1Key'), l: t('stats.stat1Label') },
          { k: t('stats.stat2Key'), l: t('stats.stat2Label') },
          { k: t('stats.stat3Key'), l: t('stats.stat3Label') },
          { k: t('stats.stat4Key'), l: t('stats.stat4Label') }
        ]} />

        <FinalCTA
          title={<>{t('finalCTA.title')} <span className="gradient-text">{t('finalCTA.titleGradient')}</span></>}
          subtitle={t('finalCTA.subtitle')}
        />

        <PageFooter />
      </div>
    </>
  );
}
