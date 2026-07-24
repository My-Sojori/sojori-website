'use client';

import { useEffect, useMemo, useState, type CSSProperties } from 'react';
import { useLocale } from 'next-intl';
import { BackgroundEffects } from '@/components/BackgroundEffects';
import { PageHeader, PageFooter } from '@/components/SharedComponents';
import { Link } from '@/i18n/routing';
import { CompetitorsMap } from './CompetitorsMap';

const API = '/api/v1/competitor-analysis';

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

type ListingProfile = CompetitorCard & {
  airbnbListingId: string;
};

type AmenitiesDiff = {
  shared: string[];
  onlyYours: string[];
  onlyTheirs: string[];
};

type Bilan = {
  headline: string;
  strengths: string[];
  gaps: string[];
  actions: string[];
  bestCompetitorWhy: string;
  model?: string;
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

type PriceSeriesBundle = {
  estimate12m: {
    revenueMad: number | null;
    adrMad: number | null;
    occupancy: number | null;
    revparMad: number | null;
  };
  monthlyHistory: Array<{
    month: string;
    revenueMad: number | null;
    adrMad: number | null;
    occupancy: number | null;
    revparMad: number | null;
  }>;
  calendarDays: Array<{
    date: string;
    rateMad: number | null;
    rateUsd: number | null;
    available: boolean | null;
    minNights: number | null;
  }>;
  calendarDaysCount: number;
  currencySource: string;
};

type LoadState = 'loading' | 'error' | 'expired' | 'ready';
type SortKey = 'distance' | 'rating' | 'adr' | 'occupancy' | 'revenue';

function fmtMad(n: number | null | undefined): string {
  if (n == null || !Number.isFinite(n)) return '—';
  return `${Math.round(n).toLocaleString('fr-FR')} MAD`;
}

function fmtPct(n: number | null | undefined): string {
  if (n == null || !Number.isFinite(n)) return '—';
  return `${Math.round(n * 100)} %`;
}

function fmtDist(m: number | null | undefined): string {
  if (m == null || !Number.isFinite(m)) return '—';
  if (m < 1000) return `${Math.round(m)} m`;
  return `${(m / 1000).toFixed(1)} km`;
}

function airbnbUrl(id: string | null | undefined): string | null {
  const s = String(id ?? '').trim();
  if (!/^\d{5,20}$/.test(s)) return null;
  return `https://www.airbnb.fr/rooms/${s}`;
}

function amenityLabel(a: string): string {
  return a.replace(/_/g, ' ');
}

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
    <>
      <BackgroundEffects />
      <PageHeader />

      <section
        style={{
          padding: 'clamp(48px, 10vw, 80px) clamp(16px, 4vw, 24px) 70px',
          maxWidth: 980,
          margin: '0 auto',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {state === 'loading' && <LoadingView />}
        {state === 'expired' && <ExpiredView />}
        {state === 'error' && <ErrorView message={error} />}
        {state === 'ready' && result && <ReadyView result={result} />}
      </section>

      <PageFooter />
    </>
  );
}

const LOADING_STEPS = [
  { icon: '🏠', label: 'Lecture de votre annonce' },
  { icon: '🗺️', label: 'Recherche des concurrents autour de vous' },
  { icon: '📊', label: 'Calcul du prix de marché' },
  { icon: '✨', label: 'Préparation de votre bilan personnalisé' },
];

function LoadingView() {
  const [step, setStep] = useState(0);
  useEffect(() => {
    // avance d'une étape toutes ~2,2s ; se fige sur la dernière (le vrai résultat
    // arrive quand l'API répond, la barre ne prétend jamais être "finie" avant).
    const id = setInterval(() => {
      setStep((s) => (s < LOADING_STEPS.length - 1 ? s + 1 : s));
    }, 2200);
    return () => clearInterval(id);
  }, []);

  return (
    <div style={{ textAlign: 'center', padding: '60px 20px', maxWidth: 440, margin: '0 auto' }}>
      <div className="mono" style={{ fontSize: 13, color: 'var(--text-3)', letterSpacing: 1.2, marginBottom: 14 }}>
        ANALYSE EN COURS
      </div>
      <h2 style={{ marginBottom: 6 }}>On analyse votre annonce…</h2>
      <p style={{ color: 'var(--text-2)', fontSize: 14, marginBottom: 30 }}>
        Cela prend quelques secondes, ne fermez pas cette page.
      </p>

      {/* barre de progression */}
      <div style={{ height: 6, borderRadius: 999, background: 'var(--glass-border)', overflow: 'hidden', marginBottom: 28 }}>
        <div
          style={{
            height: '100%',
            width: `${((step + 1) / LOADING_STEPS.length) * 100}%`,
            background: 'linear-gradient(90deg, #f4cf5e, #e6b022)',
            borderRadius: 999,
            transition: 'width 0.6s cubic-bezier(0.4,0,0.2,1)',
          }}
        />
      </div>

      {/* étapes */}
      <div style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', gap: 14 }}>
        {LOADING_STEPS.map((s, i) => {
          const done = i < step;
          const active = i === step;
          return (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                opacity: done || active ? 1 : 0.4,
                transition: 'opacity 0.4s ease',
              }}
            >
              <span
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: '50%',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 15,
                  flexShrink: 0,
                  background: done ? 'rgba(230,176,34,0.18)' : active ? 'rgba(230,176,34,0.12)' : 'var(--glass-border)',
                  border: active ? '1px solid #e6b022' : '1px solid transparent',
                }}
              >
                {done ? '✓' : s.icon}
              </span>
              <span style={{ fontSize: 14.5, fontWeight: active ? 600 : 400, color: active ? 'var(--text)' : 'var(--text-2)' }}>
                {s.label}
                {active && <span className="mono" style={{ marginLeft: 6, color: '#e6b022' }}>…</span>}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ExpiredView() {
  const locale = useLocale();
  return (
    <div style={{ textAlign: 'center', padding: '60px 20px' }}>
      <div style={{ fontSize: 40, marginBottom: 16 }}>⏱️</div>
      <h2 style={{ marginBottom: 10 }}>Ce lien a expiré</h2>
      <p style={{ color: 'var(--text-2)', fontSize: 15, marginBottom: 26 }}>
        Les liens d&apos;analyse sont valables 24 heures. Refaites une demande, c&apos;est gratuit.
      </p>
      <a href={`/${locale}/analyse-concurrents`} className="btn btn-primary btn-lg">
        Refaire une demande
      </a>
    </div>
  );
}

function ErrorView({ message }: { message: string }) {
  const locale = useLocale();
  return (
    <div style={{ textAlign: 'center', padding: '60px 20px' }}>
      <div style={{ fontSize: 40, marginBottom: 16 }}>⚠️</div>
      <h2 style={{ marginBottom: 10 }}>Impossible de charger l&apos;analyse</h2>
      <p style={{ color: 'var(--text-2)', fontSize: 15, marginBottom: 26 }}>{message}</p>
      <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
        <a href={`/${locale}/analyse-concurrents`} className="btn btn-primary btn-lg">
          Réessayer
        </a>
        <a href={`/${locale}/analyse-concurrents/exemple`} className="btn btn-lg" style={{ border: '1px solid var(--glass-border)' }}>
          Voir un exemple d&apos;analyse
        </a>
      </div>
    </div>
  );
}

function ReadyView({ result }: { result: AnalysisResult }) {
  const best = result.bestCompetitor ?? null;
  const bilan = result.bilan;
  const marketYear = result.estimatedMarketRevenueTtmMad;
  const marketNight = result.estimatedMarketPriceMad;

  return (
    <div>
      <div style={{ textAlign: 'center', marginBottom: 28 }}>
        <span className="badge" style={{ marginBottom: 16 }}>
          <span className="badge-dot"></span>
          Estimation marché · 12 mois
        </span>
        <div className="uppercase-sm" style={{ color: 'var(--text-3)', marginBottom: 8 }}>
          Prix estimé sur un an
        </div>
        <h1 style={{ marginBottom: 8, fontSize: 'clamp(36px, 7vw, 52px)', letterSpacing: '-0.03em' }}>
          <span className="gradient-text">{fmtMad(marketYear)}</span>
        </h1>
        <p style={{ fontSize: 16, color: 'var(--text-2)', marginBottom: 6 }}>
          soit environ <strong>{fmtMad(marketNight)}</strong>/nuit · basé sur{' '}
          <strong>{result.competitorsCount} concurrents</strong> autour de vous
        </p>
        {bilan?.headline && (
          <p
            style={{
              fontSize: 14.5,
              color: 'var(--text-3)',
              maxWidth: 640,
              margin: '14px auto 0',
              lineHeight: 1.45,
            }}
          >
            {bilan.headline}
          </p>
        )}
      </div>

      <KpiRow result={result} />

      {bilan && <BilanBlock bilan={bilan} />}

      {best && (
        <BestCompare
          you={result.yourListing}
          best={best}
          amenitiesDiff={result.amenitiesDiff ?? null}
          why={bilan?.bestCompetitorWhy}
        />
      )}

      <CompetitorsMap
        you={{
          id: 'you',
          name: result.yourListing.name,
          lat: result.yourListing.latitude,
          lng: result.yourListing.longitude,
          adrMad: result.yourListing.adrMad,
          occupancy: result.yourListing.occupancy,
          revenueTtmMad: result.yourListing.revenueTtmMad,
          isYou: true,
        }}
        competitors={result.competitors.map((c) => ({
          id: c.airbnbListingId ?? c.name ?? Math.random().toString(36),
          name: c.name,
          lat: c.latitude,
          lng: c.longitude,
          adrMad: c.adrMad,
          occupancy: c.occupancy,
          revenueTtmMad: c.revenueTtmMad,
          distanceMeters: c.distanceMeters,
        }))}
      />

      <CompsTable competitors={result.competitors} />

      <div
        style={{
          textAlign: 'center',
          padding: '40px 24px',
          marginTop: 36,
          background:
            'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(230,176,34,0.14), transparent 70%)',
          borderRadius: 20,
        }}
      >
        <h2 style={{ marginBottom: 12 }}>
          Envie de <span className="gradient-text">battre ces prix</span> automatiquement ?
        </h2>
        <p style={{ fontSize: 15, color: 'var(--text-2)', maxWidth: 480, margin: '0 auto 22px' }}>
          Sojori ajuste vos prix chaque jour en fonction de vos concurrents. Découvrez-le en 15 minutes.
        </p>
        <Link
          href={{ pathname: '/demo', query: { source: 'analyse-concurrents-resultat' } }}
          className="btn btn-primary btn-lg"
          prefetch={false}
        >
          Réserver ma démo
        </Link>
      </div>
    </div>
  );
}

function KpiRow({ result }: { result: AnalysisResult }) {
  const you = result.yourListing;
  const cards = [
    { label: 'Prix marché estimé / nuit', value: fmtMad(result.estimatedMarketPriceMad) },
    { label: 'Revenu marché estimé / 12 mois', value: fmtMad(result.estimatedMarketRevenueTtmMad) },
    { label: 'Votre revenu TTM', value: fmtMad(you.revenueTtmMad) },
    { label: 'Votre occupation TTM', value: fmtPct(you.occupancy) },
  ];
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        gap: 12,
        marginBottom: 28,
      }}
    >
      {cards.map((c) => (
        <div key={c.label} className="glass" style={{ padding: '18px 16px', borderRadius: 14, textAlign: 'center' }}>
          <div className="uppercase-sm" style={{ color: 'var(--text-3)', marginBottom: 8, fontSize: 11 }}>
            {c.label}
          </div>
          <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: '-0.02em' }}>
            <span className="gradient-text">{c.value}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

function BilanBlock({ bilan }: { bilan: Bilan }) {
  return (
    <div className="glass" style={{ padding: 24, borderRadius: 16, marginBottom: 28 }}>
      <div className="uppercase-sm" style={{ color: 'var(--text-3)', marginBottom: 14 }}>
        Bilan Sojori
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: 18,
        }}
      >
        <BulletColumn title="Points forts" items={bilan.strengths} tone="good" />
        <BulletColumn title="Écarts" items={bilan.gaps} tone="warn" />
        <BulletColumn title="Actions" items={bilan.actions} tone="action" />
      </div>
    </div>
  );
}

function BulletColumn({
  title,
  items,
  tone,
}: {
  title: string;
  items: string[];
  tone: 'good' | 'warn' | 'action';
}) {
  const color = tone === 'good' ? '#16a34a' : tone === 'warn' ? '#d97706' : 'var(--goldD, #b8881a)';
  return (
    <div>
      <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 8, color }}>{title}</div>
      <ul style={{ margin: 0, paddingLeft: 18, color: 'var(--text-2)', fontSize: 13.5, lineHeight: 1.45 }}>
        {(items.length ? items : ['—']).map((t) => (
          <li key={t} style={{ marginBottom: 6 }}>
            {t}
          </li>
        ))}
      </ul>
    </div>
  );
}

