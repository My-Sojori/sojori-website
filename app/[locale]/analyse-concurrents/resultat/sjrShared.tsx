'use client';
/* ===== Sojori page résultat — helpers, icônes, formatters (design Claude Design) ===== */
import { useState, useEffect, useRef, type CSSProperties, type ReactNode } from 'react';

/* ---- format des données réelles → format attendu par les vues ---- */
export type SjrListing = {
  id: string | null;
  name: string | null;
  photoUrl: string | null;
  bedrooms: number | null;
  baths: number | null;
  guests: number | null;
  rating: number | null;
  reviewsCount: number | null;
  superhost: boolean | null;
  adrMad: number | null;
  occupancy: number | null;
  revenueTtmMad: number | null;
  distanceMeters?: number | null;
  lat: number | null;
  lng: number | null;
  amenities?: string[];
};
export type SjrData = {
  yourListing: SjrListing;
  estimatedMarketPriceMad: number | null;
  estimatedMarketRevenueTtmMad: number | null;
  competitorsCount: number;
  bestCompetitor: SjrListing | null;
  competitors: SjrListing[];
  amenitiesDiff: { shared: string[]; onlyYours: string[]; onlyTheirs: string[] } | null;
  bilan: {
    headline: string;
    strengths: string[];
    gaps: string[];
    actions: string[];
    bestCompetitorWhy?: string;
  } | null;
};

/* formatters (mêmes règles que l'app : MAD, fr-FR) */
export const fmtMad = (n: number | null | undefined) =>
  n == null || !Number.isFinite(n) ? '—' : `${Math.round(n).toLocaleString('fr-FR').replace(/ /g, ' ')} MAD`;
export const fmtNum = (n: number | null | undefined) =>
  n == null || !Number.isFinite(n) ? '—' : `${Math.round(n).toLocaleString('fr-FR').replace(/ /g, ' ')}`;
export const fmtPct = (n: number | null | undefined) =>
  n == null || !Number.isFinite(n) ? '—' : `${Math.round(n * 100)} %`;
export const fmtDist = (m: number | null | undefined) =>
  m == null || !Number.isFinite(m) ? '—' : m < 1000 ? `${Math.round(m)} m` : `${(m / 1000).toFixed(1)} km`;
export const airbnbUrl = (id: string | null | undefined) => {
  const s = String(id ?? '').trim();
  return /^\d{5,20}$/.test(s) ? `https://www.airbnb.fr/rooms/${s}` : null;
};
export const amenityLabel = (a: string) => a.replace(/_/g, ' ');

/* count-up, déclenché quand `run` */
export function useCountUp(target: number | null | undefined, { dur = 1400, start = 0, run = true } = {}) {
  const safe = Number.isFinite(target as number) ? (target as number) : 0;
  const [v, setV] = useState(run ? start : safe);
  const raf = useRef<number | undefined>(undefined);
  const t0 = useRef<number | null>(null);
  useEffect(() => {
    if (!run) { setV(safe); return; }
    if (raf.current) cancelAnimationFrame(raf.current);
    t0.current = null;
    const ease = (x: number) => 1 - Math.pow(1 - x, 3);
    const tick = (t: number) => {
      if (t0.current == null) t0.current = t;
      const p = Math.min(1, (t - t0.current) / dur);
      setV(start + (safe - start) * ease(p));
      if (p < 1) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => { if (raf.current) cancelAnimationFrame(raf.current); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [safe, run]);
  return v;
}
/* reveal-on-scroll (ajoute .in) */
export function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const els = ref.current?.querySelectorAll('.reveal');
    if (!els) return;
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }),
      { threshold: 0.14 },
    );
    els.forEach((el, i) => { (el as HTMLElement).style.transitionDelay = `${Math.min(i, 6) * 60}ms`; io.observe(el); });
    return () => io.disconnect();
  });
  return ref;
}
/* is-visible flag pour démarrer un compteur */
export function useInView(threshold = 0.4): [React.RefObject<HTMLDivElement | null>, boolean] {
  const ref = useRef<HTMLDivElement>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((es) => { if (es[0].isIntersecting) { setSeen(true); io.disconnect(); } }, { threshold });
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, seen];
}

