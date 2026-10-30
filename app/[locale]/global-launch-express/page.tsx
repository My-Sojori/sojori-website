import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

/** Variante A/B "formulaire direct" du test international — même logique que
 * /offre-conciergeries-express : saute l'argumentaire, va droit au formulaire /demo. */
export const metadata: Metadata = {
  title: 'Book your demo — Sojori',
};

export default async function GlobalLaunchExpressPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { locale } = await params;
  const sp = await searchParams;
  const qs = new URLSearchParams();
  qs.set('source', 'global-launch-express');
  for (const [k, v] of Object.entries(sp)) {
    if (k === 'source') continue;
    if (typeof v === 'string') qs.set(k, v);
  }
  redirect(`/${locale}/demo?${qs.toString()}`);
}
