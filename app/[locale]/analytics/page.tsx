import type { Metadata } from "next";
import { getTranslations } from 'next-intl/server';
import { BackgroundEffects } from "@/components/BackgroundEffects";
import { PageHeader, PageFooter, PageHero, StatsBar, FinalCTA } from "@/components/SharedComponents";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'seoPages' });
  return {
    title: t('analytics.title'),
    description: t('analytics.description'),
  };
}

interface ChartDataPoint {
  d: number;
  rev: number;
  occ: number;
}

interface Property {
  name: string;
  rev: string;
  occ: string;
  adr: string;
  revpar: string;
  rating: string;
  delta: string;
}

function MainChart() {
  const data: ChartDataPoint[] = Array.from({ length: 30 }, (_, i) => ({
    d: i + 1,
    rev: 4 + Math.sin(i / 4) * 1.5 + i * 0.18 + Math.random() * 0.6,
    occ: 65 + Math.sin(i / 5) * 12 + i * 0.5,
  }));
  const w = 760, h = 280, pad = 40;
  const maxRev = 12;

  return (
    <div className="card" style={{padding: 26}}>
      <div style={{display: "flex", justifyContent: "space-between", marginBottom: 18}}>
        <div>
          <div style={{fontSize: 11, color: "var(--text-3)", textTransform: "uppercase", letterSpacing: 1}}>Revenue · 30 derniers jours</div>
          <div style={{display: "flex", alignItems: "baseline", gap: 12, marginTop: 4}}>
            <span style={{fontSize: 28, fontWeight: 700, letterSpacing: "-0.02em"}}>€247,890</span>
            <span style={{fontSize: 13, color: "#10b981", fontWeight: 600}}>↗ +24.6%</span>
          </div>
        </div>
        <div style={{display: "flex", gap: 14, fontSize: 12}}>
          <span style={{color: "#f4cf5e"}}>● Revenue</span>
          <span style={{color: "#06b6d4"}}>● Occupation</span>
        </div>
      </div>
      <svg width="100%" viewBox={`0 0 ${w} ${h}`}>
        {[0, 0.25, 0.5, 0.75, 1].map(p => <line key={p} x1={pad} y1={pad + (h - pad * 2) * p} x2={w - pad} y2={pad + (h - pad * 2) * p} stroke="rgba(255,255,255,0.05)" />)}
        <defs>
          <linearGradient id="g-rev" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f4cf5e" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#f4cf5e" stopOpacity="0" />
          </linearGradient>
        </defs>
        <polygon fill="url(#g-rev)"
          points={`${pad},${h - pad} ${data.map((p, i) => `${pad + i * (w - pad * 2) / (data.length - 1)},${h - pad - (p.rev / maxRev) * (h - pad * 2)}`).join(" ")} ${w - pad},${h - pad}`} />
        <polyline fill="none" stroke="#f4cf5e" strokeWidth="2.5"
          points={data.map((p, i) => `${pad + i * (w - pad * 2) / (data.length - 1)},${h - pad - (p.rev / maxRev) * (h - pad * 2)}`).join(" ")} />
        <polyline fill="none" stroke="#06b6d4" strokeWidth="2" strokeDasharray="4 3"
          points={data.map((p, i) => `${pad + i * (w - pad * 2) / (data.length - 1)},${h - pad - (p.occ / 100) * (h - pad * 2)}`).join(" ")} />
        {[1, 8, 15, 22, 30].map(d => {
          const x = pad + (d - 1) * (w - pad * 2) / (data.length - 1);
          return <text key={d} x={x} y={h - 12} fontSize="10" fill="rgba(255,255,255,0.4)" textAnchor="middle" fontFamily="Geist Mono">{d} mar</text>;
        })}
      </svg>
    </div>
  );
}

