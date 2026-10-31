import { chiffresDe, numeroChambre, type CasId, type Journee } from './journee';

export type Acteur =
  | 'voyageurs' | 'staff' | 'tiers' | 'prospects'
  | 'service' | 'operations' | 'reservation' | 'tarification' | 'assistant' | 'studio' | 'site' | 'commercial' | 'prospection'
  | 'hub' | 'vous';
export type Canal = 'whatsapp' | 'ticket' | 'carte';
export type Etat = 'open' | 'closed' | 'applied' | 'executed';

/** Un échange : de qui, vers qui, par quel canal, et la clé du texte (+ variantes Ok/Non après une carte). */
export type Echange = {
  de: Acteur;
  vers: Acteur;
  type: Canal;
  etat?: Etat;
  cle: string;
  /** Le texte dépend du clic sur la carte précédente : clé + « Ok » ou « Non ». */
  suitCarte?: boolean;
  params?: Record<string, string | number>;
};

const assistant = (): Echange[] => [
  { de: 'vous', vers: 'assistant', type: 'whatsapp', cle: 'asstAsk' },
  { de: 'assistant', vers: 'operations', type: 'ticket', etat: 'open', cle: 'asstOpen' },
  { de: 'operations', vers: 'assistant', type: 'ticket', etat: 'closed', cle: 'asstClose' },
  { de: 'assistant', vers: 'vous', type: 'whatsapp', cle: 'asstAnswer' },
];
const studio = (): Echange[] => [
  { de: 'vous', vers: 'studio', type: 'whatsapp', cle: 'studioAsk' },
  { de: 'studio', vers: 'vous', type: 'carte', cle: 'studioCard' },
  { de: 'studio', vers: 'hub', type: 'ticket', etat: 'applied', cle: 'studioApplied', suitCarte: true },
];
const tarif = (): Echange[] => [
  { de: 'tarification', vers: 'vous', type: 'carte', cle: 'tarifCard' },
  { de: 'tarification', vers: 'hub', type: 'ticket', etat: 'executed', cle: 'tarifDone', suitCarte: true },
];

