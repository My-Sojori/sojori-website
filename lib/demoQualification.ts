/**
 * Questionnaire de qualification — étape 3 de la démo.
 *
 * L'ancien formulaire demandait six champs obligatoires dont deux zones de
 * texte libre, et quatre champs à saisir pour les outils en place. Un prospect
 * qui a déjà réservé son créneau ne remplit pas cela : les réponses reçues se
 * résumaient à « synchro » ou « automatisation », inexploitables.
 *
 * Tout passe donc en boutons, et rien n'est obligatoire. Une seule question
 * d'entrée — hôtel ou location courte durée — commande le reste : les deux
 * métiers n'ont ni les mêmes biens, ni les mêmes outils, ni les mêmes
 * difficultés. Proposer « Riad » à un gestionnaire d'appartements ou
 * « Rapports propriétaires » à un hôtelier fait perdre la confiance.
 *
 * Le champ libre ne réapparaît que derrière « Autre » : sans lui, on perdrait
 * les outils absents de nos listes.
 */

export type Segment = 'hotel' | 'str';

export interface Choice {
  value: string;
  label: string;
}

export interface SegmentConfig {
  /** Le mot juste pour l'unité : « chambre » ou « bien ». */
  unitLabel: string;
  propertyTypes: Choice[];
  sizes: Choice[];
  pms: Choice[];
  channelManager: Choice[];
  pricing: Choice[];
  challenges: Choice[];
  expectations: Choice[];
  /** Ne concerne que les gestionnaires : combien de biens en plus. */
  growth?: Choice[];
}

const COMMON_TIMELINE: Choice[] = [
  { value: 'asap', label: 'Dès que possible' },
  { value: '1-3-months', label: 'Dans 1 à 3 mois' },
  { value: '3-6-months', label: 'Dans 3 à 6 mois' },
  { value: 'exploring', label: "Je me renseigne" },
];

const HEAR_ABOUT_US: Choice[] = [
  { value: 'linkedin', label: 'LinkedIn' },
  { value: 'google', label: 'Recherche Google' },
  { value: 'referral', label: 'Bouche-à-oreille' },
  { value: 'event', label: 'Un événement' },
  { value: 'social', label: 'Instagram ou Facebook' },
  { value: 'other', label: 'Autrement' },
];

const HOTEL: SegmentConfig = {
  unitLabel: 'chambre',
  propertyTypes: [
    { value: 'hotel', label: 'Hôtel' },
    { value: 'riad', label: 'Riad' },
    { value: 'guesthouse', label: "Maison d'hôtes" },
    { value: 'resort', label: 'Resort' },
    { value: 'aparthotel', label: 'Résidence hôtelière' },
  ],
  sizes: [
    { value: '1-15', label: '1 à 15 chambres' },
    { value: '16-40', label: '16 à 40' },
    { value: '41-80', label: '41 à 80' },
    { value: '80+', label: 'Plus de 80' },
  ],
  pms: [
    { value: 'mews', label: 'Mews' },
    { value: 'opera', label: 'Opera' },
    { value: 'cloudbeds', label: 'Cloudbeds' },
    { value: 'nozoul', label: 'Nozoul' },
    { value: 'protel', label: 'Protel' },
    { value: 'other', label: 'Autre' },
  ],
  channelManager: [
    { value: 'included', label: 'Inclus dans mon PMS' },
    { value: 'siteminder', label: 'SiteMinder' },
    { value: 'channex', label: 'Channex' },
    { value: 'dedge', label: 'D-EDGE' },
    { value: 'none', label: 'Aucun' },
    { value: 'other', label: 'Autre' },
  ],
  pricing: [
    { value: 'manual', label: 'Je fixe mes prix à la main' },
    { value: 'pricelabs', label: 'PriceLabs' },
    { value: 'ideas', label: 'IDeaS' },
    { value: 'included', label: 'Inclus dans mon PMS' },
    { value: 'other', label: 'Autre' },
  ],
  challenges: [
    { value: 'sync', label: 'Synchroniser mes canaux' },
    { value: 'teams', label: 'Coordonner mes équipes' },
    { value: 'guest-messages', label: 'Répondre aux clients' },
    { value: 'revenue', label: 'Piloter mes prix et mon revenu' },
    { value: 'direct', label: 'Prendre plus de réservations directes' },
    { value: 'checkin', label: 'Check-in et fiche de police' },
    { value: 'upsell', label: 'Vendre plus de services' },
    { value: 'reporting', label: 'Y voir clair dans mes chiffres' },
  ],
  expectations: [
    { value: 'automate-comms', label: 'Automatiser la communication client' },
    { value: 'save-time', label: "Gagner du temps sur l'exploitation" },
    { value: 'revpar', label: 'Augmenter le revenu par chambre' },
    { value: 'direct-bookings', label: 'Reprendre le direct aux plateformes' },
    { value: 'replace-tool', label: 'Remplacer mon outil actuel' },
    { value: 'single-view', label: 'Tout voir au même endroit' },
  ],
};