function PropertyTable() {
  const props: Property[] = [
    { name: "Appartement Paris 15", rev: "€18,420", occ: "94%", adr: "€1,450", revpar: "€1,365", rating: "4.92", delta: "+18%" },
    { name: "Loft Montmartre", rev: "€14,200", occ: "87%", adr: "€1,180", revpar: "€1,027", rating: "4.85", delta: "+12%" },
    { name: "Villa Atlas", rev: "€22,890", occ: "91%", adr: "€1,890", revpar: "€1,720", rating: "4.95", delta: "+24%" },
    { name: "Atlas Loft", rev: "€8,640", occ: "78%", adr: "€820", revpar: "€640", rating: "4.78", delta: "+8%" },
    { name: "Médina House", rev: "€11,250", occ: "83%", adr: "€980", revpar: "€814", rating: "4.88", delta: "+15%" },
  ];

  return (
    <div className="card" style={{padding: 0, overflow: "hidden"}}>
      <div style={{padding: "14px 22px", borderBottom: "1px solid var(--glass-border)", display: "flex", justifyContent: "space-between", alignItems: "center"}}>
        <div style={{fontSize: 14, fontWeight: 600}}>Performance par propriété · Mars 2025</div>
        <button style={{background: "transparent", border: "1px solid var(--glass-border)", color: "var(--text-1)", padding: "6px 12px", borderRadius: 6, fontSize: 11, cursor: "pointer"}}>📥 Export CSV</button>
      </div>
      <div style={{display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr 1fr 1fr", gap: 12, padding: "12px 22px", fontSize: 10, color: "var(--text-3)", textTransform: "uppercase", letterSpacing: 1, borderBottom: "1px solid rgba(255,255,255,0.04)"}}>
        <div>Propriété</div><div>Revenue</div><div>Occ.</div><div>ADR</div><div>RevPAR</div><div>Note</div><div>Δ M-1</div>
      </div>
      {props.map((p, i) => (
        <div key={p.name} style={{display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr 1fr 1fr", gap: 12, padding: "14px 22px", fontSize: 13, alignItems: "center", borderTop: i ? "1px solid rgba(255,255,255,0.04)" : "none"}}>
          <div style={{fontWeight: 600}}>{p.name}</div>
          <div style={{fontFamily: "Geist Mono", fontWeight: 600}}>{p.rev}</div>
          <div style={{fontFamily: "Geist Mono", color: "var(--text-2)"}}>{p.occ}</div>
          <div style={{fontFamily: "Geist Mono", color: "var(--text-2)"}}>{p.adr}</div>
          <div style={{fontFamily: "Geist Mono", color: "#f4cf5e", fontWeight: 600}}>{p.revpar}</div>
          <div style={{color: "#fbbf24"}}>{p.rating}★</div>
          <div style={{color: "#10b981", fontFamily: "Geist Mono", fontWeight: 600, fontSize: 12}}>{p.delta}</div>
        </div>
      ))}
    </div>
  );
}

export default function AnalyticsPage() {
  return (
    <>
      <BackgroundEffects />
      <div style={{position: "relative", zIndex: 1}}>
        <PageHeader pageTitle="Smart Analytics" />
        <PageHero
          badge="📊 Smart Analytics · Decision intelligence"
          title={<>Vos données.<br /><span className="gradient-text">Transformées en décisions.</span></>}
          subtitle="Revenue, Occupation, ADR, RevPAR par propriété. Performance staff. Alertes intelligentes. Export comptable. Le pilotage de votre activité — sans tableur Excel."
          cta1="Voir la démo" cta2="Audit gratuit"
        />
        <section style={{padding: "20px 32px 60px"}}>
          <div style={{maxWidth: 1200, margin: "0 auto", display: "flex", flexDirection: "column", gap: 14}}>
            <div style={{display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12}}>
              {[
                { l: "Revenue net", v: "€247,890", d: "+24.6%", c: "#f4cf5e" },
                { l: "Occupation", v: "87.4%", d: "+5.2pts", c: "#06b6d4" },
                { l: "ADR moyen", v: "€1,264", d: "+€84", c: "#a78bfa" },
                { l: "RevPAR", v: "€1,103", d: "+€142", c: "#10b981" },
              ].map(s => (
                <div key={s.l} className="card" style={{padding: 18}}>
                  <div style={{fontSize: 11, color: "var(--text-3)", textTransform: "uppercase", letterSpacing: 1}}>{s.l}</div>
                  <div style={{fontSize: 26, fontWeight: 700, marginTop: 6, letterSpacing: "-0.02em", color: s.c}}>{s.v}</div>
                  <div style={{fontSize: 12, color: "#10b981", marginTop: 2}}>↗ {s.d}</div>
                </div>
              ))}
            </div>
            <MainChart />
            <PropertyTable />
          </div>
        </section>
        <section style={{padding: "40px 32px 80px", borderTop: "1px solid var(--glass-border)"}}>
          <div style={{maxWidth: 1200, margin: "0 auto"}}>
            <div className="uppercase-sm" style={{color: "var(--text-3)", marginBottom: 12}}>● Capacités</div>
            <div style={{fontSize: 32, fontWeight: 700, letterSpacing: "-0.02em", marginBottom: 32, maxWidth: 700}}>Pilotez. <span className="gradient-text">Ne devinez plus.</span></div>
            <div style={{display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16}}>
              {[
                { i: "📊", t: "Dashboards live", d: "Mis à jour à la minute. Filtres par propriété, période, OTA, source." },
                { i: "🚨", t: "Alertes intelligentes", d: "Baisse anormale, surcharge staff, opportunité pricing — détection auto." },
                { i: "📈", t: "Benchmarks marché", d: "Comparaison avec votre quartier, votre type de bien, votre saison." },
                { i: "📥", t: "Exports comptable", d: "CSV, PDF, format compta (FEC, Sage). Auto le 1er du mois." },
                { i: "🔮", t: "Forecasts prédictifs", d: "Revenue prévisionnel à 90 jours. Scénarios what-if intégrés." },
                { i: "🎯", t: "Cohort analysis", d: "Voyageurs récurrents, sources qui convertissent, LTV par canal." },
              ].map(c => (
                <div key={c.t} className="card" style={{padding: 22}}>
                  <div style={{fontSize: 28, marginBottom: 10}}>{c.i}</div>
                  <div style={{fontSize: 16, fontWeight: 600, marginBottom: 4}}>{c.t}</div>
                  <div style={{fontSize: 13, color: "var(--text-3)", lineHeight: 1.55}}>{c.d}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
        <StatsBar stats={[{k:"Live",l:"Mises à jour minute"},{k:"47 KPIs",l:"Tracked en continu"},{k:"90 jours",l:"Forecast prédictif"},{k:"Excel?",l:"Plus jamais"}]} />
        <FinalCTA title={<>Audit analytics <span className="gradient-text">gratuit</span>.</>} subtitle="On analyse votre data 12 derniers mois et on vous montre vos angles morts. Aucun engagement." />
        <PageFooter />
      </div>
    </>
  );
}
