"use client";

import { SojoriLogo } from '@/components/Logo';
import { HeroAnimationJourney } from '@/components/homepage/HeroAnimationJourney';

/**
 * Cadre 16:9 (1200×675) pour la capture vidéo du post LinkedIn.
 *
 * Décliné de `/reel-capture` (9:16 Instagram) : même animation, même
 * habillage GOLD, mais en paysage — le format du fil LinkedIn, où une
 * vidéo verticale est rognée.
 *
 * Les contrôles de lecture sont masqués pendant la capture.
 */
export function LinkedinCaptureClient() {
  return (
    <div
      id="linkedin-frame"
      style={{
        width: 1200,
        height: 780,
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        background:
          'radial-gradient(ellipse 90% 45% at 85% 0%, rgba(230,176,34,0.10), transparent 60%),' +
          'radial-gradient(ellipse 70% 40% at 0% 100%, rgba(139,92,246,0.07), transparent 60%),' +
          'linear-gradient(180deg, #ffffff 0%, #fbfaf6 100%)',
      }}
    >
      {/* En-tête : logo à gauche, positionnement à droite */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '18px 40px 2px',
        }}
      >
        <SojoriLogo size={30} />
        <div
          style={{
            fontSize: 15,
            fontWeight: 600,
            letterSpacing: '-0.01em',
            color: '#1a1408',
          }}
        >
          Le moteur d&apos;orchestration{' '}
          <span
            style={{
              background: 'linear-gradient(135deg, #f4cf5e, #e6b022 55%, #b8881a)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            de l&apos;hospitalité
          </span>
        </div>
      </div>

      {/* Animation d'orchestration */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', padding: '0 24px', minHeight: 0 }}>
        <div style={{ width: '100%' }}>
          <HeroAnimationJourney />
        </div>
      </div>

      {/* Pied : la phrase qui porte le post */}
      <div
        style={{
          display: 'flex',
          alignItems: 'baseline',
          justifyContent: 'center',
          gap: 14,
          padding: '2px 40px 16px',
        }}
      >
        <div
          style={{
            fontSize: 19,
            fontWeight: 700,
            letterSpacing: '-0.02em',
            color: '#1a1408',
          }}
        >
          Personne n&apos;a piloté cette chaîne.
        </div>
        <div style={{ fontSize: 12, letterSpacing: 1.4, color: '#8a8272', fontWeight: 500 }}>
          sojori.com
        </div>
      </div>

      {/* Masque les contrôles de lecture (pause/restart/timer) pendant la capture */}
      <style jsx global>{`
        #linkedin-frame .hero-anim-controls-left {
          display: none !important;
        }
        /* Indicateur de dev Next.js — hors cadre pendant la capture. */
        nextjs-portal {
          display: none !important;
        }
        html,
        body {
          background: #ffffff;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}
