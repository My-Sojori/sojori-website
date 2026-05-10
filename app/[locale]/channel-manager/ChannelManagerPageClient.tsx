'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { BackgroundEffects } from '@/components/BackgroundEffects';
import { PageHeader, PageFooter, PageHero, StatsBar, FinalCTA } from '@/components/SharedComponents';
import { ScrollPaginationDots } from '@/components/shared/ScrollPaginationDots';

const CHANNEL_MANAGER_BENEFITS = [
  { i: '🚫', t: 'Zéro overbooking', d: 'Booking confirmée → 18 OTAs bloquées en 2 secondes. Garantie contractuelle.' },
  { i: '⚡', t: '−85% temps gestion', d: 'Une seule interface. Modifs propagées partout. Plus jamais 18 logins.' },
  { i: '📈', t: '+24% visibilité', d: 'Présence multi-canal = +47% de bookings vs Airbnb seul. Données prouvées.' },
  { i: '💰', t: 'Pricing optimisé', d: 'Couplé au Dynamic Pricing : tarifs ajustés par OTA selon leur audience.' },
  { i: '📊', t: 'Reporting unifié', d: 'Toutes vos données dans un seul dashboard. Comparable, exportable.' },
  { i: '🛡️', t: 'API stable', d: '99.97% uptime. Reconnexion auto si OTA tombe. Audit trail complet.' },
] as const;

const OTAS = [
  { n: 'Airbnb', c: '#FF5A5F' }, { n: 'Booking.com', c: '#003580' }, { n: 'Vrbo', c: '#0E64A4' },
  { n: 'Expedia', c: '#FFC72C' }, { n: 'Hotels.com', c: '#D4145A' }, { n: 'Tripadvisor', c: '#34E0A1' },
  { n: 'Agoda', c: '#FF5C00' }, { n: 'Hostelworld', c: '#FFC900' }, { n: 'Trip.com', c: '#287DFA' },
  { n: 'HomeAway', c: '#0066B5' }, { n: 'Plum Guide', c: '#1A1A1A' }, { n: 'Marriott Homes', c: '#A21D2C' },
  { n: 'Edreams', c: '#0AB1F0' }, { n: 'Hopper', c: '#492AE1' }, { n: 'Despegar', c: '#FFD400' },
  { n: 'MisterB&B', c: '#5A4FCF' }, { n: 'Stayz', c: '#0096D6' }, { n: 'Wimdu', c: '#37AAEC' },
];

/** Largeur de référence plus petite que 700 → scale plus grand sur mobile (cercle + badges plus lisibles) */
const HUB_LAYOUT_W = 700;
const HUB_SCALE_REF = 580;

function HubAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const [hubScale, setHubScale] = useState(1);

  useLayoutEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const update = () => {
      const w = el.getBoundingClientRect().width;
      setHubScale(Math.min(1, w / HUB_SCALE_REF));
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const w = canvas.width = 700;
    const h = canvas.height = 500;
    const cx = w / 2;
    const cy = h / 2;
    const radius = 200;
    let frame = 0;
    let raf: number;

    const animate = () => {
      ctx.clearRect(0, 0, w, h);

      // Connections
      OTAS.forEach((ota, i) => {
        const angle = (i / OTAS.length) * Math.PI * 2 - Math.PI / 2;
        const x = cx + Math.cos(angle) * radius;
        const y = cy + Math.sin(angle) * radius;

        // Pulse line
        const phase = (frame / 60 + i * 0.15) % 1;
        ctx.strokeStyle = `rgba(244,207,94,${0.08 + 0.05 * Math.sin(frame / 30 + i)})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(x, y);
        ctx.stroke();

        // Pulse dot traveling
        const px = cx + Math.cos(angle) * radius * phase;
        const py = cy + Math.sin(angle) * radius * phase;
        ctx.fillStyle = `rgba(244,207,94,${1 - phase})`;
        ctx.beginPath();
        ctx.arc(px, py, 2.5, 0, Math.PI * 2);
        ctx.fill();
      });

      // Center glow
      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 60);
      grad.addColorStop(0, 'rgba(244,207,94,0.5)');
      grad.addColorStop(1, 'rgba(244,207,94,0)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(cx, cy, 60, 0, Math.PI * 2);
      ctx.fill();

      frame++;
      raf = requestAnimationFrame(animate);
    };

    animate();

    return () => cancelAnimationFrame(raf);
  }, []);

  /** Scène 700×500 ; hubScale ≈ largeur / 600 (plafonné à 1) pour un rendu plus grand sur téléphone */
  return (
    <div
      ref={rootRef}
      className="channel-hub-responsive"
      style={{
        width: '100%',
        maxWidth: HUB_LAYOUT_W,
        margin: '0 auto',
        aspectRatio: '7 / 5',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          width: HUB_LAYOUT_W,
          height: 500,
          transform: `translate(-50%, -50%) scale(${hubScale})`,
          transformOrigin: 'center center',
        }}
      >
        <div style={{ position: 'relative', width: 700, height: 500 }}>
          <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, maxWidth: 'none' }} />
          <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', width: 100, height: 100, borderRadius: '50%', background: 'linear-gradient(135deg, #f4cf5e, #e6b022)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', boxShadow: '0 0 50px rgba(244,207,94,0.5)', zIndex: 5 }}>
            <div style={{ fontSize: 18, fontWeight: 800, color: '#1a1408', letterSpacing: '-0.04em' }}>sojori</div>
            <div style={{ fontSize: 9, color: 'rgba(26,20,8,0.7)', fontFamily: 'Geist Mono', letterSpacing: 1, marginTop: 2 }}>HUB</div>
          </div>
          {OTAS.map((ota, i) => {
            const angle = (i / OTAS.length) * Math.PI * 2 - Math.PI / 2;
            const x = 350 + Math.cos(angle) * 200 - 50;
            const y = 250 + Math.sin(angle) * 200 - 18;
            return (
              <div key={ota.n} style={{
                position: 'absolute', left: x, top: y, width: 100, height: 36,
                borderRadius: 8, background: 'rgba(20,20,28,0.9)', backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 11, fontWeight: 600, color: '#fff', boxShadow: `0 4px 14px ${ota.c}33`,
              }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: ota.c, marginRight: 6, boxShadow: `0 0 6px ${ota.c}` }} />
                {ota.n}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

const SYNC_DEMO_ROWS = [
  { ota: 'Airbnb', c: '#FF5A5F', status: 'Live', price: '€1,450', occ: '94%' },
  { ota: 'Booking.com', c: '#003580', status: 'Live', price: '€1,495', occ: '88%' },
  { ota: 'Vrbo', c: '#0E64A4', status: 'Live', price: '€1,470', occ: '76%' },
  { ota: 'Expedia', c: '#FFC72C', status: 'Live', price: '€1,505', occ: '62%' },
  { ota: 'Hotels.com', c: '#D4145A', status: 'Syncing…', price: '€1,495', occ: '54%' },
  { ota: 'Tripadvisor', c: '#34E0A1', status: 'Live', price: '€1,480', occ: '47%' },
] as const;

function SyncDemo() {
  return (
    <div className="card channel-manager-sync-card" style={{ padding: 0, overflow: 'hidden' }}>
      <div
        className="channel-manager-sync-header"
        style={{
          padding: '14px 18px',
          borderBottom: '1px solid var(--glass-border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 12,
        }}
      >
        <div className="channel-manager-sync-header-title" style={{ fontSize: 14, fontWeight: 600, minWidth: 0, lineHeight: 1.35 }}>
          Sync status — Appartement Paris 15 · 47 Rue des Abbesses
        </div>
        <div
          className="channel-manager-sync-live"
          style={{
            fontSize: 11,
            color: '#10b981',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            flexShrink: 0,
            fontWeight: 600,
          }}
        >
          <span
            className="channel-manager-sync-live-dot"
            style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: '#10b981',
              boxShadow: '0 0 10px #10b981',
              flexShrink: 0,
            }}
          />
          All synced · last sync 2 sec ago
        </div>
      </div>

      {/* Desktop : tableau dense */}
      <div className="channel-manager-sync-desktop" style={{ padding: '8px 0' }}>
        {SYNC_DEMO_ROWS.map((r, i) => (
          <div
            key={r.ota}
            style={{
              display: 'grid',
              gridTemplateColumns: '32px 1fr 100px 100px 100px 80px',
              gap: 14,
              alignItems: 'center',
              padding: '11px 18px',
              borderTop: i ? '1px solid rgba(255,255,255,0.04)' : 'none',
            }}
          >
            <div style={{ width: 24, height: 24, borderRadius: 5, background: r.c, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700, color: '#fff' }}>{r.ota[0]}</div>
            <div style={{ fontSize: 13, fontWeight: 500 }}>{r.ota}</div>
            <div style={{ fontSize: 12, color: r.status === 'Live' ? '#10b981' : '#f4cf5e', display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: r.status === 'Live' ? '#10b981' : '#f4cf5e', boxShadow: r.status === 'Live' ? '0 0 6px #10b981' : 'none', animation: r.status === 'Syncing…' ? 'pulse 1.4s infinite' : 'none' }} />
              {r.status}
            </div>
            <div style={{ fontSize: 13, fontFamily: 'Geist Mono', fontWeight: 600 }}>{r.price}</div>
            <div style={{ fontSize: 12, color: 'var(--text-3)', fontFamily: 'Geist Mono' }}>{r.occ}</div>
            <div style={{ fontSize: 11, color: 'var(--text-3)', fontFamily: 'Geist Mono' }}>2 sec</div>
          </div>
        ))}
      </div>

      {/* Mobile : cartes OTA en scroll horizontal (snap + peek) */}
      <div className="channel-manager-sync-mobile sj-mobile-hscroll">
        {SYNC_DEMO_ROWS.map((r) => (
          <div
            key={r.ota}
            className="channel-manager-sync-ota-card"
            style={{
              padding: 16,
              borderRadius: 14,
              background: 'linear-gradient(165deg, rgba(255,255,255,0.09) 0%, rgba(255,255,255,0.03) 100%)',
              backdropFilter: 'blur(12px)',
              border: '1px solid var(--glass-border)',
              boxShadow: '0 10px 28px rgba(0,0,0,0.18)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 10,
                  background: r.c,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 16,
                  fontWeight: 800,
                  color: '#fff',
                  flexShrink: 0,
                }}
              >
                {r.ota[0]}
              </div>
              <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-1)', lineHeight: 1.2 }}>{r.ota}</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
              <span
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: '50%',
                  background: r.status === 'Live' ? '#10b981' : '#f4cf5e',
                  boxShadow: r.status === 'Live' ? '0 0 12px rgba(16,185,129,0.65)' : '0 0 10px rgba(244,207,94,0.45)',
                  flexShrink: 0,
                  animation: r.status === 'Syncing…' ? 'pulse 1.4s infinite' : 'none',
                }}
              />
              <span style={{ fontSize: 14, fontWeight: 600, color: r.status === 'Live' ? '#10b981' : '#b45309' }}>{r.status}</span>
            </div>
            <div style={{ fontSize: 22, fontFamily: 'var(--font-mono), Geist Mono, monospace', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 10 }}>{r.price}</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 13, color: 'var(--text-3)' }}>
              <span>Occupation <span style={{ fontFamily: 'var(--font-mono), Geist Mono, monospace', fontWeight: 600, color: 'var(--text-2)' }}>{r.occ}</span></span>
              <span style={{ fontFamily: 'var(--font-mono), Geist Mono, monospace', fontSize: 12 }}>2 sec</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ChannelManagerPageClient() {
  return (
    <>
      <style jsx global>{`
        .channel-manager-sync-mobile {
          display: none;
        }

        @media (max-width: 900px) {
          .channel-manager-sync-desktop {
            display: none !important;
          }
          .channel-manager-sync-mobile {
            display: flex !important;
            flex-direction: row !important;
            flex-wrap: nowrap !important;
            gap: 12px !important;
            padding: 12px 14px 20px !important;
            overflow-x: auto !important;
            scroll-snap-type: x mandatory !important;
            -webkit-overflow-scrolling: touch !important;
            scroll-padding-inline: max(12px, env(safe-area-inset-left, 0px)) !important;
          }
          .channel-manager-sync-ota-card {
            flex: 0 0 auto !important;
            min-width: min(272px, 82vw) !important;
            max-width: min(300px, 88vw) !important;
            scroll-snap-align: center !important;
          }
          .channel-manager-sync-header {
            flex-direction: column !important;
            align-items: flex-start !important;
          }
          .channel-manager-sync-header-title {
            font-size: 13px !important;
          }
          .channel-manager-sync-live {
            font-size: 12px !important;
            width: 100%;
          }
          .channel-manager-sync-live-dot {
            width: 10px !important;
            height: 10px !important;
          }

        }
      `}</style>
      <BackgroundEffects />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <PageHeader pageTitle="Channel Manager" />
        <PageHero
          badge="📡 Channel Manager · Distribution unifiée"
          title={<>18 plateformes.<br /><span className="gradient-text">Une seule source de vérité.</span></>}
          subtitle="Connectez Airbnb, Booking, Vrbo, Expedia… en un clic. Calendrier, prix et disponibilités synchronisés en temps réel. Zéro overbooking. Zéro double-saisie."
          cta1="Voir la démo"
          cta2="Connecter mes OTAs"
        />

        <section style={{ padding: '20px 32px 100px' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div className="uppercase-sm" style={{ color: 'var(--text-3)', textAlign: 'center', marginBottom: 12 }}>● Sojori au centre · Tous les canaux connectés</div>
            <div style={{ fontSize: 32, fontWeight: 700, letterSpacing: '-0.02em', textAlign: 'center', maxWidth: 700, margin: '0 auto 40px' }}>Une seule mise à jour. <span style={{ color: '#f4cf5e' }}>Synchronisée partout.</span></div>
            <HubAnimation />
          </div>
        </section>

        <section style={{ padding: '40px 32px 80px', borderTop: '1px solid var(--glass-border)' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div className="uppercase-sm" style={{ color: 'var(--text-3)', marginBottom: 12 }}>● Sync temps réel</div>
            <div style={{ fontSize: 32, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 32, maxWidth: 700 }}>Visualisez la sync. <span style={{ color: 'var(--text-3)' }}>En direct.</span></div>
            <SyncDemo />
          </div>
        </section>

        <section style={{ padding: '40px 32px 80px', borderTop: '1px solid var(--glass-border)' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div className="uppercase-sm" style={{ color: 'var(--text-3)', marginBottom: 12 }}>● Bénéfices</div>
            <div style={{ fontSize: 32, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 32, maxWidth: 700 }}>Pourquoi un Channel Manager <span className="gradient-text">change tout</span>.</div>
            <ScrollPaginationDots
              itemCount={CHANNEL_MANAGER_BENEFITS.length}
              gap={14}
              peekCarousel
              className="sj-peek-sm"
            >
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 16 }}>
                {CHANNEL_MANAGER_BENEFITS.map(c => (
                  <div key={c.t} data-carousel-slide className="card channel-manager-benefit-card" style={{ padding: 22 }}>
                    <div style={{ fontSize: 28, marginBottom: 10 }}>{c.i}</div>
                    <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 4 }}>{c.t}</div>
                    <div style={{ fontSize: 13, color: 'var(--text-3)', lineHeight: 1.55 }}>{c.d}</div>
                  </div>
                ))}
              </div>
            </ScrollPaginationDots>
          </div>
        </section>

        <StatsBar stats={[{k:'18 OTAs',l:'Connectées en 1 clic'},{k:'<2 sec',l:'Sync temps réel'},{k:'0',l:'Overbooking · garanti'},{k:'99.97%',l:'API uptime'}]} />
        <FinalCTA title={<>Connectez vos OTAs. <span className="gradient-text">En 5 min.</span></>} subtitle="Setup guidé. Migration depuis votre channel manager actuel offerte. 1 mois d'essai gratuit." />
        <PageFooter />
      </div>
    </>
  );
}
