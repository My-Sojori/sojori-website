"use client";

interface ChartDataPoint {
  d: number;
  rev: number;
  occ: number;
}

export function MainChart() {
  const data: ChartDataPoint[] = Array.from({ length: 30 }, (_, i) => ({
    d: i + 1,
    rev: 4 + Math.sin(i / 4) * 1.5 + i * 0.18 + Math.random() * 0.6,
    occ: 65 + Math.sin(i / 5) * 12 + i * 0.5,
  }));
  const w = 760, h = 280, pad = 40;
  const maxRev = 12;

  return (
    <div className="card main-chart" style={{padding: 0, overflow: "hidden"}}>
      <div style={{padding: 26}}>
        <div style={{display: "flex", justifyContent: "space-between", marginBottom: 18, flexWrap: "wrap", gap: 12}}>
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
      </div>
      <div style={{overflowX: "auto", WebkitOverflowScrolling: "touch", padding: "0 26px 26px"}}>
        <svg width={w} height={h} style={{display: "block", minWidth: w}}>
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

      <style jsx>{`
        @media (max-width: 768px) {
          .main-chart > div:first-child {
            padding: 16px 14px !important;
          }
          .main-chart > div:first-child > div:first-child {
            gap: 8px !important;
          }
          .main-chart > div:first-child > div:first-child > div:first-child > div:first-child {
            font-size: 9px !important;
          }
          .main-chart > div:first-child > div:first-child > div:first-child > div:last-child span:first-child {
            font-size: 22px !important;
          }
          .main-chart > div:first-child > div:first-child > div:first-child > div:last-child span:last-child {
            font-size: 11px !important;
          }
          .main-chart > div:first-child > div:first-child > div:last-child {
            font-size: 10px !important;
            gap: 10px !important;
          }
          .main-chart > div:last-child {
            padding: 0 14px 14px !important;
          }
        }
      `}</style>
    </div>
  );
}
