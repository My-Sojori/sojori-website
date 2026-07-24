'use client';
/* ===== PAGE RÉSULTAT (données réelles) — design Claude Design ===== */
import { useState, useMemo, type CSSProperties } from 'react';
import { Link } from '@/i18n/routing';
import {
  ZelBg, Header, Icon, StarF, Photo,
  useReveal, useInView, useCountUp,
  fmtMad, fmtNum, fmtPct, fmtDist, airbnbUrl, amenityLabel,
  type SjrData, type SjrListing,
} from './sjrShared';

export function SjrReadyView({ data }: { data: SjrData }) {
  const ref = useReveal();
  const you = data.yourListing;
  const best = data.bestCompetitor;
  const manque = best ? (best.revenueTtmMad || 0) - (you.revenueTtmMad || 0) : 0;
  return (
    <div className="page" ref={ref}>
      <ZelBg />
      <Header />
      <div className="appwrap" style={{ padding: '8px 16px 90px', position: 'relative', zIndex: 1 }}>
        <Hero data={data} />
        <KpiRow data={data} />
        {best && <FaceOff you={you} best={best} manque={manque} />}
        <RevenueChart data={data} />
        <RadarMap data={data} />
        <CompsTable data={data} />
        <Amenities data={data} />
        <Bilan data={data} />
        <CtaBlock />
        <Disclaimer />
      </div>
    </div>
  );
}

function Hero({ data }: { data: SjrData }) {
  const [ref, seen] = useInView(0.3);
  const year = useCountUp(data.estimatedMarketRevenueTtmMad, { run: seen, dur: 1700 });
  const night = useCountUp(data.estimatedMarketPriceMad, { run: seen, dur: 1700 });
  return (
    <div ref={ref} style={{ textAlign: 'center', padding: 'clamp(26px,7vw,52px) 0 32px' }}>
      <span className="badge reveal"><span className="badge-dot"></span>Estimation marché · 12 mois</span>
      <div className="eyebrow reveal" style={{ margin: '22px 0 12px', justifyContent: 'center' }}>Prix estimé sur un an</div>
      <h1 className="reveal" style={{ fontSize: 'clamp(48px,15vw,92px)', lineHeight: 0.92 }}>
        <span className="gt">{fmtNum(year)}</span>
        <span style={{ display: 'block', fontFamily: 'var(--mono)', fontSize: 'clamp(15px,4vw,20px)', fontWeight: 500, color: 'var(--ink3)', letterSpacing: '.04em', marginTop: 10 }}>MAD / an</span>
      </h1>
      <p className="reveal" style={{ fontSize: 'clamp(15px,4vw,17px)', color: 'var(--ink2)', marginTop: 18, maxWidth: 520, marginInline: 'auto', lineHeight: 1.5 }}>
        Soit environ <b style={{ color: 'var(--ink)' }}>{fmtNum(night)} MAD</b>/nuit, d&apos;après <b style={{ color: 'var(--ink)' }}>{data.competitorsCount} concurrents</b> comparables autour de votre bien.
      </p>
    </div>
  );
}

function KpiRow({ data }: { data: SjrData }) {
  const you = data.yourListing;
  const cards = [
    { cap: 'Prix marché / nuit', val: fmtMad(data.estimatedMarketPriceMad), ic: 'chart' },
    { cap: 'Revenu marché / an', val: fmtMad(data.estimatedMarketRevenueTtmMad), ic: 'up' },
    { cap: 'Votre revenu (12 m)', val: fmtMad(you.revenueTtmMad), ic: 'spark' },
    { cap: 'Votre occupation', val: fmtPct(you.occupancy), ic: 'cal' },
  ];
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 12, marginBottom: 34 }}>
      {cards.map((c) => (
        <div key={c.cap} className="glass reveal" style={{ padding: '18px 16px', borderRadius: 18 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--goldDeep)', marginBottom: 10 }}><Icon name={c.ic} size={17} />
            <span className="mono" style={{ fontSize: 10.5, fontWeight: 600, letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--ink3)' }}>{c.cap}</span></div>
          <div style={{ fontSize: 'clamp(22px,6vw,28px)', fontWeight: 800, letterSpacing: '-.02em' }}>{c.val}</div>
        </div>
      ))}
    </div>
  );
}

