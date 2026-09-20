import type { Metadata } from 'next';
import { BannerCaptureClient } from './BannerCaptureClient';

// Page interne de capture des bannières LinkedIn — jamais indexée, jamais liée.
export const metadata: Metadata = {
  title: 'Sojori — capture bannières',
  robots: { index: false, follow: false },
};

export default function BannerCapturePage() {
  return <BannerCaptureClient />;
}
