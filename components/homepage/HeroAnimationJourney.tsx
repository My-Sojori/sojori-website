"use client";

import { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { useLocale } from 'next-intl';
import { SojoriMark } from '../Logo';
import { JourneyCard } from '../journey/JourneyCard';
import { ScrollPaginationDots } from '@/components/shared/ScrollPaginationDots';
import { type Phase, type JourneyEvent, type Lane, resolveEvent } from '@/lib/journey-data';
import { getHeroAnimUi } from '@/lib/hero-anim-ui';
import { getJourneyForLocale } from '@/lib/journey-for-locale';

/** Durée d'un cycle timeline (plus grand = cartes qui apparaissent plus lentement). */
const LOOP_DURATION = 43; // seconds - réduit pour animation plus rapide

/** Acte 1 — canaux + carte réservation (réduit pour arriver vite à l'animation 3). */
const PHASE_INCOMING_END = 0.06;
/** Fin acte 2 — après quoi le graphe / lanes (acte 3) démarre (réduit de 3 secondes). */
const PHASE_INGEST_END = 0.09;
/** Au début du timeline (0–1), montrer immédiatement toutes les cartes (animations 1 et 2 ont déjà introduit la réservation). */
const TIMELINE_BOOKING_INTRO_END = 0.0;

// ─── Timeline scrubber ─────────────────────────────────────────
function TimelineBar({
  progress,
  phases,
  focusPhase,
  onPhaseClick,
  rangeDir,
}: {
  progress: number;
  phases: Phase[];
  focusPhase: string | null;
  onPhaseClick: (phase: Phase) => void;
  rangeDir?: 'ltr';
}) {
  return (
    <div className="hero-timeline-bar" style={{ position: 'relative', width: '100%', userSelect: 'none' }}>
      {/* Phase ticks — split boxes (mobile: typo réduite, pas de débordement) */}
      <div className="hero-timeline-phases" style={{ display: 'flex', gap: 4, marginBottom: 10, minHeight: 42, alignItems: 'stretch', position: 'relative' }}>
        {phases.map((p) => {
          const isActive = progress >= p.from && progress < p.to;
          const isPast = progress >= p.to;
          const isFocused = focusPhase === p.id;
          return (
            <button
              type="button"
              key={p.id}
              className="hero-timeline-phase-btn"
              onClick={() => onPhaseClick(p)}
              style={{
                flex: '1 1 0',
                minWidth: 0,
                width: 0,
                background: isFocused
                  ? 'linear-gradient(180deg, rgba(230,176,34,0.32), rgba(230,176,34,0.18))'
                  : isActive
                    ? 'linear-gradient(180deg, rgba(230,176,34,0.22), rgba(230,176,34,0.10))'
                    : isPast
                      ? 'rgba(230,176,34,0.10)'
                      : 'rgba(26,20,8,0.04)',
                border: `1px solid ${isFocused ? 'rgba(230,176,34,0.7)' : isActive ? 'rgba(230,176,34,0.45)' : 'rgba(26,20,8,0.08)'}`,
                borderRadius: 8,
                color: isActive || isFocused ? 'var(--text)' : 'var(--text-3)',
                fontFamily: 'inherit',
                fontSize: 8.75,
                fontWeight: 600,
                letterSpacing: 0.22,
                textTransform: 'uppercase',
                padding: '3px 6px',
                cursor: 'pointer',
                transition: 'all 0.25s ease',
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                gap: 2,
                lineHeight: 1.12,
                overflow: 'hidden',
                boxSizing: 'border-box',
              }}
            >
              <span className="hero-timeline-label" style={{ textAlign: 'center', width: '100%' }}>{p.label}</span>
              <span
                className="mono hero-timeline-range"
                dir={rangeDir}
                style={{ textAlign: 'center', width: '100%' }}
              >
                {p.range}
              </span>
            </button>
          );
        })}
      </div>

      {/* Bar track */}
      <div style={{
        position: 'relative',
        height: 6,
        borderRadius: 3,
        background: 'rgba(26,20,8,0.05)',
        border: '1px solid rgba(26,20,8,0.06)',
        overflow: 'hidden',
      }}>
        {/* Fill */}
        <div style={{
          position: 'absolute', inset: 0, width: `${progress * 100}%`,
          background: 'linear-gradient(90deg, #f59e0b 0%, #f9be25 50%, #8b5cf6 100%)',
          boxShadow: '0 0 16px rgba(245,158,11,0.3)',
          borderRadius: 3,
        }} />
        {/* Glow head */}
        <div style={{
          position: 'absolute', top: -4, width: 14, height: 14,
          left: `calc(${progress * 100}% - 7px)`,
          borderRadius: '50%',
          background: '#e6b022',
          boxShadow: '0 0 16px #f59e0b, 0 0 32px #f9be25',
        }} />
      </div>
    </div>
  );
}

// ─── Sojori core (central pulsing node) ─────────────────────────
function SojoriCore({
  progress,
  activeCount,
  activeEventsWord,
  coreTitle,
  monoDir,
}: {
  progress: number;
  activeCount: number;
  activeEventsWord: string;
  coreTitle: string;
  /** Force LTR for counts in RTL locales (e.g. ar). */
  monoDir?: 'ltr';
}) {
  return (
    <div className="hero-sojori-core" style={{
      position: 'relative',
      display: 'inline-flex', alignItems: 'center', gap: 12,
      padding: '8px 14px 8px 8px',
      borderRadius: 999,
      background: 'rgba(230,176,34,0.10)',
      border: '1px solid rgba(230,176,34,0.35)',
      boxShadow: '0 0 24px rgba(230,176,34,0.15), 0 0 0 1px rgba(230,176,34,0.15) inset',
    }}>
      <div className="hero-sojori-core-orb" style={{ position: 'relative', width: 32, height: 32 }}>
        {/* Orbiting ring */}
        <svg width="32" height="32" style={{ position: 'absolute', inset: 0, animation: 'orbit 8s linear infinite' }}>
          <circle cx="16" cy="16" r="13" fill="none" stroke="url(#core-grad)" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.7" />
          <defs>
            <linearGradient id="core-grad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#e6b022" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </linearGradient>
          </defs>
        </svg>
        {/* Core dot */}
        <div style={{
          position: 'absolute', inset: 6,
          borderRadius: '50%',
          background: 'radial-gradient(circle, #fff5e6 0%, #e6b022 60%, #d97706 100%)',
          animation: 'core-breathe 2s ease-in-out infinite',
          boxShadow: '0 0 18px rgba(230,176,34,0.4)',
        }} />
      </div>
      <div className="hero-sojori-core-text" style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.1, whiteSpace: 'nowrap', minWidth: 0 }}>
        <span className="hero-sojori-core-title" style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.5, color: 'var(--text)' }}>{coreTitle}</span>
        <span
          className="mono"
          dir={monoDir}
          style={{ fontSize: 9.5, color: 'var(--text-3)', letterSpacing: 0.6 }}
        >
          {activeCount} {activeEventsWord} · {Math.round(progress * 100)}%
        </span>
      </div>
    </div>
  );
}

