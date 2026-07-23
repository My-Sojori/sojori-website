import type { Metadata } from 'next';
import { AnalyseConcurrentsClient } from './AnalyseConcurrentsClient';

export const metadata: Metadata = {
  title: 'Analyse gratuite de vos concurrents Airbnb | Sojori',
  description:
    "Collez le lien de votre annonce Airbnb : découvrez jusqu'à 20 annonces comparables autour de vous et une estimation du prix de marché. Gratuit, résultat par e-mail.",
};

export default function AnalyseConcurrentsPage() {
  return <AnalyseConcurrentsClient />;
}
