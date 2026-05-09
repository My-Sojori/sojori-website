import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import ChannelManagerPageClient from './ChannelManagerPageClient';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'seoPages' });
  return {
    title: t('channelManager.title'),
    description: t('channelManager.description'),
  };
}

export default function ChannelManagerPage() {
  return <ChannelManagerPageClient />;
}
