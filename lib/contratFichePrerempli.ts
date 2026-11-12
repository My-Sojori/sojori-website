/**
 * La fiche de signature du contrat d'abonnement, pré-remplie avec ce que le CRM sait déjà du client
 * (`abonnement.champsInitiaux`, srv-crm) : société, pays, adresse, ville, identifiant, registre, TVA, e-mail,
 * téléphone. Le signataire relit et corrige. JAMAIS le nom ni la fonction du signataire : c'est sa signature, il
 * les écrit lui-même. Seuls les champs que la page affiche sont repris, en texte.
 */
const JAMAIS_PREREMPLIS = new Set(['representant', 'fonction']);

export function fichePrerempli(
  champs: ReadonlyArray<{ cle: string }>,
  initiaux: Record<string, unknown> | null | undefined,
): Record<string, string> {
  const fiche: Record<string, string> = {};
  if (!initiaux) return fiche;
  for (const { cle } of champs) {
    if (JAMAIS_PREREMPLIS.has(cle)) continue;
    const v = initiaux[cle];
    if (typeof v === 'string' && v.trim()) fiche[cle] = v.trim();
  }
  return fiche;
}

/**
 * Un montant du contrat dans la convention de SA langue (`abonnement.langue`, posée par srv-crm) : « 1 450 € » /
 * « 64 180 MAD » en français, « €1,450 » / « MAD 64,180 » en anglais. Les centimes seulement s'ils comptent
 * (« 26,10 € », « €26.10 »). Langue absente (contrat d'avant la règle) : le français d'avant, au dirham près en MAD.
 */
export function formaterMontant(n: number, devise: string, langue?: string | null): string {
  const en = langue === 'en';
  const locale = en ? 'en-GB' : 'fr-FR';
  const euro = devise === 'EUR';
  const centimes = euro && Math.round(n * 100) % 100 !== 0;
  const texte = (euro ? n : Math.round(n)).toLocaleString(locale, {
    minimumFractionDigits: centimes ? 2 : 0,
    maximumFractionDigits: centimes ? 2 : 0,
  });
  if (en) return euro ? `€${texte}` : `MAD ${texte}`;
  return euro ? `${texte} €` : `${texte} MAD`;
}
