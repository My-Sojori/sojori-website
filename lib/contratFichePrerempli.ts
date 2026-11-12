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
