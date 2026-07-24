import type { Metadata } from 'next';
import { AnalyseResultatClient } from '../resultat/AnalyseResultatClient';
import { EXAMPLE_ANALYSIS } from '../resultat/exampleData';

export const metadata: Metadata = {
  title: 'Exemple d’analyse concurrentielle | Sojori',
  robots: { index: false, follow: false },
};

/**
 * Exemple public : rend la page résultat avec un jeu de données réel figé
 * (aucun appel API). Sert de démonstration quand l’annonce d’un visiteur
 * n’est pas référençable.
 */
export default function AnalyseExemplePage() {
  return <AnalyseResultatClient initialResult={EXAMPLE_ANALYSIS} initialState="ready" />;
}
