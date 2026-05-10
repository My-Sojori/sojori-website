"use client";

import React, { useMemo } from 'react';
import type { JourneyEvent, EventState, EventStatus } from '@/lib/journey-data';
import { TYPE_COLORS, resolveEvent } from '@/lib/journey-data';

// ─── Status pill (light theme) ─────────────────────────────────
function StatusPill({ status, children }: { status: EventStatus; children: React.ReactNode }) {
  const styles: Record<EventStatus, { bg: string; border: string; color: string; shadow: string }> = {
    pending:   { bg: 'rgba(245,158,11,0.12)', border: 'rgba(245,158,11,0.35)', color: '#d97706', shadow: '#f59e0b' },
    completed: { bg: 'rgba(16,185,129,0.12)', border: 'rgba(16,185,129,0.35)', color: '#047857', shadow: '#10b981' },
    info:      { bg: 'rgba(59,130,246,0.12)', border: 'rgba(59,130,246,0.35)', color: '#1e40af', shadow: '#3b82f6' },
    late:      { bg: 'rgba(239,68,68,0.12)', border: 'rgba(239,68,68,0.35)', color: '#b91c1c', shadow: '#ef4444' },
    soon:      { bg: 'rgba(250,204,21,0.12)', border: 'rgba(250,204,21,0.35)', color: '#a16207', shadow: '#facc15' },
    active:    { bg: 'rgba(6,182,212,0.12)', border: 'rgba(6,182,212,0.35)', color: '#0e7490', shadow: '#06b6d4' },
  };

  const s = styles[status];

  return (
    <span className="journey-status-pill" style={{
      display: 'inline-flex', alignItems: 'center', gap: 5,
      padding: '2px 8px', borderRadius: 999,
      fontSize: 10, fontWeight: 600, letterSpacing: 0.4,
      textTransform: 'uppercase',
      background: s.bg,
      color: s.color,
      border: `1px solid ${s.border}`,
      whiteSpace: 'nowrap',
    }}>
      <span style={{
        width: 6, height: 6, borderRadius: '50%', background: s.color,
        boxShadow: `0 0 8px ${s.shadow}`,
      }} />
      {children}
    </span>
  );
}

// ─── Avatar ────────────────────────────────────────────────────
function Avatar({ letter, animate }: { letter: string; animate: boolean }) {
  return (
    <div style={{
      width: 26, height: 26, borderRadius: '50%',
      background: 'linear-gradient(135deg, #8b5cf6, #06b6d4)',
      color: '#fff', fontWeight: 700, fontSize: 11,
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      border: '1.5px solid rgba(139,92,246,0.3)',
      boxShadow: '0 0 14px rgba(139,92,246,0.3)',
      animation: animate ? 'bounce-in 0.6s cubic-bezier(.34,1.56,.64,1)' : 'none',
    }}>{letter}</div>
  );
}

// ─── Confetti ──────────────────────────────────────────────────
function Confetti({ active }: { active: boolean }) {
  const pieces = useMemo(() => Array.from({ length: 18 }, (_, i) => ({
    i,
    angle: (i / 18) * Math.PI * 2,
    dist: 40 + Math.random() * 30,
    color: ['#8b5cf6', '#06b6d4', '#10b981', '#f59e0b', '#ec4899'][i % 5],
    size: 4 + Math.random() * 4,
    delay: Math.random() * 0.2,
  })), []);

  if (!active) return null;

  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
      {pieces.map(p => (
        <div key={p.i} style={{
          position: 'absolute',
          left: '50%', top: '50%',
          width: p.size, height: p.size, borderRadius: 2,
          background: p.color,
          boxShadow: `0 0 6px ${p.color}`,
          transform: `translate(${Math.cos(p.angle) * p.dist}px, ${Math.sin(p.angle) * p.dist}px) rotate(${p.angle}rad)`,
          opacity: 0,
          animation: `confetti-${p.i} 1.2s ${p.delay}s forwards`,
        }} />
      ))}
      <style>{pieces.map(p => `
        @keyframes confetti-${p.i} {
          0% { transform: translate(0,0) rotate(0); opacity: 1; }
          100% { transform: translate(${Math.cos(p.angle) * p.dist}px, ${Math.sin(p.angle) * p.dist - 10}px) rotate(${p.angle * 4}rad); opacity: 0; }
        }
      `).join('\n')}</style>
    </div>
  );
}

