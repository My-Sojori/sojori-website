"use client";

import { HeroAnimationJourney } from './HeroAnimationJourney';

export function Hero() {
  return (
    <section style={{ padding: '80px 32px 60px', position: 'relative' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', maxWidth: 880, margin: '0 auto 48px' }}>
          <span className="badge" style={{ marginBottom: 22 }}>
            <span className="badge-dot"></span>
            ● Orchestrateur · Location courte durée
          </span>
          <h1 style={{ marginBottom: 20, textWrap: 'balance' }}>
            Pas un logiciel qu'on opère.<br />
            <span className="gradient-text">Un logiciel qui orchestre.</span>
          </h1>
          <p style={{ fontSize: 19, lineHeight: 1.55, color: 'var(--text-2)', maxWidth: 680, margin: '0 auto', textWrap: 'pretty' }}>
            Sojori coordonne votre activité de location courte durée comme un humain le ferait — réservation, voyageur, staff, propriétaire. Sauf qu'il ne dort jamais.
            <strong style={{ color: 'var(--text)' }}> Et qu'il ne vous demande pas de piloter.</strong>
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 32, flexWrap: 'wrap' }}>
            <a href="#animation" className="btn btn-primary btn-lg">Voir l'orchestration →</a>
            <a href="/demo?source=homepage-hero" className="btn btn-ghost btn-lg">Demander une démo</a>
          </div>
        </div>

        <div id="animation">
          <HeroAnimationJourney />
        </div>

        <div style={{ textAlign: 'center', marginTop: 18 }} className="mono">
          <span style={{ fontSize: 11, color: 'var(--text-3)', letterSpacing: 1.2 }}>
            RÉSERVATION → VOYAGEUR → STAFF → PROPRIÉTAIRE · UN SEUL FIL CONDUCTEUR
          </span>
        </div>
      </div>
    </section>
  );
}

export function TrustBar() {
  const otas = [
    { name: 'Airbnb', color: '#FF5A5F' },
    { name: 'Booking.com', color: '#003580' },
    { name: 'Expedia', color: '#FFC72C' },
    { name: 'Vrbo', color: '#3D67FF' },
    { name: 'Agoda', color: '#FF6F00' },
    { name: 'TripAdvisor', color: '#34E0A1' },
    { name: 'HomeAway', color: '#0073BB' },
  ];

  return (
    <section style={{ padding: '50px 32px', borderTop: '1px solid var(--glass-border)', borderBottom: '1px solid var(--glass-border)' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div className="uppercase-sm" style={{ textAlign: 'center', color: 'var(--text-3)', marginBottom: 28 }}>
          Intégré avec les meilleures plateformes
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 28, opacity: 0.65 }}>
          {otas.map(o => (
            <div
              key={o.name}
              style={{
                fontSize: 18,
                fontWeight: 700,
                letterSpacing: '-0.02em',
                color: 'var(--text-2)',
                transition: 'all 0.25s ease',
                cursor: 'pointer',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.color = o.color;
                e.currentTarget.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.color = 'var(--text-2)';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              {o.name}
            </div>
          ))}
          <div style={{ fontSize: 13, color: 'var(--text-3)', fontWeight: 500 }}>+15 autres</div>
        </div>
        <div style={{ textAlign: 'center', marginTop: 22, fontSize: 13, color: 'var(--text-3)' }}>
          Sync temps réel · Évite l'overbooking · 2 à 2 000+ propriétés
        </div>
      </div>
    </section>
  );
}
