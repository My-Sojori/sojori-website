import { Metadata } from 'next';
import { generateSEO, moroccanKeywords, frenchKeywords } from '@/lib/seo';

export const metadata: Metadata = generateSEO({
  title: 'Gestion Staff Marrakech | Team Management Riads & Villas Maroc',
  description: 'Logiciel gestion équipe pour property managers à Marrakech. Planification ménage, attribution tâches, suivi performances. Coordonnez femmes de ménage, conciergerie, maintenance.',
  keywords: [
    ...moroccanKeywords,
    ...frenchKeywords,
    'gestion staff Marrakech',
    'planification ménage riad',
    'équipe conciergerie Marrakech',
    'gestion femmes de ménage Maroc',
    'coordination équipe location',
    'suivi tâches staff',
  ],
  path: '/teamflow',
});

export default function TeamFlowLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
