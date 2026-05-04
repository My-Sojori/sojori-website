"use client";

import { useState, useEffect } from 'react';
import { SojoriMark } from '../Logo';

// Aurora Soft — light theme version of HeroAnimation.
export function HeroAnimation() {
  const [t, setT] = useState(0);
  const [playing, setPlaying] = useState(true);
  const DURATION = 40;

  useEffect(() => {
    if (!playing) return;
    let last = performance.now();
    let raf: number;
    const loop = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;
      setT((p) => (p + dt / DURATION) % 1);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [playing]);

  const phase = t < 0.12 ? 'booking' : 'timeline';
  const timelineProg = phase === 'timeline' ? (t - 0.12) / 0.88 : 0;

  const events = [
    { t: 0.0,  lane: 0, icon: '📨', title: 'Bienvenue WhatsApp',     tag: 'J-7',       tone: 'info'    as const },
    { t: 0.04, lane: 1, icon: '🔐', title: 'Scan passeport (KYC)',   tag: 'AI',        tone: 'primary' as const },
    { t: 0.08, lane: 0, icon: '🎫', title: 'Choix arrivée',           tag: '16:00',     tone: 'info'    as const },
    { t: 0.14, lane: 2, icon: '👤', title: 'Staff assigné',           tag: 'Amine',     tone: 'success' as const },
    { t: 0.20, lane: 1, icon: '🔔', title: 'Push admin & client',     tag: 'Notif',     tone: 'info'    as const },
    { t: 0.26, lane: 0, icon: '🏨', title: 'Check-in OK',             tag: 'Done',      tone: 'success' as const },
    { t: 0.34, lane: 0, icon: '💬', title: '« Tout est parfait ! »',  tag: 'Message',   tone: 'info'    as const },
    { t: 0.40, lane: 2, icon: '🧹', title: 'Ménage J+2',              tag: 'Yasmine',   tone: 'success' as const },
    { t: 0.48, lane: 0, icon: '🚗', title: 'Transport aéroport',      tag: 'Extra',     tone: 'info'    as const },
    { t: 0.56, lane: 1, icon: '✨', title: 'Support AI 24/7',         tag: 'GPT-4',     tone: 'primary' as const },
    { t: 0.62, lane: 3, icon: '⚠️',  title: 'Conflit détecté',         tag: 'Auto',      tone: 'warn'    as const },
    { t: 0.68, lane: 3, icon: '👨‍💼', title: 'Résolution OK',           tag: 'Resolved',  tone: 'success' as const },
    { t: 0.74, lane: 0, icon: '🎫', title: 'Départ déclaré',          tag: '11:00',     tone: 'info'    as const },
    { t: 0.80, lane: 2, icon: '🧹', title: 'Ménage final',            tag: 'Karim',     tone: 'success' as const },
    { t: 0.86, lane: 0, icon: '⭐', title: 'Avis 5 étoiles',           tag: 'J+1',       tone: 'success' as const },
    { t: 0.92, lane: 1, icon: '📊', title: 'Analytics live',          tag: 'Dashboard', tone: 'primary' as const },
  ];

  const lanes = [
    { id: 0, label: 'GUEST',  sub: 'Voyageur',      color: '#06b6d4' },
    { id: 1, label: 'SOJORI', sub: 'Orchestrateur', color: '#e6b022' },
    { id: 2, label: 'STAFF',  sub: 'Équipe',        color: '#10b981' },
    { id: 3, label: 'ADMIN',  sub: 'Manager',       color: '#8b5cf6' },
  ];

  // Light theme tokens for chips
  const toneStyles = {
    info:    { bg: 'rgba(6,182,212,0.10)',   border: 'rgba(6,182,212,0.35)',  text: '#0e7490' },
    primary: { bg: 'rgba(230,176,34,0.14)',  border: 'rgba(230,176,34,0.45)', text: '#92580d' },
    success: { bg: 'rgba(16,185,129,0.10)',  border: 'rgba(16,185,129,0.35)', text: '#047857' },
    warn:    { bg: 'rgba(239,68,68,0.10)',   border: 'rgba(239,68,68,0.35)',  text: '#b91c1c' },
  };

  return (
    <div
      style={{
        position: 'relative',
        padding: '24px 26px 22px',
        borderRadius: 24,
        background: 'linear-gradient(180deg, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.65) 100%)',
        backdropFilter: 'blur(20px) saturate(150%)',
        WebkitBackdropFilter: 'blur(20px) saturate(150%)',
        border: '1px solid rgba(26,20,8,0.10)',
        boxShadow: '0 1px 0 rgba(255,255,255,0.9) inset, 0 30px 80px -16px rgba(26,20,8,0.12)',
        overflow: 'hidden',
        minHeight: 540,
      }}
    >
      {/* corner glows (light) */}
      <div style={{ position: 'absolute', top: -120, left: -120, width: 280, height: 280, borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(230,176,34,0.20), transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: -120, right: -120, width: 280, height: 280, borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(139,92,246,0.16), transparent 70%)', pointerEvents: 'none' }} />

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18, position: 'relative', zIndex: 2 }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 10,
          padding: '6px 12px 6px 8px', borderRadius: 999,
          background: 'rgba(230,176,34,0.12)', border: '1px solid rgba(230,176,34,0.35)'
        }}>
          <SojoriMark size={22} />
          <div style={{ lineHeight: 1.1 }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.4, color: 'var(--text)' }}>SOJORI · CORE</div>
            <div className="mono" style={{ fontSize: 9.5, color: 'var(--text-3)', letterSpacing: 0.5 }}>
              {Math.floor(t * 100)}% · {events.filter((e) => e.t < t).length}/16 tâches
            </div>
          </div>
        </div>
        <div className="mono" style={{ fontSize: 10, color: 'var(--text-3)', letterSpacing: 1.2 }}>
          {phase === 'booking' ? '🟡 BOOKING RECEIVED' : '🟢 ORCHESTRATING'}
        </div>
      </div>

      {/* Phase 1 */}
      {phase === 'booking' && (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 380, position: 'relative', zIndex: 2 }}>
          <div style={{ textAlign: 'center', animation: 'fade-up 0.6s ease' }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '6px 14px', borderRadius: 999,
              background: 'rgba(255,90,95,0.10)', border: '1px solid rgba(255,90,95,0.30)',
              color: '#dc2626', fontSize: 11, fontWeight: 600, letterSpacing: 0.4, marginBottom: 18
            }}>
              ● Airbnb · New booking received
            </div>
            <div style={{
              padding: '24px 32px', maxWidth: 460, margin: '0 auto', borderRadius: 18,
              background: 'rgba(255,255,255,0.85)', border: '1px solid rgba(26,20,8,0.08)',
              boxShadow: '0 8px 24px -12px rgba(26,20,8,0.08)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 14 }}>
                <div style={{
                  width: 44, height: 44, borderRadius: 22,
                  background: 'linear-gradient(135deg, #ff5a5f, #fc8181)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 18, fontWeight: 700, color: '#fff'
                }}>SJ</div>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontWeight: 600, fontSize: 15, color: 'var(--text)' }}>Sarah Johnson</div>
                  <div style={{ fontSize: 12, color: 'var(--text-3)' }}>USA → Marrakech, Riad El Fenn</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 8, fontSize: 12, color: 'var(--text-2)', justifyContent: 'space-between' }}>
                <span>📅 15-22 Juin</span><span>👥 2 guests</span><span>💰 €1,840</span>
              </div>
            </div>
            <div style={{ marginTop: 24, display: 'inline-flex', alignItems: 'center', gap: 8, color: 'var(--primary-deep, #b8881a)', fontSize: 13, fontWeight: 500 }}>
              <span style={{ animation: 'pulse-soft 1s ease-in-out infinite' }}>✨</span>
              Sojori démarre l&apos;orchestration…
            </div>
          </div>
        </div>
      )}

      {/* Phase 2 */}
      {phase === 'timeline' && (
        <div style={{ position: 'relative', zIndex: 2 }}>
          {lanes.map((lane) => (
            <div key={lane.id} style={{ position: 'relative', minHeight: 78, display: 'flex', alignItems: 'center', padding: '4px 0' }}>
              <div style={{ width: 100, flexShrink: 0, paddingRight: 12 }}>
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1.5, color: lane.color }}>{lane.label}</div>
                <div style={{ fontSize: 10, color: 'var(--text-3)' }}>{lane.sub}</div>
                <div style={{ width: 24, height: 2, marginTop: 5, borderRadius: 1, background: lane.color, boxShadow: `0 0 8px ${lane.color}80` }} />
              </div>
              <div style={{
                position: 'absolute', left: 100, right: 0, top: '50%', height: 1,
                background: `linear-gradient(90deg, transparent, ${lane.color}55 8%, ${lane.color}55 92%, transparent)`,
                opacity: 0.7,
              }} />
              <div style={{ position: 'relative', flex: 1, height: 70, marginLeft: 4 }}>
                {events.filter((e) => e.lane === lane.id).map((e) => {
                  if (timelineProg < e.t) return null;
                  const age = timelineProg - e.t;
                  const x = e.t * 100;
                  const tone = toneStyles[e.tone];
                  return (
                    <div
                      key={e.t + e.title}
                      style={{
                        position: 'absolute', left: `${x}%`, top: '50%',
                        transform: 'translateY(-50%)',
                        animation: 'fade-up 0.5s cubic-bezier(.34,1.56,.64,1) both',
                        background: tone.bg,
                        backdropFilter: 'blur(10px)',
                        border: `1px solid ${tone.border}`,
                        borderRadius: 10, padding: '6px 10px',
                        display: 'flex', alignItems: 'center', gap: 6, whiteSpace: 'nowrap',
                        boxShadow: age < 0.05
                          ? `0 0 0 4px ${tone.border}, 0 6px 16px rgba(26,20,8,0.10)`
                          : `0 4px 12px rgba(26,20,8,0.05)`,
                        transition: 'box-shadow 0.4s ease',
                        zIndex: age < 0.05 ? 3 : 1,
                      }}
                    >
                      <span style={{ fontSize: 13 }}>{e.icon}</span>
                      <span style={{ fontSize: 10.5, fontWeight: 600, color: 'var(--text)' }}>{e.title}</span>
                      <span className="mono" style={{
                        fontSize: 8.5, color: tone.text, letterSpacing: 0.4,
                        padding: '1px 5px', background: 'rgba(255,255,255,0.65)',
                        borderRadius: 4, border: `1px solid ${tone.border}`,
                      }}>{e.tag}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}

          {/* Progress */}
          <div style={{
            marginTop: 14, position: 'relative', height: 5, borderRadius: 3,
            background: 'rgba(26,20,8,0.06)', border: '1px solid rgba(26,20,8,0.04)', overflow: 'hidden'
          }}>
            <div style={{
              position: 'absolute', inset: 0, width: `${t * 100}%`,
              background: 'linear-gradient(90deg, #06b6d4 0%, #e6b022 50%, #8b5cf6 100%)',
              boxShadow: '0 0 16px rgba(230,176,34,0.5)', borderRadius: 3,
            }} />
          </div>

          {/* Controls */}
          <div style={{ marginTop: 14, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <button onClick={() => setPlaying((p) => !p)} style={{
                width: 32, height: 32, borderRadius: 8,
                background: 'rgba(255,255,255,0.85)', border: '1px solid rgba(26,20,8,0.10)',
                color: 'var(--text)', cursor: 'pointer', fontSize: 11,
              }}>{playing ? '❚❚' : '▶'}</button>
              <button onClick={() => setT(0)} style={{
                width: 32, height: 32, borderRadius: 8,
                background: 'rgba(255,255,255,0.65)', border: '1px solid rgba(26,20,8,0.08)',
                color: 'var(--text)', cursor: 'pointer',
              }}>↻</button>
              <span className="mono" style={{ fontSize: 10, color: 'var(--text-3)', marginLeft: 6 }}>
                {Math.floor(t * DURATION).toString().padStart(2, '0')}s / {DURATION}s
              </span>
            </div>
            <div className="mono" style={{ fontSize: 10, color: 'var(--text-3)', letterSpacing: 0.6 }}>
              23 TÂCHES · 0 OUBLIS · 100% AUTO
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
