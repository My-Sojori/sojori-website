import type { Metadata } from 'next';
import { AnalyseResultatClient, type AnalysisResult } from './AnalyseResultatClient';
import { getDemoServiceBaseUrl } from '@/lib/getDemoServiceBaseUrl';
import { demoProxyFetch } from '@/lib/demoProxyFetch';
import { normalizeDemoBackendResponse } from '@/lib/demoApiResponse';

export const metadata: Metadata = {
  title: 'Votre analyse concurrentielle | Sojori',
  robots: { index: false, follow: false },
};

export const dynamic = 'force-dynamic';

type PageProps = {
  searchParams: Promise<{ token?: string | string[] }>;
};

function pickToken(raw: string | string[] | undefined): string {
  if (Array.isArray(raw)) return String(raw[0] ?? '').trim();
  // Cas lien mal encodé : ?token%3Dxxx → une seule clé "token=xxx"
  if (typeof raw === 'string' && raw.startsWith('token=')) {
    return raw.slice('token='.length).trim();
  }
  return String(raw ?? '').trim();
}

async function loadResult(token: string): Promise<{
  result: AnalysisResult | null;
  loadState: 'ready' | 'expired' | 'error' | 'loading';
  error: string;
}> {
  if (!token) {
    return { result: null, loadState: 'error', error: 'Lien invalide — token manquant.' };
  }
  try {
    const base = getDemoServiceBaseUrl();
    const res = await demoProxyFetch(
      `${base}/api/v1/competitor-analysis/result/${encodeURIComponent(token)}`,
      { method: 'GET', signal: AbortSignal.timeout(180_000) },
    );
    const raw = await res.json();
    const data = normalizeDemoBackendResponse(raw) as {
      success?: boolean;
      error?: string;
      data?: AnalysisResult;
    };
    if (res.status === 410) {
      return { result: null, loadState: 'expired', error: '' };
    }
    if (!res.ok || data.success !== true || !data.data) {
      return {
        result: null,
        loadState: 'error',
        error: data.error || "Impossible de charger l'analyse.",
      };
    }
    return { result: data.data, loadState: 'ready', error: '' };
  } catch (e) {
    return {
      result: null,
      loadState: 'error',
      error: e instanceof Error ? e.message : 'Connexion impossible.',
    };
  }
}

export default async function AnalyseResultatPage({ searchParams }: PageProps) {
  const sp = await searchParams;
  let token = pickToken(sp.token);
  // Filet si Next a parsé ?token%3Dxxx comme clé bizarre
  if (!token) {
    const weirdKey = Object.keys(sp).find((k) => k.startsWith('token='));
    if (weirdKey) token = weirdKey.slice('token='.length).trim();
  }

  const loaded = await loadResult(token);

  return (
    <AnalyseResultatClient
      initialToken={token}
      initialResult={loaded.result}
      initialState={loaded.loadState}
      initialError={loaded.error}
    />
  );
}
