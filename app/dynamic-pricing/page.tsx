import { BackgroundEffects } from '@/components/BackgroundEffects';
import { PageHeader, PageFooter, PageHero, StatsBar, FinalCTA } from '@/components/SharedComponents';

function PriceCalendar() {
  const days = Array.from({ length: 35 }, (_, i) => i - 1);
  const events: Record<number, string> = { 8: 'event', 9: 'event', 10: 'event', 14: 'high', 15: 'high', 21: 'low', 22: 'low' };

  return (
    <div className="card" style={{ padding: 20, background: 'rgba(255,255,255,0.03)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <div style={{ fontSize: 16, fontWeight: 600 }}>Mars 2025 · Riad El Fenn</div>
        <div style={{ display: 'flex', gap: 6, fontSize: 11 }}>
          <span style={{ padding: '4px 8px', borderRadius: 5, background: 'rgba(239,68,68,0.15)', color: '#fca5a5' }}>● Événement</span>
          <span style={{ padding: '4px 8px', borderRadius: 5, background: 'rgba(230,176,34,0.15)', color: '#f4cf5e' }}>● Forte demande</span>
          <span style={{ padding: '4px 8px', borderRadius: 5, background: 'rgba(59,130,246,0.15)', color: '#93c5fd' }}>● Faible demande</span>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4, fontSize: 10, color: 'var(--text-3)', textAlign: 'center', marginBottom: 6, fontFamily: 'var(--font-mono)' }}>
        {['L', 'M', 'M', 'J', 'V', 'S', 'D'].map((d, i) => <div key={i} style={{ padding: 4 }}>{d}</div>)}
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
  const factors = [
    { i: '📅', l: 'Saisonnalité', desc: 'Haute / basse saison, vacances scolaires (FR, UK, DE, ES)', impact: '+/- 35%' },
    { i: '🎉', l: 'Événements', desc: 'Festivals, concerts, congrès, matchs — détection auto', impact: '+50% à +200%' },
    { i: '🌤️', l: 'Météo', desc: 'Prévisions 14j — pluie/soleil ajuste demande', impact: '+/- 12%' },
    { i: '✈️', l: 'Vols + occupation hôtels', desc: 'Volume vols entrants, taux occupation région', impact: '+/- 25%' },
    { i: '🏆', l: 'Concurrence', desc: 'Scrape Booking/Airbnb temps réel · 2km radius', impact: '+/- 15%' },
    { i: '⏱️', l: 'Lead time', desc: "Plus on approche, plus l'algo ajuste agressivement", impact: 'Last-min -20% / Early +8%' },
    { i: '⭐', l: 'Performance logement', desc: 'Note, taux conversion, photos performantes', impact: '+/- 18%' },
    { i: '🛏️', l: 'Durée séjour', desc: 'Discount nuités multiples, premium courts séjours', impact: '-5% à -25%' },
  ];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
      {factors.map(f => (
        <div key={f.l} className="card" style={{ padding: 18, display: 'flex', gap: 14, alignItems: 'flex-start' }}>
          <div style={{ fontSize: 28, flexShrink: 0 }}>{f.i}</div>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
              <div style={{ fontSize: 15, fontWeight: 600 }}>{f.l}</div>
              <div style={{ fontSize: 11, color: '#f4cf5e', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>{f.impact}</div>
            </div>
            <div style={{ fontSize: 12, color: 'var(--text-3)', lineHeight: 1.5 }}>{f.desc}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

function RevenueChart() {
  const points = [
    { m: 'Jan', without: 18, with: 18 },
    { m: 'Fév', without: 22, with: 27 },
    { m: 'Mar', without: 28, with: 38 },
    { m: 'Avr', without: 32, with: 44 },
    { m: 'Mai', without: 35, with: 51 },
    { m: 'Jun', without: 38, with: 58 },
  ];
  const max = 65;
  const w = 700;
  const h = 240;
  const pad = 40;

  return (
    <div className="card" style={{ padding: 26 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 18 }}>
        <div>
          <div style={{ fontSize: 11, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: 1 }}>Revenu mensuel</div>
          <div style={{ fontSize: 22, fontWeight: 700, marginTop: 2 }}>+47% en moyenne</div>
        </div>
        <div style={{ display: 'flex', gap: 16, fontSize: 12, alignItems: 'flex-start' }}>
          <span style={{ color: 'var(--text-3)' }}>● Sans Sojori</span>
          <span style={{ color: '#f4cf5e' }}>● Avec Sojori</span>
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
  return (
    <>
      <BackgroundEffects />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <PageHeader pageTitle="Dynamic Pricing" />
        <PageHero
          badge="📈 Dynamic Pricing · Optimisation continue"
          title={<>Le bon prix.<br /><span className="gradient-text">Au bon moment. Toujours.</span></>}
          subtitle="L'IA Sojori analyse 47 signaux par jour et ajuste vos tarifs sur les 18 OTAs en simultané. +32% de revenu en moyenne — sans baisser vos prix."
          cta1="Voir la démo"
          cta2="Audit pricing gratuit"
        />

        <section style={{ padding: '20px 32px 80px' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div className="uppercase-sm" style={{ color: 'var(--text-3)', marginBottom: 12, textAlign: 'center' }}>● Calendar pricing temps réel</div>
            <div style={{ fontSize: 32, fontWeight: 700, letterSpacing: '-0.02em', textAlign: 'center', maxWidth: 720, margin: '0 auto 32px' }}>Vos tarifs réajustés <span style={{ color: '#f4cf5e' }}>chaque heure</span>.</div>
            <PriceCalendar />
          </div>
        </section>

        <section style={{ padding: '40px 32px 80px', borderTop: '1px solid var(--glass-border)' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div className="uppercase-sm" style={{ color: 'var(--text-3)', marginBottom: 12 }}>● 47 signaux analysés</div>
            <div style={{ fontSize: 32, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 32, maxWidth: 700 }}>L'algo regarde ce que vous <span style={{ color: 'var(--text-3)' }}>ne pouvez pas regarder</span>.</div>
            <PriceFactors />
          </div>
        </section>

        <section style={{ padding: '40px 32px 80px', borderTop: '1px solid var(--glass-border)' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <div className="uppercase-sm" style={{ color: 'var(--text-3)', marginBottom: 12 }}>● Impact mesuré</div>
            <div style={{ fontSize: 32, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 32, maxWidth: 700 }}>Vos revenus, <span className="gradient-text">multipliés</span>.</div>
            <RevenueChart />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginTop: 24 }}>
              {[
                { k: '+32%', l: "Revenu net moyen", s: 'sur 6 mois' },
                { k: '+18%', l: "Taux d'occupation", s: 'année complète' },
                { k: '−68%', l: 'Temps de gestion', s: 'mensuel' },
              ].map(s => (
                <div key={s.l} className="card" style={{ padding: 20 }}>
                  <div className="gradient-text" style={{ fontSize: 36, fontWeight: 700, letterSpacing: '-0.02em' }}>{s.k}</div>
                  <div style={{ fontSize: 13, fontWeight: 500, marginTop: 4 }}>{s.l}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 2 }}>{s.s}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <StatsBar stats={[{k:'+32%',l:'Revenu net moyen'},{k:'47 signaux',l:'Analysés en continu'},{k:'18 OTAs',l:'Sync simultanée'},{k:'1h',l:"Fréquence d'ajustement"}]} />
        <FinalCTA title={<>Audit pricing <span className="gradient-text">gratuit</span>.</>} subtitle="On analyse vos prix actuels vs marché et on vous montre votre potentiel. Aucun engagement." />
        <PageFooter />
      </div>
    </>
  );
}