/** Qui parle à qui pendant une journée type de l'établissement `id`. */
export function scenario(id: CasId, c: Journee = chiffresDe(id === 'conc' ? 50 : id === 'h30' ? 30 : 100)): Echange[] {
  if (id === 'conc') {
    return [
      { de: 'hub', vers: 'operations', type: 'ticket', cle: 'concPlan', params: { arrivees: c.arrivees, departs: c.departs, n: c.n } },
      { de: 'voyageurs', vers: 'service', type: 'whatsapp', cle: 'concAsk' },
      { de: 'service', vers: 'operations', type: 'ticket', etat: 'open', cle: 'concOpen' },
      { de: 'operations', vers: 'staff', type: 'whatsapp', cle: 'concStaff' },
      { de: 'staff', vers: 'operations', type: 'whatsapp', cle: 'concStaffReply' },
      { de: 'operations', vers: 'service', type: 'ticket', etat: 'closed', cle: 'concClose' },
      { de: 'service', vers: 'voyageurs', type: 'whatsapp', cle: 'concGuest' },
      { de: 'tiers', vers: 'operations', type: 'whatsapp', cle: 'concOwnerAsk' },
      { de: 'operations', vers: 'vous', type: 'carte', cle: 'concOwnerCard' },
      { de: 'operations', vers: 'tiers', type: 'whatsapp', cle: 'concOwnerReply', suitCarte: true },
      { de: 'voyageurs', vers: 'reservation', type: 'whatsapp', cle: 'concBookAsk' },
      { de: 'reservation', vers: 'vous', type: 'carte', cle: 'concBookCard' },
      { de: 'reservation', vers: 'voyageurs', type: 'whatsapp', cle: 'concBookReply', suitCarte: true },
      ...assistant(),
      ...studio(),
      { de: 'site', vers: 'vous', type: 'carte', cle: 'concSiteCard' },
      { de: 'site', vers: 'hub', type: 'ticket', etat: 'executed', cle: 'siteDone', suitCarte: true },
      ...tarif(),
      { de: 'prospection', vers: 'prospects', type: 'whatsapp', cle: 'concProsp1' },
      { de: 'prospects', vers: 'prospection', type: 'whatsapp', cle: 'concProsp2' },
      { de: 'prospection', vers: 'commercial', type: 'ticket', etat: 'open', cle: 'concProsp3' },
      { de: 'commercial', vers: 'vous', type: 'carte', cle: 'concQuote' },
      { de: 'commercial', vers: 'prospects', type: 'whatsapp', cle: 'quoteDone', suitCarte: true },
    ];
  }
  const r1 = numeroChambre(c.n, 0.37);
  const r2 = numeroChambre(c.n, 0.71);
  return [
    { de: 'hub', vers: 'operations', type: 'ticket', cle: 'hotPlan', params: { departs: c.departs, recouches: c.recouches, femmes: c.femmes } },
    { de: 'operations', vers: 'staff', type: 'whatsapp', cle: 'hotStaff', params: { femmes: c.femmes, r1 } },
    { de: 'voyageurs', vers: 'service', type: 'whatsapp', cle: 'hotAsk', params: { r1 } },
    { de: 'service', vers: 'operations', type: 'ticket', etat: 'open', cle: 'hotOpen', params: { r1 } },
    { de: 'staff', vers: 'operations', type: 'whatsapp', cle: 'hotStaffReply', params: { r1 } },
    { de: 'operations', vers: 'service', type: 'ticket', etat: 'closed', cle: 'hotClose', params: { r1 } },
    { de: 'service', vers: 'voyageurs', type: 'whatsapp', cle: 'hotGuest' },
    { de: 'service', vers: 'voyageurs', type: 'whatsapp', cle: 'hotWelcome', params: { arrivees: c.arrivees } },
    { de: 'voyageurs', vers: 'reservation', type: 'whatsapp', cle: 'hotBookAsk' },
    { de: 'reservation', vers: 'vous', type: 'carte', cle: 'hotBookCard', params: { r2 } },
    { de: 'reservation', vers: 'voyageurs', type: 'whatsapp', cle: 'hotBookReply', suitCarte: true },
    { de: 'operations', vers: 'tiers', type: 'whatsapp', cle: 'hotShuttle', params: { navettes: c.navettes } },
    { de: 'tiers', vers: 'operations', type: 'whatsapp', cle: 'hotShuttleOk' },
    { de: 'operations', vers: 'service', type: 'ticket', etat: 'closed', cle: 'hotShuttleClose' },
    ...assistant(),
    ...studio(),
    { de: 'site', vers: 'vous', type: 'carte', cle: 'hotSiteCard' },
    { de: 'site', vers: 'hub', type: 'ticket', etat: 'executed', cle: 'siteDone', suitCarte: true },
    ...tarif(),
    { de: 'prospection', vers: 'prospects', type: 'whatsapp', cle: 'hotProsp1' },
    { de: 'prospects', vers: 'prospection', type: 'whatsapp', cle: 'hotProsp2' },
    { de: 'prospection', vers: 'commercial', type: 'ticket', etat: 'open', cle: 'hotProsp3' },
    { de: 'commercial', vers: 'vous', type: 'carte', cle: 'hotQuote' },
    { de: 'commercial', vers: 'prospects', type: 'whatsapp', cle: 'quoteDone', suitCarte: true },
  ];
}

/** Le texte d'un échange : la clé seule, ou « Ok » / « Non » selon la décision sur la carte qui précède. */
export function cleTexte(e: Echange, decision?: 'ok' | 'non'): string {
  return e.suitCarte ? e.cle + (decision === 'non' ? 'Non' : 'Ok') : e.cle;
}
