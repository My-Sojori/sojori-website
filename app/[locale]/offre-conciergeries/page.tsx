import type { Metadata } from 'next';
import { OffreConciergeriesClient } from './OffreConciergeriesClient';

export const metadata: Metadata = {
  title: 'Logiciel de gestion Airbnb — 2 mois gratuits | Sojori',
  description:
    "Le logiciel des conciergeries et gestionnaires Airbnb au Maroc. Offre de lancement — 15 premières conciergeries : 2 mois gratuits et migration complète offerte. PMS, Channel Manager, WhatsApp, réservation directe, upsell, ménage.",
};

export default function OffreConciergeriesPage() {
  return <OffreConciergeriesClient />;
}
