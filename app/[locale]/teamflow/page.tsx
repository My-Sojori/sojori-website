'use client';

import { useTranslations } from 'next-intl';
import { BackgroundEffects } from '@/components/BackgroundEffects';
import { PageHeader, PageFooter, PageHero, StatsBar, FinalCTA } from '@/components/SharedComponents';
import { ScrollPaginationDots } from '@/components/shared/ScrollPaginationDots';

interface Card {
  who: string;
  avatar: string;
  task: string;
  time: string;
  urgent?: boolean;
  progress?: number;
  photos?: number;
}

interface Column {
  t: string;
  c: string;
  cards: Card[];
}

function StaffBoard() {
  const t = useTranslations('teamflow');

  const cols: Column[] = [
    { t: t('board.columns.todo'), c: '#94a3b8', cards: [
      { who: t('kpis.staff.sophie.name'), avatar: '#f59e0b', task: t('board.tasks.task1'), time: '14:00', urgent: false },
      { who: t('kpis.staff.lucas.name'), avatar: '#06b6d4', task: t('board.tasks.task2'), time: '17:30', urgent: true },
    ] },
    { t: t('board.columns.inProgress'), c: '#f4cf5e', cards: [
      { who: t('kpis.staff.marc.name'), avatar: '#8b5cf6', task: t('board.tasks.task3'), time: '13:42 · 18 min', progress: 68, urgent: false },
      { who: t('kpis.staff.julie.name'), avatar: '#ec4899', task: t('board.tasks.task4'), time: '11:30 · 1h22', progress: 84, urgent: false },
    ] },
    { t: t('board.columns.done'), c: '#10b981', cards: [
      { who: t('kpis.staff.sophie.name'), avatar: '#f59e0b', task: t('board.tasks.task5'), time: '✓ 10:48', photos: 12 },
      { who: t('kpis.staff.lucas.name'), avatar: '#06b6d4', task: t('board.tasks.task6'), time: '✓ 11:00', photos: 8 },
      { who: t('kpis.staff.marc.name'), avatar: '#8b5cf6', task: t('board.tasks.task7'), time: '✓ 09:30', photos: 4 },
    ] },
  ];

  return (
    <ScrollPaginationDots itemCount={3} gap={14} peekCarousel>
      {cols.map(col => (
        <div key={col.t} data-carousel-slide style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--glass-border)', borderRadius: 14, padding: 14, flexShrink: 0 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12, padding: '4px 6px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: col.c, boxShadow: `0 0 8px ${col.c}` }} />
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1, color: col.c }}>{col.t}</span>
            </div>
            <span style={{ fontSize: 11, color: 'var(--text-3)', fontFamily: 'Geist Mono' }}>{col.cards.length}</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {col.cards.map((c, i) => (
              <div key={i} style={{ background: 'rgba(255,255,255,0.04)', border: c.urgent ? '1px solid rgba(239,68,68,0.4)' : '1px solid rgba(255,255,255,0.06)', borderRadius: 10, padding: 12, position: 'relative' }}>
                {c.urgent && <span style={{ position: 'absolute', top: 8, right: 8, fontSize: 9, color: '#fca5a5', background: 'rgba(239,68,68,0.15)', padding: '2px 6px', borderRadius: 4, fontWeight: 700, letterSpacing: 0.5 }}>{t('board.urgentLabel')}</span>}
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                  <div style={{ width: 24, height: 24, borderRadius: '50%', background: c.avatar, fontSize: 10, fontWeight: 700, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{c.who[0]}</div>
                  <span style={{ fontSize: 11, color: 'var(--text-2)', fontWeight: 500 }}>{c.who}</span>
                </div>
                <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-1)', marginBottom: 6, lineHeight: 1.3 }}>{c.task}</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 10, color: 'var(--text-3)', fontFamily: 'Geist Mono' }}>
                  <span>{c.time}</span>
                  {c.photos && <span>📷 {c.photos}</span>}
                </div>
                {c.progress !== undefined && (
                  <div style={{ marginTop: 8, height: 3, background: 'rgba(255,255,255,0.08)', borderRadius: 2, overflow: 'hidden' }}>
                    <div style={{ width: `${c.progress}%`, height: '100%', background: 'linear-gradient(90deg, #f4cf5e, #e6b022)' }} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </ScrollPaginationDots>
  );
}

interface StaffMember {
  name: string;
  role: string;
  avatar: string;
  tasks: number;
  rating: string;
  time: string;
  color: string;
}

function StaffKPIs() {
  const t = useTranslations('teamflow');

  const staff: StaffMember[] = [
    { name: t('kpis.staff.sophie.name'), role: t('kpis.staff.sophie.role'), avatar: '#f59e0b', tasks: 47, rating: '4.9★', time: '52 min', color: '#10b981' },
    { name: t('kpis.staff.lucas.name'), role: t('kpis.staff.lucas.role'), avatar: '#06b6d4', tasks: 38, rating: '4.8★', time: '12 min', color: '#10b981' },
    { name: t('kpis.staff.marc.name'), role: t('kpis.staff.marc.role'), avatar: '#8b5cf6', tasks: 22, rating: '4.7★', time: '34 min', color: '#f4cf5e' },
    { name: t('kpis.staff.julie.name'), role: t('kpis.staff.julie.role'), avatar: '#ec4899', tasks: 41, rating: '4.9★', time: '48 min', color: '#10b981' },
  ];

  return (
    <ScrollPaginationDots itemCount={4} gap={12} peekCarousel className="sj-peek-sm">
      {staff.map(s => (
        <div key={s.name} data-carousel-slide className="card" style={{ padding: 18, flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
            <div style={{ width: 36, height: 36, borderRadius: '50%', background: s.avatar, fontSize: 13, fontWeight: 700, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{s.name[0]}</div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600 }}>{s.name}</div>
              <div style={{ fontSize: 11, color: 'var(--text-3)' }}>{s.role}</div>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12 }}>
              <span style={{ color: 'var(--text-3)' }}>{t('kpis.labels.tasks')}</span>
              <span style={{ fontFamily: 'Geist Mono', fontWeight: 600 }}>{s.tasks}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12 }}>
              <span style={{ color: 'var(--text-3)' }}>{t('kpis.labels.rating')}</span>
              <span style={{ color: '#fbbf24', fontWeight: 600 }}>{s.rating}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12 }}>
              <span style={{ color: 'var(--text-3)' }}>{t('kpis.labels.avgTime')}</span>
              <span style={{ fontFamily: 'Geist Mono', fontWeight: 600, color: s.color }}>{s.time}</span>
            </div>
          </div>
        </div>
      ))}
    </ScrollPaginationDots>
  );
}

