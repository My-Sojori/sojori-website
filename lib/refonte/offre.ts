/** Les choix de « Votre offre » : identifiants stables, textes dans messages (refonte.offre.*). Aucun prix. */
export const PRODUITS = [
  'pms', 'whatsapp_checkin', 'whatsapp_stay', 'whatsapp_concierge',
  'agent_booking', 'agent_guest_service', 'agent_operations', 'dynamic_pricing',
  'agent_commercial_crm', 'agent_prospecting', 'agent_marketing', 'agent_finance',
] as const;
export type ProduitId = (typeof PRODUITS)[number];
/** Ceux qui se facturent pour le compte, pas au bien. */
export const PAR_COMPTE: ProduitId[] = ['agent_commercial_crm', 'agent_prospecting', 'agent_marketing', 'agent_finance'];

export const UTILISATEURS = ['studio', 'staff', 'admin', 'owner'] as const;
export type UtilisateurId = (typeof UTILISATEURS)[number];
export const SITES = ['none', 'template', 'ai', 'custom'] as const;
export type SiteId = (typeof SITES)[number];
export const BIENTOT = ['agent_booking_call', 'agent_guest_service_call', 'agent_staff_call'] as const;
export type BientotId = (typeof BIENTOT)[number];
export const VALEURS_RAPIDES = [5, 10, 25, 50, 100, 200];

export type Selection = {
  mode: 'sojori' | 'externe';
  n: number;
  produits: Partial<Record<ProduitId, boolean>>;
  sieges: Record<UtilisateurId, number>;
  site: SiteId;
  onboarding: boolean;
  numeros: number;
  connexion: boolean;
  bientot: Partial<Record<BientotId, boolean>>;
};

export const SELECTION_PAR_DEFAUT: Selection = {
  mode: 'sojori',
  n: 25,
  produits: { pms: true, whatsapp_checkin: true, whatsapp_stay: true },
  sieges: { studio: 1, staff: 0, admin: 0, owner: 0 },
  site: 'none',
  onboarding: true,
  numeros: 0,
  connexion: false,
  bientot: {},
};

/** Un produit est-il réellement choisi ? (la tarification dynamique est exclue hors PMS Sojori, le PMS aussi.) */
export function estChoisi(s: Selection, id: ProduitId): boolean {
  if (s.mode === 'externe' && (id === 'dynamic_pricing' || id === 'pms')) return false;
  return !!s.produits[id];
}

const NOMS_FR: Record<ProduitId, string> = {
  pms: 'PMS Sojori', whatsapp_checkin: 'WhatsApp Check-in', whatsapp_stay: 'WhatsApp Séjour', whatsapp_concierge: 'WhatsApp Conciergerie',
  agent_booking: 'Agent Réservation', agent_guest_service: 'Agent Service client', agent_operations: 'Agent Opérations',
  dynamic_pricing: 'Tarification dynamique', agent_commercial_crm: 'Agent Commercial avec CRM', agent_prospecting: 'Agent Prospection',
  agent_marketing: 'Agent Marketing', agent_finance: 'Agent Finance',
};
const SIEGES_FR: Record<UtilisateurId, string> = { studio: 'utilisateurs Agent Studio', staff: 'accès WhatsApp staff', admin: 'accès WhatsApp admin', owner: 'accès WhatsApp propriétaire' };
const SITES_FR: Record<SiteId, string> = { none: 'pas de site', template: 'site modèle', ai: 'Agent Site web', custom: 'site sur mesure' };
const BIENTOT_FR: Record<BientotId, string> = { agent_booking_call: 'Agent Réservation Call', agent_guest_service_call: 'Agent Service client Call', agent_staff_call: 'Appels au staff' };

/**
 * Le résumé de la sélection, en français, lu par le conseiller (dans « attentes » de la demande).
 * Il ne contient que des choix : aucun montant.
 */
export function resume(s: Selection): string {
  const l: string[] = [];
  l.push(`Demande depuis « Votre offre » (sojori.com).`);
  l.push(`Socle : ${s.mode === 'sojori' ? 'PMS Sojori' : 'garde son PMS actuel'}.`);
  l.push(`Parc : ${s.n} bien(s) ou chambre(s).`);
  const choisis = PRODUITS.filter((id) => estChoisi(s, id));
  l.push(`Agents et options : ${choisis.length ? choisis.map((id) => NOMS_FR[id] + (PAR_COMPTE.includes(id) ? ' (pour le compte)' : '')).join(', ') : 'aucun'}.`);
  const sieges = UTILISATEURS.filter((u) => (s.sieges[u] ?? 0) > (u === 'studio' ? 1 : 0));
  if (sieges.length) l.push(`Utilisateurs : ${sieges.map((u) => `${s.sieges[u]} ${SIEGES_FR[u]}`).join(', ')}.`);
  l.push(`Site : ${SITES_FR[s.site]}.`);
  const service: string[] = [];
  if (s.onboarding) service.push('onboarding standard');
  if (s.numeros > 0) service.push(`branding WhatsApp (${s.numeros} numéro(s))`);
  if (s.connexion) service.push('connexion spécifique à étudier');
  l.push(`Mise en service : ${service.length ? service.join(', ') : 'rien de demandé'}.`);
  const bientot = BIENTOT.filter((b) => s.bientot[b]);
  if (bientot.length) l.push(`Intéressé par (bientôt) : ${bientot.map((b) => BIENTOT_FR[b]).join(', ')}.`);
  return l.join('\n');
}
