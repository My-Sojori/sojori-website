import { Metadata } from 'next';
import { generateSEO, moroccanKeywords, frenchKeywords } from '@/lib/seo';

export const metadata: Metadata = generateSEO({
  title: 'Inbox Unifié Marrakech | Messagerie Centralisée Multi-OTA Maroc',
  description: 'Inbox unifié pour property managers à Marrakech. Centralisez messages Airbnb, Booking, WhatsApp, email. Réponses automatiques IA, traduction FR/AR/EN. Zéro message manqué.',
  keywords: [
    ...moroccanKeywords,
    ...frenchKeywords,
    'inbox unifié Marrakech',
    'messagerie centralisée Maroc',
    'gestion messages Airbnb Booking',
    'réponses automatiques location',
    'traduction automatique guests',
    'communication multi-canal',
  ],
  path: '/inbox',
});

export default function InboxLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