export default function TeamflowPage() {
  const t = useTranslations('teamflow');

  const capabilities = t.raw('capabilities.items') as Array<{
    icon: string;
    title: string;
    description: string;
  }>;

  const stats = t.raw('stats') as Array<{
    key: string;
    label: string;
  }>;

  const heroTitle = t('hero.title');
  const heroTitleGradient = t('hero.titleGradient');
  const finalCTATitle = t('finalCTA.title');
  const finalCTATitleGradient = t('finalCTA.titleGradient');
  const boardSectionTitle = t('board.sectionTitle');
  const boardSectionTitleGradient = t('board.sectionTitleGradient');

  return (
    <>
      <style jsx>{`
        @media (max-width: 768px) {
          section { padding: 60px 20px !important; }

          div[style*="padding: '20px 32px 80px'"] { padding: 20px 20px 60px !important; }
          div[style*="padding: '40px 32px 80px'"] { padding: 40px 20px 60px !important; }

          div[style*="gridTemplateColumns: 'repeat(3, 1fr)'"] {
            display: flex !important;
            overflow-x: auto !important;
            scroll-snap-type: x mandatory !important;
            -webkit-overflow-scrolling: touch !important;
            gap: 16px !important;
            padding-bottom: 20px !important;
          }

          div[style*="gridTemplateColumns: 'repeat(3, 1fr)'"] > * {
            flex-shrink: 0 !important;
            scroll-snap-align: center !important;
          }

          div[style*="gridTemplateColumns: 'repeat(4, 1fr)'"] {
            display: flex !important;
            overflow-x: auto !important;
            scroll-snap-type: x mandatory !important;
            -webkit-overflow-scrolling: touch !important;
            gap: 12px !important;
            padding-bottom: 20px !important;
          }

          div[style*="gridTemplateColumns: 'repeat(4, 1fr)'"] > * {
            flex-shrink: 0 !important;
            scroll-snap-align: center !important;
          }

          .btn {
            min-height: 44px !important;
            padding: 12px 20px !important;
          }
        }
      `}</style>
      <BackgroundEffects />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <PageHeader pageTitle={t('pageTitle')} />
        <PageHero
          badge={t('hero.badge')}
          title={<>{heroTitle}<br /><span className="gradient-text">{heroTitleGradient}</span></>}
          subtitle={t('hero.subtitle')}
          cta1={t('hero.cta1')}
          cta2={t('hero.cta2')}
        />
        <section style={{ padding: '20px 32px 80px' }}>
          <div style={{ maxWidth: 1280, margin: '0 auto' }}>
            <div className="uppercase-sm" style={{ color: 'var(--text-3)', textAlign: 'center', marginBottom: 14 }}>{t('board.sectionBadge')}</div>
            <div style={{ fontSize: 32, fontWeight: 700, letterSpacing: '-0.02em', textAlign: 'center', maxWidth: 720, margin: '0 auto 32px' }}>
              {boardSectionTitle} <span className="gradient-text">{boardSectionTitleGradient}</span>
            </div>
            <StaffBoard />
          </div>
        </section>
        <section style={{ padding: '40px 32px 80px', borderTop: '1px solid var(--glass-border)' }}>
          <div style={{ maxWidth: 1280, margin: '0 auto' }}>
            <div className="uppercase-sm" style={{ color: 'var(--text-3)', marginBottom: 12 }}>{t('kpis.sectionBadge')}</div>
            <div style={{ fontSize: 32, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 32, maxWidth: 700 }}>
              {t('kpis.sectionTitle')} <span style={{ color: 'var(--text-3)' }}>{t('kpis.sectionSubtitle')}</span>
            </div>
            <StaffKPIs />
          </div>
        </section>
        <section style={{ padding: '40px 32px 80px', borderTop: '1px solid var(--glass-border)' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div className="uppercase-sm" style={{ color: 'var(--text-3)', marginBottom: 12 }}>{t('capabilities.sectionBadge')}</div>
            <div style={{ fontSize: 32, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 32, maxWidth: 700 }}>{t('capabilities.sectionTitle')}</div>
            <ScrollPaginationDots itemCount={capabilities.length} gap={14} peekCarousel>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 16 }}>
                {capabilities.map(c => (
                  <div key={c.title} data-carousel-slide className="card" style={{ padding: 22 }}>
                    <div style={{ fontSize: 28, marginBottom: 10 }}>{c.icon}</div>
                    <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 4 }}>{c.title}</div>
                    <div style={{ fontSize: 13, color: 'var(--text-3)', lineHeight: 1.55 }}>{c.description}</div>
                  </div>
                ))}
              </div>
            </ScrollPaginationDots>
          </div>
        </section>
        <StatsBar stats={stats.map(s => ({ k: s.key, l: s.label }))} />
        <FinalCTA
          title={<>{finalCTATitle} <span className="gradient-text">{finalCTATitleGradient}</span></>}
          subtitle={t('finalCTA.subtitle')}
        />
        <PageFooter />
      </div>
    </>
  );
}
