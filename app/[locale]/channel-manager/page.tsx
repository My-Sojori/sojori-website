import type { Metadata } from 'next';
import { withShare } from '@/lib/seo';
import { getTranslations } from 'next-intl/server';
import ChannelManagerPageClient from './ChannelManagerPageClient';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'seoPages' });
  return withShare({
    title: t('channelManager.title'),
    description: t('channelManager.description'),
    alternates: { canonical: `/${locale}/channel-manager` },
  }, locale);
}

export default function ChannelManagerPage() {
  return <ChannelManagerPageClient />;
}
