'use client';

import { Metadata } from 'next';
import { BackgroundEffects } from '@/components/BackgroundEffects';
import { PageHeader, PageFooter, PageHero, StatsBar, FinalCTA } from '@/components/SharedComponents';

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
  const cols: Column[] = [
    { t: 'À FAIRE', c: '#94a3b8', cards: [
      { who: 'Yasmine', avatar: '#f59e0b', task: 'Ménage Riad El Fenn', time: '14:00', urgent: false },
      { who: 'Hassan', avatar: '#06b6d4', task: 'Check-in Marco · Dar Sojori', time: '17:30', urgent: true },
    ] },
    { t: 'EN COURS', c: '#f4cf5e', cards: [
      { who: 'Mehdi', avatar: '#8b5cf6', task: 'Maintenance AC · Villa Atlas', time: '13:42 · 18 min', progress: 68, urgent: false },
      { who: 'Fatima', avatar: '#ec4899', task: 'Ménage Atlas Loft', time: '11:30 · 1h22', progress: 84, urgent: false },
    ] },
    { t: 'TERMINÉ', c: '#10b981', cards: [
      { who: 'Yasmine', avatar: '#f59e0b', task: 'Ménage Médina House', time: '✓ 10:48', photos: 12 },
      { who: 'Hassan', avatar: '#06b6d4', task: 'Check-out James P.', time: '✓ 11:00', photos: 8 },
      { who: 'Mehdi', avatar: '#8b5cf6', task: 'Course produits · Riad', time: '✓ 09:30', photos: 4 },
    ] },
  ];
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
      {cols.map(col => (
        <div key={col.t} style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--glass-border)', borderRadius: 14, padding: 14 }}>
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
                {c.urgent && <span style={{ position: 'absolute', top: 8, right: 8, fontSize: 9, color: '#fca5a5', background: 'rgba(239,68,68,0.15)', padding: '2px 6px', borderRadius: 4, fontWeight: 700, letterSpacing: 0.5 }}>URGENT</span>}
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
    </div>
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
  const staff: StaffMember[] = [
    { name: 'Yasmine', role: 'Ménage', avatar: '#f59e0b', tasks: 47, rating: '4.9★', time: '52 min', color: '#10b981' },
    { name: 'Hassan', role: 'Check-in', avatar: '#06b6d4', tasks: 38, rating: '4.8★', time: '12 min', color: '#10b981' },
    { name: 'Mehdi', role: 'Maintenance', avatar: '#8b5cf6', tasks: 22, rating: '4.7★', time: '34 min', color: '#f4cf5e' },
    { name: 'Fatima', role: 'Ménage', avatar: '#ec4899', tasks: 41, rating: '4.9★', time: '48 min', color: '#10b981' },
  ];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
      {staff.map(s => (
        <div key={s.name} className="card" style={{ padding: 18 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
            <div style={{ width: 36, height: 36, borderRadius: '50%', background: s.avatar, fontSize: 13, fontWeight: 700, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{s.name[0]}</div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600 }}>{s.name}</div>
              <div style={{ fontSize: 11, color: 'var(--text-3)' }}>{s.role}</div>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12 }}>
              <span style={{ color: 'var(--text-3)' }}>Tâches</span>
              <span style={{ fontFamily: 'Geist Mono', fontWeight: 600 }}>{s.tasks}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12 }}>
              <span style={{ color: 'var(--text-3)' }}>Note</span>
              <span style={{ color: '#fbbf24', fontWeight: 600 }}>{s.rating}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12 }}>
              <span style={{ color: 'var(--text-3)' }}>Temps moyen</span>
              <span style={{ fontFamily: 'Geist Mono', fontWeight: 600, color: s.color }}>{s.time}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

interface Capability {
  i: string;
  t: string;
  d: string;
}

export default function TeamflowPage() {
  const capabilities: Capability[] = [
    { i: '⚡', t: 'Assignation auto', d: 'Algo qui croise dispo + géoloc + skill. Tâche assignée en <2 sec.' },
    { i: '📲', t: 'WhatsApp natif', d: "Pas d'app à installer. Tâches reçues sur WhatsApp + photos retournées." },
    { i: '📷', t: 'Photos pré/post', d: 'Avant/après chaque ménage. Archive auto. Litiges réglés en 30 sec.' },
    { i: '📍', t: 'GPS check-in', d: 'Le staff valide sa présence sur place. Anti-fraude, anti-no-show.' },
    { i: '⏱️', t: 'Tracking temps réel', d: 'Durée de chaque tâche. Comparable. Optimisable. Sans micro-management.' },
    { i: '⭐', t: 'Notes voyageurs', d: 'Mappées au membre qui a fait le ménage. Bonus performance.' },
  ];

  return (
    <>
      <BackgroundEffects />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <PageHeader pageTitle="TeamFlow" />
        <PageHero
          badge="👥 TeamFlow · Staff Management"
          title={<>Votre équipe terrain.<br /><span className="gradient-text">Orchestrée. Pas dirigée.</span></>}
          subtitle="Assignation auto selon disponibilité et géolocalisation. Notifications WhatsApp + in-app. Photos check pré/post intervention. Tracking temps réel et KPIs par membre."
          cta1="Voir la démo" cta2="Inviter mon équipe"
        />
        <section style={{ padding: '20px 32px 80px' }}>
          <div style={{ maxWidth: 1280, margin: '0 auto' }}>
            <div className="uppercase-sm" style={{ color: 'var(--text-3)', textAlign: 'center', marginBottom: 14 }}>● Board Kanban temps réel</div>
            <div style={{ fontSize: 32, fontWeight: 700, letterSpacing: '-0.02em', textAlign: 'center', maxWidth: 720, margin: '0 auto 32px' }}>Qui fait quoi. <span className="gradient-text">Maintenant.</span></div>
            <StaffBoard />
          </div>
        </section>
        <section style={{ padding: '40px 32px 80px', borderTop: '1px solid var(--glass-border)' }}>
          <div style={{ maxWidth: 1280, margin: '0 auto' }}>
            <div className="uppercase-sm" style={{ color: 'var(--text-3)', marginBottom: 12 }}>● KPIs par membre</div>
            <div style={{ fontSize: 32, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 32, maxWidth: 700 }}>Performance individuelle. <span style={{ color: 'var(--text-3)' }}>Mesurée, pas devinée.</span></div>
            <StaffKPIs />
          </div>
        </section>
        <section style={{ padding: '40px 32px 80px', borderTop: '1px solid var(--glass-border)' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div className="uppercase-sm" style={{ color: 'var(--text-3)', marginBottom: 12 }}>● Capacités</div>
            <div style={{ fontSize: 32, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 32, maxWidth: 700 }}>Tout ce dont une équipe terrain a besoin.</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
              {capabilities.map(c => (
                <div key={c.t} className="card" style={{ padding: 22 }}>
                  <div style={{ fontSize: 28, marginBottom: 10 }}>{c.i}</div>
                  <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 4 }}>{c.t}</div>
                  <div style={{ fontSize: 13, color: 'var(--text-3)', lineHeight: 1.55 }}>{c.d}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
        <StatsBar stats={[{k:'<2 sec',l:'Assignation auto'},{k:'WhatsApp',l:'Aucune app à installer'},{k:'100%',l:'Photos archivées'},{k:'4.87★',l:'Note staff moyenne'}]} />
        <FinalCTA title={<>Invitez votre équipe. <span className="gradient-text">En 60 secondes.</span></>} subtitle="Un SMS, ils acceptent, ils sont opérationnels. Pas d'app, pas de formation." />
        <PageFooter />
      </div>
    </>
  );
}
