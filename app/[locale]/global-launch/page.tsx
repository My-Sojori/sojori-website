import type { Metadata } from 'next';
import { GlobalLaunchClient } from './GlobalLaunchClient';

export const metadata: Metadata = {
  title: 'Sojori — Launch offer for short-term rental hosts',
  description:
    'The all-in-one software for short-term rental co-hosts and property managers. Launch offer: 2 months free, migration included, no setup fee.',
};

export default function GlobalLaunchPage() {
  return <GlobalLaunchClient />;
}