function FaceOff({ you, best, manque }: { you: SjrListing; best: SjrListing; manque: number }) {
  const [ref, seen] = useInView(0.25);
  const mq = useCountUp(manque, { run: seen, dur: 1600 });
  const rows = [
    { lab: 'Prix / nuit', a: you.adrMad, b: best.adrMad, fmt: fmtMad },
    { lab: 'Occupation', a: you.occupancy, b: best.occupancy, fmt: fmtPct },
    { lab: 'Revenu / an', a: you.revenueTtmMad, b: best.revenueTtmMad, fmt: fmtMad },
    { lab: 'Note · avis', a: `★ ${you.rating?.toFixed(2) ?? '—'} · ${you.reviewsCount ?? 0}`, b: `★ ${best.rating?.toFixed(2) ?? '—'} · ${best.reviewsCount ?? 0}`, raw: true },
  ];
  return (
    <div ref={ref} style={{ marginBottom: 34 }}>
      <div className="eyebrow reveal" style={{ marginBottom: 12 }}>Face-à-face</div>
      <h2 className="reveal" style={{ fontSize: 'clamp(24px,6.5vw,32px)', marginBottom: 6 }}>Vous vs le meilleur concurrent</h2>
      <p className="reveal" style={{ fontSize: 14, color: 'var(--ink3)', marginBottom: 18, lineHeight: 1.5 }}>À {fmtDist(best.distanceMeters)}, profil identique ({best.bedrooms} ch · {best.baths} sdb · {best.guests} pers.).</p>
      <div className="glass reveal" style={{ borderRadius: 22, overflow: 'hidden' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
          <div style={{ padding: '16px 18px', textAlign: 'center', fontFamily: 'var(--mono)', fontSize: 12, fontWeight: 600, letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--ink2)', background: 'rgba(28,23,16,.04)' }}>Vous</div>
          <div style={{ padding: '16px 18px', textAlign: 'center', fontFamily: 'var(--mono)', fontSize: 12, fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', color: '#2A1E08', background: 'var(--grad)' }}>Meilleur concurrent</div>
        </div>
        {rows.map((r) => (
          <div key={r.lab} style={{ position: 'relative', borderTop: '1px solid var(--line)' }}>
            <div style={{ position: 'absolute', left: '50%', top: 8, transform: 'translateX(-50%)', fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--ink3)', whiteSpace: 'nowrap', zIndex: 2, background: 'var(--paper2)', padding: '0 8px', borderRadius: 999 }}>{r.lab}</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', paddingTop: 26 }}>
              <div style={{ padding: '6px 12px 18px', textAlign: 'center', fontSize: 'clamp(18px,5vw,24px)', fontWeight: 800, letterSpacing: '-.02em', color: 'var(--ink)' }}>{r.raw ? (r.a as string) : (r.fmt as (n: number | null) => string)(r.a as number)}</div>
              <div style={{ padding: '6px 12px 18px', textAlign: 'center', fontSize: 'clamp(18px,5vw,24px)', fontWeight: 800, letterSpacing: '-.02em', color: 'var(--goldDeep)' }}>{r.raw ? (r.b as string) : (r.fmt as (n: number | null) => string)(r.b as number)}</div>
            </div>
          </div>
        ))}
      </div>
      {manque > 0 && (
        <div className="reveal" style={{ marginTop: 16, background: 'var(--grad)', borderRadius: 22, padding: '26px 24px', textAlign: 'center', boxShadow: '0 20px 46px rgba(230,176,34,.34)' }}>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 12, fontWeight: 600, letterSpacing: '.12em', textTransform: 'uppercase', color: '#5A4210' }}>Manque à gagner estimé</div>
          <div style={{ fontSize: 'clamp(38px,11vw,62px)', fontWeight: 900, letterSpacing: '-.03em', color: '#2A1E08', lineHeight: 1, margin: '8px 0 4px' }}>+{fmtNum(mq)}</div>
          <div style={{ fontSize: 'clamp(15px,4vw,19px)', fontWeight: 600, color: '#4A360E' }}>MAD / an de manque à gagner</div>
        </div>
      )}
    </div>
  );
}

/* ---------- GRAPHIQUE REVENU 12 MOIS (vous vs concurrent vs estimation) ---------- */
const MONTHS_FR = ['jan', 'fév', 'mar', 'avr', 'mai', 'juin', 'juil', 'aoû', 'sep', 'oct', 'nov', 'déc'];
function monthLabel(ym: string): string {
  const m = /^\d{4}-(\d{2})$/.exec(ym);
  if (!m) return ym;
  const idx = parseInt(m[1], 10) - 1;
  return MONTHS_FR[idx] ?? ym;
}
function RevenueChart({ data }: { data: SjrData }) {
  const [ref, seen] = useInView(0.2);
  const [hover, setHover] = useState<number | null>(null);
  const you = data.yourMonthly ?? [];
  const best = data.bestMonthly ?? [];
  if (you.length < 3) return null;

  // aligner sur les mois de "vous" (source de vérité), rapprocher le concurrent par mois
  const bestByMonth = new Map(best.map((m) => [m.month, m]));
  const series = you.map((m) => ({
    month: m.month,
    label: monthLabel(m.month),
    you: m.revenueMad ?? 0,
    best: bestByMonth.get(m.month)?.revenueMad ?? 0,
  }));
  const maxVal = Math.max(1, ...series.map((s) => Math.max(s.you, s.best)));
  // estimation marché = moyenne mensuelle du revenu marché estimé sur 12 mois
  const estMonthly = data.estimatedMarketRevenueTtmMad != null ? data.estimatedMarketRevenueTtmMad / 12 : null;

  const W = 680, H = 300, padL = 8, padR = 8, padT = 16, padB = 26;
  const plotW = W - padL - padR, plotH = H - padT - padB;
  const n = series.length;
  const groupW = plotW / n;
  const barW = Math.max(5, groupW * 0.32);
  const yOf = (v: number) => padT + plotH * (1 - v / maxVal);
  const estY = estMonthly != null ? yOf(estMonthly) : null;

  return (
    <div ref={ref} style={{ marginBottom: 34 }}>
      <div className="eyebrow reveal" style={{ marginBottom: 12 }}>Sur 12 mois</div>
      <h2 className="reveal" style={{ fontSize: 'clamp(24px,6.5vw,32px)', marginBottom: 6 }}>Votre revenu, mois par mois</h2>
      <p className="reveal" style={{ fontSize: 14, color: 'var(--ink3)', marginBottom: 18, lineHeight: 1.5 }}>
        Votre annonce vs le meilleur concurrent · la ligne = revenu de marché estimé.
      </p>
      <div className="glass reveal" style={{ borderRadius: 22, padding: '18px 14px 10px' }}>
        {/* légende */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px 18px', alignItems: 'center', fontSize: 12.5, color: 'var(--ink2)', marginBottom: 12, paddingLeft: 4 }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7 }}><span style={{ width: 12, height: 12, borderRadius: 4, background: 'rgba(28,23,16,.22)' }} />Vous</span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7 }}><span style={{ width: 12, height: 12, borderRadius: 4, background: 'var(--gold)' }} />Meilleur concurrent</span>
          {estMonthly != null && <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7 }}><span style={{ width: 16, height: 0, borderTop: '2px dashed var(--goldDeep)' }} />Marché estimé</span>}
        </div>
        <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ display: 'block', overflow: 'visible' }}>
          {/* ligne estimation marché */}
          {estY != null && (
            <>
              <line x1={padL} y1={estY} x2={W - padR} y2={estY} stroke="var(--goldDeep)" strokeWidth="1.5" strokeDasharray="5 5" opacity={seen ? 0.8 : 0} style={{ transition: 'opacity .8s .3s' }} />
              <text x={W - padR} y={estY - 6} textAnchor="end" fontSize="11" fontFamily="var(--mono)" fill="var(--goldDeep)" opacity={seen ? 1 : 0} style={{ transition: 'opacity .8s .3s' }}>{fmtMad(estMonthly)}</text>
            </>
          )}
          {series.map((s, i) => {
            const gx = padL + i * groupW + groupW / 2;
            const yH = plotH * (s.you / maxVal), bH = plotH * (s.best / maxVal);
            const isH = hover === i;
            return (
              <g key={s.month} onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)} style={{ cursor: 'pointer' }}>
                {isH && <rect x={padL + i * groupW} y={padT} width={groupW} height={plotH} fill="rgba(230,176,34,.08)" rx="6" />}
                {/* vous */}
                <rect x={gx - barW - 2} y={padT + plotH - (seen ? yH : 0)} width={barW} height={seen ? yH : 0} rx="3"
                  fill="rgba(28,23,16,.24)" style={{ transition: `y .7s cubic-bezier(.2,.7,.2,1) ${i * 35}ms, height .7s cubic-bezier(.2,.7,.2,1) ${i * 35}ms` }} />
                {/* concurrent */}
                <rect x={gx + 2} y={padT + plotH - (seen ? bH : 0)} width={barW} height={seen ? bH : 0} rx="3"
                  fill="url(#barGold)" style={{ transition: `y .7s cubic-bezier(.2,.7,.2,1) ${i * 35 + 60}ms, height .7s cubic-bezier(.2,.7,.2,1) ${i * 35 + 60}ms` }} />
                <text x={gx} y={H - 8} textAnchor="middle" fontSize="11" fontFamily="var(--mono)" fill="var(--ink3)">{s.label}</text>
              </g>
            );
          })}
          <defs><linearGradient id="barGold" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#F4CF5E" /><stop offset="100%" stopColor="#B8881A" /></linearGradient></defs>
        </svg>
        {/* tooltip */}
        <div style={{ minHeight: 40, padding: '8px 6px 2px', fontSize: 13, color: 'var(--ink2)' }}>
          {hover != null ? (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px 16px' }}>
              <b style={{ color: 'var(--ink)', textTransform: 'capitalize' }}>{series[hover].label}</b>
              <span>Vous : <b>{fmtMad(series[hover].you)}</b></span>
              <span>Concurrent : <b style={{ color: 'var(--goldDeep)' }}>{fmtMad(series[hover].best)}</b></span>
            </div>
          ) : (
            <span className="mono" style={{ color: 'var(--ink3)', fontSize: 11.5 }}>Survolez un mois pour le détail.</span>
          )}
        </div>
      </div>
    </div>
  );
}

