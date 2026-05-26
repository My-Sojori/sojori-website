'use client';

import { useTranslations } from 'next-intl';

export function PortfolioOverview() {
  const t = useTranslations('dynamicPricing.portfolio');

  const styles = `
    @media (max-width: 768px) {
      .portfolio-section {
        padding: 32px 16px !important;
      }

      .portfolio-title {
        font-size: 24px !important;
      }

      .portfolio-subtitle {
        font-size: 13px !important;
      }

      .portfolio-summary-cards {
        grid-template-columns: 1fr !important;
        gap: 12px !important;
      }

      .portfolio-table-wrapper {
        overflow-x: auto;
        -webkit-overflow-scrolling: touch;
      }

      .portfolio-table {
        min-width: 700px;
      }

      .portfolio-table th,
      .portfolio-table td {
        padding: 12px 8px !important;
        font-size: 11px !important;
      }

      .portfolio-benefits {
        grid-template-columns: 1fr !important;
      }
    }
  `;

  const portfolioListings = [
    { name: 'Riad Atlas Prestige', city: 'Marrakech', zone: 'Hivernage', adr: 1450, occ: 58, revenue: 42300, color: '#ef4444' },
    { name: 'Villa Jardin Secret', city: 'Marrakech', zone: 'Palmeraie', adr: 2100, occ: 51, revenue: 53900, color: '#10b981' },
    { name: 'Appartement Marais Lux', city: 'Paris', zone: 'Marais', adr: 220, occ: 72, revenue: 57400, color: '#3b82f6' },
    { name: 'Studio Montmartre View', city: 'Paris', zone: 'Montmartre', adr: 165, occ: 68, revenue: 40700, color: '#8b5cf6' },
    { name: 'Dar Gueliz Moderne', city: 'Marrakech', zone: 'Gueliz', adr: 980, occ: 45, revenue: 19800, color: '#f59e0b' },
  ];

  const totalRevenue = portfolioListings.reduce((sum, l) => sum + l.revenue, 0);
  const avgOccupancy = Math.round(portfolioListings.reduce((sum, l) => sum + l.occ, 0) / portfolioListings.length);

  return (
    <>
      <style>{styles}</style>
      <section className="portfolio-section" style={{ padding: '44px 32px', background: 'rgba(255,255,255,0.01)', borderTop: '1px solid var(--glass-border)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div className="uppercase-sm" style={{ color: 'var(--text-3)', marginBottom: 12 }}>
            {t('badge')}
          </div>
          <div className="portfolio-title" style={{ fontSize: 32, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 12, maxWidth: 700 }}>
            {t('title').split(t('titleHighlight'))[0]}
            <span className="gradient-text">{t('titleHighlight')}</span>
            {t('title').split(t('titleHighlight'))[1]}
          </div>
          <p className="portfolio-subtitle" style={{ fontSize: 14, color: 'var(--text-3)', marginBottom: 32, maxWidth: 680 }}>
            {t('subtitle')}
          </p>

          {/* Portfolio Summary Cards */}
          <div className="portfolio-summary-cards" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 24 }}>
            <div className="card" style={{ padding: 20, background: 'rgba(139,92,246,0.08)', border: '1px solid rgba(139,92,246,0.25)' }}>
              <div style={{ fontSize: 11, color: 'var(--text-3)', marginBottom: 4 }}>{t('totalProperties')}</div>
              <div style={{ fontSize: 32, fontWeight: 700, color: '#8b5cf6' }}>{portfolioListings.length}</div>
              <div style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 4 }}>2 {t('cities')}</div>
            </div>

            <div className="card" style={{ padding: 20, background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.25)' }}>
              <div style={{ fontSize: 11, color: 'var(--text-3)', marginBottom: 4 }}>{t('ttmRevenue')}</div>
              <div style={{ fontSize: 32, fontWeight: 700, color: '#10b981', fontFamily: 'var(--font-mono)' }}>
                {Math.round(totalRevenue / 1000)}k
              </div>
              <div style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 4 }}>{t('trailing12months')}</div>
            </div>

            <div className="card" style={{ padding: 20, background: 'rgba(230,176,34,0.08)', border: '1px solid rgba(230,176,34,0.25)' }}>
              <div style={{ fontSize: 11, color: 'var(--text-3)', marginBottom: 4 }}>{t('avgOccupancy')}</div>
              <div style={{ fontSize: 32, fontWeight: 700, color: '#e6b022' }}>{avgOccupancy}%</div>
              <div style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 4 }}>{t('acrossPortfolio')}</div>
            </div>
          </div>

          {/* Portfolio Table */}
          <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
            <div className="portfolio-table-wrapper" style={{ overflowX: 'auto' }}>
              <table className="portfolio-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: 'rgba(255,255,255,0.02)' }}>
                    <th style={{ padding: 16, textAlign: 'left', fontSize: 11, fontWeight: 600, color: 'var(--text-3)', textTransform: 'uppercase' }}>
                      {t('property')}
                    </th>
                    <th style={{ padding: 16, textAlign: 'left', fontSize: 11, fontWeight: 600, color: 'var(--text-3)', textTransform: 'uppercase' }}>
                      {t('location')}
                    </th>
                    <th style={{ padding: 16, textAlign: 'right', fontSize: 11, fontWeight: 600, color: 'var(--text-3)', textTransform: 'uppercase' }}>
                      ADR
                    </th>
                    <th style={{ padding: 16, textAlign: 'right', fontSize: 11, fontWeight: 600, color: 'var(--text-3)', textTransform: 'uppercase' }}>
                      {t('occupancy')}
                    </th>
                    <th style={{ padding: 16, textAlign: 'right', fontSize: 11, fontWeight: 600, color: 'var(--text-3)', textTransform: 'uppercase' }}>
                      {t('revenueTTM')}
                    </th>
                    <th style={{ padding: 16, textAlign: 'center', fontSize: 11, fontWeight: 600, color: 'var(--text-3)', textTransform: 'uppercase' }}>
                      {t('status')}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {portfolioListings.map((listing, idx) => (
                    <tr key={listing.name} style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                      <td style={{ padding: 16 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          <div style={{ width: 8, height: 8, borderRadius: '50%', background: listing.color, flexShrink: 0 }} />
                          <div>
                            <div style={{ fontSize: 13, fontWeight: 600, whiteSpace: 'nowrap' }}>{listing.name}</div>
                            <div style={{ fontSize: 11, color: 'var(--text-3)', fontFamily: 'var(--font-mono)' }}>
                              #{(idx + 1).toString().padStart(3, '0')}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: 16 }}>
                        <div style={{ fontSize: 13 }}>{listing.city}</div>
                        <div style={{ fontSize: 11, color: 'var(--text-3)' }}>{listing.zone}</div>
                      </td>
                      <td style={{ padding: 16, textAlign: 'right', fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 600 }}>
                        {listing.adr} {listing.city === 'Paris' ? '€' : 'MAD'}
                      </td>
                      <td style={{ padding: 16, textAlign: 'right' }}>
                        <div style={{ display: 'inline-block', padding: '4px 10px', borderRadius: 20, background: `${listing.color}20`, color: listing.color, fontSize: 12, fontWeight: 600, fontFamily: 'var(--font-mono)' }}>
                          {listing.occ}%
                        </div>
                      </td>
                      <td style={{ padding: 16, textAlign: 'right', fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 600 }}>
                        {listing.revenue.toLocaleString()}
                      </td>
                      <td style={{ padding: 16, textAlign: 'center' }}>
                        <div style={{ display: 'inline-block', padding: '4px 10px', borderRadius: 20, background: 'rgba(34,197,94,0.15)', color: '#10b981', fontSize: 11, fontWeight: 600, whiteSpace: 'nowrap' }}>
                          ● {t('active')}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Key Benefits */}
          <div className="portfolio-benefits" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 16, marginTop: 24 }}>
            {(t.raw('benefits') as Array<{ icon: string; title: string; description: string }>).map(benefit => (
              <div key={benefit.title} className="card" style={{ padding: 18, background: 'rgba(255,255,255,0.02)' }}>
                <div style={{ fontSize: 24, marginBottom: 8 }}>{benefit.icon}</div>
                <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>{benefit.title}</div>
                <div style={{ fontSize: 12, color: 'var(--text-3)', lineHeight: 1.5 }}>{benefit.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
