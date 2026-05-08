import { Metadata } from 'next';
import { generateSEO, moroccanKeywords, frenchKeywords } from '@/lib/seo';

export const metadata: Metadata = generateSEO({
  title: 'Channel Manager Marrakech | Synchronisation Multi-OTA Maroc',
  description: 'Channel Manager pour property managers à Marrakech et Casablanca. Synchronisez Airbnb, Booking.com, Expedia en temps réel. Évitez les surréservations, gestion calendrier unifié.',
  keywords: [
    ...moroccanKeywords,
    ...frenchKeywords,
    'channel manager Marrakech',
    'synchronisation OTA Maroc',
    'multi-plateformes location',
    'gestion Airbnb Booking Marrakech',
    'éviter surréservation',
    'calendrier synchronisé',
  ],
  path: '/channel-manager',
});
