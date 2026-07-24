'use client';

import { useEffect, useState } from 'react';
import { useLocale } from 'next-intl';
import './resultat.css';
import { Header, ZelBg, Icon } from './sjrShared';
import { SjrLoadingView } from './sjrLoading';
import { SjrReadyView } from './sjrResult';
import { toSjrData } from './sjrAdapter';

const API = '/api/v1/competitor-analysis';

/* ---- Types du résultat API (inchangés — utilisés par page.tsx, exampleData, adapter) ---- */
type CompetitorCard = {
  airbnbListingId: string | null;
  name: string | null;
  photoUrl: string | null;
  photoUrls?: string[];
  bedrooms: number | null;
  beds?: number | null;
  baths?: number | null;
  guests: number | null;
  rating: number | null;
  reviewsCount: number | null;
  superhost?: boolean | null;
  adrUsd: number | null;
  adrMad: number | null;
  occupancy: number | null;
  revenueTtmUsd?: number | null;
  revenueTtmMad?: number | null;
  revparMad?: number | null;
  locality?: string | null;
  latitude?: number | null;
  longitude?: number | null;
  distanceMeters?: number | null;
  amenities?: string[];
};

type ListingProfile = CompetitorCard & { airbnbListingId: string };

type AmenitiesDiff = { shared: string[]; onlyYours: string[]; onlyTheirs: string[] };

type Bilan = {
  headline: string;
  strengths: string[];
  gaps: string[];
  actions: string[];
  bestCompetitorWhy: string;
  model?: string;
};

type PriceSeriesBundle = {
  estimate12m: { revenueMad: number | null; adrMad: number | null; occupancy: number | null; revparMad: number | null };
  monthlyHistory: Array<{ month: string; revenueMad: number | null; adrMad: number | null; occupancy: number | null; revparMad: number | null }>;
  calendarDays: Array<{ date: string; rateMad: number | null; rateUsd: number | null; available: boolean | null; minNights: number | null }>;
  calendarDaysCount: number;
  currencySource: string;
};

export type AnalysisResult = {
  yourListing: ListingProfile;
  estimatedMarketPriceUsd: number | null;
  estimatedMarketPriceMad: number | null;
  estimatedMarketRevenueTtmMad?: number | null;
  competitorsCount: number;
  competitors: CompetitorCard[];
  bestCompetitor?: CompetitorCard | null;
  amenitiesDiff?: AmenitiesDiff | null;
  bilan?: Bilan | null;
  yourPriceSeries?: PriceSeriesBundle | null;
  bestCompetitorPriceSeries?: PriceSeriesBundle | null;
};

type LoadState = 'loading' | 'error' | 'expired' | 'ready';

export function AnalyseResultatClient({
  initialToken = '',
  initialResult = null,
  initialState,
  initialError = '',
}: {
  initialToken?: string;
  initialResult?: AnalysisResult | null;
  initialState?: LoadState;
  initialError?: string;
}) {
  const token = initialToken.trim();

  const [state, setState] = useState<LoadState>(
    initialState ?? (initialResult ? 'ready' : token ? 'loading' : 'error'),
  );
  const [error, setError] = useState(
    initialError || (token || initialResult ? '' : 'Lien invalide — token manquant.'),
  );
  const [result, setResult] = useState<AnalysisResult | null>(initialResult);

  useEffect(() => {
    if (initialResult || initialState === 'expired' || initialState === 'error') return;
    if (!token) return;
    let cancelled = false;
    // On garde l'écran de chargement animé au moins MIN_LOADING_MS pour que le
    // client voie l'analyse "travailler" (les 5 étapes), même si le résultat
    // arrive plus vite (cache). Les erreurs s'affichent immédiatement.
    const MIN_LOADING_MS = 8000;
    const startedAt = Date.now();
    (async () => {
      try {
        const res = await fetch(`${API}/result/${encodeURIComponent(token)}`);
        const data = await res.json();
        if (cancelled) return;
        if (res.status === 410) {
          setState('expired');
          return;
        }
        if (!res.ok || data.success !== true) {
          setState('error');
          setError(data.error || "Impossible de charger l'analyse.");
          return;
        }
        const wait = Math.max(0, MIN_LOADING_MS - (Date.now() - startedAt));
        await new Promise((r) => setTimeout(r, wait));
        if (cancelled) return;
        setResult(data.data as AnalysisResult);
        setState('ready');
      } catch (e) {
        if (!cancelled) {
          setState('error');
          setError(e instanceof Error ? e.message : 'Connexion impossible. Réessayez.');
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [token, initialResult, initialState]);

  return (
    <div className="sjr-scope">
      {state === 'loading' && <SjrLoadingView photoUrl={null} />}
      {state === 'expired' && <ExpiredView />}
      {state === 'error' && <ErrorView message={error} />}
      {state === 'ready' && result && <SjrReadyView data={toSjrData(result)} />}
    </div>
  );
}

function ExpiredView() {
  const locale = useLocale();
  return (
    <div className="page">
      <ZelBg />
      <Header />
      <div style={{ maxWidth: 480, margin: '0 auto', padding: '80px 20px', textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <div style={{ fontSize: 40, marginBottom: 16 }}>⏱️</div>
        <h1 style={{ fontSize: 'clamp(26px,7vw,34px)', marginBottom: 10 }}>Ce lien a expiré</h1>
        <p style={{ color: 'var(--ink2)', fontSize: 15, marginBottom: 26, lineHeight: 1.5 }}>
          Les liens d&apos;analyse sont valables 24&nbsp;heures. Refaites une demande, c&apos;est gratuit.
        </p>
        <a href={`/${locale}/analyse-concurrents`} className="btn btn-primary btn-lg">Refaire une demande</a>
      </div>
    </div>
  );
}

function ErrorView({ message }: { message: string }) {
  const locale = useLocale();
  return (
    <div className="page">
      <ZelBg />
      <Header />
      <div style={{ maxWidth: 480, margin: '0 auto', padding: '80px 20px', textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <div style={{ fontSize: 40, marginBottom: 16 }}>⚠️</div>
        <h1 style={{ fontSize: 'clamp(26px,7vw,34px)', marginBottom: 10 }}>Impossible de charger l&apos;analyse</h1>
        <p style={{ color: 'var(--ink2)', fontSize: 15, marginBottom: 26, lineHeight: 1.5 }}>{message}</p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href={`/${locale}/analyse-concurrents`} className="btn btn-primary btn-lg">Réessayer</a>
          <a href={`/${locale}/analyse-concurrents/exemple`} className="btn btn-ghost btn-lg" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
            Voir un exemple<Icon name="arrowR" size={18} />
          </a>
        </div>
      </div>
    </div>
  );
}
