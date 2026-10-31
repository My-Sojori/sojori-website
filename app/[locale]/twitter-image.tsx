import { OG_SIZE, renderOg } from '@/lib/og/render';

export const alt = 'Sojori · AI workforce for hospitality';
export const size = OG_SIZE;
export const contentType = 'image/png';

export default async function Image({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return renderOg(locale);
}