/* icônes ligne (aucun emoji) */
const IP: Record<string, string> = {
  link: 'M10 13a5 5 0 007 0l3-3a5 5 0 00-7-7l-1 1M14 11a5 5 0 00-7 0l-3 3a5 5 0 007 7l1-1',
  cal: 'M4 8h16M4 8a2 2 0 012-2h12a2 2 0 012 2v11a1 1 0 01-1 1H5a1 1 0 01-1-1V8Zm4-4v3m8-3v3',
  map: 'M9 5L4 7v12l5-2 6 2 5-2V5l-5 2-6-2Zm0 0v12m6-10v12',
  chart: 'M4 20V4m0 16h16M8 16v-5m4 5V8m4 8v-3',
  spark: 'M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3Z',
  check: 'M4 12.5l5 5L20 6',
  star: 'M12 3.5l2.6 5.3 5.9.9-4.2 4.1 1 5.8-5.3-2.8-5.3 2.8 1-5.8-4.2-4.1 5.9-.9L12 3.5Z',
  pin: 'M12 21s7-6.3 7-11a7 7 0 10-14 0c0 4.7 7 11 7 11Zm0-8.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5Z',
  up: 'M6 15l6-6 6 6', down: 'M6 9l6 6 6-6',
  ext: 'M14 5h5v5m0-5l-8 8M18 14v4a1 1 0 01-1 1H6a1 1 0 01-1-1V7a1 1 0 011-1h4',
  arrowR: 'M4 12h15m-6-6l6 6-6 6',
  trophy: 'M8 21h8m-4-4v4M6 4h12v4a6 6 0 01-12 0V4ZM6 6H4v1a3 3 0 003 3M18 6h2v1a3 3 0 01-3 3',
  pool: 'M4 15c1.5 1.2 3 1.2 4.5 0S11.5 13.8 13 15s3 1.2 4.5 0M4 19c1.5 1.2 3 1.2 4.5 0S11.5 17.8 13 19s3 1.2 4.5 0M7 12V6a2 2 0 012-2M7 9h6M13 12V6a2 2 0 012-2',
  users: 'M9 11a3 3 0 100-6 3 3 0 000 6Zm-6 8a6 6 0 0112 0M17 11a3 3 0 100-6M20 19a6 6 0 00-4.5-5.8',
  alert: 'M12 9v4m0 4h.01M10.3 4.3L2.6 18a2 2 0 001.7 3h15.4a2 2 0 001.7-3L13.7 4.3a2 2 0 00-3.4 0Z',
};
export function Icon({ name, size = 20, stroke = 1.9, style, className }: { name: string; size?: number; stroke?: number; style?: CSSProperties; className?: string }) {
  const d = IP[name] || '';
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={stroke}
      strokeLinecap="round" strokeLinejoin="round" className={className} style={{ display: 'block', flexShrink: 0, ...style }}>
      {d.split('M').filter(Boolean).map((s, i) => <path key={i} d={'M' + s} />)}
    </svg>
  );
}
export function StarF({ size = 14 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="var(--gold)" stroke="none" style={{ display: 'block' }}><path d={IP.star} /></svg>;
}
export function Mark({ size = 40 }: { size?: number }) {
  const id = 'mkr' + size;
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" style={{ display: 'block' }}>
      <defs><linearGradient id={id} x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#F4CF5E" /><stop offset="52%" stopColor="#E6B022" /><stop offset="100%" stopColor="#B8881A" /></linearGradient></defs>
      <circle cx="20" cy="20" r="17" stroke={`url(#${id})`} strokeWidth="2" fill="none" strokeDasharray="3 4" opacity=".5" />
      <circle cx="20" cy="20" r="11" stroke={`url(#${id})`} strokeWidth="1.5" fill="none" opacity=".6" />
      <path d="M 12 26 Q 20 26 20 20 Q 20 14 28 14" stroke={`url(#${id})`} strokeWidth="3" strokeLinecap="round" fill="none" />
      <circle cx="20" cy="20" r="2.5" fill="#E6B022" />
    </svg>
  );
}
export function ZelBg() {
  return (
    <svg className="zel"><defs><pattern id="zelp" width="150" height="150" patternUnits="userSpaceOnUse">
      <path d="M75 16 L92 58 L134 75 L92 92 L75 134 L58 92 L16 75 L58 58 Z" fill="none" stroke="#B8881A" strokeWidth="1.6" />
    </pattern></defs><rect width="100%" height="100%" fill="url(#zelp)" /></svg>
  );
}
export function Photo({ src, alt, style, tintIdx = 0 }: { src?: string | null; alt?: string; style?: CSSProperties; tintIdx?: number }) {
  const [err, setErr] = useState(false);
  const tints = [['#E7D6B8', '#C99B57'], ['#D8C4AE', '#9E7B56'], ['#CBDAD2', '#4E8A7E'], ['#E4C7B4', '#B5764E']];
  const [a, b] = tints[tintIdx % tints.length];
  return (
    <div style={{ position: 'relative', overflow: 'hidden', background: `linear-gradient(135deg,${a},${b})`, ...style }}>
      {!err && src && <img src={src} alt={alt || ''} loading="lazy" onError={() => setErr(true)} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />}
      {err && <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', color: 'rgba(255,255,255,.8)' }}><Icon name="pin" size={26} /></div>}
    </div>
  );
}
export function Header() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '20px 20px 0', maxWidth: 1080, margin: '0 auto' }}>
      <Mark size={34} /><span style={{ fontWeight: 800, fontSize: 26, letterSpacing: '-.045em' }}>sojori</span>
      <span className="mono" style={{ marginLeft: 'auto', fontSize: 11, letterSpacing: '.12em', color: 'var(--ink3)', textTransform: 'uppercase' }}>Analyse privée</span>
    </div>
  );
}
export type { ReactNode };
