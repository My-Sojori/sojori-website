"use client";

import { BackgroundEffects } from "@/components/BackgroundEffects";
import { useTranslations } from 'next-intl';
import { PageHeader, PageFooter, PageHero, FinalCTA } from "@/components/SharedComponents";
import { Link } from '@/i18n/routing';
import { SojoriMark } from "@/components/Logo";
import { InFlow } from '@/components/InFlow';
import { FaqSection } from '@/components/FaqSection';
import { Exemple } from '@/components/refonte/Exemple';
import { Trait } from '@/components/refonte/Trait';

const NAV = [
  { i: '', l: 'home', active: true },
  { i: '', l: 'calendar' },
  { i: '', l: 'reservations' },
  { i: '', l: 'channels' },
  { i: '', l: 'orchestration', badge: 'ai' },
  { i: '', l: 'tasks', badge: 7 },
  { i: '', l: 'inbox', badge: 12 },
  { i: '', l: 'analytics' },
  { i: '', l: 'settings' },
];

function Dashboard({ dark = true }: { dark: boolean }) {
  const m = useTranslations('pageBodies.dashboard-app.mock');
  const bg = dark ? '#0a0a10' : '#fafaf7';
  const card = dark ? 'rgba(255,255,255,0.04)' : '#fff';
  const border = dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)';
  const text = dark ? '#fff' : '#0f0f14';
  const text2 = dark ? 'rgba(255,255,255,0.72)' : 'rgba(15,15,20,0.7)';
  const text3 = dark ? 'rgba(255,255,255,0.52)' : 'rgba(15,15,20,0.72)';
  const sidebarBg = dark ? '#08080b' : '#f0ede5';

  return (
    <div className="dashboard-container" dir="ltr" style={{ background: bg, color: text, borderRadius: 12, overflow: 'hidden', border: `1px solid ${border}`, boxShadow: '0 20px 60px rgba(0,0,0,0.4)', display: 'flex', minHeight: 480 }}>
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
            <span style={{ fontSize: 12 }}><Trait /></span>
            <span style={{ flex: 1 }}>{m(`nav.${n.l}`)}</span>
            {n.badge !== undefined && <span style={{ fontSize: 8, padding: '1px 5px', borderRadius: 999, background: typeof n.badge === 'number' ? '#dc2626' : 'rgba(109,40,217,0.14)', color: typeof n.badge === 'number' ? '#fff' : '#6d28d9', fontWeight: 700 }}>{typeof n.badge === 'number' ? n.badge : m(`nav.${n.badge}`)}</span>}
          </div>
        ))}
        <div style={{ flex: 1 }} />
        <div style={{ padding: '6px 8px', display: 'flex', alignItems: 'center', gap: 8, borderTop: `1px solid ${border}`, marginTop: 6, paddingTop: 10 }}>
          <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'linear-gradient(135deg, #f4cf5e, #e6b022)', color: '#1a1408', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, fontWeight: 700 }}>AB</div>
          <div style={{ lineHeight: 1.2 }}>
            <div style={{ fontSize: 10, fontWeight: 600 }}>Ahmed B.</div>
            <div style={{ fontSize: 8, color: text3 }}>Riad Dar Zellige</div>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="dashboard-main" style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        {/* Top bar */}
        <div className="dashboard-topbar" style={{ height: 42, borderBottom: `1px solid ${border}`, padding: '0 16px', display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ fontSize: 10, color: text3 }}>{m('crumb')} <span style={{ margin: '0 4px' }}>›</span><span style={{ color: text }}>{m('nav.home')}</span></div>
          <div style={{ flex: 1 }} />
          <div className="dashboard-search" style={{ background: dark ? 'rgba(255,255,255,0.05)' : '#fff', border: `1px solid ${border}`, borderRadius: 6, padding: '4px 10px', fontSize: 10, color: text3, display: 'flex', alignItems: 'center', gap: 6, width: 160 }}>
            <span style={{ fontSize: 11 }}></span><span>{m('search')}</span><span style={{ marginLeft: 'auto', fontSize: 8, opacity: 0.6 }}>⌘K</span>
          </div>
          <div style={{ position: 'relative', cursor: 'pointer', fontSize: 13 }}><span style={{ position: 'absolute', top: -3, right: -5, width: 12, height: 12, borderRadius: 6, background: '#dc2626', color: '#fff', fontSize: 7, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>3</span></div>
          <button className="dashboard-cta" style={{ background: 'linear-gradient(180deg, #f4cf5e, #e6b022)', color: '#1a1408', border: 'none', padding: '5px 10px', borderRadius: 6, fontSize: 10, fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap' }}>{m('new')}</button>
        </div>

        {/* Body */}
        <div style={{ flex: 1, padding: 14, overflow: 'auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12, gap: 12 }}>
            <div>
              <div style={{ fontSize: 16, fontWeight: 700, letterSpacing: '-0.02em' }}>{m('hello', { name: 'Ahmed' })}</div>
              <div dir="auto" style={{ fontSize: 10, color: text3, marginTop: 1 }}>{m('sub', { arrivals: 3, tasks: 7 })}</div>
            </div>
            <div className="dashboard-tabs" style={{ display: 'flex', gap: 4, fontSize: 9, color: text3 }}>
              <span style={{ padding: '4px 8px', borderRadius: 5, background: dark ? 'rgba(255,255,255,0.05)' : '#fff', border: `1px solid ${border}` }}>{m('today')}</span>
              <span style={{ padding: '4px 8px', borderRadius: 5 }}>{m('week')}</span>
              <span style={{ padding: '4px 8px', borderRadius: 5 }}>{m('month')}</span>
            </div>
          </div>

          {/* KPI cards */}
          <div className="dashboard-kpis" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8, marginBottom: 14 }}>
            {[
              { k: '3', l: m('kpi.arrivals'), trend: '+1', c: '#06b6d4', icon: '' },
              { k: '7', l: m('kpi.tasks'), trend: m('kpi.urgent', { n: 2 }), c: '#e6b022', icon: '✓' },
              { k: '12', l: m('kpi.messages'), trend: m('kpi.newMsgs', { n: 4 }), c: '#8b5cf6', icon: '' },
              { k: '2 340 MAD', l: m('kpi.revenue'), trend: '+18%', c: '#10b981', icon: '↗' },
            ].map(s => (
              <div key={s.l} style={{ background: card, border: `1px solid ${border}`, borderRadius: 8, padding: 10 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                  <div style={{ width: 22, height: 22, borderRadius: 5, background: `${s.c}22`, color: s.c, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11 }}><Trait /></div>
                  <div style={{ fontSize: 8, color: '#047857', fontWeight: 600 }}>{s.trend}</div>
                </div>
                <div style={{ fontSize: 18, fontWeight: 700, letterSpacing: '-0.02em' }}>{s.k}</div>
                <div dir="auto" style={{ fontSize: 9, color: text3, marginTop: 1 }}>{s.l}</div>
              </div>
            ))}
          </div>

          {/* Activity + Today's arrivals */}
          <div className="dashboard-sections" style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 10 }}>
            <div style={{ background: card, border: `1px solid ${border}`, borderRadius: 8, padding: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                <div style={{ fontSize: 11, fontWeight: 600 }}>{m('activity.title')}</div>
                <Link href={{ pathname: '/inbox', query: { source: 'dashboard-app-mock-activity' } }} style={{ fontSize: 9, color: '#e6b022', textDecoration: 'none' }}>{m('activity.all')}</Link>
              </div>
              {[
                { t: m('activity.min', { n: 2 }), i: '✓', c: '#10b981', text: m('activity.a1', { who: 'Sarah J.', prop: 'Riad Dar Zellige' }) },
                { t: m('activity.min', { n: 14 }), i: '', c: '#06b6d4', text: m('activity.a2', { who: 'Marco' }) },
                { t: m('activity.min', { n: 38 }), i: '', c: '#8b5cf6', text: m('activity.a3', { who: 'Sophie', prop: 'Hôtel Tafoukt' }) },
                { t: m('activity.hour', { n: 1 }), i: '', c: '#e6b022', text: m('activity.a4', { amount: '840 MAD' }) },
              ].map((a, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 0', borderTop: i ? `1px solid ${border}` : 'none' }}>
                  <div style={{ width: 22, height: 22, borderRadius: 5, background: `${a.c}22`, color: a.c, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10 }}><Trait /></div>
                  <div dir="auto" style={{ flex: 1, fontSize: 10, lineHeight: 1.3 }}>{a.text}</div>
                  <div style={{ fontSize: 8, color: text3, fontFamily: 'var(--font-mono)', whiteSpace: 'nowrap' }}>{a.t}</div>
                </div>
              ))}
            </div>
            <div style={{ background: card, border: `1px solid ${border}`, borderRadius: 8, padding: 12 }}>
              <div style={{ fontSize: 11, fontWeight: 600, marginBottom: 10 }}>{m('arrivals.title')}</div>
              {[
                { name: 'Sarah Johnson', prop: 'Riad Dar Zellige', time: '15:00', n: m('arrivals.guests', { n: 2 }) },
                { name: 'Marco Rossi', prop: 'Hôtel Tafoukt', time: '17:30', n: m('arrivals.guests', { n: 4 }) },
                { name: 'Emma R.', prop: 'Suite Junior', time: '19:00', n: m('arrivals.guests', { n: 6 }) },
              ].map((g, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 0', borderTop: i ? `1px solid ${border}` : 'none' }}>
                  <div style={{ width: 26, height: 26, borderRadius: '50%', background: `linear-gradient(135deg, hsl(${i * 70},70%,55%), hsl(${i * 70 + 30},70%,40%))`, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700 }}>{g.name.split(' ').map(p => p[0]).join('')}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 10, fontWeight: 600 }}>{g.name}</div>
                    <div dir="auto" style={{ fontSize: 8, color: text3, lineHeight: 1.3 }}>{g.prop} · {g.n}</div>
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
  const tb = useTranslations('pageBodies.dashboard-app');
  return (
    <>
      <BackgroundEffects />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <PageHeader pageTitle={tb('k001')} />
        <PageHero
          badge={tb('k002')}
          title={<>{tb('k003')}<br /><span className="gradient-text">{tb('k004')}</span></>}
          subtitle={tb('k005')}
          cta1={tb('k006')}
          cta2={tb('k007')}
        />

        <section style={{ padding: '20px 32px 80px' }}>
          <div style={{ maxWidth: 1320, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 28 }}>
            <div className="uppercase-sm" style={{ color: 'var(--text-3)', textAlign: 'center' }}>{tb('k008')}</div>
            <Exemple><Dashboard dark={true} /></Exemple>
            <div className="uppercase-sm" style={{ color: 'var(--text-3)', textAlign: 'center', marginTop: 30 }}>{tb('k009')}</div>
            <Exemple><Dashboard dark={false} /></Exemple>
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

        <InFlow
          domain={tb('k010')}
          domainColor="#8b5cf6"
          self={tb('k011')}
          upstream={[{ label: tb('k012'), href: '/pms' }, { label: tb('k013'), href: '/teamflow' }, { label: tb('k014'), href: '/inbox' }]}
          downstream={[{ label: tb('k015'), href: '/teamflow' }, { label: tb('k016'), href: '/dynamic-pricing' }]}
        />

        <FaqSection
          badge="Pilotage"
          title={tb('k017')}
          items={[
  {
    "q": tb('k018'),
    "a": tb('k019')
  },
  {
    "q": tb('k020'),
    "a": tb('k021')
  },
  {
    "q": tb('k022'),
    "a": tb('k023')
  },
  {
    "q": tb('k024'),
    "a": tb('k025')
  }
]}
        />



        <FinalCTA
          title={<>{tb('k026')}<span className="gradient-text">{tb('k027')}</span></>}
          subtitle={tb('k028')}
        />

        <PageFooter />
      </div>
    </>
  );
}
