import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { LabClient } from './LabClient';

export const metadata: Metadata = {
  title: 'Lab analyse concurrents (privé)',
  robots: { index: false, follow: false },
};

export const dynamic = 'force-dynamic';

const LAB_SECRET = process.env.COMPETITOR_ANALYSIS_PREVIEW_SECRET || 'sj-lab-tg-7f3a9c2e';

type PageProps = {
  searchParams: Promise<{ k?: string | string[] }>;
};

/** ⚠️ TEMPORAIRE — page lab privée, à supprimer après QA / Claude Design. */
export default async function LabPage({ searchParams }: PageProps) {
  const raw = (await searchParams).k;
  const k = Array.isArray(raw) ? raw[0] : raw;
  if (!k || k !== LAB_SECRET) notFound();
  return <LabClient previewSecret={LAB_SECRET} />;
}
