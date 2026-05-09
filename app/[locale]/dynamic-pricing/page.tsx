'use client';

import { useTranslations } from 'next-intl';
import { BackgroundEffects } from '@/components/BackgroundEffects';
import { PageHeader, PageFooter, PageHero, StatsBar, FinalCTA } from '@/components/SharedComponents';

function PriceCalendar() {
  const t = useTranslations('dynamicPricing.calendar');
  const days = Array.from({ length: 35 }, (_, i) => i - 1);
  const events: Record<number, string> = { 8: 'event', 9: 'event', 10: 'event', 14: 'high', 15: 'high', 21: 'low', 22: 'low' };
  const dayNames = t.raw('days') as string[];

  return (
    <div className="card" style={{ padding: 20, background: 'rgba(255,255,255,0.03)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <div style={{ fontSize: 16, fontWeight: 600 }}>{t('title')}</div>
        <div style={{ display: 'flex', gap: 6, fontSize: 11 }}>
          <span style={{ padding: '4px 8px', borderRadius: 5, background: 'rgba(239,68,68,0.15)', color: '#fca5a5' }}>● {t('labels.event')}</span>
          <span style={{ padding: '4px 8px', borderRadius: 5, background: 'rgba(230,176,34,0.15)', color: '#f4cf5e' }}>● {t('labels.highDemand')}</span>
          <span style={{ padding: '4px 8px', borderRadius: 5, background: 'rgba(59,130,246,0.15)', color: '#93c5fd' }}>● {t('labels.lowDemand')}</span>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4, fontSize: 10, color: 'var(--text-3)', textAlign: 'center', marginBottom: 6, fontFamily: 'var(--font-mono)' }}>
        {dayNames.map((d, i) => <div key={i} style={{ padding: 4 }}>{d}</div>)}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4 }}>
        {days.map((d, i) => {
          const valid = d >= 1 && d <= 31;
          const event = events[d];
          const base = 1200;
          const adj = event === 'event' ? 1900 : event === 'high' ? 1450 : event === 'low' ? 950 : base;
          const color = event === 'event' ? '#ef4444' : event === 'high' ? '#e6b022' : event === 'low' ? '#3b82f6' : null;
          return (
            <div key={i} style={{
              aspectRatio: '1', padding: 4,
              background: valid ? (color ? `${color}15` : 'rgba(255,255,255,0.03)') : 'transparent',
              border: valid ? `1px solid ${color ? `${color}40` : 'rgba(255,255,255,0.06)'}` : 'none',
              borderRadius: 6,
              display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
            }}>
              {valid && <>
                <div style={{ fontSize: 10, color: 'var(--text-3)', fontFamily: 'var(--font-mono)' }}>{d}</div>
                <div style={{ fontSize: 11, fontWeight: 600, color: color || 'var(--text-1)', fontFamily: 'var(--font-mono)' }}>{adj}€</div>
              </>}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function PriceFactors() {
  const t = useTranslations('dynamicPricing.factors');
  const factorsList = t.raw('list') as Array<{ icon: string; label: string; description: string; impact: string }>;
  const comingSoon = t.raw('comingSoon') as { icon: string; title: string; description: string };

  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
        {factorsList.map(f => (
          <div key={f.label} className="card" style={{ padding: 18, display: 'flex', gap: 14, alignItems: 'flex-start' }}>
            <div style={{ fontSize: 28, flexShrink: 0 }}>{f.icon}</div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <div style={{ fontSize: 15, fontWeight: 600 }}>{f.label}</div>
                <div style={{ fontSize: 11, color: '#f4cf5e', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>{f.impact}</div>
              </div>
              <div style={{ fontSize: 12, color: 'var(--text-3)', lineHeight: 1.5 }}>{f.description}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="card" style={{ padding: 20, marginTop: 16, background: 'rgba(139,92,246,0.08)', border: '1px solid rgba(139,92,246,0.25)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ fontSize: 24 }}>{comingSoon.icon}</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 2 }}>{comingSoon.title}</div>
            <div style={{ fontSize: 12, color: 'var(--text-3)' }}>{comingSoon.description}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function RevenueChart() {
  const t = useTranslations('dynamicPricing.revenue.chart');
  const monthNames = t.raw('months') as string[];
  const points = [
    { m: monthNames[0], without: 18, with: 18 },
    { m: monthNames[1], without: 22, with: 27 },
    { m: monthNames[2], without: 28, with: 38 },
    { m: monthNames[3], without: 32, with: 44 },
    { m: monthNames[4], without: 35, with: 51 },
    { m: monthNames[5], without: 38, with: 58 },
  ];
  const max = 65;
  const w = 700;
  const h = 240;
  const pad = 40;

  return (
    <div className="card" style={{ padding: 26 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 18 }}>
        <div>
          <div style={{ fontSize: 11, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: 1 }}>{t('illustrationLabel')}</div>
          <div style={{ fontSize: 22, fontWeight: 700, marginTop: 2 }}>{t('trendLabel')}</div>
        </div>
        <div style={{ display: 'flex', gap: 16, fontSize: 12, alignItems: 'flex-start' }}>
          <span style={{ color: 'var(--text-3)' }}>● {t('withoutSojori')}</span>
          <span style={{ color: '#f4cf5e' }}>● {t('withSojori')}</span>
        </div>
      </div>
      <svg width="100%" viewBox={`0 0 ${w} ${h}`} style={{ overflow: 'visible' }}>
        {[0, 0.25, 0.5, 0.75, 1].map(p => (
          <line key={p} x1={pad} y1={pad + (h - pad * 2) * p} x2={w - pad} y2={pad + (h - pad * 2) * p} stroke="rgba(255,255,255,0.06)" />
        ))}
        {points.map((p, i) => {
          const x = pad + i * (w - pad * 2) / (points.length - 1);
          return <text key={i} x={x} y={h - 10} fontSize="11" fill="rgba(255,255,255,0.5)" textAnchor="middle" fontFamily="Geist Mono">{p.m}</text>;
        })}
        <polyline fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2" strokeDasharray="4 4"
          points={points.map((p, i) => `${pad + i * (w - pad * 2) / (points.length - 1)},${h - pad - (p.without / max) * (h - pad * 2)}`).join(' ')} />
        <polyline fill="none" stroke="#f4cf5e" strokeWidth="3"
          points={points.map((p, i) => `${pad + i * (w - pad * 2) / (points.length - 1)},${h - pad - (p.with / max) * (h - pad * 2)}`).join(' ')} />
        <polygon fill="url(#g-area)" opacity="0.35"
          points={`${pad},${h - pad} ${points.map((p, i) => `${pad + i * (w - pad * 2) / (points.length - 1)},${h - pad - (p.with / max) * (h - pad * 2)}`).join(' ')} ${w - pad},${h - pad}`} />
        <defs>
          <linearGradient id="g-area" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f4cf5e" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#f4cf5e" stopOpacity="0" />
          </linearGradient>
        </defs>
        {points.map((p, i) => {
          const x = pad + i * (w - pad * 2) / (points.length - 1);
          return (
            <g key={i}>
              <circle cx={x} cy={h - pad - (p.with / max) * (h - pad * 2)} r="5" fill="#f4cf5e" stroke="#0a0a0a" strokeWidth="2" />
              <text x={x} y={h - pad - (p.with / max) * (h - pad * 2) - 12} fontSize="11" fill="#f4cf5e" textAnchor="middle" fontFamily="Geist Mono" fontWeight="600">{p.with}k€</text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

export default function DynamicPricingPage() {
  const t = useTranslations('dynamicPricing');
  const tHero = useTranslations('dynamicPricing.hero');
  const tCalSection = useTranslations('dynamicPricing.calendar.section');
  const tFactors = useTranslations('dynamicPricing.factors');
  const tRevenue = useTranslations('dynamicPricing.revenue');
  const tStats = useTranslations('dynamicPricing.stats');
  const tFinalCTA = useTranslations('dynamicPricing.finalCTA');

  const impactCards = tRevenue.raw('impact') as Array<{ icon: string; label: string; description: string }>;
  const stats = [
    { k: tStats('stat1.key'), l: tStats('stat1.label') },
    { k: tStats('stat2.key'), l: tStats('stat2.label') },
    { k: tStats('stat3.key'), l: tStats('stat3.label') },
    { k: tStats('stat4.key'), l: tStats('stat4.label') },
  ];

  return (
    <>
      <style jsx>{`
        @media (max-width: 768px) {
          section { padding: 60px 20px !important; }

          div[style*="padding: '20px 32px 80px'"] { padding: 20px 20px 60px !important; }
          div[style*="padding: '40px 32px 80px'"] { padding: 40px 20px 60px !important; }

          div[style*="gridTemplateColumns: 'repeat(2, 1fr)'"] {
            display: flex !important;
            overflow-x: auto !important;
            scroll-snap-type: x mandatory !important;
            -webkit-overflow-scrolling: touch !important;
            gap: 16px !important;
            padding-bottom: 20px !important;
          }

          div[style*="gridTemplateColumns: 'repeat(2, 1fr)'"] > * {
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

          div[style*="gridTemplateColumns: 'repeat(7, 1fr)'"] {
            gap: 3px !important;
            font-size: 9px !important;
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
        <PageHero
          badge={tHero('badge')}
          title={<>{tHero('title')}<br /><span className="gradient-text">{tHero('titleGradient')}</span></>}
          subtitle={tHero('subtitle')}
          cta1={tHero('cta1')}
          cta2={tHero('cta2')}
        />

        <section style={{ padding: '20px 32px 80px' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div className="uppercase-sm" style={{ color: 'var(--text-3)', marginBottom: 12, textAlign: 'center' }}>{tCalSection('badge')}</div>
            <div style={{ fontSize: 32, fontWeight: 700, letterSpacing: '-0.02em', textAlign: 'center', maxWidth: 720, margin: '0 auto 12px' }}>
              {tCalSection('title').split(tCalSection('titleHighlight'))[0]}
              <span style={{ color: '#f4cf5e' }}>{tCalSection('titleHighlight')}</span>
              {tCalSection('title').split(tCalSection('titleHighlight'))[1]}.
            </div>
            <p style={{ textAlign: 'center', fontSize: 13, color: 'var(--text-3)', maxWidth: 560, margin: '0 auto 32px' }}>{tCalSection('subtitle')}</p>
            <PriceCalendar />
          </div>
        </section>

        <section style={{ padding: '40px 32px 80px', borderTop: '1px solid var(--glass-border)' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div className="uppercase-sm" style={{ color: 'var(--text-3)', marginBottom: 12 }}>{tFactors('badge')}</div>
            <div style={{ fontSize: 32, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 32, maxWidth: 700 }}>
              {tFactors('title').split(tFactors('titleHighlight'))[0]}
              <span className="gradient-text">{tFactors('titleHighlight')}</span>
              {tFactors('title').split(tFactors('titleHighlight'))[1]}.
            </div>
            <PriceFactors />
          </div>
        </section>

        <section style={{ padding: '40px 32px 80px', borderTop: '1px solid var(--glass-border)' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <div className="uppercase-sm" style={{ color: 'var(--text-3)', marginBottom: 12 }}>{tRevenue('badge')}</div>
            <div style={{ fontSize: 32, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 12, maxWidth: 700 }}>
              {tRevenue('title').split(tRevenue('titleHighlight'))[0]}
              <span className="gradient-text">{tRevenue('titleHighlight')}</span>
            </div>
            <p style={{ fontSize: 13, color: 'var(--text-3)', marginBottom: 24, maxWidth: 720 }}>{tRevenue('subtitle')}</p>
            <RevenueChart />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginTop: 24 }}>
              {impactCards.map(s => (
                <div key={s.label} className="card" style={{ padding: 20 }}>
                  <div className="gradient-text" style={{ fontSize: 36, fontWeight: 700, letterSpacing: '-0.02em' }}>{s.icon}</div>
                  <div style={{ fontSize: 13, fontWeight: 500, marginTop: 4 }}>{s.label}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 2 }}>{s.description}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <StatsBar stats={stats} />
        <FinalCTA
          title={<>{tFinalCTA('title').split(tFinalCTA('titleGradient'))[0]}<span className="gradient-text">{tFinalCTA('titleGradient')}</span>.</>}
          subtitle={tFinalCTA('subtitle')}
        />
        <PageFooter />
      </div>
    </>
  );
}
