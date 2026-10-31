import type { Metadata } from 'next';
import { OffreConciergeriesClient } from './OffreConciergeriesClient';

export const metadata: Metadata = {
  title: 'Logiciel de gestion Airbnb pour conciergeries | Sojori',
  description:
    "Le logiciel des conciergeries et gestionnaires Airbnb au Maroc. Offre de lancement — 15 premières conciergeries : migration complète offerte. PMS, Channel Manager, WhatsApp, réservation directe, upsell, ménage.",
};

export default function OffreConciergeriesPage() {
  return <OffreConciergeriesClient />;
}
