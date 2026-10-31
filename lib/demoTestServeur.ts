/**
 * Mode test des aperçus : avec l'en-tête `x-sojori-test: 1` (posé par le formulaire quand l'adresse porte `?test=1`), les
 * routes de demande répondent sans appeler le CRM. FERMÉ PAR DÉFAUT : disponible seulement sur un aperçu Vercel
 * (`VERCEL_ENV === 'preview'`) ou en développement local (`next dev` : variable absente et `NODE_ENV !== 'production'`).
 * Sur le site en ligne (`production`), sur tout autre hébergeur ou avec une variable absente en build de production, l'en-tête
 * est ignoré : une vraie demande n'est jamais perdue en silence.
 */
export const testDisponible = () => {
  const env = process.env.VERCEL_ENV;
  if (env) return env === 'preview';
  return process.env.NODE_ENV !== 'production';
};
export const modeTest = (req: Request) => req.headers.get('x-sojori-test') === '1' && testDisponible();