function BestCompare({
  you,
  best,
  amenitiesDiff,
  why,
}: {
  you: ListingProfile;
  best: CompetitorCard;
  amenitiesDiff: AmenitiesDiff | null;
  why?: string;
}) {
  const bestUrl = airbnbUrl(best.airbnbListingId);
  const youPhotos = you.photoUrls?.length ? you.photoUrls : you.photoUrl ? [you.photoUrl] : [];
  const bestPhotos = best.photoUrls?.length ? best.photoUrls : best.photoUrl ? [best.photoUrl] : [];

  const rows: { label: string; a: string; b: string }[] = [
    {
      label: 'Note · avis',
      a: you.rating != null ? `★ ${you.rating.toFixed(2)} · ${you.reviewsCount ?? 0}` : '—',
      b: best.rating != null ? `★ ${best.rating.toFixed(2)} · ${best.reviewsCount ?? 0}` : '—',
    },
    {
      label: 'Ch. · sdb · pers.',
      a: `${you.bedrooms ?? '—'} · ${you.baths ?? '—'} · ${you.guests ?? '—'}`,
      b: `${best.bedrooms ?? '—'} · ${best.baths ?? '—'} · ${best.guests ?? '—'}`,
    },
    { label: 'ADR TTM', a: fmtMad(you.adrMad), b: fmtMad(best.adrMad) },
    { label: 'Occupation TTM', a: fmtPct(you.occupancy), b: fmtPct(best.occupancy) },
    { label: 'Revenu 12 mois', a: fmtMad(you.revenueTtmMad), b: fmtMad(best.revenueTtmMad) },
    { label: 'Distance', a: 'Votre bien', b: fmtDist(best.distanceMeters) },
  ];

  return (
    <div style={{ marginBottom: 32 }}>
      <h2 style={{ fontSize: 18, marginBottom: 6 }}>Votre bien vs meilleur concurrent</h2>
      {why && (
        <p style={{ fontSize: 13.5, color: 'var(--text-3)', marginBottom: 16, lineHeight: 1.45 }}>{why}</p>
      )}

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: 14,
          marginBottom: 16,
        }}
      >
        <ListingCard title="Votre bien" photos={youPhotos} name={you.name} />
        <ListingCard
          title={`Concurrent · ${fmtDist(best.distanceMeters)}`}
          photos={bestPhotos}
          name={best.name}
          link={bestUrl}
        />
      </div>

      <div className="glass" style={{ borderRadius: 14, overflow: 'hidden', marginBottom: 14 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13.5 }}>
          <thead>
            <tr style={{ background: 'rgba(0,0,0,0.03)' }}>
              <th style={thStyle}>Indicateur</th>
              <th style={thStyle}>Vous</th>
              <th style={thStyle}>Concurrent</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.label} style={{ borderTop: '1px solid var(--glass-border)' }}>
                <td style={tdStyle}>{r.label}</td>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{r.a}</td>
                <td style={tdStyle}>{r.b}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {amenitiesDiff && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 12,
          }}
        >
          <AmenityChipList title="Chez vous seulement" items={amenitiesDiff.onlyYours} />
          <AmenityChipList title="En commun" items={amenitiesDiff.shared} />
          <AmenityChipList title="Chez lui seulement" items={amenitiesDiff.onlyTheirs} />
        </div>
      )}
    </div>
  );
}

