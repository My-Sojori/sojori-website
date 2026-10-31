import { useSyncExternalStore } from 'react';

/**
 * Faux dans le HTML rendu côté serveur et avant l'hydratation, vrai ensuite. Sert à garder désactivé le bouton d'envoi d'un
 * formulaire tant que React n'a pas pris la main : un clic trop tôt ferait une soumission native (GET), qui mettrait le nom, l'e-mail
 * et le téléphone dans l'adresse.
 */
export const useHydrate = () => useSyncExternalStore(() => () => {}, () => true, () => false);
