"use client";

import { SojoriLogo } from '@/components/Logo';
import { HeroAnimationJourney } from '@/components/homepage/HeroAnimationJourney';

/**
 * Cadre 9:16 (540×960 CSS → 1080×1920 avec deviceScaleFactor 2) pour la
 * capture Puppeteer du reel Instagram. Habillage marque GOLD + animation
 * d'orchestration seule, contrôles de lecture masqués.
 */
export function ReelCaptureClient() {
  return (
    <div
      id="reel-frame"
      style={{
        width: 540,
        height: 960,
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        background:
          'radial-gradient(ellipse 90% 40% at 80% 0%, rgba(230,176,34,0.10), transparent 60%),' +
          'radial-gradient(ellipse 70% 35% at 0% 100%, rgba(139,92,246,0.07), transparent 60%),' +
          'linear-gradient(180deg, #ffffff 0%, #fbfaf6 100%)',
      }}
    >
      {/* En-tête marque */}
      <div style={{ display: 'flex', justifyContent: 'center', padding: '34px 0 6px' }}>
        <SojoriLogo size={34} />
      </div>

      {/* Animation d'orchestration */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', padding: '0 10px' }}>
        <div style={{ width: '100%' }}>
          <HeroAnimationJourney />
        </div>
      </div>

      {/* Pied : message + compte */}
      <div style={{ textAlign: 'center', padding: '10px 24px 40px' }}>
        <div
          style={{
            fontSize: 26,
            fontWeight: 700,
            letterSpacing: '-0.02em',
            color: '#1a1408',
            lineHeight: 1.25,
          }}
        >
          Un seul outil.{' '}
          <span
            style={{
              background: 'linear-gradient(135deg, #f4cf5e, #e6b022 55%, #b8881a)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Tout orchestré.
          </span>
        </div>
        <div style={{ marginTop: 10, fontSize: 13, letterSpacing: 1.5, color: '#8a8272', fontWeight: 500 }}>
          @sojoriapp · business.sojori.com
        </div>
      </div>

      {/* Masque les contrôles de lecture (pause/restart/timer) pendant la capture */}
      <style jsx global>{`
        #reel-frame .hero-anim-controls-left {
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
