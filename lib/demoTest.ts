/** Côté navigateur : l'adresse porte-t-elle `?test=1` ? Le serveur décide ensuite si le mode test existe (jamais en production). */
export const enTest = () => {
  try { return new URLSearchParams(window.location.search).get('test') === '1'; } catch { return false; }
};
/** Ajoute l'en-tête du mode test aux appels de demande quand l'adresse porte `?test=1`. */
export const enTetesDemande = (h: Record<string, string>): Record<string, string> => (enTest() ? { ...h, 'x-sojori-test': '1' } : h);
