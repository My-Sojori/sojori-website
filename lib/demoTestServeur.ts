/**
 * Mode test des aperçus : avec l'en-tête `x-sojori-test: 1` (posé par le formulaire quand l'adresse porte `?test=1`), les
 * routes de demande répondent sans appeler le CRM. Jamais en production : `VERCEL_ENV` vaut « production » sur le site
 * en ligne, l'en-tête y est alors ignoré. En local et sur les aperçus Vercel, le mode est disponible.
 */
export const testDisponible = () => process.env.VERCEL_ENV !== 'production';
export const modeTest = (req: Request) => req.headers.get('x-sojori-test') === '1' && testDisponible();
