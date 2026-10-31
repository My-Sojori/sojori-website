/**
 * Côté navigateur : le mode test est demandé par `?test=1` dans l'adresse ; il est ensuite gardé pour la session (sessionStorage) afin
 * de suivre le visiteur d'une page à l'autre (/demo → /offre) sans rien renvoyer au vrai CRM. Le SERVEUR décide ensuite si le mode
 * existe (jamais en production) : sans lui, l'en-tête posé ici est ignoré.
 */
const CLE = 'sojori.test';
export const enTest = () => {
  try {
    if (new URLSearchParams(window.location.search).get('test') === '1') { window.sessionStorage.setItem(CLE, '1'); return true; }
    return window.sessionStorage.getItem(CLE) === '1';
  } catch { return false; }
};
/** Ajoute l'en-tête du mode test aux appels de demande quand le mode test est demandé. */
export const enTetesDemande = (h: Record<string, string>): Record<string, string> => (enTest() ? { ...h, 'x-sojori-test': '1' } : h);
