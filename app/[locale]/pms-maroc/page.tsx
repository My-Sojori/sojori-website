import type { Metadata } from 'next';
import { SeoPage } from '@/components/refonte/pages/SeoPage';
import { seoMetadata } from '@/lib/refonte/seoPages';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return seoMetadata('pmsMaroc', locale);
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return <SeoPage id="pmsMaroc" locale={locale} related={['conciergerieMaroc', 'agents', 'checkin', 'channelManager', 'comparatif']} />;
}