function ListingCard({
  title,
  photos,
  name,
  link,
}: {
  title: string;
  photos: string[];
  name: string | null;
  link?: string | null;
}) {
  return (
    <div className="card" style={{ borderRadius: 14, overflow: 'hidden' }}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: photos.length > 1 ? '1.4fr 1fr' : '1fr',
          gap: 2,
          aspectRatio: '16/10',
          background: 'var(--bg-2)',
        }}
      >
        {photos.slice(0, 3).map((src, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={src}
            src={src}
            alt=""
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              gridRow: photos.length > 1 && i === 0 ? 'span 2' : undefined,
            }}
          />
        ))}
      </div>
      <div style={{ padding: 14 }}>
        <div className="uppercase-sm" style={{ color: 'var(--text-3)', marginBottom: 4 }}>
          {title}
        </div>
        <div style={{ fontWeight: 700, fontSize: 14.5, lineHeight: 1.3 }}>{name ?? 'Annonce'}</div>
        {link && (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontSize: 12, color: 'var(--goldD, #b8881a)', fontWeight: 700, marginTop: 6, display: 'inline-block' }}
          >
            ↗ Voir l&apos;annonce
          </a>
        )}
      </div>
    </div>
  );
}

function AmenityChipList({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="glass" style={{ padding: 14, borderRadius: 12 }}>
      <div style={{ fontWeight: 700, fontSize: 12.5, marginBottom: 8 }}>{title}</div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
        {(items.length ? items.slice(0, 12) : ['—']).map((a) => (
          <span
            key={a}
            style={{
              fontSize: 11.5,
              padding: '4px 8px',
              borderRadius: 999,
              background: 'rgba(230,176,34,0.12)',
              border: '1px solid rgba(230,176,34,0.25)',
              color: 'var(--text-2)',
            }}
          >
            {amenityLabel(a)}
          </span>
        ))}
      </div>
    </div>
  );
}

