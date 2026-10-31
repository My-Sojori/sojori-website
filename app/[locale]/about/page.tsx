import { AboutPage } from '@/components/refonte/pages/AboutPage';

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return <AboutPage locale={locale} />;
}
