'use client';

import { useState } from 'react';
import { BackgroundEffects } from '@/components/BackgroundEffects';
import { PageHeader, PageFooter } from '@/components/SharedComponents';
import {
  AnalyseResultatClient,
  type AnalysisResult,
} from '../resultat/AnalyseResultatClient';

/**
 * ⚠️ TEMPORAIRE — lab privé (coller URL → résultat sans e-mail).
 * À supprimer après QA / Claude Design.
 */
export function LabClient({ previewSecret }: { previewSecret: string }) {
  const [airbnbUrl, setAirbnbUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const run = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch('/api/v1/competitor-analysis/preview', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ airbnbUrl, previewSecret }),
      });
      const data = await res.json();
      if (!res.ok || data.success !== true) {
        throw new Error(data.error || 'Échec analyse');
      }
      setResult(data.data as AnalysisResult);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur');
    } finally {
      setLoading(false);
    }
  };

  if (result) {
    const yours = result.yourPriceSeries;
    const best = result.bestCompetitorPriceSeries;
    const rawDump = {
      yourEstimate12m: yours?.estimate12m ?? null,
      yourMonthlyHistory: yours?.monthlyHistory ?? [],
      yourCalendarDaysCount: yours?.calendarDaysCount ?? 0,
      yourCalendarDaysSample: (yours?.calendarDays ?? []).slice(0, 14),
      yourCalendarDays: yours?.calendarDays ?? [],
      bestCompetitorId: result.bestCompetitor?.airbnbListingId ?? null,
      bestCompetitorName: result.bestCompetitor?.name ?? null,
      bestEstimate12m: best?.estimate12m ?? null,
      bestMonthlyHistory: best?.monthlyHistory ?? [],
      bestCalendarDaysCount: best?.calendarDaysCount ?? 0,
      bestCalendarDaysSample: (best?.calendarDays ?? []).slice(0, 14),
      bestCalendarDays: best?.calendarDays ?? [],
    };

    return (
      <div>
        <div style={{ position: 'sticky', top: 0, zIndex: 50, background: 'var(--bg-0)', borderBottom: '1px solid var(--glass-border)', padding: '10px 16px', display: 'flex', gap: 12, alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap' }}>
          <span style={{ fontSize: 12, color: 'var(--text-3)' }}>LAB privé · brut calendriers</span>
          <button
            type="button"
            className="btn btn-ghost"
            style={{ fontSize: 13, padding: '6px 12px' }}
            onClick={() => setResult(null)}
          >
            ← Nouvelle annonce
          </button>
        </div>

        <section style={{ maxWidth: 980, margin: '0 auto', padding: '20px 16px', position: 'relative', zIndex: 1 }}>
          <h2 style={{ fontSize: 16, marginBottom: 8 }}>Données brutes (estimation 12m + calendriers)</h2>
          <p style={{ fontSize: 13, color: 'var(--text-3)', marginBottom: 12 }}>
            your : {rawDump.yourCalendarDaysCount} jours · best : {rawDump.bestCalendarDaysCount} jours ·
            mois your/best : {rawDump.yourMonthlyHistory.length}/{rawDump.bestMonthlyHistory.length}
          </p>
          <pre
            style={{
              fontSize: 11,
              lineHeight: 1.35,
              overflow: 'auto',
              maxHeight: 420,
              padding: 14,
              borderRadius: 12,
              background: 'rgba(0,0,0,0.04)',
              border: '1px solid var(--glass-border)',
              marginBottom: 28,
            }}
          >
            {JSON.stringify(rawDump, null, 2)}
          </pre>
        </section>

        <AnalyseResultatClient initialToken="lab" initialResult={result} initialState="ready" />
      </div>
    );
  }

  return (
    <>
      <BackgroundEffects />
      <PageHeader />
      <section style={{ padding: '80px 20px', maxWidth: 480, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div className="badge" style={{ marginBottom: 16 }}>
          <span className="badge-dot" />
          Lab privé · sans e-mail
        </div>
        <h1 style={{ marginBottom: 10, fontSize: 28 }}>Tester une annonce</h1>
        <p style={{ color: 'var(--text-2)', fontSize: 14, marginBottom: 22, lineHeight: 1.45 }}>
          Colle un lien Airbnb → analyse complète immédiate (coût API réel).
        </p>
        <form onSubmit={run} className="glass" style={{ padding: 22, borderRadius: 14 }}>
          {error && (
            <div style={{ marginBottom: 12, color: '#dc2626', fontSize: 13.5 }}>{error}</div>
          )}
          <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6 }}>
            Lien Airbnb
          </label>
          <input
            type="url"
            required
            value={airbnbUrl}
            onChange={(e) => setAirbnbUrl(e.target.value)}
            placeholder="https://www.airbnb.com/rooms/…"
            style={{
              width: '100%',
              padding: '12px 14px',
              borderRadius: 10,
              border: '1px solid var(--glass-border)',
              background: 'var(--bg-1)',
              fontSize: 14.5,
              marginBottom: 14,
              boxSizing: 'border-box',
            }}
          />
          <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%' }} disabled={loading}>
            {loading ? 'Analyse en cours (≈1 min)…' : 'Lancer l’analyse'}
          </button>
        </form>
      </section>
      <PageFooter />
    </>
  );
}
