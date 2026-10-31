/**
 * La journée type d'un établissement : les mêmes formules que « La salle » du tableau de bord
 * (journeeHotel.ts, dépôt Sojori-orchestrator) — 75 % d'occupation, séjour moyen de 2,5 nuits.
 * Copiées ici parce que les deux dépôts ne partagent pas de paquet ; à garder identiques.
 */
export type CasId = 'conc' | 'h30' | 'h100';

export const CAS_IDS: CasId[] = ['conc', 'h30', 'h100'];
export const TAILLES: Record<CasId, number> = { conc: 50, h30: 30, h100: 100 };

export type Journee = {
  n: number;
  occupees: number;
  arrivees: number;
  departs: number;
  recouches: number;
  femmes: number;
  navettes: number;
  demandes: number;
};

export function chiffresDe(n: number): Journee {
  const occupees = Math.round(n * 0.75);
  const arrivees = Math.max(1, Math.round(occupees / 2.5));
  const departs = arrivees;
  const recouches = Math.max(0, occupees - departs);
  return {
    n,
    occupees,
    arrivees,
    departs,
    recouches,
    femmes: Math.max(1, Math.ceil((departs * 45 + recouches * 25) / 360)),
    navettes: Math.max(1, Math.round(arrivees * 0.4)),
    demandes: Math.round(occupees * 1.2),
  };
}

/** Un numéro de chambre de l'hôtel (étage + rang), pris à une fraction du parc. */
export function numeroChambre(n: number, part: number): string {
  const k = Math.min(n - 1, Math.max(0, Math.floor(part * n)));
  return String(Math.floor(k / 10) + 1) + String((k % 10) + 1).padStart(2, '0');
}

/** Gains estimés : 2 min par demande de voyageur, 3 min par tâche de coordination, 70 % traitées par l'agent. */
export function gains(id: CasId, c: Journee) {
  const hVoyageurs = Math.round((c.demandes * 2 * 7 * 0.7) / 60);
  const taches = c.arrivees + c.departs + (id === 'conc' ? 0 : c.recouches);
  const hTerrain = Math.round((taches * 3 * 7) / 60);
  return { hVoyageurs, hTerrain };
}