// ─── Stars burst ───────────────────────────────────────────────
function StarsBurst({ active }: { active: boolean }) {
  if (!active) return null;
  return (
    <div style={{ position: 'absolute', top: -8, right: 8, display: 'flex', gap: 2 }}>
      {[0,1,2,3,4].map(i => (
        <span key={i} style={{
          fontSize: 12,
          opacity: 0,
          animation: `star-pop 0.5s ${i * 0.08}s forwards`,
          textShadow: '0 0 8px #facc15',
        }}>⭐</span>
      ))}
      <style>{`@keyframes star-pop {
        0% { opacity: 0; transform: scale(0) translateY(8px); }
        60% { opacity: 1; transform: scale(1.3) translateY(-2px); }
        100% { opacity: 1; transform: scale(1) translateY(0); }
      }`}</style>
    </div>
  );
}

// ─── Pulse ring (around active cards) ─────────────────────────
function PulseRing({ color }: { color: string }) {
  return (
    <>
      <span style={{
        position: 'absolute', inset: -2,
        borderRadius: 14,
        border: `2px solid ${color}`,
        animation: 'pulse-ring 1.6s ease-out infinite',
        pointerEvents: 'none',
      }} />
      <span style={{
        position: 'absolute', inset: -2,
        borderRadius: 14,
        border: `2px solid ${color}`,
        animation: 'pulse-ring 1.6s ease-out 0.8s infinite',
        pointerEvents: 'none',
      }} />
    </>
  );
}

// ─── JOURNEY CARD ──────────────────────────────────────────────
interface JourneyCardProps {
  event: JourneyEvent;
  progress: number;
  onHover?: (id: string | null) => void;
  hovered: boolean;
  focused: boolean;
}

