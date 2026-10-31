import { dialDeIso, nomCrm } from './pays';

/** Une adresse e-mail plausible : l'essentiel est vérifié ici, le reste par le CRM. */
export const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Le pays proposé d'office selon la langue du site : l'Espagne en espagnol, le Portugal en portugais, le Maroc ailleurs. */
export const paysInitial = (locale: string): string => (locale === 'es' ? 'ES' : locale === 'pt' ? 'PT' : 'MA');

export type Identite = { email: string; nom: string; paysIso: string; tel: string; consent: boolean };
export type ErreursIdentite = Partial<Record<'email' | 'nom' | 'pays' | 'tel' | 'consent', true>>;

/** Les quatre coordonnées et l'accord sont obligatoires. */
export function erreursIdentite(v: Identite): ErreursIdentite {
  const e: ErreursIdentite = {};
  if (!EMAIL.test(v.email.trim())) e.email = true;
  if (v.nom.trim().length < 2) e.nom = true;
  if (!v.paysIso) e.pays = true;
  if (v.tel.replace(/\D/g, '').length < 8) e.tel = true;
  if (!v.consent) e.consent = true;
  return e;
}

/** Les champs d'identité du corps de `POST /demo/request` et de `PATCH …/qualify`. */
export function champsIdentite(v: Identite, dialIso: string) {
  return {
    fullName: v.nom.trim().slice(0, 120),
    phone: v.tel.replace(/\D/g, '').replace(/^0+/, ''),
    countryCode: dialDeIso(dialIso),
    country: nomCrm(v.paysIso),
  };
}
