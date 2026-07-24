'use client';

import { useState } from 'react';
import { BackgroundEffects } from '@/components/BackgroundEffects';
import { PageHeader, PageFooter } from '@/components/SharedComponents';
import { trackOfferCta } from '@/lib/analytics';

const API = '/api/v1/competitor-analysis';

const POINTS = [
  { icon: '🏘️', text: 'Jusqu\'à 20 annonces comparables autour de chez vous' },
  { icon: '💰', text: 'Une estimation du prix de marché pour votre bien' },
  { icon: '📅', text: 'Le taux de remplissage futur de vos concurrents' },
];

export function AnalyseConcurrentsClient() {
  const [email, setEmail] = useState('');
  const [airbnbUrl, setAirbnbUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch(`${API}/request`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, airbnbUrl, source: 'analyse-concurrents' }),
      });
      const data = await res.json();
      if (!res.ok || data.success !== true) {
        throw new Error(data.error || "Une erreur est survenue, réessayez.");
      }
      trackOfferCta('analyse-concurrents');
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
            Gratuit · Résultat par e-mail
          </span>
          <h1 style={{ marginBottom: 18, textWrap: 'balance' }}>
            Découvrez vos<br />
            <span className="gradient-text">20 concurrents Airbnb.</span>
          </h1>
          <p style={{ fontSize: 19, lineHeight: 1.55, color: 'var(--text-2)', maxWidth: 600, margin: '0 auto' }}>
            Collez le lien de votre annonce Airbnb. On analyse les annonces comparables
            autour de vous et on vous envoie une estimation du prix de marché.
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
                  Lien de votre annonce Airbnb
                </label>
                <input
                  type="url"
                  required
                  value={airbnbUrl}
                  onChange={(e) => setAirbnbUrl(e.target.value)}
                  placeholder="https://www.airbnb.com/rooms/12345678"
                  style={{
                    width: '100%', padding: '12px 14px', borderRadius: 10,
                    border: '1px solid var(--glass-border)', background: 'var(--bg-1)',
                    fontSize: 14.5, marginBottom: 8, boxSizing: 'border-box',
                  }}
                />
                <div style={{ fontSize: 12, color: 'var(--text-3)', lineHeight: 1.5, marginBottom: 16, background: 'var(--bg-2)', border: '1px solid var(--glass-border)', borderRadius: 10, padding: '10px 12px' }}>
                  <strong style={{ color: 'var(--text-2)' }}>Comment trouver le bon lien&nbsp;?</strong> Ouvrez votre annonce sur Airbnb,
                  copiez l'adresse de la page&nbsp;: elle doit contenir <code style={{ fontFamily: 'monospace', color: 'var(--text-2)' }}>/rooms/</code> suivi
                  d'un numéro (ex.&nbsp;<code style={{ fontFamily: 'monospace' }}>airbnb.com/rooms/12345678</code>). Les liens raccourcis
                  (<code style={{ fontFamily: 'monospace' }}>abnb.me/…</code>) ou de recherche ne fonctionnent pas.
                  <br />
                  <span style={{ display: 'inline-block', marginTop: 6 }}>
                    ℹ️ Certaines annonces récentes ne sont pas encore référencées dans notre base d'analyse&nbsp;: si c'est le cas,
                    essayez simplement une autre annonce, ou{' '}
                    <a href="analyse-concurrents/exemple" style={{ color: 'var(--text-2)', textDecoration: 'underline' }}>
                      voir un exemple d'analyse
                    </a>.
                  </span>
                </div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6 }}>
                  Votre e-mail
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="vous@entreprise.com"
                  style={{
                    width: '100%', padding: '12px 14px', borderRadius: 10,
                    border: '1px solid var(--glass-border)', background: 'var(--bg-1)',
                    fontSize: 14.5, marginBottom: 20, boxSizing: 'border-box',
                  }}
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-primary"
                  style={{ width: '100%', padding: 14, fontSize: 15, fontWeight: 600, opacity: loading ? 0.6 : 1 }}
                >
                  {loading ? 'Envoi...' : 'Recevoir mon analyse gratuite'}
                </button>
                <p style={{ fontSize: 11, color: 'var(--text-3)', textAlign: 'center', marginTop: 12 }}>
                  Une seule analyse par e-mail. Résultat envoyé sous quelques minutes.
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
