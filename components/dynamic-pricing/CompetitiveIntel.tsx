'use client';

import { useTranslations } from 'next-intl';

export function CompetitiveIntel() {
  const t = useTranslations('dynamicPricing.competitive');

  const styles = `
    @media (max-width: 768px) {
      .competitive-section {
        padding: 32px 16px !important;
      }

      .competitive-title {
        font-size: 24px !important;
      }

      .competitive-subtitle {
        font-size: 13px !important;
      }

      .comp-analysis-grid {
        grid-template-columns: 1fr !important;
        gap: 16px !important;
      }

      .comp-metrics {
        grid-template-columns: 1fr !important;
      }

      .comp-item {
        flex-direction: column !important;
        align-items: flex-start !important;
        gap: 10px !important;
      }

      .comp-item-stats {
        width: 100%;
        display: flex;
        justify-content: space-around !important;
      }

      .comp-insights {
        grid-template-columns: 1fr !important;
      }
    }
  `;

  const comps = [
    { name: 'Riad Premium A', bedrooms: 4, rating: 4.9, reviews: 287, adr: 1520, occ: 61, revenue: 46600, distance: 0.3 },
    { name: 'Villa Luxury B', bedrooms: 5, rating: 4.8, reviews: 194, adr: 2200, occ: 48, revenue: 53100, distance: 0.5 },
    { name: 'Dar Boutique C', bedrooms: 3, rating: 4.7, reviews: 412, adr: 1280, occ: 55, revenue: 35400, distance: 0.2 },
    { name: 'Maison Prestige D', bedrooms: 4, rating: 4.9, reviews: 328, adr: 1650, occ: 57, revenue: 47300, distance: 0.4 },
  ];

  const avgCompAdr = Math.round(comps.reduce((sum, c) => sum + c.adr, 0) / comps.length);
  const avgCompOcc = Math.round(comps.reduce((sum, c) => sum + c.occ, 0) / comps.length);

  return (
    <>
      <style>{styles}</style>
      <section className="competitive-section" style={{ padding: '44px 32px', borderTop: '1px solid var(--glass-border)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div className="uppercase-sm" style={{ color: 'var(--text-3)', marginBottom: 12 }}>
            {t('badge')}
          </div>
          <div className="competitive-title" style={{ fontSize: 32, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 12, maxWidth: 700 }}>
            {t('title').split(t('titleHighlight'))[0]}
            <span className="gradient-text">{t('titleHighlight')}</span>
            {t('title').split(t('titleHighlight'))[1]}
          </div>
          <p className="competitive-subtitle" style={{ fontSize: 14, color: 'var(--text-3)', marginBottom: 32, maxWidth: 680 }}>
            {t('subtitle')}
          </p>

          <div className="comp-analysis-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
            {/* Comp Set Analysis */}
            <div className="card" style={{ padding: 24 }}>
              <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                🎯 {t('compSet')}
                <span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 12, background: 'rgba(139,92,246,0.2)', color: '#a78bfa' }}>
                  {comps.length} {t('comps')}
                </span>
              </div>

              <div className="comp-metrics" style={{ marginBottom: 20, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div style={{ padding: 16, background: 'rgba(255,255,255,0.03)', borderRadius: 8 }}>
                  <div style={{ fontSize: 11, color: 'var(--text-3)', marginBottom: 4 }}>{t('avgCompADR')}</div>
                  <div style={{ fontSize: 24, fontWeight: 700, color: '#e6b022', fontFamily: 'var(--font-mono)' }}>
                    {avgCompAdr} MAD
                  </div>
                </div>
                <div style={{ padding: 16, background: 'rgba(255,255,255,0.03)', borderRadius: 8 }}>
                  <div style={{ fontSize: 11, color: 'var(--text-3)', marginBottom: 4 }}>{t('avgCompOcc')}</div>
                  <div style={{ fontSize: 24, fontWeight: 700, color: '#8b5cf6', fontFamily: 'var(--font-mono)' }}>
                    {avgCompOcc}%
                  </div>
                </div>
              </div>

              <div style={{ display: 'grid', gap: 10 }}>
                {comps.map((comp, idx) => (
                  <div key={comp.name} className="comp-item" style={{
                    padding: 14,
                    background: 'rgba(255,255,255,0.02)',
                    border: '1px solid rgba(255,255,255,0.06)',
                    borderRadius: 8,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 4 }}>{comp.name}</div>
                      <div style={{ fontSize: 11, color: 'var(--text-3)', display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                        <span>⭐ {comp.rating} ({comp.reviews})</span>
                        <span>• {comp.bedrooms} BR</span>
                        <span>• {comp.distance} km</span>
                      </div>
                    </div>
                    <div className="comp-item-stats" style={{ display: 'flex', gap: 16, fontSize: 12, fontFamily: 'var(--font-mono)' }}>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ color: 'var(--text-3)', fontSize: 10, marginBottom: 2 }}>ADR</div>
                        <div style={{ fontWeight: 600 }}>{comp.adr}</div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ color: 'var(--text-3)', fontSize: 10, marginBottom: 2 }}>OCC</div>
                        <div style={{ fontWeight: 600, color: comp.occ > avgCompOcc ? '#10b981' : '#f59e0b' }}>
                          {comp.occ}%
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Market Position & Insights */}
            <div>
              <div className="card" style={{ padding: 24, marginBottom: 16 }}>
                <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 16 }}>
                  📊 {t('yourPosition')}
                </div>

                <div style={{ display: 'grid', gap: 14 }}>
                  <div style={{ padding: 14, background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.25)', borderRadius: 8 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8, flexWrap: 'wrap', gap: 8 }}>
                      <span style={{ fontSize: 13, fontWeight: 500 }}>{t('adrPosition')}</span>
                      <span style={{ fontSize: 18, fontWeight: 700, color: '#10b981' }}>+8%</span>
                    </div>
                    <div style={{ fontSize: 11, color: 'var(--text-3)' }}>
                      {t('adrAboveMarket')}
                    </div>
                  </div>

                  <div style={{ padding: 14, background: 'rgba(230,176,34,0.08)', border: '1px solid rgba(230,176,34,0.25)', borderRadius: 8 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8, flexWrap: 'wrap', gap: 8 }}>
                      <span style={{ fontSize: 13, fontWeight: 500 }}>{t('occPosition')}</span>
                      <span style={{ fontSize: 18, fontWeight: 700, color: '#e6b022' }}>-3%</span>
                    </div>
                    <div style={{ fontSize: 11, color: 'var(--text-3)' }}>
                      {t('occBelowMarket')}
                    </div>
                  </div>

                  <div style={{ padding: 14, background: 'rgba(139,92,246,0.08)', border: '1px solid rgba(139,92,246,0.25)', borderRadius: 8 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8, flexWrap: 'wrap', gap: 8 }}>
                      <span style={{ fontSize: 13, fontWeight: 500 }}>{t('revenueRank')}</span>
                      <span style={{ fontSize: 18, fontWeight: 700, color: '#8b5cf6' }}>#2</span>
                    </div>
                    <div style={{ fontSize: 11, color: 'var(--text-3)' }}>
                      {t('rankDescription')}
                    </div>
                  </div>
                </div>
              </div>

              {/* Share Reports */}
              <div className="card" style={{ padding: 24, background: 'linear-gradient(135deg, rgba(139,92,246,0.1) 0%, rgba(59,130,246,0.05) 100%)' }}>
                <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 12 }}>
                  🔗 {t('shareReports')}
                </div>
                <p style={{ fontSize: 12, color: 'var(--text-3)', marginBottom: 16, lineHeight: 1.6 }}>
                  {t('shareDescription')}
                </p>
                <div style={{ display: 'grid', gap: 8 }}>
                  {(t.raw('shareTypes') as Array<{ icon: string; label: string }>).map(type => (
                    <div key={type.label} style={{
                      padding: 10,
                      background: 'rgba(255,255,255,0.05)',
                      borderRadius: 6,
                      fontSize: 12,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8
                    }}>
                      <span>{type.icon}</span>
                      <span>{type.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Key Insights */}
          <div className="comp-insights" style={{ marginTop: 24, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
            {(t.raw('insights') as Array<{ icon: string; title: string; description: string }>).map(insight => (
              <div key={insight.title} className="card" style={{ padding: 18, background: 'rgba(255,255,255,0.02)' }}>
                <div style={{ fontSize: 24, marginBottom: 8 }}>{insight.icon}</div>
                <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>{insight.title}</div>
                <div style={{ fontSize: 12, color: 'var(--text-3)', lineHeight: 1.5 }}>{insight.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
