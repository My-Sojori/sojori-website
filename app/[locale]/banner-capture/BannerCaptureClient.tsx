"use client";

import { SojoriLogo, SojoriMark } from '@/components/Logo';

/**
 * Bannières LinkedIn — capture d'écran, pas de génération d'image.
 *
 * Deux cadres aux dimensions officielles :
 *   • page entreprise : 1128×191 — le logo rond de la page masque le coin
 *     bas-gauche, d'où le décalage du contenu vers la droite ;
 *   • profil personnel : 1584×396 — la photo de profil masque le bas-gauche
 *     sur ~250 px de large, et l'affichage mobile rogne les bords.
 *
 * Le contenu reste donc dans la moitié droite et loin des bords.
 */

const GOLD_TEXT = {
  background: 'linear-gradient(135deg, #f4cf5e, #e6b022 55%, #b8881a)',
  WebkitBackgroundClip: 'text' as const,
  WebkitTextFillColor: 'transparent' as const,
};

const DARK_BG =
  'radial-gradient(ellipse 60% 120% at 88% 50%, rgba(230,176,34,0.18), transparent 62%),' +
  'radial-gradient(ellipse 50% 100% at 55% 100%, rgba(139,92,246,0.10), transparent 60%),' +
  'linear-gradient(120deg, #120e05 0%, #1a1408 55%, #241b0b 100%)';

/** Les trois domaines orchestrés, en pastilles discrètes. */
function Domains({ fontSize = 12, gap = 22 }: { fontSize?: number; gap?: number }) {
  const items = [
    { label: 'EXPÉRIENCE CLIENT', color: '#06b6d4' },
    { label: 'OPÉRATIONS', color: '#8b5cf6' },
    { label: 'REVENU', color: '#10b981' },
  ];
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap }}>
      {items.map((it, i) => (
        <div key={it.label} style={{ display: 'flex', alignItems: 'center', gap }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: 999,
                background: it.color,
                boxShadow: `0 0 10px ${it.color}`,
              }}
            />
            <span
              style={{
                fontSize,
                letterSpacing: 1.6,
                color: 'rgba(255,255,255,0.62)',
                fontWeight: 600,
              }}
            >
              {it.label}
            </span>
          </div>
          {i < items.length - 1 && (
            <span style={{ color: 'rgba(255,255,255,0.22)', fontSize }}>→</span>
          )}
        </div>
      ))}
    </div>
  );
}

export function BannerCaptureClient() {
  return (
    <div style={{ padding: 28, background: '#f2f0ea', minHeight: '100vh' }}>
      {/* ------------------------------------------------ PAGE ENTREPRISE */}
      <p style={legend}>Page entreprise — 1128 × 191</p>
      <div
        id="banner-company"
        style={{
          width: 1128,
          height: 191,
          background: DARK_BG,
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          // Le logo rond de la page couvre le coin bas-gauche : on décale.
          padding: '0 60px 0 232px',
        }}
      >
        <div>
          <div
            style={{
              fontSize: 31,
              fontWeight: 800,
              letterSpacing: '-0.025em',
              color: '#ffffff',
              lineHeight: 1.12,
            }}
          >
            Le moteur d&apos;orchestration <span style={GOLD_TEXT}>de l&apos;hospitalité</span>
          </div>
          <div style={{ marginTop: 13 }}>
            <Domains />
          </div>
        </div>
      </div>

      {/* -------------------------------------------------- PROFIL PERSO */}
      <p style={{ ...legend, marginTop: 40 }}>Profil personnel — 1584 × 396</p>
      <div
        id="banner-profile"
        style={{
          width: 1584,
          height: 396,
          background: DARK_BG,
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          // La photo de profil masque le bas-gauche : contenu à droite.
          padding: '0 96px 0 470px',
        }}
      >
        {/* Filigrane : la marque, très discrète, côté droit */}
        <div
          style={{
            position: 'absolute',
            right: -40,
            top: '50%',
            transform: 'translateY(-50%)',
            opacity: 0.07,
          }}
        >
          <SojoriMark size={360} />
        </div>

        <div style={{ position: 'relative' }}>
          <div style={{ marginBottom: 20 }}>
            <SojoriLogo size={34} color="#ffffff" />
          </div>
          <div
            style={{
              fontSize: 50,
              fontWeight: 800,
              letterSpacing: '-0.03em',
              color: '#ffffff',
              lineHeight: 1.1,
            }}
          >
            Le moteur d&apos;orchestration
            <br />
            <span style={GOLD_TEXT}>de l&apos;hospitalité</span>
          </div>
          <div style={{ marginTop: 22 }}>
            <Domains fontSize={13} gap={26} />
          </div>
          <div
            style={{
              marginTop: 18,
              fontSize: 14,
              color: 'rgba(255,255,255,0.45)',
              letterSpacing: 0.4,
            }}
          >
            sojori.com
          </div>
        </div>
      </div>

      <style jsx global>{`
        html,
        body {
          background: #f2f0ea;
        }
      `}</style>
    </div>
  );
}

const legend: React.CSSProperties = {
  fontSize: 12,
  letterSpacing: 1.4,
  color: '#8a8272',
  fontWeight: 600,
  marginBottom: 10,
  fontFamily: 'ui-sans-serif, system-ui, sans-serif',
};