// ─── Scrollable lane row (accumulation + scroll vers la carte la plus récente) ──────────
function ScrollableLane({ visibleEvents, progress, hoveredId, setHoveredId, focusPhase }: {
  visibleEvents: JourneyEvent[];
  progress: number;
  hoveredId: string | null;
  setHoveredId: (id: string | null) => void;
  focusPhase: string | null;
}) {
  const LANE_CARD_GAP = 8;
  const CARD_WIDTH = 250;

  const laneScrollRef = useRef<HTMLDivElement>(null);
  const prevCardCountRef = useRef(0);

  // Toutes les cartes qui ont déjà apparu
  const appearedCards = visibleEvents.filter(e => progress >= e.t);
  const lastCardId = appearedCards[appearedCards.length - 1]?.id ?? '';

  /* Garder la dernière carte dans la zone visible : les précédentes reculent à gauche */
  useLayoutEffect(() => {
    const root = laneScrollRef.current;
    if (!root) return;

    if (appearedCards.length === 0) {
      root.scrollLeft = 0;
      prevCardCountRef.current = 0;
      return;
    }

    const maxScroll = Math.max(0, root.scrollWidth - root.clientWidth);
    if (maxScroll <= 0) {
      prevCardCountRef.current = appearedCards.length;
      return;
    }

    const added = appearedCards.length > prevCardCountRef.current;
    prevCardCountRef.current = appearedCards.length;

    const run = () => {
      const el = laneScrollRef.current;
      if (!el) return;
      const end = Math.max(0, el.scrollWidth - el.clientWidth);
      const safeId = typeof CSS !== 'undefined' && typeof CSS.escape === 'function' ? CSS.escape(lastCardId) : lastCardId;
      const lastEl = el.querySelector(`[data-event-id="${safeId}"]`) as HTMLElement | null;
      if (lastEl) {
        // Use scrollLeft instead of scrollIntoView to avoid affecting page scroll
        const scrollLeft = lastEl.offsetLeft - (el.clientWidth - lastEl.offsetWidth);
        el.scrollTo({ left: Math.max(0, scrollLeft), behavior: added ? 'smooth' : 'auto' });
        return;
      }
      el.scrollTo({ left: end, behavior: added ? 'smooth' : 'auto' });
    };

    /* Double frame : la carte vient d'entrer, scrollWidth à jour après layout + scale */
    requestAnimationFrame(() => requestAnimationFrame(run));
  }, [appearedCards.length, lastCardId]);

  const showEdgeFade = appearedCards.length > 1;

  return (
    <div className="hero-lane-cards" style={{ position: 'relative', marginLeft: 72, flex: 1, minWidth: 0, overflow: 'hidden', height: 68 }}>
      <ScrollPaginationDots
        itemCount={appearedCards.length}
        itemWidth={CARD_WIDTH}
        gap={LANE_CARD_GAP}
      >
        <div
          ref={laneScrollRef}
          className="lane-scroll"
          style={{
            display: 'flex',
            alignItems: 'center',
            height: 68,
            padding: '4px 4px',
            position: 'relative',
            width: '100%',
            maxWidth: '100%',
            overflowX: 'auto',
            overscrollBehaviorX: 'contain',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          <div
            className="lane-scroll-scaled"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: LANE_CARD_GAP,
              height: '100%',
              transform: 'scale(0.85)',
              transformOrigin: 'left center',
            }}
          >
          {appearedCards.map((e) => {
            const age = progress - e.t;
            const isNew = age < 0.018;

            return (
              <div
                key={e.id}
                data-event-id={e.id}
                style={{
                  flexShrink: 0,
                  opacity: isNew ? 0 : 1,
                  transform: isNew ? 'scale(0.8) translateY(10px)' : 'scale(1) translateY(0)',
                  transition: 'opacity 0.5s ease-out, transform 0.5s cubic-bezier(.34,1.56,.64,1)',
                }}
              >
                <JourneyCard
                  event={e}
                  progress={progress}
                  onHover={setHoveredId}
                  hovered={hoveredId === e.id}
                  focused={focusPhase === e.phase}
                />
              </div>
            );
          })}
          </div>
        </div>
      </ScrollPaginationDots>
      {/* fade hint on left edge */}
      <div style={{
        position: 'absolute', left: 0, top: 0, bottom: 0, width: 40,
        background: 'linear-gradient(90deg, rgba(251,250,246,0.95), transparent)',
        pointerEvents: 'none', zIndex: 1,
        opacity: showEdgeFade ? 1 : 0,
        transition: 'opacity 0.5s',
      }} />
    </div>
  );
}

