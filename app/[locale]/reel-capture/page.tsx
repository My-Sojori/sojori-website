import type { Metadata } from 'next';
import { ReelCaptureClient } from './ReelCaptureClient';

// Page interne de capture vidéo (reel Instagram) — jamais indexée, jamais liée.
export const metadata: Metadata = {
  title: 'Sojori — capture reel',
  robots: { index: false, follow: false },
};

export default function ReelCapturePage() {
  return <ReelCaptureClient />;
}
