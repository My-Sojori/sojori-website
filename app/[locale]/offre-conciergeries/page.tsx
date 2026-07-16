import type { Metadata } from 'next';
import { OffreConciergeriesClient } from './OffreConciergeriesClient';

export const metadata: Metadata = {
  title: 'Offre de lancement conciergeries — 2 mois gratuits | Sojori',
  description:
    "Offre réservée aux 15 premières conciergeries au Maroc : 2 mois gratuits et migration complète offerte. Un seul outil pour tout orchestrer — PMS, Channel Manager, WhatsApp, booking direct, upsell, staff.",
};

export default function OffreConciergeriesPage() {
  return <OffreConciergeriesClient />;
}
