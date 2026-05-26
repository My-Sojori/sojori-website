'use client';

import { useTranslations } from 'next-intl';

export function MarketIntelligence() {
  const t = useTranslations('dynamicPricing.marketIntel');

  const cities = [
    {
      name: 'Marrakech',
      flag: 'MA',
      occupancy: 44,
      adr: 1200,
      currency: 'MAD',
      listings: 3847,
      growth: 12,
      color: '#e6b022'
    },
    {
      name: 'Paris',
      flag: 'FR',
      occupancy: 62,
      adr: 180,
      currency: 'EUR',
      listings: 9234,
      growth: 8,
      color: '#8b5cf6'
    }
  ];

  const zones = {
    marrakech: [
      { name: 'Hivernage', adr: 1450, occ: 52, color: '#ef4444' },
      { name: 'Gueliz', adr: 980, occ: 41, color: '#3b82f6' },
      { name: 'Medina', adr: 1120, occ: 48, color: '#8b5cf6' }
    ],
    paris: [
      { name: 'Marais', adr: 220, occ: 68, color: '#ef4444' },
      { name: 'Latin Quarter', adr: 195, occ: 64, color: '#3b82f6' },
      { name: 'Montmartre', adr: 175, occ: 59, color: '#8b5cf6' }
    ]
  };

  return (
    <section style={{ padding: '44px 32px', borderTop: '1px solid var(--glass-border)' }}>
      <style jsx>{`
        @media (max-width: 768px) {
          section { padding: 32px 16px !important; }
          .market-intel-title { font-size: 24px !important; }
          .market-intel-subtitle { font-size: 13px !important; }
          .city-cards { grid-template-columns: 1fr !important; }
          .zone-row {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 8px !important;
          }
          .zone-metrics {
            width: 100%;
            justify-content: space-between !important;
          }
        }
      `}</style>

      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div className="uppercase-sm" style={{ color: 'var(--text-3)', marginBottom: 12 }}>
          {t('badge')}
        </div>
        <div className="market-intel-title" style={{ fontSize: 32, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 12, maxWidth: 700 }}>
          {t('title').split(t('titleHighlight'))[0]}
          <span className="gradient-text">{t('titleHighlight')}</span>
          {t('title').split(t('titleHighlight'))[1]}
        </div>
        <p className="market-intel-subtitle" style={{ fontSize: 14, color: 'var(--text-3)', marginBottom: 32, maxWidth: 680 }}>
          {t('subtitle')}
        </p>

        <div className="city-cards" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 16, marginBottom: 24 }}>
          {cities.map(city => (
            <div key={city.name} className="card" style={{ padding: 24, background: `linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
                <span style={{ fontSize: 32, fontFamily: 'system-ui' }}>{city.flag}</span>
                <div>
                  <div style={{ fontSize: 18, fontWeight: 700 }}>{city.name}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-3)', fontFamily: 'var(--font-mono)' }}>
                    {t('updatedRecently')}
                  </div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
                <div>
                  <div style={{ fontSize: 11, color: 'var(--text-3)', marginBottom: 4 }}>{t('occupancy')}</div>
                  <div style={{ fontSize: 24, fontWeight: 700, color: city.color }}>{city.occupancy}%</div>
                </div>
                <div>
                  <div style={{ fontSize: 11, color: 'var(--text-3)', marginBottom: 4 }}>{t('medianADR')}</div>
                  <div style={{ fontSize: 24, fontWeight: 700, color: city.color }}>{city.adr} {city.currency}</div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, padding: 16, background: 'rgba(0,0,0,0.2)', borderRadius: 8 }}>
                <div>
                  <div style={{ fontSize: 10, color: 'var(--text-3)', marginBottom: 2 }}>{t('activeListings')}</div>
                  <div style={{ fontSize: 16, fontWeight: 600, fontFamily: 'var(--font-mono)' }}>{city.listings.toLocaleString()}</div>
                </div>
                <div>
                  <div style={{ fontSize: 10, color: 'var(--text-3)', marginBottom: 2 }}>{t('supplyGrowth')}</div>
                  <div style={{ fontSize: 16, fontWeight: 600, fontFamily: 'var(--font-mono)', color: '#10b981' }}>+{city.growth}%</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="card" style={{ padding: 24 }}>
          <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 20 }}>{t('zoneBreakdown')}</div>

          <div style={{ marginBottom: 24 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-2)', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
              MA Marrakech
            </div>
            <div style={{ display: 'grid', gap: 8 }}>
              {zones.marrakech.map(zone => (
                <div key={zone.name} className="zone-row" style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: 12,
                  background: 'rgba(255,255,255,0.02)',
                  borderLeft: `3px solid ${zone.color}`,
                  borderRadius: 6
                }}>
                  <div style={{ fontSize: 13, fontWeight: 500 }}>{zone.name}</div>
                  <div className="zone-metrics" style={{ display: 'flex', gap: 20, fontSize: 12, fontFamily: 'var(--font-mono)' }}>
                    <span>ADR: <strong>{zone.adr} MAD</strong></span>
                    <span>Occ: <strong style={{ color: zone.color }}>{zone.occ}%</strong></span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-2)', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
              FR Paris
            </div>
            <div style={{ display: 'grid', gap: 8 }}>
              {zones.paris.map(zone => (
                <div key={zone.name} className="zone-row" style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: 12,
                  background: 'rgba(255,255,255,0.02)',
                  borderLeft: `3px solid ${zone.color}`,
                  borderRadius: 6
                }}>
                  <div style={{ fontSize: 13, fontWeight: 500 }}>{zone.name}</div>
                  <div className="zone-metrics" style={{ display: 'flex', gap: 20, fontSize: 12, fontFamily: 'var(--font-mono)' }}>
                    <span>ADR: <strong>{zone.adr} EUR</strong></span>
                    <span>Occ: <strong style={{ color: zone.color }}>{zone.occ}%</strong></span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