const STR: SegmentConfig = {
  unitLabel: 'bien',
  propertyTypes: [
    { value: 'apartment', label: 'Appartement' },
    { value: 'villa', label: 'Villa' },
    { value: 'studio', label: 'Studio' },
    { value: 'house', label: 'Maison' },
    { value: 'riad', label: 'Riad' },
  ],
  sizes: [
    { value: '1-9', label: '1 à 9 biens' },
    { value: '10-29', label: '10 à 29' },
    { value: '30-60', label: '30 à 60' },
    { value: '60+', label: 'Plus de 60' },
  ],
  pms: [
    { value: 'hostaway', label: 'Hostaway' },
    { value: 'guesty', label: 'Guesty' },
    { value: 'smoobu', label: 'Smoobu' },
    { value: 'lodgify', label: 'Lodgify' },
    { value: 'beds24', label: 'Beds24' },
    { value: 'other', label: 'Autre' },
  ],
  channelManager: [
    { value: 'included', label: 'Inclus dans mon PMS' },
    { value: 'rentals-united', label: 'Rentals United' },
    { value: 'channex', label: 'Channex' },
    { value: 'none', label: 'Aucun' },
    { value: 'other', label: 'Autre' },
  ],
  pricing: [
    { value: 'manual', label: 'Je fixe mes prix à la main' },
    { value: 'pricelabs', label: 'PriceLabs' },
    { value: 'beyond', label: 'Beyond' },
    { value: 'wheelhouse', label: 'Wheelhouse' },
    { value: 'included', label: 'Inclus dans mon PMS' },
    { value: 'other', label: 'Autre' },
  ],
  challenges: [
    { value: 'sync', label: 'Synchroniser mes canaux' },
    { value: 'teams', label: 'Coordonner le ménage et la maintenance' },
    { value: 'guest-messages', label: 'Répondre aux voyageurs' },
    { value: 'revenue', label: 'Piloter mes prix et mon revenu' },
    { value: 'direct', label: 'Prendre plus de réservations directes' },
    { value: 'checkin', label: 'Check-in et fiche de police' },
    { value: 'owner-reports', label: 'Rendre compte à mes propriétaires' },
    { value: 'growth', label: 'Grossir sans embaucher' },
  ],
  expectations: [
    { value: 'automate-comms', label: 'Automatiser la communication voyageurs' },
    { value: 'save-time', label: "Gagner du temps sur l'exploitation" },
    { value: 'owner-portal', label: 'Des rapports propriétaires automatiques' },
    { value: 'direct-bookings', label: 'Reprendre le direct aux plateformes' },
    { value: 'replace-tool', label: 'Remplacer mon outil actuel' },
    { value: 'scale', label: 'Gérer plus de biens sans embaucher' },
  ],
  growth: [
    { value: '0', label: 'Aucun pour l’instant' },
    { value: '1-5', label: '1 à 5 de plus' },
    { value: '6-15', label: '6 à 15' },
    { value: '15+', label: 'Plus de 15' },
  ],
};

/**
 * La question la plus structurante du questionnaire.
 *
 * Sojori n'est pas un PMS, mais peut en fournir un. Selon la réponse, ce
 * n'est pas le même produit qu'on présente ni la même démonstration qu'on
 * prépare : orchestrer au-dessus d'un système en place, ou fournir le socle.
 * D'où une question à part entière, avant la liste des éditeurs.
 */
export const HAS_PMS: Choice[] = [
  { value: 'yes', label: 'Oui, j’en utilise un' },
  { value: 'spreadsheet', label: 'Un tableur, un cahier' },
  { value: 'no', label: 'Non, rien de structuré' },
];

export const SEGMENTS: Record<Segment, SegmentConfig> = { hotel: HOTEL, str: STR };

export { COMMON_TIMELINE, HEAR_ABOUT_US };

/** Le libellé lisible d'une valeur, pour ce qui est envoyé au CRM. */
export function labelOf(choices: Choice[], value: string): string {
  return choices.find(c => c.value === value)?.label ?? value;
}

/** Plusieurs libellés joints — le CRM attend du texte, pas des codes. */
export function labelsOf(choices: Choice[], values: string[]): string {
  return values.map(v => labelOf(choices, v)).join(', ');
}