// ─── Lane row with cards ───────────────────────────────────────
function Lane({ lane, events, progress, hoveredId, setHoveredId, focusPhase, timelineBookingIntroActive }: {
  lane: Lane;
  events: JourneyEvent[];
  progress: number;
  hoveredId: string | null;
  setHoveredId: (id: string | null) => void;
  focusPhase: string | null;
  /** Acte 3 : au lancement du graphe, seule la carte « Réservation Airbnb » (id booking) est visible quelques secondes. */
  timelineBookingIntroActive: boolean;
}) {
  const visibleEvents = events
    .filter(e => e.lane === lane.id && progress >= e.t)
    .filter(e => !timelineBookingIntroActive || e.id === 'booking')
    .sort((a, b) => a.t - b.t);

  // Check if there are active admin alerts (late status, admin type)
  const hasActiveAlert = lane.id === 3 && visibleEvents.some(e => {
    if (e.type !== 'admin') return false;
    const state = resolveEvent(e, progress);
    const age = progress - e.t;
    return state.status === 'late' && age < 0.08; // Alert active for 8% of timeline (~3.5 seconds at 44s total)
  });

  return (
    <div className="hero-journey-lane" style={{
      position: 'relative',
      height: 78,
      display: 'flex',
      alignItems: 'center',
      padding: '8px 0',
      marginBottom: 0,
      borderRadius: 8,
      background: hasActiveAlert ? 'rgba(239,68,68,0.08)' : 'transparent',
      borderLeft: hasActiveAlert ? '3px solid rgba(239,68,68,0.5)' : '3px solid transparent',
      paddingLeft: '4px',
      transition: 'background 0.4s ease, border-left 0.4s ease',
    }}>
      {/* Lane label */}
      <div className="hero-journey-lane-label" style={{
        position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)',
        width: 58, paddingRight: 6,
        zIndex: 2,
      }}>
        <div className="hero-lane-label-title" style={{
          fontSize: 8.5, fontWeight: 700, letterSpacing: 0.9,
          color: lane.color, marginBottom: 1,
          textShadow: `0 0 12px ${lane.color}33`,
          lineHeight: 1.05,
        }}>{lane.label}</div>
        <div className="hero-lane-label-sub" style={{ fontSize: 8, color: 'var(--text-3)', lineHeight: 1.15 }}>{lane.sublabel}</div>
        <div style={{
          width: 22, height: 2, marginTop: 5, borderRadius: 1,
          background: lane.color, boxShadow: `0 0 8px ${lane.color}66`,
        }} />
      </div>

      {/* Lane track line */}
      <div className="hero-journey-lane-track" style={{
        position: 'absolute', left: 72, right: 0, top: '50%',
        height: 1,
        background: `linear-gradient(90deg, transparent 0%, ${lane.color}40 8%, ${lane.color}40 92%, transparent 100%)`,
        opacity: 0.5,
      }} />

      {/* Cards row — scrollable horizontally */}
      <ScrollableLane visibleEvents={visibleEvents} progress={progress} hoveredId={hoveredId} setHoveredId={setHoveredId} focusPhase={focusPhase} />
    </div>
  );
}

