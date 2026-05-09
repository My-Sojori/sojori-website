"use client";

import { BackgroundEffects } from "@/components/BackgroundEffects";
import { PageHeader, PageFooter, PageHero, StatsBar, FinalCTA } from "@/components/SharedComponents";
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
    <div style={{ background: bg, color: text, borderRadius: 18, overflow: 'hidden', border: `1px solid ${border}`, boxShadow: '0 30px 80px rgba(0,0,0,0.5)', display: 'flex', minHeight: 620 }}>
      {/* Sidebar */}
      <aside style={{ width: 220, background: sidebarBg, borderRight: `1px solid ${border}`, padding: '18px 12px', display: 'flex', flexDirection: 'column', gap: 4 }}>
        <div style={{ padding: '4px 8px 18px', display: 'flex', alignItems: 'center', gap: 10 }}>
          <SojoriMark size={28} />
          <span style={{ fontWeight: 800, fontSize: 16, letterSpacing: '-0.03em', color: text }}>sojori</span>
        </div>
        {NAV.map(n => (
          <div key={n.l} style={{
            padding: '9px 10px', borderRadius: 8,
            display: 'flex', alignItems: 'center', gap: 10, fontSize: 13, fontWeight: 500,
            background: n.active ? (dark ? 'rgba(230,176,34,0.12)' : 'rgba(230,176,34,0.18)') : 'transparent',
            color: n.active ? '#e6b022' : text2,
            cursor: 'pointer',
            border: n.active ? '1px solid rgba(230,176,34,0.25)' : '1px solid transparent',
          }}>
            <span style={{ fontSize: 14 }}>{n.i}</span>
            <span style={{ flex: 1 }}>{n.l}</span>
            {n.badge && <span style={{ fontSize: 9, padding: '2px 6px', borderRadius: 999, background: typeof n.badge === 'number' ? '#ef4444' : 'rgba(139,92,246,0.25)', color: typeof n.badge === 'number' ? '#fff' : '#a78bfa', fontWeight: 700 }}>{n.badge}</span>}
          </div>
        ))}
        <div style={{ flex: 1 }} />
        <div style={{ padding: '8px 10px', display: 'flex', alignItems: 'center', gap: 10, borderTop: `1px solid ${border}`, marginTop: 8, paddingTop: 14 }}>
          <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'linear-gradient(135deg, #f4cf5e, #e6b022)', color: '#1a1408', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700 }}>AB</div>
          <div style={{ lineHeight: 1.2 }}>
            <div style={{ fontSize: 12, fontWeight: 600 }}>Ahmed B.</div>
            <div style={{ fontSize: 10, color: text3 }}>Appartement Paris 15</div>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        {/* Top bar */}
        <div style={{ height: 56, borderBottom: `1px solid ${border}`, padding: '0 22px', display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ fontSize: 13, color: text3 }}>Dashboard <span style={{ margin: '0 6px' }}>›</span><span style={{ color: text }}>Home</span></div>
          <div style={{ flex: 1 }} />
          <div style={{ background: dark ? 'rgba(255,255,255,0.05)' : '#fff', border: `1px solid ${border}`, borderRadius: 8, padding: '6px 12px', fontSize: 12, color: text3, display: 'flex', alignItems: 'center', gap: 8, width: 220 }}>
            <span>🔍</span><span>Search anything…</span><span style={{ marginLeft: 'auto', fontSize: 10, opacity: 0.6 }}>⌘K</span>
          </div>
          <div style={{ position: 'relative', cursor: 'pointer' }}>🔔<span style={{ position: 'absolute', top: -4, right: -6, width: 14, height: 14, borderRadius: 7, background: '#ef4444', color: '#fff', fontSize: 9, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>3</span></div>
          <button style={{ background: 'linear-gradient(180deg, #f4cf5e, #e6b022)', color: '#1a1408', border: 'none', padding: '7px 14px', borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>+ New reservation</button>
        </div>

        {/* Body */}
        <div style={{ flex: 1, padding: 22, overflow: 'auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
            <div>
              <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: '-0.02em' }}>Bonjour Ahmed 👋</div>
              <div style={{ fontSize: 13, color: text3, marginTop: 2 }}>Vous avez 3 arrivées aujourd'hui et 7 tâches en attente.</div>
            </div>
            <div style={{ display: 'flex', gap: 6, fontSize: 11, color: text3 }}>
              <span style={{ padding: '5px 10px', borderRadius: 6, background: dark ? 'rgba(255,255,255,0.05)' : '#fff', border: `1px solid ${border}` }}>Today</span>
              <span style={{ padding: '5px 10px', borderRadius: 6 }}>Week</span>
              <span style={{ padding: '5px 10px', borderRadius: 6 }}>Month</span>
            </div>
          </div>

          {/* KPI cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 22 }}>
            {[
              { k: '3', l: "Today&apos;s arrivals", trend: '+1 vs hier', c: '#06b6d4', icon: '🛬' },
              { k: '7', l: 'Pending tasks', trend: '2 urgent', c: '#e6b022', icon: '✓' },
              { k: '12', l: 'Unread messages', trend: '4 nouveaux', c: '#8b5cf6', icon: '💬' },
              { k: '€2,340', l: 'Revenue today', trend: '+18% vs avg', c: '#10b981', icon: '↗' },
            ].map(s => (
              <div key={s.l} style={{ background: card, border: `1px solid ${border}`, borderRadius: 12, padding: 16 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                  <div style={{ width: 30, height: 30, borderRadius: 7, background: `${s.c}22`, color: s.c, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>{s.icon}</div>
                  <div style={{ fontSize: 10, color: '#10b981', fontWeight: 600 }}>{s.trend}</div>
                </div>
                <div style={{ fontSize: 26, fontWeight: 700, letterSpacing: '-0.02em' }}>{s.k}</div>
                <div style={{ fontSize: 11, color: text3, marginTop: 2 }}>{s.l}</div>
              </div>
            ))}
          </div>

          {/* Activity + Today's arrivals */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 14 }}>
            <div style={{ background: card, border: `1px solid ${border}`, borderRadius: 12, padding: 18 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 14 }}>
                <div style={{ fontSize: 14, fontWeight: 600 }}>Recent activity</div>
                <a href="#" style={{ fontSize: 11, color: '#e6b022', textDecoration: 'none' }}>View all →</a>
              </div>
              {[
                { t: '2 min', i: '✓', c: '#10b981', text: 'Sarah J. checked in · Appartement Paris 15' },
                { t: '14 min', i: '💬', c: '#06b6d4', text: 'New WhatsApp from Marco · "AC issue"' },
                { t: '38 min', i: '🧹', c: '#8b5cf6', text: 'Sophie completed cleaning · Loft Montmartre' },
                { t: '1h', i: '📨', c: '#e6b022', text: 'Booking confirmed · Airbnb · €840' },
                { t: '2h', i: '⭐', c: '#fbbf24', text: 'New 5★ review · Appartement Paris 15' },
              ].map((a, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderTop: i ? `1px solid ${border}` : 'none' }}>
                  <div style={{ width: 28, height: 28, borderRadius: 7, background: `${a.c}22`, color: a.c, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13 }}>{a.i}</div>
                  <div style={{ flex: 1, fontSize: 13 }}>{a.text}</div>
                  <div style={{ fontSize: 10, color: text3, fontFamily: 'var(--font-mono)' }}>{a.t}</div>
                </div>
              ))}
            </div>
            <div style={{ background: card, border: `1px solid ${border}`, borderRadius: 12, padding: 18 }}>
              <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 14 }}>Today&apos;s arrivals</div>
              {[
                { name: 'Sarah Johnson', prop: 'Appartement Paris 15', time: '15:00', n: '2 guests' },
                { name: 'Marco Rossi', prop: 'Loft Montmartre', time: '17:30', n: '4 guests' },
                { name: 'Emma R.', prop: 'Villa Barcelona', time: '19:00', n: '6 guests' },
              ].map((g, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderTop: i ? `1px solid ${border}` : 'none' }}>
                  <div style={{ width: 32, height: 32, borderRadius: '50%', background: `linear-gradient(135deg, hsl(${i * 70},70%,55%), hsl(${i * 70 + 30},70%,40%))`, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>{g.name.split(' ').map(p => p[0]).join('')}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 600 }}>{g.name}</div>
                    <div style={{ fontSize: 11, color: text3 }}>{g.prop} · {g.n}</div>
                  </div>
                  <div style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: '#e6b022' }}>{g.time}</div>
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