export function JourneyCard({ event, progress, onHover, hovered, focused }: JourneyCardProps) {
  const visible = progress >= event.t;
  const entryAge = progress - event.t;
  const state = resolveEvent(event, progress);
  const settled = entryAge > 0.10;

  const animMap: Record<string, string> = {
    'fade':         'slide-in-up 0.55s cubic-bezier(.2,.7,.3,1.2) both',
    'slide-right':  'slide-in-right 0.55s cubic-bezier(.2,.7,.3,1.2) both',
    'pop':          'pop-in 0.5s cubic-bezier(.34,1.56,.64,1) both',
    'bounce':       'bounce-in 0.6s cubic-bezier(.34,1.56,.64,1) both',
    'bubble':       'pop-in 0.5s cubic-bezier(.34,1.56,.64,1) both',
    'cascade':      'slide-in-up 0.55s cubic-bezier(.2,.7,.3,1.2) both',
    'shake':        'pop-in 0.4s ease both, shake 0.5s 0.4s both',
    'confetti':     'pop-in 0.55s cubic-bezier(.34,1.56,.64,1) both',
    'stars':        'pop-in 0.5s cubic-bezier(.34,1.56,.64,1) both',
    'priority':     'pop-in 0.5s cubic-bezier(.34,1.56,.64,1) both',
  };

  if (!visible) return null;

  const showConfetti = event.anim === 'confetti' && entryAge < 0.08;
  const showStars = event.anim === 'stars' && entryAge < 0.1;
  const showPulse = !settled && (state.status === 'late' || state.status === 'active' || event.anim === 'priority' || state.priority);
  const isPriority = state.priority;
  const typeColor = TYPE_COLORS[event.type] || '#8b5cf6';

  // Status-based shadow colors (light theme)
  const statusColors: Record<EventStatus, string> = {
    pending: '245,158,11',
    completed: '16,185,129',
    info: '59,130,246',
    late: '239,68,68',
    soon: '250,204,21',
    active: '6,182,212',
  };
  const statusRgb = statusColors[state.status];

  return (
    <div
      className="journey-event-card"
      onMouseEnter={() => onHover?.(event.id)}
      onMouseLeave={() => onHover?.(null)}
      style={{
        position: 'relative',
        minWidth: 230,
        maxWidth: 270,
        padding: '8px 10px',
        borderLeft: `3px solid ${typeColor}`,
        borderRadius: 14,
        background: 'linear-gradient(180deg, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.75) 100%)',
        backdropFilter: 'blur(14px) saturate(140%)',
        WebkitBackdropFilter: 'blur(14px) saturate(140%)',
        border: `1px solid rgba(26,20,8,0.10)`,
        animation: isPriority
          ? `${animMap[event.anim] || animMap.fade}, priority-glow 1.4s ease-in-out infinite`
          : (animMap[event.anim] || animMap.fade),
        boxShadow: isPriority
          ? `0 0 0 1px rgba(245,158,11,0.6), 0 0 32px rgba(245,158,11,0.45), 0 18px 50px -12px rgba(245,158,11,0.5)`
          : (hovered || focused
            ? `0 0 0 1px rgba(${statusRgb}, 0.6), 0 18px 50px -12px rgba(${statusRgb}, 0.45), 0 0 32px rgba(${statusRgb}, 0.25)`
            : `0 1px 0 rgba(255,255,255,0.9) inset, 0 12px 40px -12px rgba(26,20,8,0.12), 0 0 0 1px rgba(${statusRgb}, 0.15)`),
        transform: hovered ? 'translateY(-3px) scale(1.04)' : 'none',
        transition: 'transform 0.3s cubic-bezier(.2,.7,.3,1.2), box-shadow 0.3s ease, opacity 0.5s ease, filter 0.5s ease',
        cursor: 'pointer',
        zIndex: hovered ? 20 : (isPriority ? 10 : 'auto'),
        opacity: hovered || focused ? 1 : (settled ? 0.72 : 1),
        filter: settled && !hovered && !focused ? 'saturate(0.85)' : 'none',
      }}
    >
      {showPulse && <PulseRing color={typeColor} />}
      <Confetti active={showConfetti} />
      <StarsBurst active={showStars} />

      {/* Header row */}
      <div className="journey-event-card-header" style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
        <div style={{
          width: 28, height: 28, borderRadius: 8,
          background: `linear-gradient(135deg, ${typeColor}30, ${typeColor}10)`,
          border: `1px solid ${typeColor}55`,
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 15,
          flexShrink: 0,
          transition: 'background 0.4s ease, border-color 0.4s ease',
        }}>
          {state.icon}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div className="journey-event-card-title" style={{ fontSize: 12.5, fontWeight: 600, color: 'var(--text)', lineHeight: 1.3 }}>
            {state.title}
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="journey-event-card-body" style={{ fontSize: 11.5, color: 'var(--text-2)', lineHeight: 1.4, marginBottom: 6 }}>
        {state.sub}
      </div>

      {/* Footer: status + avatar/tag */}
      <div className="journey-event-card-footer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 6 }}>
        <StatusPill status={state.status}>{state.tag}</StatusPill>
        {state.avatar && (
          <span className="journey-event-card-avatar-wrap">
            <Avatar letter={state.avatar} animate={entryAge < 0.08} />
          </span>
        )}
      </div>

      {/* Mobile optimizations - ULTRA COMPACT pour afficher 4-5 cartes */}
      <style jsx>{`
        @media (max-width: 768px) {
          .journey-event-card {
            min-width: 105px !important;
            max-width: 115px !important;
            padding: 4px 5px !important;
            border-left-width: 2px !important;
            border-radius: 8px !important;
          }

          .journey-event-card-header {
            gap: 4px !important;
            margin-bottom: 2px !important;
          }

          .journey-event-card-header > div:first-child {
            width: 18px !important;
            height: 18px !important;
            border-radius: 5px !important;
            font-size: 10px !important;
          }

          .journey-event-card-title {
            font-size: 8.5px !important;
            line-height: 1.2 !important;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          }

          .journey-event-card-body {
            font-size: 7.5px !important;
            line-height: 1.25 !important;
            margin-bottom: 3px !important;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
          }

          .journey-event-card-footer {
            gap: 3px !important;
          }

          .journey-status-pill {
            padding: 1px 4px !important;
            font-size: 6.5px !important;
            gap: 2px !important;
          }

          .journey-status-pill > span {
            width: 3px !important;
            height: 3px !important;
          }

          .journey-event-card-avatar-wrap > div {
            width: 14px !important;
            height: 14px !important;
            font-size: 7px !important;
          }
        }

        @media (max-width: 480px) {
          .journey-event-card {
            min-width: 95px !important;
            max-width: 105px !important;
            padding: 3px 4px !important;
          }

          .journey-event-card-title {
            font-size: 7.5px !important;
          }

          .journey-event-card-body {
            font-size: 7px !important;
          }

          .journey-status-pill {
            font-size: 6px !important;
          }
        }
      `}</style>
    </div>
  );
}