const GOLD = '#E6B022';
function perfColor(rank: number, total: number) {
  if (total <= 1) return GOLD;
  const t = rank / (total - 1);
  const hue = 150 - t * 150, sat = t < 0.5 ? 52 : 46, light = t < 0.5 ? 42 : 52;
  return `hsl(${Math.round(hue)},${sat}%,${light}%)`;
}

function RadarMap({ data }: { data: SjrData }) {
  const [hover, setHover] = useState<string | null>(null);
  const [ref, seen] = useInView(0.2);
  const you = data.yourListing;
  const geo = useMemo(() => {
    const yLat = you.lat, yLng = you.lng;
    if (yLat == null || yLng == null) return null;
    const pts = data.competitors.filter((c) => c.lat != null && c.lng != null).map((c) => {
      const dLatM = ((c.lat as number) - yLat) * 111320, dLngM = ((c.lng as number) - yLng) * 111320 * Math.cos(yLat * Math.PI / 180);
      return { ...c, x: dLngM, y: -dLatM };
    });
    if (!pts.length) return null;
    const maxAbs = Math.max(400, ...pts.map((p) => Math.max(Math.abs(p.x), Math.abs(p.y))));
    const byRev = [...pts].sort((a, b) => (b.revenueTtmMad || 0) - (a.revenueTtmMad || 0));
    const rankOf = new Map(byRev.map((p, i) => [p.id, i]));
    return { pts, maxAbs, rankOf, total: pts.length };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);
  if (!geo) return null;
  const SIZE = 360, R = SIZE / 2, scale = (R - 34) / geo.maxAbs;
  const rings = [0.33, 0.66, 1].map((f) => ({ r: (R - 34) * f, label: `${Math.round(geo.maxAbs * f / 100) / 10} km` }));
  const hv = hover ? geo.pts.find((p) => p.id === hover) : null;
  return (
    <div ref={ref} style={{ marginBottom: 34 }}>
      <div className="eyebrow reveal" style={{ marginBottom: 12 }}>Positionnement</div>
      <h2 className="reveal" style={{ fontSize: 'clamp(24px,6.5vw,32px)', marginBottom: 6 }}>Vos {geo.total} concurrents, cartographiés</h2>
      <p className="reveal" style={{ fontSize: 14, color: 'var(--ink3)', marginBottom: 18, lineHeight: 1.5 }}>Votre bien au centre · couleur = performance (revenu) · taille = prix moyen.</p>
      <div className="glass reveal" style={{ borderRadius: 22, padding: '18px 14px' }}>
        <svg viewBox={`0 0 ${SIZE} ${SIZE}`} width="100%" style={{ maxWidth: 420, display: 'block', margin: '0 auto', aspectRatio: '1', touchAction: 'none' }}>
          {rings.map((ring, i) => (
            <g key={i}>
              <circle cx={R} cy={R} r={ring.r * (seen ? 1 : 0)} fill="none" stroke="rgba(184,136,26,.28)" strokeWidth="1.3" strokeDasharray="3 6" style={{ transition: 'r .9s cubic-bezier(.2,.7,.2,1)' }} />
              <text x={R + 6} y={R - ring.r + 13} fontSize="10" fill="var(--ink3)" fontFamily="var(--mono)">{ring.label}</text>
            </g>
          ))}
          <line x1={R} y1="18" x2={R} y2={SIZE - 18} stroke="rgba(184,136,26,.14)" strokeWidth="1" />
          <line x1="18" y1={R} x2={SIZE - 18} y2={R} stroke="rgba(184,136,26,.14)" strokeWidth="1" />
          {geo.pts.map((p, i) => {
            const cx = R + p.x * scale, cy = R + p.y * scale;
            const rank = geo.rankOf.get(p.id) ?? 0;
            const color = perfColor(rank, geo.total);
            const size = Math.max(6, Math.min(15, 6 + (p.adrMad || 0) / 220));
            const isH = hover === p.id;
            const delay = i * 45; const on = seen;
            return (
              <g key={p.id ?? i} onMouseEnter={() => setHover(p.id)} onMouseLeave={() => setHover(null)} style={{ cursor: 'pointer' }}>
                <circle cx={cx} cy={cy} r={(isH ? size + 3 : size) * (on ? 1 : 0)} fill={color} stroke="#fff" strokeWidth="2" opacity={hover && !isH ? 0.4 : 0.96} style={{ transition: `r .5s cubic-bezier(.3,1.4,.5,1) ${delay}ms, opacity .2s` }} />
              </g>
            );
          })}
          <g style={{ animation: seen ? 'sjr-floaty 3.5s ease-in-out infinite' : 'none' }}>
            <circle cx={R} cy={R} r="26" fill="rgba(230,176,34,.16)" />
            <circle cx={R} cy={R} r="26" fill="none" stroke="var(--gold)" strokeWidth="1.5" opacity=".6" style={{ transformOrigin: `${R}px ${R}px`, animation: seen ? 'sjr-ring 2.4s ease-out infinite' : 'none' }} />
            <circle cx={R} cy={R} r="17" fill="#fff" stroke="var(--gold)" strokeWidth="3" />
            <circle cx={R} cy={R} r="6" fill="var(--gold)" />
          </g>
        </svg>
        <div style={{ marginTop: 8, padding: '12px 6px 2px', minHeight: 64 }}>
          {hv ? (
            <div>
              <div style={{ fontWeight: 700, fontSize: 14.5, marginBottom: 6 }}>{hv.name || 'Concurrent'}</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px 16px', fontSize: 13, color: 'var(--ink2)' }}>
                <span>Prix : <b>{fmtMad(hv.adrMad)}</b></span><span>Occ. : <b>{fmtPct(hv.occupancy)}</b></span>
                <span>Revenu : <b>{fmtMad(hv.revenueTtmMad)}</b></span><span>À <b>{fmtDist(hv.distanceMeters)}</b></span>
              </div>
            </div>
          ) : (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px 18px', alignItems: 'center', fontSize: 12.5, color: 'var(--ink2)' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7 }}><span style={{ width: 14, height: 14, borderRadius: 999, background: '#fff', border: '3px solid var(--gold)' }} />Votre bien</span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7 }}><span style={{ width: 11, height: 11, borderRadius: 999, background: 'hsl(150,52%,42%)' }} />Top revenus</span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7 }}><span style={{ width: 11, height: 11, borderRadius: 999, background: 'hsl(0,46%,52%)' }} />Revenus faibles</span>
              <span className="mono" style={{ color: 'var(--ink3)', fontSize: 11 }}>Survolez un point</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

type SortKey = 'distance' | 'rating' | 'adr' | 'occupancy' | 'revenue';
const th: CSSProperties = { padding: '12px 12px', textAlign: 'center', fontSize: 10.5, fontWeight: 700, color: 'var(--ink3)', textTransform: 'uppercase', letterSpacing: '.5px', userSelect: 'none', whiteSpace: 'nowrap' };
const td: CSSProperties = { padding: '12px', textAlign: 'center', verticalAlign: 'middle', color: 'var(--ink)' };

function CompsTable({ data }: { data: SjrData }) {
  const [sortKey, setSortKey] = useState<SortKey>('revenue');
  const [dir, setDir] = useState<'asc' | 'desc'>('desc');
  const rows = useMemo(() => {
    const l = [...data.competitors]; const mul = dir === 'asc' ? 1 : -1;
    const pick = (r: SjrListing) => ({ distance: r.distanceMeters ?? 1e9, rating: r.rating ?? 0, adr: r.adrMad ?? 0, occupancy: r.occupancy ?? 0, revenue: r.revenueTtmMad ?? 0 }[sortKey]);
    l.sort((a, b) => (pick(a) - pick(b)) * mul);
    return l;
  }, [sortKey, dir, data]);
  const toggle = (k: SortKey) => { if (sortKey === k) setDir((d) => (d === 'asc' ? 'desc' : 'asc')); else { setSortKey(k); setDir(k === 'distance' ? 'asc' : 'desc'); } };
  const cols: [SortKey, string][] = [['distance', 'Dist.'], ['rating', 'Note'], ['adr', 'Prix'], ['occupancy', 'Occ.'], ['revenue', 'Rev. 12m']];
  return (
    <div style={{ marginBottom: 34 }}>
      <div className="eyebrow reveal" style={{ marginBottom: 12 }}>Le détail</div>
      <h2 className="reveal" style={{ fontSize: 'clamp(24px,6.5vw,32px)', marginBottom: 6 }}>Vos {data.competitors.length} concurrents directs</h2>
      <p className="reveal" style={{ fontSize: 14, color: 'var(--ink3)', marginBottom: 18 }}>Triez par prix, occupation, revenu ou distance.</p>
      <div className="glass reveal" style={{ borderRadius: 18, overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, minWidth: 640 }}>
          <thead><tr style={{ background: 'rgba(28,23,16,.03)' }}>
            <th style={{ ...th, textAlign: 'left' }}>Annonce</th>
            {cols.map(([k, l]) => (<th key={k} style={{ ...th, cursor: 'pointer' }} onClick={() => toggle(k)}>{l}{sortKey === k ? (dir === 'asc' ? ' ↑' : ' ↓') : ''}</th>))}
          </tr></thead>
          <tbody>{rows.map((c, i) => {
            const url = airbnbUrl(c.id); const isBest = data.bestCompetitor != null && c.id === data.bestCompetitor.id;
            return (
              <tr key={c.id || i} style={{ borderTop: '1px solid var(--line)', background: isBest ? 'rgba(230,176,34,.07)' : 'transparent' }}>
                <td style={{ ...td, textAlign: 'left', minWidth: 200 }}>
                  <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                    <Photo src={c.photoUrl} tintIdx={i} style={{ width: 42, height: 42, borderRadius: 9, flexShrink: 0 }} />
                    <div style={{ minWidth: 0 }}>
                      <div style={{ fontWeight: 600, lineHeight: 1.25, display: 'flex', alignItems: 'center', gap: 6 }}>{c.name || 'Comparable'}{isBest && <Icon name="trophy" size={13} style={{ color: 'var(--goldDeep)' }} />}</div>
                      {url && <a href={url} target="_blank" rel="noopener noreferrer" style={{ fontSize: 11, color: 'var(--goldDeep)', fontWeight: 700, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 3 }}><Icon name="ext" size={11} />Voir</a>}
                    </div>
                  </div>
                </td>
                <td style={td}>{fmtDist(c.distanceMeters)}</td>
                <td style={td}><span style={{ display: 'inline-flex', alignItems: 'center', gap: 3, justifyContent: 'center' }}><StarF size={12} />{c.rating?.toFixed(2) ?? '—'}</span><div style={{ fontSize: 10.5, color: 'var(--ink3)' }}>{c.reviewsCount ?? 0} avis</div></td>
                <td style={{ ...td, fontWeight: 700 }}>{fmtMad(c.adrMad)}</td>
                <td style={td}>{fmtPct(c.occupancy)}</td>
                <td style={{ ...td, fontWeight: 700 }}>{fmtMad(c.revenueTtmMad)}</td>
              </tr>
            );
          })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Amenities({ data }: { data: SjrData }) {
  const a = data.amenitiesDiff;
  if (!a) return null;
  const col = (title: string, items: string[], tone: 'you' | 'them' | 'shared', ic: string) => (
    <div className="glass reveal" style={{ padding: '18px 18px', borderRadius: 18 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 12 }}>
        <div style={{ width: 30, height: 30, borderRadius: 9, display: 'grid', placeItems: 'center', flexShrink: 0, background: tone === 'you' ? 'rgba(31,157,107,.14)' : tone === 'them' ? 'rgba(194,112,63,.14)' : 'rgba(230,176,34,.14)', color: tone === 'you' ? 'var(--good)' : tone === 'them' ? 'var(--bad)' : 'var(--goldDeep)' }}><Icon name={ic} size={17} /></div>
        <div style={{ fontWeight: 700, fontSize: 14 }}>{title}</div>
        <span className="mono" style={{ marginLeft: 'auto', fontSize: 12, color: 'var(--ink3)' }}>{items.length}</span>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
        {(items.length ? items : ['—']).map((x) => <span key={x} className="chip">{amenityLabel(x)}</span>)}
      </div>
    </div>
  );
  return (
    <div style={{ marginBottom: 34 }}>
      <div className="eyebrow reveal" style={{ marginBottom: 12 }}>Équipements</div>
      <h2 className="reveal" style={{ fontSize: 'clamp(24px,6.5vw,32px)', marginBottom: 18 }}>Ce qui vous distingue</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 12 }}>
        {col('Chez vous seulement', a.onlyYours, 'you', 'check')}
        {col('En commun', a.shared, 'shared', 'users')}
        {col('Chez le concurrent seulement', a.onlyTheirs, 'them', 'pool')}
      </div>
    </div>
  );
}

function Bilan({ data }: { data: SjrData }) {
  const b = data.bilan;
  if (!b) return null;
  const block = (title: string, items: string[], tone: 'good' | 'warn' | 'action', ic: string) => (
    <div className="reveal" style={{ marginBottom: 16 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 10 }}>
        <div style={{ width: 28, height: 28, borderRadius: 8, display: 'grid', placeItems: 'center', background: tone === 'good' ? 'rgba(31,157,107,.14)' : tone === 'warn' ? 'rgba(198,122,46,.14)' : 'rgba(230,176,34,.16)', color: tone === 'good' ? 'var(--good)' : tone === 'warn' ? 'var(--warn)' : 'var(--goldDeep)' }}><Icon name={ic} size={16} /></div>
        <div style={{ fontWeight: 700, fontSize: 15 }}>{title}</div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, paddingLeft: 2 }}>
        {items.map((t, i) => (
          <div key={i} style={{ display: 'flex', gap: 10, fontSize: 14, lineHeight: 1.5, color: 'var(--ink2)' }}>
            <span style={{ color: tone === 'good' ? 'var(--good)' : tone === 'warn' ? 'var(--warn)' : 'var(--goldDeep)', flexShrink: 0, marginTop: 2 }}>
              <Icon name={tone === 'good' ? 'check' : tone === 'warn' ? 'alert' : 'arrowR'} size={15} /></span>{t}
          </div>
        ))}
      </div>
    </div>
  );
  return (
    <div style={{ marginBottom: 34 }}>
      <div className="glass reveal" style={{ padding: '26px 22px', borderRadius: 24, marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
          <div style={{ width: 38, height: 38, borderRadius: 11, background: 'var(--grad)', display: 'grid', placeItems: 'center', boxShadow: '0 8px 20px rgba(230,176,34,.35)' }}><Icon name="spark" size={20} style={{ color: '#2A1E08' }} /></div>
          <div className="mono" style={{ fontSize: 12, fontWeight: 600, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--goldDeep)' }}>Bilan Sojori</div>
        </div>
        <p style={{ fontSize: 'clamp(18px,5vw,23px)', fontWeight: 600, lineHeight: 1.4, letterSpacing: '-.01em', color: 'var(--ink)' }}>{b.headline}</p>
      </div>
      <div className="glass reveal" style={{ padding: '22px 22px 8px', borderRadius: 20 }}>
        {block('Points forts', b.strengths, 'good', 'check')}
        {block('Écarts', b.gaps, 'warn', 'alert')}
        {block('Actions recommandées', b.actions, 'action', 'spark')}
      </div>
    </div>
  );
}

function CtaBlock() {
  return (
    <div className="reveal" style={{ textAlign: 'center', padding: '44px 24px', borderRadius: 26, background: 'radial-gradient(ellipse 80% 70% at 50% 40%,rgba(230,176,34,.20),transparent 72%)' }}>
      <h2 style={{ fontSize: 'clamp(26px,7vw,38px)', marginBottom: 12 }}>Faites <span className="gt">travailler ces chiffres</span></h2>
      <p style={{ fontSize: 15.5, color: 'var(--ink2)', maxWidth: 460, margin: '0 auto 24px', lineHeight: 1.5 }}>
        Sojori ajuste vos prix chaque jour selon vos concurrents, remplit votre calendrier et automatise l&apos;accueil. Voyez comment en 15 minutes.</p>
      <Link href={{ pathname: '/demo', query: { source: 'analyse-concurrents-resultat' } }} className="btn btn-primary btn-lg" style={{ fontSize: 17, padding: '18px 34px' }}>
        Réserver ma démo<Icon name="arrowR" size={20} />
      </Link>
    </div>
  );
}

function Disclaimer() {
  return (
    <p style={{ textAlign: 'center', fontSize: 11.5, color: 'var(--ink3)', marginTop: 28, maxWidth: 560, marginInline: 'auto', lineHeight: 1.5 }}>
      Estimations calculées à partir d&apos;annonces publiques comparables autour de votre bien. Les revenus réels varient selon la saison, la gestion et les conditions du marché.</p>
  );
}