// ─── Hero Animation Journey (light theme) ──────────────────────
export function HeroAnimationJourney() {
  const locale = useLocale();
  const ui = getHeroAnimUi(locale);
  const { phases, lanes, events } = getJourneyForLocale(locale);

  const [progress, setProgress] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [focusPhase, setFocusPhase] = useState<string | null>(null);
  const rafRef = useRef<number | null>(null);

  // Animation loop
  useEffect(() => {
    if (!playing) return;
    let last = performance.now();
    const loop = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;
      setProgress(p => {
        const next = p + (dt / LOOP_DURATION);
        return next >= 1 ? 0 : next;
      });
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [playing]);

  const onPhaseClick = (phase: Phase) => {
    if (focusPhase === phase.id) {
      setFocusPhase(null);
    } else {
      setFocusPhase(phase.id);
      setProgress(phase.from + 0.005);
    }
  };

  const restart = () => { setProgress(0); setPlaying(true); setFocusPhase(null); };

  // Phase detection for 3-act animation
  const phase = progress < PHASE_INCOMING_END ? 'incoming' : progress < PHASE_INGEST_END ? 'ingest' : 'timeline';
  const incomingProg = progress < PHASE_INCOMING_END ? progress / PHASE_INCOMING_END : 1;
  const ingestSpan = PHASE_INGEST_END - PHASE_INCOMING_END;
  const ingestProg = phase === 'ingest' ? (progress - PHASE_INCOMING_END) / ingestSpan : (phase === 'timeline' ? 1 : 0);
  const timelineSpan = 1 - PHASE_INGEST_END;
  const timelineProg = phase === 'timeline' ? (progress - PHASE_INGEST_END) / timelineSpan : 0;
  const timelineBookingIntroActive = phase === 'timeline' && timelineProg < TIMELINE_BOOKING_INTRO_END;



  const activeCount = events.filter((e) => {
    if (timelineBookingIntroActive && e.id !== 'booking') return false;
    return timelineProg >= e.t && timelineProg < e.t + 0.15;
  }).length;
  const currentPhase = phases.find(p => timelineProg >= p.from && timelineProg < p.to) || phases[phases.length - 1];

  return (
    <div
      className="hero-animation-wrapper"
      style={{
        position: 'relative',
        padding: '18px 20px 16px',
        borderRadius: 20,
        background: 'linear-gradient(180deg, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.65) 100%)',
        backdropFilter: 'blur(20px) saturate(150%)',
        WebkitBackdropFilter: 'blur(20px) saturate(150%)',
        border: '1px solid rgba(26,20,8,0.10)',
        boxShadow: '0 1px 0 rgba(255,255,255,0.9) inset, 0 30px 80px -16px rgba(26,20,8,0.12)',
        overflow: 'hidden',
        minHeight: 380,
      }}
    >
      {/* corner glows (light) */}
      <div style={{ position: 'absolute', top: -120, left: -120, width: 280, height: 280, borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(230,176,34,0.20), transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: -120, right: -120, width: 280, height: 280, borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(139,92,246,0.16), transparent 70%)', pointerEvents: 'none' }} />

      {/* Top stage row: core + current phase */}
      <div className="hero-stage-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18, position: 'relative', zIndex: 2 }}>
        <SojoriCore
          progress={phase === 'timeline' ? timelineProg : 0}
          activeCount={activeCount}
          activeEventsWord={ui.sojoriCoreActiveWord}
          coreTitle={ui.coreTitle}
          monoDir={locale === 'ar' ? 'ltr' : undefined}
        />
        <div className="hero-stage-meta" style={{ display: 'flex', alignItems: 'center', gap: 14, minWidth: 0, flex: '1 1 auto', justifyContent: 'flex-end' }}>
          <div className="hero-stage-meta-inner" style={{ textAlign: 'right', minWidth: 0 }}>
            <div
              className="mono hero-stage-meta-kicker"
              dir={locale === 'ar' ? 'ltr' : undefined}
              style={{ fontSize: 9.5, letterSpacing: 1.4, color: 'var(--text-3)' }}
            >
              {phase === 'incoming' ? ui.stageIncoming : phase === 'ingest' ? ui.stageIngest : ui.stageTimeline}
            </div>
            <div className="hero-stage-meta-title" style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)', letterSpacing: -0.2 }}>
              {phase === 'timeline' && timelineBookingIntroActive
                ? ui.badgeNewBooking
                : phase === 'timeline'
                  ? `${currentPhase.label} · ${currentPhase.range}`
                  : phase === 'incoming'
                    ? ui.headerIncoming
                    : ui.headerIngest}
            </div>
            {phase === 'timeline' && timelineBookingIntroActive && (
              <div
                className="hero-stage-meta-kickoff"
                style={{
                  fontSize: 11,
                  fontWeight: 500,
                  color: 'var(--text-3)',
                  marginTop: 6,
                  lineHeight: 1.35,
                  maxWidth: 420,
                  marginLeft: 'auto',
                  textAlign: 'right',
                }}
              >
                {ui.timelineKickoffLine}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ACT 1 — INCOMING BOOKING */}
      {phase === 'incoming' && (() => {
        const channels = [
          { id: 'airbnb',  name: 'Airbnb',  color: '#ff5a5f', mark: 'A', activeAt: 0.06 },
          { id: 'booking', name: 'Booking', color: '#0066ff', mark: 'B', activeAt: 0.95 },
          { id: 'vrbo',    name: 'Vrbo',    color: '#0d6df0', mark: 'V', activeAt: 0.95 },
          { id: 'direct',  name: ui.channelDirect,  color: '#10b981', mark: 'D', activeAt: 0.95 },
        ];
        return (
          <div
            className="hero-incoming-stage"
            style={{
              position: 'relative',
              height: 330,
              zIndex: 2,
              overflow: 'hidden',
              display: 'grid',
              gridTemplateColumns: '180px 1fr',
              gap: 24,
              alignItems: 'center',
              padding: '8px 4px',
            }}
          >
            {/* LEFT — OTA channels listening */}
            <div className="hero-incoming-sidebar" style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div className="mono hero-incoming-channels-title" style={{ fontSize: 9.5, color: 'var(--text-3)',
                    letterSpacing: 1.2, marginBottom: 2 }}>{ui.channelsLive}</div>
              <div className="hero-incoming-channel-grid">
              {channels.map(c => {
                const active = incomingProg >= c.activeAt;
                const justFired = c.id === 'airbnb' && incomingProg > 0.04 && incomingProg < 0.45;
                const channelMonoDir = locale === 'ar' ? 'ltr' : undefined;
                return (
                  <div key={c.id} style={{
                    display: 'flex', alignItems: 'center', gap: 10,
                    padding: '8px 12px', borderRadius: 10,
                    background: active ? `${c.color}28` : `${c.color}0d`,
                    border: `1px solid ${active ? c.color + '66' : c.color + '33'}`,
                    transition: 'all 0.4s ease',
                    transform: justFired ? 'scale(1.04)' : 'scale(1)',
                    boxShadow: justFired ? `0 0 18px ${c.color}66` : 'none',
                  }}>
                    <div style={{ width: 26, height: 26, borderRadius: 7,
                      background: active ? c.color : `${c.color}4d`,
                      color: '#fff',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 11, fontWeight: 800 }}>{c.mark}</div>
                    <div style={{ flex: 1, lineHeight: 1.1 }}>
                      <div style={{ fontSize: 12, fontWeight: 600,
                        color: active ? '#fff' : 'var(--text)' }}>{c.name}</div>
                      <div
                        className="mono"
                        dir={channelMonoDir}
                        style={{ fontSize: 9, color: 'var(--text-3)', letterSpacing: 0.3 }}
                      >
                        {active ? ui.webhookOk : ui.webhookIdle}
                      </div>
                    </div>
                    <div style={{ width: 6, height: 6, borderRadius: 3,
                      background: active ? c.color : `${c.color}80`,
                      boxShadow: active ? `0 0 8px ${c.color}` : 'none',
                      animation: justFired ? 'pulse-soft 0.6s ease-in-out infinite' : 'none' }}/>
                  </div>
                );
              })}
              </div>
            </div>

            {/* Mobile : entre canaux et carte (évite l’effet « dessin par-dessus ») */}
            <div className="hero-incoming-mobile-bridge mono">{ui.incomingMobileBridge}</div>

            {/* RIGHT — incoming reservation card */}
            <div className="hero-incoming-main" style={{ position: 'relative', minHeight: 320,
              display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {/* Connector dot from channels to card (desktop) */}
              <svg className="hero-incoming-connector" style={{ position: 'absolute', left: -24, top: '50%', width: 60, height: 2,
                transform: 'translateY(-50%)', overflow: 'visible' }}>
                <line x1="0" y1="1" x2="60" y2="1" stroke="#ff5a5f" strokeWidth="2"
                  strokeDasharray="4 4"
                  style={{ opacity: incomingProg > 0.08 ? 1 : 0, transition: 'opacity 0.3s' }}/>
                <circle r="3" fill="#ff5a5f" style={{ filter: 'drop-shadow(0 0 4px #ff5a5f)' }}>
                  <animate attributeName="cx" from="0" to="60" dur="0.9s" repeatCount="indefinite"/>
                </circle>
              </svg>

              {/* Property header */}
              <div
                className="hero-incoming-property"
                dir={locale === 'ar' ? 'rtl' : undefined}
                style={{ position: 'absolute', top: 8, left: 0, right: 0,
                display: 'flex', alignItems: 'center', gap: 10,
                opacity: incomingProg > 0.03 ? 1 : 0, transition: 'opacity 0.4s' }}
              >
                <div style={{ width: 56, height: 40, borderRadius: 8,
                  background: 'linear-gradient(135deg, #fde68a, #d97706, #7c2d12)',
                  position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '60%',
                    background: 'linear-gradient(180deg, transparent, rgba(0,0,0,0.4))' }}/>
                  <div style={{ position: 'absolute', bottom: 4, left: 6, fontSize: 9,
                    color: '#fff', fontWeight: 700 }}>★ 4.92</div>
                </div>
                <div>
                  <div className="hero-incoming-property-title" style={{ fontSize: 13, fontWeight: 700 }}>{ui.demoPropertyName}</div>
                  <div
                    className="mono"
                    dir={locale === 'ar' ? 'rtl' : 'ltr'}
                    style={{ fontSize: 9.5, color: 'var(--text-3)', letterSpacing: 0.4 }}
                  >
                    {ui.demoPropertyTagline}
                  </div>
                </div>
              </div>

              {/* Booking card — slides up */}
              <div
                className="hero-incoming-card-shell"
                style={{
                transform: `translateY(${incomingProg > 0.1 ? 0 : 28}px) scale(${incomingProg > 0.1 ? 1 : 0.94})`,
                opacity: incomingProg > 0.1 ? 1 : 0,
                transition: 'all 0.5s cubic-bezier(.2,.7,.3,1)',
                width: '100%', maxWidth: 420,
              }}
              >
                <div className="glass hero-incoming-card" style={{ padding: '18px 20px', borderRadius: 16,
                  border: '1px solid rgba(230,176,34,0.35)',
                  boxShadow: '0 12px 40px rgba(230,176,34,0.15)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6,
                      padding: '3px 8px', borderRadius: 99,
                      background: 'rgba(255,90,95,0.15)',
                      border: '1px solid rgba(255,90,95,0.35)',
                      fontSize: 9.5, color: '#ff5a5f', fontWeight: 700,
                      letterSpacing: 0.6, textTransform: 'uppercase' }}>
                      <span style={{ width: 5, height: 5, borderRadius: 3, background: '#ff5a5f',
                        animation: 'pulse-soft 0.8s ease-in-out infinite' }}/>
                      {ui.badgeNewBooking}
                    </span>
                    <span className="mono" style={{ marginLeft: 'auto', fontSize: 9,
                      color: 'var(--text-3)' }}>{ui.timeAgo}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 38, height: 38, borderRadius: 19,
                      background: 'linear-gradient(135deg, #ff5a5f, #fc8181)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 13, fontWeight: 700, color: '#fff' }}>SJ</div>
                    <div style={{ flex: 1, lineHeight: 1.2 }}>
                      <div dir={locale === 'ar' ? 'ltr' : undefined} className="hero-incoming-guest-title" style={{ fontWeight: 600, fontSize: 14 }}>
                        {ui.demoGuestName}{' '}
                        <span style={{ fontSize: 11, color: 'var(--text-3)', fontWeight: 500 }}>
                          {ui.demoGuestOrigin}
                        </span>
                      </div>
                      <div
                        className="mono"
                        dir={locale === 'ar' ? 'ltr' : undefined}
                        style={{ fontSize: 10, color: 'var(--text-3)', letterSpacing: 0.4, marginTop: 2 }}
                      >
                        {locale === 'fr' ? (
                          <>EN · 1<sup>er</sup> séjour · vérifiée</>
                        ) : (
                          ui.guestMetaPlain
                        )}
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div
                        className="mono"
                        dir={locale === 'ar' ? 'ltr' : undefined}
                        style={{ fontSize: 15, fontWeight: 700, color: 'var(--primary)' }}
                      >
                        {ui.demoTotalPrice}
                      </div>
                      <div
                        className="mono"
                        dir={locale === 'ar' ? 'ltr' : undefined}
                        style={{ fontSize: 9, color: 'var(--text-3)' }}
                      >
                        {ui.nightsLabel}
                      </div>
                    </div>
                  </div>
                  <div
                    dir={locale === 'ar' ? 'ltr' : undefined}
                    style={{
                      display: 'flex',
                      gap: 10,
                      fontSize: 10.5,
                      color: 'var(--text-2)',
                      marginTop: 12,
                      paddingTop: 12,
                      borderTop: '1px dashed rgba(255,255,255,0.08)',
                      justifyContent: 'space-between',
                    }}
                  >
                    <span>{ui.footerDate}</span>
                    <span>{ui.footerGuests}</span>
                    <span style={{ color: 'var(--primary)' }}>{ui.footerConfirmed}</span>
                  </div>
                </div>
                <div style={{ marginTop: 12, textAlign: 'center', fontSize: 11,
                  fontFamily: 'var(--mono)', color: 'var(--primary)', letterSpacing: 0.4,
                  opacity: incomingProg > 0.6 ? 1 : 0, transition: 'opacity 0.4s' }}>
                  {ui.handoff}
                </div>
              </div>
            </div>
          </div>
        );
      })()}

      {/* ACT 2 — INGEST */}
      {phase === 'ingest' && (
        <div className="hero-ingest-stage" style={{ position: 'relative', height: 330, zIndex: 2,
          display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {/* Booking card shrinks + blurs into the core */}
          <div style={{
            position: 'absolute', left: '50%', top: '50%',
            transform: `translate(-50%, -50%) scale(${1 - ingestProg * 0.7}) translateY(${-30 + ingestProg * 40}px)`,
            opacity: 1 - ingestProg * 0.6,
            transition: 'all 0.1s linear',
            zIndex: 4,
            filter: `blur(${ingestProg * 4}px)`,
          }}>
            <div className="glass" style={{ padding: '14px 20px', borderRadius: 14,
              border: '1px solid rgba(230,176,34,0.5)',
              boxShadow: `0 0 ${ingestProg * 60}px rgba(230,176,34,0.6)` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 32, height: 32, borderRadius: 16,
                  background: 'linear-gradient(135deg, #ff5a5f, #fc8181)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontWeight: 700, color: '#fff', fontSize: 13 }}>SJ</div>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#fff' }}>{ui.demoGuestName}</div>
                  <div
                    className="mono"
                    dir={locale === 'ar' ? 'ltr' : undefined}
                    style={{ fontSize: 9, color: 'var(--text-3)' }}
                  >
                    {ui.demoIngestSummary}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sojori core — 3 expanding rings + central mark */}
          <div style={{ position: 'absolute', left: '50%', top: '50%',
            transform: 'translate(-50%, -50%)', zIndex: 2 }}>
            {[1, 2, 3].map(ring => (
              <div key={ring} style={{
                position: 'absolute', top: '50%', left: '50%',
                transform: `translate(-50%, -50%) scale(${1 + ingestProg * ring * 0.8})`,
                width: 80, height: 80, borderRadius: '50%',
                border: `2px solid rgba(230,176,34,${0.5 - ring * 0.12 - ingestProg * 0.1})`,
                opacity: ingestProg > ring * 0.15 ? 1 : 0,
                transition: 'all 0.3s ease',
              }}/>
            ))}
            <div style={{
              width: 80, height: 80, borderRadius: '50%',
              background: `radial-gradient(circle, rgba(230,176,34,${0.4 + ingestProg * 0.4}), rgba(230,176,34,0.05) 70%)`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              border: '2px solid rgba(230,176,34,0.5)',
              boxShadow: `0 0 ${30 + ingestProg * 60}px rgba(230,176,34,${0.4 + ingestProg * 0.4})`,
            }}>
              <SojoriMark size={36}/>
            </div>
          </div>

          {/* Lane labels — appear in a circle around the core */}
          {ingestProg > 0.5 && (
            <>
              {lanes.map((lane, i) => {
                const angle = (i / 4) * 2 * Math.PI - Math.PI / 2;
                const r = 140 + (1 - ingestProg) * 60;
                return (
                  <div key={lane.id} style={{
                    position: 'absolute',
                    left: `calc(50% + ${Math.cos(angle) * r}px)`,
                    top:  `calc(50% + ${Math.sin(angle) * r}px)`,
                    transform: 'translate(-50%, -50%)',
                    fontSize: 10, fontWeight: 700, letterSpacing: 1.6,
                    color: lane.color,
                    opacity: (ingestProg - 0.5) * 2,
                    transition: 'all 0.4s ease',
                  }}>{lane.label}</div>
                );
              })}
            </>
          )}

          {/* Status caption */}
          <div className="hero-ingest-caption" style={{
            position: 'absolute', bottom: 22, left: '50%', transform: 'translateX(-50%)',
            display: 'flex', alignItems: 'center', gap: 10,
            fontSize: 12, fontFamily: 'var(--mono)', letterSpacing: 0.6,
            color: 'var(--primary)',
          }}>
            <span style={{ display: 'inline-block', width: 6, height: 6, borderRadius: 3,
              background: 'var(--primary)', boxShadow: '0 0 8px var(--primary)',
              animation: 'pulse-soft 0.8s ease-in-out infinite' }}/>
            {ui.ingestCaption}
          </div>
        </div>
      )}

      {/* ACT 3 — TIMELINE (existing orchestration) */}
      {phase === 'timeline' && (
        <div className="hero-journey-timeline-stage" style={{ position: 'relative', minHeight: 330, overflow: 'visible' }}>
          {lanes.map(lane => (
            <Lane
              key={lane.id}
              lane={lane}
              events={events}
              progress={timelineProg}
              hoveredId={hoveredId}
              setHoveredId={setHoveredId}
              focusPhase={focusPhase}
              timelineBookingIntroActive={timelineBookingIntroActive}
            />
          ))}
        </div>
      )}

      {/* Timeline scrubber */}
      {phase === 'timeline' && (
        <div className="hero-timeline-wrap" style={{ marginTop: 18, position: 'relative', zIndex: 2 }}>
          <TimelineBar
            progress={timelineProg}
            phases={phases}
            focusPhase={focusPhase}
            onPhaseClick={onPhaseClick}
            rangeDir={locale === 'ar' ? 'ltr' : undefined}
          />
        </div>
      )}

      {/* Controls */}
      <div className="hero-anim-controls" style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        marginTop: 16, paddingTop: 14,
        borderTop: '1px solid rgba(26,20,8,0.06)',
        position: 'relative', zIndex: 2,
        flexWrap: 'wrap', gap: 8,
      }}>
        <div className="hero-anim-controls-left" style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
          <button
            onClick={() => setPlaying(p => !p)}
            style={{
              width: 36, height: 36, borderRadius: 10,
              background: playing ? 'rgba(26,20,8,0.06)' : 'linear-gradient(135deg, #e6b022, #f9be25)',
              border: '1px solid rgba(26,20,8,0.12)',
              color: playing ? 'var(--text)' : '#1a1408',
              cursor: 'pointer', fontSize: 13, fontWeight: 700,
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.2s ease',
            }}
          >
            {playing ? '❚❚' : '▶'}
          </button>
          <button
            onClick={restart}
            style={{
              width: 36, height: 36, borderRadius: 10,
              background: 'rgba(26,20,8,0.04)',
              border: '1px solid rgba(26,20,8,0.08)',
              color: 'var(--text)', cursor: 'pointer', fontSize: 13,
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            }}
          >↻</button>
          <span className="mono hero-anim-time" style={{ fontSize: 10.5, color: 'var(--text-3)', letterSpacing: 0.6, marginLeft: 6 }}>
            {(() => {
              const es = Math.floor(progress * LOOP_DURATION);
              const em = Math.floor(es / 60);
              const ess = es % 60;
              const tm = Math.floor(LOOP_DURATION / 60);
              const ts = LOOP_DURATION % 60;
              return `${String(em).padStart(2, '0')}:${String(ess).padStart(2, '0')} / ${String(tm).padStart(2, '0')}:${String(ts).padStart(2, '0')}`;
            })()}
          </span>
        </div>

        <div className="mono hero-anim-controls-stats" style={{ fontSize: 10, color: 'var(--text-3)', letterSpacing: 0.6, textAlign: 'right', minWidth: 0, flex: '1 1 140px' }}>
          18 TÂCHES · 0 OUBLIS · 100% AUTO
        </div>
      </div>

      {/* CSS Keyframes for animations */}
      <style jsx>{`
        /* Styles de base pour timeline (segments étroits : typo compacte + coupure propre) */
        .hero-timeline-label {
          font-size: 8.5px;
          line-height: 1.12;
          font-weight: 600;
          word-break: break-word;
          overflow-wrap: anywhere;
          hyphens: auto;
          max-width: 100%;
          text-align: center;
        }

        .hero-timeline-range {
          font-size: 7.25px;
          opacity: 0.65;
          font-weight: 400;
          letter-spacing: 0.35px;
          line-height: 1.1;
          word-break: break-word;
          overflow-wrap: anywhere;
          max-width: 100%;
          text-align: center;
          display: block;
        }

        @media (max-width: 1100px) {
          .hero-timeline-phases {
            min-height: 40px !important;
          }

          .hero-timeline-phase-btn {
            font-size: 8px !important;
            padding: 2px 5px !important;
            letter-spacing: 0.15px !important;
          }

          .hero-timeline-label {
            font-size: 7.75px !important;
          }

          .hero-timeline-range {
            font-size: 6.75px !important;
            letter-spacing: 0.2px !important;
          }
        }

        @keyframes pulse-soft {
          0%, 100% { opacity: 1; }
          50%      { opacity: 0.55; }
        }
        @keyframes pulse-ring {
          0%   { transform: scale(0.8); opacity: 0.8; }
          100% { transform: scale(2.4); opacity: 0; }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-3px); }
          40% { transform: translateX(3px); }
          60% { transform: translateX(-2px); }
          80% { transform: translateX(2px); }
        }
        @keyframes slide-in-right {
          from { opacity: 0; transform: translateX(28px) scale(0.96); }
          to   { opacity: 1; transform: translateX(0) scale(1); }
        }
        @keyframes slide-in-up {
          from { opacity: 0; transform: translateY(20px) scale(0.96); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes pop-in {
          0%   { opacity: 0; transform: scale(0.5); }
          60%  { opacity: 1; transform: scale(1.08); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes bounce-in {
          0%   { opacity: 0; transform: scale(0.3) translateY(10px); }
          60%  { opacity: 1; transform: scale(1.15) translateY(-4px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes core-breathe {
          0%, 100% { transform: scale(1); filter: brightness(1); }
          50%      { transform: scale(1.04); filter: brightness(1.15); }
        }
        @keyframes orbit {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes priority-glow {
          0%, 100% { box-shadow: 0 0 0 1px rgba(245,158,11,0.6), 0 0 24px rgba(245,158,11,0.4), 0 18px 50px -12px rgba(245,158,11,0.45); }
          50%      { box-shadow: 0 0 0 2px rgba(245,158,11,0.8), 0 0 44px rgba(245,158,11,0.7), 0 22px 60px -10px rgba(245,158,11,0.65); }
        }
        /* Pas de barre de scroll visible (évite la bande jaune sous les lanes) */
        .lane-scroll {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .lane-scroll::-webkit-scrollbar {
          display: none;
          width: 0;
          height: 0;
          background: transparent;
        }
        .glass {
          background: rgba(255,255,255,0.04);
          backdrop-filter: blur(14px) saturate(140%);
          -webkit-backdrop-filter: blur(14px) saturate(140%);
          border: 1px solid rgba(255,255,255,0.08);
        }
        .mono {
          font-family: 'Geist Mono', ui-monospace, 'SF Mono', Menlo, Monaco, 'Cascadia Mono', 'Segoe UI Mono', 'Roboto Mono', 'Oxygen Mono', 'Ubuntu Monospace', 'Source Code Pro', 'Fira Mono', 'Droid Sans Mono', 'Courier New', monospace;
        }

        /* Pont desktop : masqué (flux gauche → droite avec SVG) */
        .hero-incoming-mobile-bridge {
          display: none;
        }

        .hero-incoming-property-title {
          color: var(--text);
        }

        .hero-incoming-guest-title {
          color: var(--text);
        }

        /* Desktop : espace vertical entre les lignes Guest / Sojori / Staff / Admin */
        @media (min-width: 769px) {
          .hero-journey-timeline-stage {
            display: flex;
            flex-direction: column;
            gap: 14px;
          }

          .hero-journey-lane {
            flex-shrink: 0;
          }
        }

        /* Mobile — orchestrateur ultra-compact (polices / colonnes / lanes) */
        @media (max-width: 768px) {
          .hero-animation-wrapper {
            transform: none;
            transform-origin: top center;
            margin: 0 !important;
            padding: 6px 4px 8px !important;
            min-height: 260px !important;
            border-radius: 11px !important;
            width: 100% !important;
            max-width: none !important;
            box-sizing: border-box;
            overflow: visible !important;
          }

          /* Act 1 — empiler canaux puis carte (plus de chevauchement absolu) */
          .hero-incoming-stage {
            display: flex !important;
            flex-direction: column !important;
            align-items: stretch !important;
            height: auto !important;
            min-height: 0 !important;
            gap: 8px !important;
            padding: 4px 2px !important;
            overflow: visible !important;
          }

          .hero-incoming-mobile-bridge {
            display: block !important;
            text-align: center;
            font-size: 8px;
            letter-spacing: 0.12em;
            color: var(--text-3);
            padding: 2px 0 4px;
            opacity: 0.95;
          }

          .hero-incoming-sidebar {
            width: 100% !important;
          }

          .hero-incoming-channels-title {
            font-size: 8px !important;
            letter-spacing: 0.08em !important;
            margin-bottom: 4px !important;
          }

          .hero-incoming-channel-grid {
            display: grid !important;
            grid-template-columns: 1fr 1fr !important;
            gap: 6px !important;
          }

          .hero-incoming-channel-grid > div {
            padding: 6px 8px !important;
            gap: 6px !important;
            border-radius: 8px !important;
          }

          .hero-incoming-channel-grid > div > div:first-of-type {
            width: 22px !important;
            height: 22px !important;
            min-width: 22px !important;
            border-radius: 6px !important;
            font-size: 9px !important;
          }

          .hero-incoming-channel-grid > div > div:nth-child(2) > div:first-child {
            font-size: 10px !important;
          }

          .hero-incoming-channel-grid > div > div:nth-child(2) > div:last-child {
            font-size: 7.5px !important;
            letter-spacing: 0.05em !important;
          }

          .hero-incoming-connector {
            display: none !important;
          }

          .hero-incoming-main {
            min-height: 0 !important;
            width: 100% !important;
            align-items: stretch !important;
            justify-content: flex-start !important;
          }

          .hero-incoming-property {
            position: relative !important;
            top: auto !important;
            left: auto !important;
            right: auto !important;
            margin-bottom: 6px !important;
          }

          .hero-incoming-property-title {
            font-size: 12px !important;
          }

          .hero-incoming-guest-title {
            font-size: 13px !important;
          }

          .hero-incoming-card {
            padding: 11px 12px !important;
            border-radius: 12px !important;
          }

          .hero-incoming-card-shell {
            max-width: 100% !important;
          }

          /* Act 2 — un peu plus bas pour éviter les labels qui dépassent */
          .hero-ingest-stage {
            height: 270px !important;
            overflow: visible !important;
          }

          .hero-ingest-caption {
            bottom: 10px !important;
            font-size: 9px !important;
            max-width: 92vw;
            text-align: center;
            line-height: 1.25;
            flex-wrap: wrap;
            justify-content: center;
          }

          .hero-stage-header {
            margin-bottom: 6px !important;
            gap: 4px !important;
            flex-wrap: wrap;
            align-items: flex-start !important;
          }

          .hero-sojori-core {
            gap: 4px !important;
            padding: 4px 6px 4px 4px !important;
            max-width: min(100%, 46vw);
            flex-shrink: 1;
          }

          .hero-sojori-core-orb,
          .hero-sojori-core-orb svg {
            width: 22px !important;
            height: 22px !important;
          }

          .hero-sojori-core-text {
            white-space: normal !important;
            max-width: 100%;
          }

          .hero-sojori-core-title {
            font-size: 8px !important;
            letter-spacing: 0.45px !important;
            line-height: 1.15 !important;
            word-break: break-word;
          }

          .hero-sojori-core-text .mono {
            font-size: 7px !important;
            letter-spacing: 0.2px !important;
            line-height: 1.2 !important;
            word-break: break-word;
          }

          .hero-stage-meta {
            flex: 1 1 38% !important;
            min-width: 0 !important;
          }

          .hero-stage-meta-kicker {
            font-size: 7px !important;
            letter-spacing: 0.35px !important;
          }

          .hero-stage-meta-title {
            font-size: 10px !important;
            line-height: 1.2 !important;
            word-break: break-word;
          }

          .hero-timeline-wrap {
            margin-top: 6px !important;
          }

          .hero-timeline-phases {
            height: auto !important;
            min-height: 22px;
            margin-bottom: 4px !important;
            gap: 3px !important;
          }

          .hero-timeline-phase-btn {
            font-size: 4px !important;
            padding: 1px 1.5px !important;
            flex: 1 1 0 !important;
            width: 0 !important;
            margin-right: 0 !important;
            letter-spacing: 0 !important;
            line-height: 1.05 !important;
            min-width: 0 !important;
            overflow: hidden;
            border-radius: 4px !important;
          }

          .hero-timeline-label {
            font-size: 4.5px !important;
            line-height: 1.05 !important;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
            text-align: center !important;
            max-width: 100%;
            hyphens: auto;
            word-break: break-word;
          }

          .hero-timeline-range {
            font-size: 4px !important;
            letter-spacing: 0.05px !important;
            opacity: 0.75 !important;
            line-height: 1 !important;
          }

          .hero-lane-label-title {
            font-size: 5.5px !important;
            letter-spacing: 0.25px !important;
            line-height: 1.1 !important;
          }

          .hero-lane-label-sub {
            font-size: 5px !important;
            line-height: 1.05 !important;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            max-width: 100%;
          }

          .hero-anim-controls {
            margin-top: 6px !important;
            padding-top: 6px !important;
            row-gap: 4px !important;
          }

          .hero-anim-controls button {
            width: 28px !important;
            height: 28px !important;
            font-size: 10px !important;
          }

          .hero-anim-time {
            font-size: 7.5px !important;
            margin-left: 2px !important;
            letter-spacing: 0.15px !important;
          }

          .hero-anim-controls-stats {
            font-size: 7px !important;
            letter-spacing: 0.12px !important;
            line-height: 1.25 !important;
            flex: 1 1 100% !important;
            text-align: center !important;
          }

          .lane-scroll {
            overflow-x: auto !important;
            -webkit-overflow-scrolling: touch !important;
            scroll-snap-type: x proximity;
          }

          .lane-scroll-scaled {
            transform: scale(0.68) !important;
            transform-origin: left center;
          }

          /* Entre lignes : marge/padding retirés (~ −75 % vs l’ancien rythme mobile) */
          .hero-journey-lane {
            height: 56px !important;
            margin-bottom: 0 !important;
            padding-top: 0 !important;
            padding-bottom: 0 !important;
          }

          .hero-journey-lane-label {
            width: 32px !important;
            padding-right: 1px !important;
            padding-left: 1px !important;
          }

          .hero-animation-wrapper .hero-lane-cards {
            margin-left: 34px !important;
            height: 52px !important;
          }

          .hero-animation-wrapper .hero-lane-cards .lane-scroll {
            height: 52px !important;
          }

          .hero-journey-lane-track {
            left: 36px !important;
          }

          .hero-journey-timeline-stage {
            display: flex !important;
            flex-direction: column !important;
            gap: 0 !important;
            height: auto !important;
            min-height: 216px;
          }
        }

        @media (max-width: 480px) {
          .hero-animation-wrapper {
            padding: 5px 3px 6px !important;
            min-height: 236px !important;
            border-radius: 9px !important;
          }

          .lane-scroll-scaled {
            transform: scale(0.62) !important;
          }

          .hero-animation-wrapper .hero-lane-cards {
            margin-left: 46px !important;
          }

          .hero-journey-lane-track {
            left: 50px !important;
          }

          .hero-journey-lane-label {
            width: 42px !important;
          }

          .hero-journey-lane {
            height: 52px !important;
            margin-bottom: 0 !important;
            padding-top: 0 !important;
            padding-bottom: 0 !important;
          }

          .hero-animation-wrapper .hero-lane-cards {
            height: 48px !important;
          }

          .hero-animation-wrapper .hero-lane-cards .lane-scroll {
            height: 48px !important;
          }

          .hero-timeline-phase-btn {
            font-size: 3.5px !important;
            padding: 0.5px 1px !important;
          }

          .hero-timeline-label {
            font-size: 4px !important;
            -webkit-line-clamp: 2;
          }

          .hero-timeline-range {
            font-size: 3.5px !important;
          }

          .hero-sojori-core {
            max-width: min(100%, 44vw) !important;
            padding: 3px 5px 3px 3px !important;
          }

          .hero-sojori-core-title {
            font-size: 7.25px !important;
          }

          .hero-sojori-core-text .mono {
            font-size: 6.25px !important;
          }

          .hero-stage-meta-kicker {
            font-size: 6.25px !important;
          }

          .hero-stage-meta-title {
            font-size: 9px !important;
          }

          .hero-anim-controls-stats {
            font-size: 6.25px !important;
          }

          .hero-anim-time {
            font-size: 6.75px !important;
          }
        }
      `}</style>
    </div>
  );
}
