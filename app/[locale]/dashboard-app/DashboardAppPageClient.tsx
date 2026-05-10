"use client";

import { BackgroundEffects } from "@/components/BackgroundEffects";
import { PageHeader, PageFooter, PageHero, StatsBar, FinalCTA } from "@/components/SharedComponents";
import { Link } from '@/i18n/routing';
import { SojoriMark } from "@/components/Logo";

const NAV = [
  { i: '🏠', l: 'Home', active: true },
  { i: '📅', l: 'Calendar' },
  { i: '🎫', l: 'Reservations' },
  { i: '📡', l: 'Channels' },
  { i: '✨', l: 'Orchestration', badge: 'AI' },
  { i: '👥', l: 'Tasks', badge: 7 },
  { i: '💬', l: 'Inbox', badge: 12 },
  { i: '📊', l: 'Analytics' },
  { i: '⚙️', l: 'Settings' },
];

function Dashboard({ dark = true }: { dark: boolean }) {
  const bg = dark ? '#0a0a10' : '#fafaf7';
  const card = dark ? 'rgba(255,255,255,0.04)' : '#fff';
  const border = dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)';
  const text = dark ? '#fff' : '#0f0f14';
  const text2 = dark ? 'rgba(255,255,255,0.72)' : 'rgba(15,15,20,0.7)';
  const text3 = dark ? 'rgba(255,255,255,0.52)' : 'rgba(15,15,20,0.5)';
  const sidebarBg = dark ? '#08080b' : '#f0ede5';

  return (
    <div className="dashboard-container" style={{ background: bg, color: text, borderRadius: 12, overflow: 'hidden', border: `1px solid ${border}`, boxShadow: '0 20px 60px rgba(0,0,0,0.4)', display: 'flex', minHeight: 480 }}>
      {/* Sidebar */}
      <aside className="dashboard-sidebar" style={{ width: 180, background: sidebarBg, borderRight: `1px solid ${border}`, padding: '12px 8px', display: 'flex', flexDirection: 'column', gap: 3 }}>
        <div style={{ padding: '2px 6px 12px', display: 'flex', alignItems: 'center', gap: 8 }}>
          <SojoriMark size={22} />
          <span style={{ fontWeight: 800, fontSize: 13, letterSpacing: '-0.03em', color: text }}>sojori</span>
        </div>
        {NAV.map(n => (
          <div key={n.l} style={{
            padding: '6px 8px', borderRadius: 6,
            display: 'flex', alignItems: 'center', gap: 8, fontSize: 11, fontWeight: 500,
            background: n.active ? (dark ? 'rgba(230,176,34,0.12)' : 'rgba(230,176,34,0.18)') : 'transparent',
            color: n.active ? '#e6b022' : text2,
            cursor: 'pointer',
            border: n.active ? '1px solid rgba(230,176,34,0.25)' : '1px solid transparent',
          }}>
            <span style={{ fontSize: 12 }}>{n.i}</span>
            <span style={{ flex: 1 }}>{n.l}</span>
            {n.badge && <span style={{ fontSize: 8, padding: '1px 5px', borderRadius: 999, background: typeof n.badge === 'number' ? '#ef4444' : 'rgba(139,92,246,0.25)', color: typeof n.badge === 'number' ? '#fff' : '#a78bfa', fontWeight: 700 }}>{n.badge}</span>}
          </div>
        ))}
        <div style={{ flex: 1 }} />
        <div style={{ padding: '6px 8px', display: 'flex', alignItems: 'center', gap: 8, borderTop: `1px solid ${border}`, marginTop: 6, paddingTop: 10 }}>
          <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'linear-gradient(135deg, #f4cf5e, #e6b022)', color: '#1a1408', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, fontWeight: 700 }}>AB</div>
          <div style={{ lineHeight: 1.2 }}>
            <div style={{ fontSize: 10, fontWeight: 600 }}>Ahmed B.</div>
            <div style={{ fontSize: 8, color: text3 }}>Appartement Paris 15</div>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="dashboard-main" style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        {/* Top bar */}
        <div className="dashboard-topbar" style={{ height: 42, borderBottom: `1px solid ${border}`, padding: '0 16px', display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ fontSize: 10, color: text3 }}>Dashboard <span style={{ margin: '0 4px' }}>›</span><span style={{ color: text }}>Home</span></div>
          <div style={{ flex: 1 }} />
          <div className="dashboard-search" style={{ background: dark ? 'rgba(255,255,255,0.05)' : '#fff', border: `1px solid ${border}`, borderRadius: 6, padding: '4px 10px', fontSize: 10, color: text3, display: 'flex', alignItems: 'center', gap: 6, width: 160 }}>
            <span style={{ fontSize: 11 }}>🔍</span><span>Search…</span><span style={{ marginLeft: 'auto', fontSize: 8, opacity: 0.6 }}>⌘K</span>
          </div>
          <div style={{ position: 'relative', cursor: 'pointer', fontSize: 13 }}>🔔<span style={{ position: 'absolute', top: -3, right: -5, width: 12, height: 12, borderRadius: 6, background: '#ef4444', color: '#fff', fontSize: 7, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>3</span></div>
          <button className="dashboard-cta" style={{ background: 'linear-gradient(180deg, #f4cf5e, #e6b022)', color: '#1a1408', border: 'none', padding: '5px 10px', borderRadius: 6, fontSize: 10, fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap' }}>+ New</button>
        </div>

        {/* Body */}
        <div style={{ flex: 1, padding: 14, overflow: 'auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12, gap: 12 }}>
            <div>
              <div style={{ fontSize: 16, fontWeight: 700, letterSpacing: '-0.02em' }}>Bonjour Ahmed 👋</div>
              <div style={{ fontSize: 10, color: text3, marginTop: 1 }}>Vous avez 3 arrivées aujourd'hui et 7 tâches en attente.</div>
            </div>
            <div className="dashboard-tabs" style={{ display: 'flex', gap: 4, fontSize: 9, color: text3 }}>
              <span style={{ padding: '4px 8px', borderRadius: 5, background: dark ? 'rgba(255,255,255,0.05)' : '#fff', border: `1px solid ${border}` }}>Today</span>
              <span style={{ padding: '4px 8px', borderRadius: 5 }}>Week</span>
              <span style={{ padding: '4px 8px', borderRadius: 5 }}>Month</span>
            </div>
          </div>

          {/* KPI cards */}
          <div className="dashboard-kpis" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8, marginBottom: 14 }}>
            {[
              { k: '3', l: "Today's arrivals", trend: '+1', c: '#06b6d4', icon: '🛬' },
              { k: '7', l: 'Pending tasks', trend: '2 urgent', c: '#e6b022', icon: '✓' },
              { k: '12', l: 'Unread messages', trend: '4 new', c: '#8b5cf6', icon: '💬' },
              { k: '€2,340', l: 'Revenue today', trend: '+18%', c: '#10b981', icon: '↗' },
            ].map(s => (
              <div key={s.l} style={{ background: card, border: `1px solid ${border}`, borderRadius: 8, padding: 10 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                  <div style={{ width: 22, height: 22, borderRadius: 5, background: `${s.c}22`, color: s.c, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11 }}>{s.icon}</div>
                  <div style={{ fontSize: 8, color: '#10b981', fontWeight: 600 }}>{s.trend}</div>
                </div>
                <div style={{ fontSize: 18, fontWeight: 700, letterSpacing: '-0.02em' }}>{s.k}</div>
                <div style={{ fontSize: 9, color: text3, marginTop: 1 }}>{s.l}</div>
              </div>
            ))}
          </div>

          {/* Activity + Today's arrivals */}
          <div className="dashboard-sections" style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 10 }}>
            <div style={{ background: card, border: `1px solid ${border}`, borderRadius: 8, padding: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                <div style={{ fontSize: 11, fontWeight: 600 }}>Recent activity</div>
                <Link href={{ pathname: '/inbox', query: { source: 'dashboard-app-mock-activity' } }} style={{ fontSize: 9, color: '#e6b022', textDecoration: 'none' }}>View all →</Link>
              </div>
              {[
                { t: '2 min', i: '✓', c: '#10b981', text: 'Sarah J. checked in · Appartement Paris 15' },
                { t: '14 min', i: '💬', c: '#06b6d4', text: 'New WhatsApp from Marco · "AC issue"' },
                { t: '38 min', i: '🧹', c: '#8b5cf6', text: 'Sophie completed cleaning · Loft Montmartre' },
                { t: '1h', i: '📨', c: '#e6b022', text: 'Booking confirmed · Airbnb · €840' },
              ].map((a, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 0', borderTop: i ? `1px solid ${border}` : 'none' }}>
                  <div style={{ width: 22, height: 22, borderRadius: 5, background: `${a.c}22`, color: a.c, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10 }}>{a.i}</div>
                  <div style={{ flex: 1, fontSize: 10, lineHeight: 1.3 }}>{a.text}</div>
                  <div style={{ fontSize: 8, color: text3, fontFamily: 'var(--font-mono)', whiteSpace: 'nowrap' }}>{a.t}</div>
                </div>
              ))}
            </div>
            <div style={{ background: card, border: `1px solid ${border}`, borderRadius: 8, padding: 12 }}>
              <div style={{ fontSize: 11, fontWeight: 600, marginBottom: 10 }}>Today's arrivals</div>
              {[
                { name: 'Sarah Johnson', prop: 'Appartement Paris 15', time: '15:00', n: '2 guests' },
                { name: 'Marco Rossi', prop: 'Loft Montmartre', time: '17:30', n: '4 guests' },
                { name: 'Emma R.', prop: 'Villa Barcelona', time: '19:00', n: '6 guests' },
              ].map((g, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 0', borderTop: i ? `1px solid ${border}` : 'none' }}>
                  <div style={{ width: 26, height: 26, borderRadius: '50%', background: `linear-gradient(135deg, hsl(${i * 70},70%,55%), hsl(${i * 70 + 30},70%,40%))`, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700 }}>{g.name.split(' ').map(p => p[0]).join('')}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 10, fontWeight: 600 }}>{g.name}</div>
                    <div style={{ fontSize: 8, color: text3, lineHeight: 1.3 }}>{g.prop} · {g.n}</div>
                  </div>
                  <div style={{ fontSize: 9, fontFamily: 'var(--font-mono)', color: '#e6b022', whiteSpace: 'nowrap' }}>{g.time}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function DashboardAppPageClient() {
  return (
    <>
      <BackgroundEffects />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <PageHeader pageTitle="Dashboard App" />
        <PageHero
          badge="🖥️ Dashboard · L'interface principale"
          title={<>Tout votre business.<br /><span className="gradient-text">Une seule vue.</span></>}
          subtitle="Le workspace post-login. Sidebar navigation, KPI cards, activity feed temps réel, arrivées du jour. Dark mode par défaut, light mode disponible."
          cta1="Voir la démo"
          cta2="Essai gratuit"
        />

        <section style={{ padding: '20px 32px 80px' }}>
          <div style={{ maxWidth: 1320, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 28 }}>
            <div className="uppercase-sm" style={{ color: 'var(--text-3)', textAlign: 'center' }}>● Dark mode (par défaut)</div>
            <Dashboard dark={true} />
            <div className="uppercase-sm" style={{ color: 'var(--text-3)', textAlign: 'center', marginTop: 30 }}>○ Light mode</div>
            <Dashboard dark={false} />
          </div>
        </section>

        <style jsx global>{`
          @media (max-width: 1024px) {
            .dashboard-container {
              transform: scale(0.85);
              transform-origin: top center;
            }
          }

          @media (max-width: 768px) {
            .dashboard-container {
              flex-direction: column !important;
              min-height: auto !important;
              transform: scale(1);
            }

            .dashboard-sidebar {
              width: 100% !important;
              border-right: none !important;
              border-bottom: 1px solid var(--glass-border);
              padding: 10px !important;
              flex-direction: row !important;
              overflow-x: auto !important;
              gap: 6px !important;
            }

            .dashboard-sidebar > div:first-child {
              padding: 0 !important;
              margin-right: 12px;
            }

            .dashboard-sidebar > div:last-child {
              display: none !important;
            }

            .dashboard-topbar {
              padding: 0 12px !important;
            }

            .dashboard-search {
              display: none !important;
            }

            .dashboard-cta {
              font-size: 9px !important;
              padding: 4px 8px !important;
            }

            .dashboard-tabs {
              display: none !important;
            }

            .dashboard-kpis {
              grid-template-columns: repeat(2, 1fr) !important;
            }

            .dashboard-sections {
              grid-template-columns: 1fr !important;
              gap: 10px !important;
            }
          }
        `}</style>

        <StatsBar stats={[
          { k: '<2min', l: 'Prise en main' },
          { k: '42k+', l: 'Réservations gérées' },
          { k: '9 modules', l: 'Tout-en-un' },
          { k: '99.97%', l: 'Uptime' }
        ]} />

        <FinalCTA
          title={<>Votre dashboard. <span className="gradient-text">En 5 minutes.</span></>}
          subtitle="Setup instantané. Import OTAs en un clic. Onboarding guidé."
        />

        <PageFooter />
      </div>
    </>
  );
}
