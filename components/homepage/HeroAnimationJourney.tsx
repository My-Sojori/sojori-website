"use client";

import { useState, useEffect, useRef, useCallback } from 'react';
import { SojoriMark } from '../Logo';
import { JourneyCard } from '../journey/JourneyCard';
import { PHASES, EVENTS, LANES, type Phase } from '@/lib/journey-data';

const LOOP_DURATION = 40; // seconds

// ─── Timeline scrubber ─────────────────────────────────────────
function TimelineBar({ progress, phases, focusPhase, onPhaseClick }: {
  progress: number;
  phases: Phase[];
  focusPhase: string | null;
  onPhaseClick: (phase: Phase) => void;
}) {
  return (
    <div style={{ position: 'relative', width: '100%', userSelect: 'none' }}>
      {/* Phase ticks */}
      <div style={{ display: 'flex', gap: 0, marginBottom: 10, height: 32, position: 'relative' }}>
        {phases.map((p, idx) => {
          const w = (p.to - p.from) * 100;
          const isActive = progress >= p.from && progress < p.to;
          const isPast = progress >= p.to;
          const isFocused = focusPhase === p.id;
          return (
            <button
              key={p.id}
              onClick={() => onPhaseClick(p)}
              style={{
                width: `${w}%`,
                marginRight: idx < phases.length - 1 ? 4 : 0,
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
                fontSize: 10.5,
                fontWeight: 600,
                letterSpacing: 0.4,
                textTransform: 'uppercase',
                padding: '4px 10px',
                cursor: 'pointer',
                transition: 'all 0.25s ease',
                display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center',
                gap: 1,
              }}
            >
              <span style={{ fontSize: 11 }}>{p.label}</span>
              <span className="mono" style={{ fontSize: 9, opacity: 0.65, fontWeight: 400, letterSpacing: 0.6 }}>{p.range}</span>
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
function SojoriCore({ progress, activeCount }: { progress: number; activeCount: number }) {
  return (
    <div style={{
      position: 'relative',
      display: 'inline-flex', alignItems: 'center', gap: 12,
      padding: '8px 14px 8px 8px',
      borderRadius: 999,
      background: 'rgba(230,176,34,0.10)',
      border: '1px solid rgba(230,176,34,0.35)',
      boxShadow: '0 0 24px rgba(230,176,34,0.15), 0 0 0 1px rgba(230,176,34,0.15) inset',
    }}>
      <div style={{ position: 'relative', width: 32, height: 32 }}>
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
      <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.1, whiteSpace: 'nowrap' }}>
        <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.5, color: 'var(--text)' }}>SOJORI · CORE</span>
        <span className="mono" style={{ fontSize: 9.5, color: 'var(--text-3)', letterSpacing: 0.6 }}>
          {activeCount} actives · {Math.round(progress * 100)}%
        </span>
      </div>
    </div>
  );
}

// ─── Scrollable lane row (accumulation puis défilement) ──────────
function ScrollableLane({ visibleEvents, progress, hoveredId, setHoveredId, focusPhase }: {
  visibleEvents: typeof EVENTS;
  progress: number;
  hoveredId: string | null;
  setHoveredId: (id: string | null) => void;
  focusPhase: string | null;
}) {
  const CARD_WIDTH = 180; // Réduit de 25% (240 * 0.75)
  const GAP = 10; // Réduit de 25% (14 * 0.75)
  const MAX_VISIBLE_CARDS = 5; // Plus de cartes visibles avec la réduction

  // Toutes les cartes qui ont déjà apparu
  const appearedCards = visibleEvents.filter(e => progress >= e.t);

  // Calculer le décalage global pour faire défiler vers la gauche quand nécessaire
  let scrollOffset = 0;
  if (appearedCards.length > MAX_VISIBLE_CARDS) {
    // Commencer à défiler doucement vers la gauche
    const overflow = appearedCards.length - MAX_VISIBLE_CARDS;
    scrollOffset = -overflow * (CARD_WIDTH + GAP);
  }

  return (
    <div style={{ position: 'relative', marginLeft: 90, flex: 1, overflow: 'hidden', minHeight: 90 }}>
      <div
        className="lane-scroll"
        style={{
          display: 'flex', alignItems: 'center', gap: GAP,
          minHeight: 90,
          padding: '6px 6px',
          position: 'relative',
          transform: `translateX(${scrollOffset}px) scale(0.9)`,
          transformOrigin: 'left center',
          transition: 'transform 0.8s ease-out',
        }}
      >
        {appearedCards.map((e, idx) => {
          const age = progress - e.t;
          const isNew = age < 0.05; // Animation d'entrée pour les nouvelles cartes

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
      {/* fade hint on left edge */}
      <div style={{
        position: 'absolute', left: 0, top: 0, bottom: 0, width: 40,
        background: 'linear-gradient(90deg, rgba(251,250,246,0.95), transparent)',
        pointerEvents: 'none', zIndex: 1,
        opacity: appearedCards.length > MAX_VISIBLE_CARDS ? 1 : 0,
        transition: 'opacity 0.5s',
      }} />
    </div>
  );
}

// ─── Lane row with cards ───────────────────────────────────────
function Lane({ lane, events, progress, hoveredId, setHoveredId, focusPhase }: {
  lane: typeof LANES[0];
  events: typeof EVENTS;
  progress: number;
  hoveredId: string | null;
  setHoveredId: (id: string | null) => void;
  focusPhase: string | null;
}) {
  const visibleEvents = events
    .filter(e => e.lane === lane.id && progress >= e.t)
    .sort((a, b) => a.t - b.t);

  return (
    <div style={{ position: 'relative', minHeight: 105, display: 'flex', alignItems: 'center', padding: '8px 0', marginBottom: 6 }}>
      {/* Lane label */}
      <div style={{
        position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)',
        width: 85, paddingRight: 12,
        zIndex: 2,
      }}>
        <div style={{
          fontSize: 9, fontWeight: 700, letterSpacing: 1.4,
          color: lane.color, marginBottom: 2,
          textShadow: `0 0 12px ${lane.color}33`,
        }}>{lane.label}</div>
        <div style={{ fontSize: 9.5, color: 'var(--text-3)' }}>{lane.sublabel}</div>
        <div style={{
          width: 22, height: 2, marginTop: 5, borderRadius: 1,
          background: lane.color, boxShadow: `0 0 8px ${lane.color}66`,
        }} />
      </div>

      {/* Lane track line */}
      <div style={{
        position: 'absolute', left: 110, right: 0, top: '50%',
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

  const activeCount = EVENTS.filter(e => progress >= e.t && progress < e.t + 0.15).length;
  const currentPhase = PHASES.find(p => progress >= p.from && progress < p.to) || PHASES[PHASES.length - 1];

  return (
    <div
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
        minHeight: 420,
      }}
    >
      {/* corner glows (light) */}
      <div style={{ position: 'absolute', top: -120, left: -120, width: 280, height: 280, borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(230,176,34,0.20), transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: -120, right: -120, width: 280, height: 280, borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(139,92,246,0.16), transparent 70%)', pointerEvents: 'none' }} />

      {/* Top stage row: core + current phase */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18, position: 'relative', zIndex: 2 }}>
        <SojoriCore progress={progress} activeCount={activeCount} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ textAlign: 'right' }}>
            <div className="mono" style={{ fontSize: 9.5, letterSpacing: 1.4, color: 'var(--text-3)' }}>PHASE EN COURS</div>
            <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)', letterSpacing: -0.2 }}>
              {currentPhase.label} <span style={{ color: 'var(--text-3)', fontWeight: 400 }}>· {currentPhase.range}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Lanes container */}
      <div style={{ position: 'relative' }}>
        {LANES.map(lane => (
          <Lane
            key={lane.id}
            lane={lane}
            events={EVENTS}
            progress={progress}
            hoveredId={hoveredId}
            setHoveredId={setHoveredId}
            focusPhase={focusPhase}
          />
        ))}
      </div>

      {/* Timeline scrubber */}
      <div style={{ marginTop: 18, position: 'relative', zIndex: 2 }}>
        <TimelineBar
          progress={progress}
          phases={PHASES}
          focusPhase={focusPhase}
          onPhaseClick={onPhaseClick}
        />
      </div>

      {/* Controls */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        marginTop: 16, paddingTop: 14,
        borderTop: '1px solid rgba(26,20,8,0.06)',
        position: 'relative', zIndex: 2,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
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
          <span className="mono" style={{ fontSize: 10.5, color: 'var(--text-3)', letterSpacing: 0.6, marginLeft: 6 }}>
            {Math.floor(progress * LOOP_DURATION).toString().padStart(2, '0')}:{Math.floor((progress * LOOP_DURATION % 1) * 60).toString().padStart(2, '0')} / 00:{LOOP_DURATION}
          </span>
        </div>

        <div className="mono" style={{ fontSize: 10, color: 'var(--text-3)', letterSpacing: 0.6 }}>
          18 TÂCHES · 0 OUBLIS · 100% AUTO
        </div>
      </div>

      {/* CSS Keyframes for animations */}
      <style jsx>{`
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
        .lane-scroll::-webkit-scrollbar { height: 8px; }
        .lane-scroll::-webkit-scrollbar-track { background: transparent; }
        .lane-scroll::-webkit-scrollbar-thumb {
          background: rgba(230,176,34,0.2); border-radius: 4px;
        }
        .lane-scroll::-webkit-scrollbar-thumb:hover { background: rgba(230,176,34,0.4); }
      `}</style>
    </div>
  );
}
