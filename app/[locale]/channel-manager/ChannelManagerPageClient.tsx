'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { BackgroundEffects } from '@/components/BackgroundEffects';
import { PageHeader, PageFooter, PageHero, StatsBar, FinalCTA } from '@/components/SharedComponents';
import { ScrollPaginationDots } from '@/components/shared/ScrollPaginationDots';
import { InFlow } from '@/components/InFlow';
import { FaqSection } from '@/components/FaqSection';

const OTAS = [
  { n: 'Airbnb', c: '#FF5A5F' }, { n: 'Booking.com', c: '#003580' }, { n: 'Vrbo', c: '#0E64A4' },
  { n: 'Expedia', c: '#FFC72C' }, { n: 'Mews', c: '#7b6cf6' }, { n: 'Sojori Direct', c: '#f4cf5e' },
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

export default function ChannelManagerPageClient() {
  const tb = useTranslations('pageBodies.channel-manager');
  const CHANNEL_MANAGER_BENEFITS = [
    { i: '•', t: tb('k001'), d: tb('k002') },
    { i: '•', t: tb('k003'), d: tb('k004') },
    { i: '•', t: tb('k005'), d: tb('k006') },
    { i: '•', t: tb('k007'), d: tb('k008') },
    { i: '•', t: tb('k009'), d: tb('k010') },
    { i: '•', t: tb('k011'), d: tb('k012') },
  ] as const;

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
        <PageHeader pageTitle={tb('k013')} />
        <PageHero
          badge={tb('k014')}
          title={<>{tb('k015')}<br /><span className="gradient-text">{tb('k016')}</span></>}
          subtitle={tb('k017')}
          cta1={tb('k018')}
          cta2={tb('k019')}
        />

        <section style={{ padding: '20px 32px 100px' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div className="uppercase-sm" style={{ color: 'var(--text-3)', textAlign: 'center', marginBottom: 12 }}>{tb('k020')}</div>
            <div style={{ fontSize: 32, fontWeight: 700, letterSpacing: '-0.02em', textAlign: 'center', maxWidth: 700, margin: '0 auto 40px' }}>{tb('k021')}<span style={{ color: '#f4cf5e' }}>{tb('k022')}</span></div>
            <HubAnimation />
          </div>
        </section>

        <section style={{ padding: '40px 32px 80px', borderTop: '1px solid var(--glass-border)' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div className="uppercase-sm" style={{ color: 'var(--text-3)', marginBottom: 12 }}>{tb('k023')}</div>
            <div style={{ fontSize: 32, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 32, maxWidth: 700 }}>{tb('k024')}<span className="gradient-text">{tb('k025')}</span>.</div>
            <ScrollPaginationDots
              itemCount={CHANNEL_MANAGER_BENEFITS.length}
              gap={14}
              peekCarousel
              className="sj-peek-sm"
            >
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 16 }}>
                {CHANNEL_MANAGER_BENEFITS.map(c => (
                  <div key={c.t} data-carousel-slide className="card channel-manager-benefit-card" style={{ padding: 22 }}>
                    <div aria-hidden="true" style={{ width: 28, height: 3, borderRadius: 2, background: 'var(--primary)', marginBottom: 14 }} />
                    <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 4 }}>{c.t}</div>
                    <div style={{ fontSize: 13, color: 'var(--text-3)', lineHeight: 1.55 }}>{c.d}</div>
                  </div>
                ))}
              </div>
            </ScrollPaginationDots>
          </div>
        </section>

        <InFlow
          domain={tb('k026')}
          domainColor="#10b981"
          self={tb('k027')}
          upstream={[{ label: tb('k028'), href: '/pms' }, { label: tb('k029'), href: '/dynamic-pricing' }, { label: tb('k030'), href: '/teamflow' }]}
          downstream={[{ label: tb('k031'), href: '/pms' }, { label: tb('k032'), href: '/analytics' }, { label: tb('k033'), href: '/guest-experience' }]}
        />

        <FaqSection
          badge={tb('k034')}
          title={tb('k035')}
          items={[
  {
    "q": tb('k036'),
    "a": tb('k037')
  },
  {
    "q": tb('k038'),
    "a": tb('k039')
  },
  {
    "q": tb('k040'),
    "a": tb('k041')
  },
  {
    "q": tb('k042'),
    "a": tb('k043')
  }
]}
        />


        <FinalCTA title={<>{tb('k044')}<span className="gradient-text">{tb('k045')}</span></>} subtitle={tb('k046')} />
        <PageFooter />
      </div>
    </>
  );
}
