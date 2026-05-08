import { Metadata } from 'next';
import { generateSEO, moroccanKeywords, frenchKeywords } from '@/lib/seo';

export const metadata: Metadata = generateSEO({
  title: 'Dynamic Pricing Marrakech | Tarification Dynamique AI Location Maroc',
  description: 'Tarification dynamique IA pour property managers à Marrakech. Yield management automatique, prix optimisés par événement, demande locale. Maximisez revenus riads, villas, appartements Maroc.',
  keywords: [
    ...moroccanKeywords,
    ...frenchKeywords,
    'yield management Marrakech',
    'tarification dynamique Maroc',
    'dynamic pricing location',
    'prix automatique Airbnb Marrakech',
    'optimisation revenus location',
    'RevPAR Marrakech',
  ],
  path: '/dynamic-pricing',
});

export default function DynamicPricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
