import { PHONE_DIAL_ROWS, type PhoneDialRow } from '@/lib/phoneDialCodesData';

/** Les pays les plus courants chez nos clients, en tête de liste (Tawfiq, 31/10/2026). */
export const COURANTS = ['MA', 'FR', 'ES', 'PT', 'DZ', 'TN', 'AE'];

export const ligneDe = (iso: string): PhoneDialRow | undefined => PHONE_DIAL_ROWS.find((r) => r.iso === iso);
export const dialDeIso = (iso: string) => ligneDe(iso)?.dial ?? '+212';
/** Le nom du pays tel que le CRM le lit : le français, comme dans la liste de l'équipe commerciale. */
export const nomCrm = (iso: string) => ligneDe(iso)?.nameFr ?? '';

/** Minuscules, sans accents ni voyelles brèves ni allongement : « Émirats », « المَغرب » et « maroc » se comparent bien. */
export const normaliser = (s: string) => s.normalize('NFD').replace(/[̀-ًͯ-ٟـ]/g, '').replace(/[إأآ]/g, 'ا').toLowerCase().trim();

const caches = new Map<string, Map<string, string>>();
/** Le nom d'un pays dans la langue demandée (repli : le nom français de la liste). */
export function nomDans(locale: string, row: PhoneDialRow): string {
  let c = caches.get(locale);
  if (!c) {
    c = new Map();
    caches.set(locale, c);
  }
  let n = c.get(row.iso);
  if (!n) {
    try { n = new Intl.DisplayNames([locale], { type: 'region' }).of(row.iso) ?? row.nameFr; } catch { n = row.nameFr; }
    c.set(row.iso, n);
  }
  return n;
}

const autres = new Map<string, string>();
/** Le nom du pays en anglais et en arabe : on cherche aussi dans ces langues, quelle que soit celle de la page. */
function nomsAutres(row: PhoneDialRow): string[] {
  let n = autres.get(row.iso);
  if (!n) {
    const dans = (l: string) => { try { return new Intl.DisplayNames([l], { type: 'region' }).of(row.iso) ?? ''; } catch { return ''; } };
    n = `${dans('en')}|${dans('ar')}`;
    autres.set(row.iso, n);
  }
  return n.split('|');
}

/**
 * La liste filtrée par la saisie : le nom dans la langue de la page, en français ou en anglais, l'indicatif (« +33 », « 212 »)
 * ou le code ISO. Sans saisie : les pays courants d'abord, puis les autres dans l'ordre alphabétique de la langue.
 */
export function chercher(locale: string, requete: string): PhoneDialRow[] {
  const q = normaliser(requete.replace(/^\+/, ''));
  const tous = [...PHONE_DIAL_ROWS].sort((a, b) => nomDans(locale, a).localeCompare(nomDans(locale, b), locale));
  const rang = (r: PhoneDialRow) => { const i = COURANTS.indexOf(r.iso); return i === -1 ? 99 : i; };
  if (!q) return [...tous].sort((a, b) => rang(a) - rang(b));
  const num = /^\d+$/.test(q);
  const sel = tous.filter((r) => {
    if (num) return r.dial.replace('+', '').startsWith(q);
    return [nomDans(locale, r), r.nameFr, ...nomsAutres(r), r.iso].some((n) => normaliser(n).includes(q));
  });
  // le nom qui commence par la saisie passe avant celui qui la contient
  return sel.sort((a, b) => {
    const da = Number(normaliser(nomDans(locale, a)).startsWith(q) || normaliser(a.nameFr).startsWith(q));
    const db = Number(normaliser(nomDans(locale, b)).startsWith(q) || normaliser(b.nameFr).startsWith(q));
    return db - da || rang(a) - rang(b);
  });
}

/** Met le numéro en forme à la frappe, selon le pays : « 6 12 34 56 78 », « 612 345 678 », « (212) 555-0123 »… */
export function formaterNumero(saisie: string, iso: string): string {
  let d = saisie.replace(/\D/g, '');
  if (iso !== 'IT') d = d.replace(/^0+/, '');
  if (!d) return '';
  const coupe = (motif: number[]) => {
    const parts: string[] = [];
    let i = 0;
    for (const n of motif) { if (i >= d.length) break; parts.push(d.slice(i, i + n)); i += n; }
    if (i < d.length) parts.push(d.slice(i));
    return parts.join(' ');
  };
  if (iso === 'US' || iso === 'CA') {
    const p = d.slice(0, 3), m = d.slice(3, 6), f = d.slice(6, 10);
    return [p && `(${p})`, m, f && `-${f}`].filter(Boolean).join(' ').replace(' -', '-');
  }
  if (['MA', 'FR', 'BE', 'DZ', 'TN', 'SN', 'CI'].includes(iso)) return coupe([1, 2, 2, 2, 2]);
  if (['ES', 'PT', 'IT', 'CH', 'DE', 'GB', 'AE', 'SA', 'QA'].includes(iso)) return coupe([3, 3, 3, 3]);
  return coupe([3, 3, 3, 3]);
}
