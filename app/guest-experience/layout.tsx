import { Metadata } from 'next';
import { generateSEO, moroccanKeywords, frenchKeywords } from '@/lib/seo';

export const metadata: Metadata = generateSEO({
  title: 'Guest Experience Marrakech | Guidebook Digital & Services Maroc',
  description: 'Expérience guest premium pour riads et villas à Marrakech. Guidebook digital interactif, conciergerie 24/7, réservation expériences locales, check-in/out sans contact. Transformez vos guests en ambassadeurs.',
  keywords: [
    ...moroccanKeywords,
    ...frenchKeywords,
    'guidebook digital Marrakech',
    'expérience guest Maroc',
    'conciergerie riad Marrakech',
    'services tourisme Marrakech',
    'check-in digital Maroc',
    'expériences locales Marrakech',
  ],
  path: '/guest-experience',
});

export default function GuestExperienceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
