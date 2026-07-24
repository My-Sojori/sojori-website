'use client';
/* ===== Écran de CHARGEMENT animé « bout-en-bout » (5 étapes) ===== */
import { useState, useEffect, useRef } from 'react';
import { ZelBg, Header, Icon, Photo } from './sjrShared';

const LSTEPS = [
  { icon: 'link', title: 'On lit votre annonce Airbnb', sub: 'Prix, photos, équipements, note' },
  { icon: 'cal', title: 'On récupère votre calendrier', sub: '12 mois de disponibilités' },
  { icon: 'map', title: 'On cherche vos concurrents', sub: 'Annonces comparables autour de vous' },
  { icon: 'chart', title: 'On compare prix & occupation', sub: 'Positionnement sur le marché' },
  { icon: 'spark', title: 'On calcule votre bilan', sub: 'Points forts, écarts, actions' },
];
const STEP_MS = 2600;

export function SjrLoadingView({ photoUrl }: { photoUrl?: string | null }) {
  const [step, setStep] = useState(0);
  const [t, setT] = useState(0);
  const raf = useRef<number | undefined>(undefined);
  const base = useRef<number | null>(null);
  useEffect(() => {
    base.current = null;
    const tick = (ts: number) => {
      if (base.current == null) base.current = ts;
      const elapsed = ts - base.current;
      const s = Math.floor(elapsed / STEP_MS);
      const local = (elapsed % STEP_MS) / STEP_MS;
      if (s >= LSTEPS.length) { base.current = ts; setStep(0); setT(0); }
      else { setStep(s); setT(local); }
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => { if (raf.current) cancelAnimationFrame(raf.current); };
  }, []);

  return (
    <div className="page">
      <ZelBg />
      <Header />
      <div style={{ maxWidth: 520, margin: '0 auto', padding: 'clamp(24px,7vw,56px) 20px 120px', position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'center', marginBottom: 30 }}>
          <span className="badge"><span className="badge-dot" style={{ animation: 'sjr-blink 1s infinite' }}></span>Analyse en cours</span>
          <h1 style={{ fontSize: 'clamp(30px,8vw,40px)', margin: '20px 0 8px' }}>On analyse<br />votre annonce…</h1>
          <p style={{ color: 'var(--ink2)', fontSize: 15.5 }}>Quelques secondes — ne fermez pas cette page.</p>
        </div>

        <div className="glass" style={{ padding: '26px 22px', borderRadius: 26, minHeight: 300, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
          <Stage step={step} t={t} photoUrl={photoUrl} />
        </div>

        <div style={{ display: 'flex', gap: 8, margin: '22px 2px 26px' }}>
          {LSTEPS.map((_, i) => (
            <div key={i} style={{ flex: 1, height: 6, borderRadius: 6, overflow: 'hidden', background: 'rgba(28,23,16,.10)' }}>
              <div style={{ height: '100%', borderRadius: 6, background: 'var(--grad)', width: i < step ? '100%' : i === step ? `${Math.round(t * 100)}%` : '0%', transition: i === step ? 'none' : 'width .3s' }} />
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {LSTEPS.map((s, i) => {
            const done = i < step, active = i === step;
            return (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14, opacity: done || active ? 1 : 0.4, transition: 'opacity .4s' }}>
                <div style={{ width: 42, height: 42, borderRadius: 13, flexShrink: 0, display: 'grid', placeItems: 'center', background: done ? 'var(--grad)' : active ? 'rgba(230,176,34,.14)' : 'rgba(28,23,16,.05)', border: active ? '1px solid var(--gold)' : '1px solid transparent', color: done ? '#2A1E08' : active ? 'var(--goldDeep)' : 'var(--ink3)' }}>
                  {done ? <Icon name="check" size={20} stroke={2.6} /> : <Icon name={s.icon} size={20} />}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: active || done ? 700 : 500, fontSize: 15.5, color: active || done ? 'var(--ink)' : 'var(--ink2)' }}>{s.title}</div>
                  <div style={{ fontSize: 12.5, color: 'var(--ink3)' }}>{s.sub}</div>
                </div>
                {active && <div style={{ width: 18, height: 18, borderRadius: 999, border: '2px solid rgba(230,176,34,.3)', borderTopColor: 'var(--gold)', animation: 'sjr-spin .8s linear infinite' }} />}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function Stage({ step, t, photoUrl }: { step: number; t: number; photoUrl?: string | null }) {
  if (step === 0) return <StageListing t={t} photoUrl={photoUrl} />;
  if (step === 1) return <StageCalendar t={t} />;
  if (step === 2) return <StageRadar t={t} />;
  if (step === 3) return <StageCompare t={t} />;
  return <StageBilan t={t} />;
}

function StageListing({ t, photoUrl }: { t: number; photoUrl?: string | null }) {
  const w = Math.min(1, t * 1.6);
  return (
    <div style={{ width: '100%', animation: 'sjr-floaty 3s ease-in-out infinite' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, background: 'var(--paper2)', border: '1px solid var(--line)', borderRadius: 18, padding: 16 }}>
        <Photo src={photoUrl} style={{ width: 74, height: 74, borderRadius: 12, flexShrink: 0 }} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ height: 11, borderRadius: 6, background: 'var(--grad)', width: `${40 + w * 50}%`, marginBottom: 9 }} />
          <div style={{ height: 9, borderRadius: 6, background: 'rgba(28,23,16,.10)', width: `${30 + w * 40}%`, marginBottom: 9 }} />
          <div style={{ display: 'flex', gap: 6 }}>{[0, 1, 2].map((i) => <div key={i} style={{ height: 20, width: 44, borderRadius: 999, background: 'rgba(230,176,34,.14)', opacity: w > i * 0.3 ? 1 : 0.2 }} />)}</div>
        </div>
      </div>
      <div style={{ marginTop: 16, display: 'flex', alignItems: 'center', gap: 10, background: 'var(--paper2)', border: '1px solid var(--line)', borderRadius: 14, padding: '14px 16px' }}>
        <Icon name="link" size={20} style={{ color: 'var(--goldDeep)' }} />
        <span className="mono" style={{ fontSize: 13.5, color: 'var(--ink2)' }}>On lit votre annonce<span style={{ color: 'var(--gold)', animation: 'sjr-blink 1s steps(1) infinite' }}>|</span></span>
      </div>
    </div>
  );
}

function StageCalendar({ t }: { t: number }) {
  const cells = Array.from({ length: 35 });
  const bookedN = Math.round(35 * 0.42 * Math.min(1, t * 1.4));
  return (
    <div style={{ width: '100%', maxWidth: 300 }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: 8 }}>
        {cells.map((_, i) => {
          const order = (i * 13 + 3) % 35; const on = order < bookedN;
          return <div key={i} style={{ aspectRatio: '1', borderRadius: 8, background: on ? 'var(--grad)' : 'rgba(28,23,16,.06)', border: on ? 'none' : '1px solid var(--line)', boxShadow: on ? '0 4px 10px rgba(230,176,34,.3)' : 'none', transform: on ? 'scale(1)' : 'scale(.9)', transition: 'transform .3s,background .3s' }} />;
        })}
      </div>
      <div style={{ textAlign: 'center', marginTop: 18, fontFamily: 'var(--mono)', fontSize: 13, color: 'var(--ink2)', letterSpacing: '.02em' }}>
        <b style={{ color: 'var(--goldDeep)', fontSize: 17 }}>{Math.round(t * 365)}</b> / 365 jours lus
      </div>
    </div>
  );
}

function StageRadar({ t }: { t: number }) {
  const R = 130, N = 14;
  const shown = Math.floor(t * N * 1.3);
  return (
    <svg width={R * 2} height={R * 2} viewBox={`0 0 ${R * 2} ${R * 2}`}>
      {[0.4, 0.7, 1].map((f, i) => <circle key={i} cx={R} cy={R} r={R * f * Math.min(1, t * 2)} fill="none" stroke="rgba(184,136,26,.35)" strokeWidth="1.4" strokeDasharray="3 6" />)}
      <g transform={`rotate(${t * 360 * 1.5} ${R} ${R})`}><line x1={R} y1={R} x2={R} y2="14" stroke="rgba(230,176,34,.5)" strokeWidth="2" /></g>
      {Array.from({ length: N }).map((_, i) => { const ang = (i * 137.5 + 20) * Math.PI / 180; const rr = 45 + ((i * 37) % 80); const x = R + Math.cos(ang) * rr, y = R + Math.sin(ang) * rr; const on = i < shown; return <circle key={i} cx={x} cy={y} r={on ? 7 : 0} fill="url(#lgLoad)" opacity={on ? 1 : 0} style={{ transition: 'r .3s' }} />; })}
      <defs><linearGradient id="lgLoad" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#F4CF5E" /><stop offset="100%" stopColor="#B8881A" /></linearGradient></defs>
      <circle cx={R} cy={R} r="15" fill="#fff" stroke="var(--gold)" strokeWidth="3" />
      <circle cx={R} cy={R} r="5" fill="var(--gold)" />
    </svg>
  );
}

function StageCompare({ t }: { t: number }) {
  const rows: [string, number][] = [['Prix / nuit', 0.6], ['Occupation', 0.85], ['Revenu / an', 0.72]];
  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 20 }}>
      {rows.map(([lab, frac], i) => {
        const p = Math.max(0, Math.min(1, t * 1.5 - i * 0.12));
        return (
          <div key={lab}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12.5, color: 'var(--ink2)', marginBottom: 7 }}><span>{lab}</span><span className="mono">vous vs marché</span></div>
            <div style={{ position: 'relative', height: 14, borderRadius: 999, background: 'rgba(28,23,16,.06)', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', inset: 0, width: `${frac * p * 100}%`, background: 'var(--grad)', borderRadius: 999 }} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

function StageBilan({ t }: { t: number }) {
  const items = ['Points forts', 'Écarts', 'Actions'];
  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ width: 88, height: 88, margin: '0 auto 18px', borderRadius: 26, background: 'var(--grad)', display: 'grid', placeItems: 'center', boxShadow: '0 18px 40px rgba(230,176,34,.4)', transform: `scale(${0.6 + Math.min(1, t * 2) * 0.4})` }}>
        <Icon name="spark" size={44} style={{ color: '#2A1E08' }} stroke={2} />
      </div>
      <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
        {items.map((it, i) => <span key={it} className="chip" style={{ opacity: t > i * 0.25 + 0.2 ? 1 : 0.25, transition: 'opacity .3s' }}>{it}</span>)}
      </div>
    </div>
  );
}
