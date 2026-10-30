'use client';

import { useState } from 'react';
import { BackgroundEffects } from '@/components/BackgroundEffects';
import { PageHeader, PageFooter } from '@/components/SharedComponents';
import { trackDemoLead } from '@/lib/analytics';

const API = '/api/v1/competitor-analysis';

const POINTS = [
  { icon: '💰', text: 'Combien votre bien devrait gagner (estimation sur 12 mois)' },
  { icon: '🏘️', text: 'Vos 20 concurrents Airbnb directs, autour de votre bien' },
  { icon: '📊', text: 'Où vous vous situez : prix, occupation, revenu' },
];

// A/B test sur le libellé du bouton : "Estimer" vs "Simuler".
// Attribué au hasard côté client, mémorisé pour la session, envoyé en source.
function pickCtaVariant(): 'estimer' | 'simuler' {
  if (typeof window === 'undefined') return 'estimer';
  try {
    const saved = window.sessionStorage.getItem('ac_cta_variant');
    if (saved === 'estimer' || saved === 'simuler') return saved;
    const v = Math.random() < 0.5 ? 'estimer' : 'simuler';
    window.sessionStorage.setItem('ac_cta_variant', v);
    return v;
  } catch {
    return 'estimer';
  }
}

export function AnalyseConcurrentsClient() {
  const [email, setEmail] = useState('');
  const [airbnbUrl, setAirbnbUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [cta] = useState(pickCtaVariant);
  const ctaLabel = cta === 'simuler' ? 'Simuler mes revenus' : 'Estimer mes revenus';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch(`${API}/request`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, airbnbUrl, source: `analyse-concurrents-${cta}` }),
      });
      const data = await res.json();
      if (!res.ok || data.success !== true) {
        throw new Error(data.error || "Une erreur est survenue, réessayez.");
      }
      // Soumission réussie = vrai lead (email + annonce reçus) → événement Lead
      // pour suivre les conversions de la pub et optimiser dessus.
      trackDemoLead(`analyse-concurrents-${cta}`);
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <BackgroundEffects />
      <PageHeader />

      <section style={{ padding: 'clamp(48px, 12vw, 90px) clamp(16px, 5vw, 32px) 70px', textAlign: 'center', position: 'relative' }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <span className="badge" style={{ marginBottom: 22 }}>
            <span className="badge-dot"></span>
            100% gratuit · Résultat instantané
          </span>
          <h1 style={{ marginBottom: 18, textWrap: 'balance' }}>
            Propriétaire d&apos;un<br />
            <span className="gradient-text">Airbnb&nbsp;?</span>
          </h1>
          <p style={{ fontSize: 19, lineHeight: 1.55, color: 'var(--text-2)', maxWidth: 600, margin: '0 auto' }}>
            Découvrez <strong style={{ color: 'var(--text-1)' }}>combien votre bien devrait gagner</strong> —
            et comparez-vous à vos <strong style={{ color: 'var(--text-1)' }}>20 concurrents Airbnb</strong> directs.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, maxWidth: 420, margin: '30px auto 0', textAlign: 'left' }}>
            {POINTS.map((p) => (
              <div key={p.text} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', fontSize: 14.5, color: 'var(--text-2)' }}>
                <span>{p.icon}</span>
                <span>{p.text}</span>
              </div>
            ))}
          </div>

          <div
            className="glass"
            style={{ maxWidth: 460, margin: '36px auto 0', padding: 28, borderRadius: 16, textAlign: 'left' }}
          >
            {submitted ? (
              <div style={{ textAlign: 'center', padding: '20px 8px' }}>
                <div style={{ fontSize: 32, marginBottom: 12 }}>📬</div>
                <div style={{ fontWeight: 700, fontSize: 17, marginBottom: 8 }}>Vérifiez votre boîte mail</div>
                <p style={{ fontSize: 14, color: 'var(--text-2)', lineHeight: 1.5 }}>
                  On vous a envoyé un lien pour consulter votre analyse (valable 24h).
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                {error && (
                  <div
                    style={{
                      padding: 12, borderRadius: 8, background: 'rgba(239,68,68,0.1)',
                      border: '1px solid rgba(239,68,68,0.25)', marginBottom: 16, color: '#dc2626', fontSize: 13.5,
                    }}
                  >
                    {error}
                  </div>
                )}
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6 }}>
                  Votre e-mail
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="vous@email.com"
                  style={{
                    width: '100%', padding: '12px 14px', borderRadius: 10,
                    border: '1px solid var(--glass-border)', background: 'var(--bg-1)',
                    fontSize: 14.5, marginBottom: 16, boxSizing: 'border-box',
                  }}
                />
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6 }}>
                  Le lien de votre annonce Airbnb
                </label>
                <input
                  type="url"
                  required
                  value={airbnbUrl}
                  onChange={(e) => setAirbnbUrl(e.target.value)}
                  placeholder="https://www.airbnb.com/rooms/…"
                  style={{
                    width: '100%', padding: '12px 14px', borderRadius: 10,
                    border: '1px solid var(--glass-border)', background: 'var(--bg-1)',
                    fontSize: 14.5, marginBottom: 8, boxSizing: 'border-box',
                  }}
                />
                <details style={{ fontSize: 12, color: 'var(--text-3)', lineHeight: 1.5, marginBottom: 18 }}>
                  <summary style={{ cursor: 'pointer', color: 'var(--text-2)', fontWeight: 600 }}>Comment trouver le lien de mon annonce&nbsp;?</summary>
                  <div style={{ marginTop: 8, background: 'var(--bg-2)', border: '1px solid var(--glass-border)', borderRadius: 10, padding: '10px 12px' }}>
                    Ouvrez votre annonce sur Airbnb et copiez l&apos;adresse de la page&nbsp;: elle contient{' '}
                    <code style={{ fontFamily: 'monospace', color: 'var(--text-2)' }}>/rooms/</code> suivi d&apos;un numéro
                    (ex.&nbsp;<code style={{ fontFamily: 'monospace' }}>airbnb.com/rooms/12345678</code>). Les liens raccourcis ne fonctionnent pas.
                    <br />
                    <span style={{ display: 'inline-block', marginTop: 6 }}>
                      ℹ️ Annonce récente pas encore référencée&nbsp;? Essayez-en une autre ou{' '}
                      <a href="analyse-concurrents/exemple" style={{ color: 'var(--text-2)', textDecoration: 'underline' }}>voir un exemple</a>.
                    </span>
                  </div>
                </details>
                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-primary"
                  style={{ width: '100%', padding: 14, fontSize: 15, fontWeight: 600, opacity: loading ? 0.6 : 1 }}
                >
                  {loading ? 'Analyse en cours…' : ctaLabel}
                </button>
                <p style={{ fontSize: 11, color: 'var(--text-3)', textAlign: 'center', marginTop: 12 }}>
                  Gratuit · une seule analyse par e-mail · résultat immédiat.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      <PageFooter />
    </>
  );
}
