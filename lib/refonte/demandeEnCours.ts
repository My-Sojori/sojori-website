/**
 * La demande en cours, gardée dans la page (sessionStorage) entre /demo et /offre : le jeton de qualification et l'identité déjà
 * saisie. « Composer mon offre » complète la MÊME demande (un seul lead) sans rien redemander. Effacée dès que la demande est
 * terminée. Jamais dans l'adresse.
 */
export type DemandeEnCours = {
  id: string;
  jeton: string;
  email: string;
  nom: string;
  paysIso: string;
  dialIso: string;
  tel: string;
  /** La visite de rendez-vous a déjà été demandée (parcours /demo). */
  dejaDemo: boolean;
};

const CLE = 'sojori.demande';

export function lireDemande(): DemandeEnCours | null {
  try {
    const brut = window.sessionStorage.getItem(CLE);
    if (!brut) return null;
    const d = JSON.parse(brut) as Partial<DemandeEnCours>;
    return d && typeof d.id === 'string' && typeof d.jeton === 'string' ? (d as DemandeEnCours) : null;
  } catch { return null; }
}
export function garderDemande(d: DemandeEnCours) {
  try { window.sessionStorage.setItem(CLE, JSON.stringify(d)); } catch { /* sans stockage : la demande reste en mémoire de la page */ }
}
export function oublierDemande() {
  try { window.sessionStorage.removeItem(CLE); } catch { /* sans effet */ }
}

/** Ce que le visiteur attend, pour le CRM : un rendez-vous, une proposition chiffrée, ou les deux. */
export type Intention = 'demo' | 'offre' | 'demo+offre';
export const LIBELLE_INTENTION: Record<Intention, string> = {
  demo: 'Intention : démo.',
  offre: 'Intention : offre composée.',
  'demo+offre': 'Intention : démo + offre composée.',
};
