import type { Metadata } from 'next';
import { Suspense } from 'react';
import { PreparerClient } from './PreparerClient';

/**
 * Page « préparer ma démo » — cible du lien envoyé dans l'e-mail de
 * confirmation. Elle n'a pas à être indexée : chaque visite passe par un jeton
 * personnel, et une page sans jeton n'a aucun contenu.
 */
export const metadata: Metadata = {
  title: 'Préparer votre démo | Sojori',
  robots: { index: false, follow: false },
};

export default function PreparerPage() {
  return (
    <Suspense fallback={null}>
      <PreparerClient />
    </Suspense>
  );
}
