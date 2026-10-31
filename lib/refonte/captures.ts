/**
 * Captures réelles du PMS, prises sur un compte de test (Lab), sans donnée client ni numéro.
 * Tant qu'une capture n'est pas validée par Design, l'emplacement reste vide et rien n'est publié.
 */
export type Capture = { src: string; width: number; height: number };

export const CAPTURE_CALENDRIER: Capture | null = null;
