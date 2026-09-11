"use client";

interface Property {
  name: string;
  rev: string;
  occ: string;
  adr: string;
  revpar: string;
  rating: string;
  delta: string;
}

export function PropertyTable() {
  const props: Property[] = [
    { name: "Riad Dar Zellige", rev: "184 200 MAD", occ: "94%", adr: "1 450 MAD", revpar: "1 365 MAD", rating: "4.92", delta: "+18%" },
    { name: "Hôtel Tafoukt", rev: "142 000 MAD", occ: "87%", adr: "1 180 MAD", revpar: "1 027 MAD", rating: "4.85", delta: "+12%" },
    { name: "Villa Atlas", rev: "228 900 MAD", occ: "91%", adr: "1 890 MAD", revpar: "1 720 MAD", rating: "4.95", delta: "+24%" },
    { name: "Dar Gueliz", rev: "86 400 MAD", occ: "78%", adr: "820 MAD", revpar: "640 MAD", rating: "4.78", delta: "+8%" },
    { name: "Maison d’hôtes Médina", rev: "112 500 MAD", occ: "83%", adr: "980 MAD", revpar: "814 MAD", rating: "4.88", delta: "+15%" },
  ];

  return (
    <div className="card analytics-table" style={{padding: 0, overflow: "hidden"}}>
      <div style={{padding: "14px 22px", borderBottom: "1px solid var(--glass-border)", display: "flex", justifyContent: "space-between", alignItems: "center"}}>
        <div style={{fontSize: 14, fontWeight: 600}}>Performance par propriété · Mars 2025</div>
        <button style={{background: "transparent", border: "1px solid var(--glass-border)", color: "var(--text-1)", padding: "6px 12px", borderRadius: 6, fontSize: 11, cursor: "pointer"}}>📥 Export CSV</button>
      </div>
      <div style={{overflowX: "auto", WebkitOverflowScrolling: "touch"}}>
        <div style={{display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr 1fr 1fr", gap: 12, padding: "12px 22px", fontSize: 10, color: "var(--text-3)", textTransform: "uppercase", letterSpacing: 1, borderBottom: "1px solid rgba(255,255,255,0.04)", minWidth: 800}}>
          <div>Propriété</div><div>Revenue</div><div>Occ.</div><div>ADR</div><div>RevPAR</div><div>Note</div><div>Δ M-1</div>
        </div>
        {props.map((p, i) => (
          <div key={p.name} style={{display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr 1fr 1fr", gap: 12, padding: "14px 22px", fontSize: 13, alignItems: "center", borderTop: i ? "1px solid rgba(255,255,255,0.04)" : "none", minWidth: 800}}>
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

      <style jsx>{`
        @media (max-width: 768px) {
          .analytics-table button {
            font-size: 9px !important;
            padding: 4px 8px !important;
          }
          .analytics-table > div:first-child {
            padding: 10px 14px !important;
          }
          .analytics-table > div:first-child > div:first-child {
            font-size: 11px !important;
          }
        }
      `}</style>
    </div>
  );
}
