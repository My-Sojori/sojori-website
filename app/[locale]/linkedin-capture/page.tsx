import type { Metadata } from 'next';
import { LinkedinCaptureClient } from './LinkedinCaptureClient';

// Page interne de capture vidéo (post LinkedIn) — jamais indexée, jamais liée.
export const metadata: Metadata = {
  title: 'Sojori — capture LinkedIn',
  robots: { index: false, follow: false },
};

export default function LinkedinCapturePage() {
  return <LinkedinCaptureClient />;
}