function CompsTable({ competitors }: { competitors: CompetitorCard[] }) {
  const [sortKey, setSortKey] = useState<SortKey>('revenue');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');

  const rows = useMemo(() => {
    const list = [...competitors];
    const mul = sortDir === 'asc' ? 1 : -1;
    list.sort((a, b) => {
      const pick = (r: CompetitorCard) => {
        if (sortKey === 'distance') return r.distanceMeters ?? Number.POSITIVE_INFINITY;
        if (sortKey === 'rating') return r.rating ?? 0;
        if (sortKey === 'adr') return r.adrMad ?? 0;
        if (sortKey === 'occupancy') return r.occupancy ?? 0;
        return r.revenueTtmMad ?? 0;
      };
      return (pick(a) - pick(b)) * mul;
    });
    return list;
  }, [competitors, sortKey, sortDir]);

  const toggle = (k: SortKey) => {
    if (sortKey === k) setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    else {
      setSortKey(k);
      setSortDir(k === 'distance' ? 'asc' : 'desc');
    }
  };

  return (
    <div style={{ marginTop: 8 }}>
      <h2 style={{ fontSize: 18, marginBottom: 6 }}>Vos {competitors.length} concurrents directs</h2>
      <p style={{ fontSize: 13.5, color: 'var(--text-3)', marginBottom: 14 }}>
        Triez par prix, occupation ou revenu pour situer votre bien.
      </p>
      <div className="glass" style={{ borderRadius: 14, overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12.5, minWidth: 720 }}>
          <thead>
            <tr style={{ background: 'rgba(0,0,0,0.03)' }}>
              <th style={{ ...thStyle, textAlign: 'left' }}>Annonce</th>
              <ThSort label="Distance" active={sortKey === 'distance'} dir={sortDir} onClick={() => toggle('distance')} />
              <ThSort label="Note" active={sortKey === 'rating'} dir={sortDir} onClick={() => toggle('rating')} />
              <th style={thStyle}>Profil</th>
              <ThSort label="ADR" active={sortKey === 'adr'} dir={sortDir} onClick={() => toggle('adr')} />
              <ThSort label="Occ." active={sortKey === 'occupancy'} dir={sortDir} onClick={() => toggle('occupancy')} />
              <ThSort label="Rev. 12m" active={sortKey === 'revenue'} dir={sortDir} onClick={() => toggle('revenue')} />
            </tr>
          </thead>
          <tbody>
            {rows.map((c, i) => {
              const url = airbnbUrl(c.airbnbListingId);
              return (
                <tr key={c.airbnbListingId ?? i} style={{ borderTop: '1px solid var(--glass-border)' }}>
                  <td style={{ ...tdStyle, textAlign: 'left', minWidth: 200 }}>
                    <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                      <div
                        style={{
                          width: 44,
                          height: 44,
                          borderRadius: 8,
                          overflow: 'hidden',
                          background: 'var(--bg-2)',
                          flexShrink: 0,
                        }}
                      >
                        {c.photoUrl && (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={c.photoUrl} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        )}
                      </div>
                      <div>
                        <div style={{ fontWeight: 600, lineHeight: 1.25 }}>{c.name ?? 'Comparable'}</div>
                        {url && (
                          <a
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ fontSize: 11, color: 'var(--goldD, #b8881a)', fontWeight: 700 }}
                          >
                            ↗ Voir
                          </a>
                        )}
                      </div>
                    </div>
                  </td>
                  <td style={tdStyle}>{fmtDist(c.distanceMeters)}</td>
                  <td style={tdStyle}>
                    {c.rating != null ? `★ ${c.rating.toFixed(2)}` : '—'}
                    <div style={{ fontSize: 11, color: 'var(--text-3)' }}>{c.reviewsCount ?? 0} avis</div>
                  </td>
                  <td style={tdStyle}>
                    {c.bedrooms ?? '—'}ch · {c.baths ?? '—'}sdb · {c.guests ?? '—'}p
                  </td>
                  <td style={{ ...tdStyle, fontWeight: 700 }}>{fmtMad(c.adrMad)}</td>
                  <td style={tdStyle}>{fmtPct(c.occupancy)}</td>
                  <td style={{ ...tdStyle, fontWeight: 700 }}>{fmtMad(c.revenueTtmMad)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ThSort({
  label,
  active,
  dir,
  onClick,
}: {
  label: string;
  active: boolean;
  dir: 'asc' | 'desc';
  onClick: () => void;
}) {
  return (
    <th style={{ ...thStyle, cursor: 'pointer', userSelect: 'none' }} onClick={onClick}>
      {label}
      {active ? (dir === 'asc' ? ' ↑' : ' ↓') : ''}
    </th>
  );
}

const thStyle: CSSProperties = {
  padding: '10px 12px',
  textAlign: 'center',
  fontSize: 11,
  fontWeight: 700,
  color: 'var(--text-3)',
  textTransform: 'uppercase',
  letterSpacing: 0.4,
};

const tdStyle: CSSProperties = {
  padding: '12px',
  textAlign: 'center',
  verticalAlign: 'middle',
  color: 'var(--text-1)',
};
