// Scénarios d'orchestration — déclinaisons hôtelières du parcours.
//
// 2026-09-11 : l'animation du hero ne montrait qu'un parcours, écrit au
// vocabulaire de la location courte durée (« Réservation Airbnb »,
// « Préparation logement », prix en euros) et découpé en ACTEURS
// (Guest / Sojori / Staff / Admin).
//
// Le positionnement est : « Sojori est le moteur d'orchestration de
// l'hospitalité. Il orchestre la guest experience, les opérations, les
// ventes et le revenu, en connectant les systèmes, les clients, les
// équipes et les partenaires. »
//
// Les lanes reflètent donc désormais les trois DOMAINES orchestrés, avec
// Sojori au centre comme moteur. Le revenu — un tiers de la proposition,
// jusqu'ici totalement absent de l'animation — devient visible.
//
// Ce qu'on ne perd pas au passage : les équipes et partenaires restaient
// le plus concret de l'ancienne version (Omar le chauffeur, Khadija au
// ménage). Ils sont conservés dans les cartes, désormais étiquetés par
// type de connexion — SYSTÈME, CLIENT, ÉQUIPE, PARTENAIRE — ce qui rend
// lisible la seconde moitié du positionnement.
//
// Le moteur d'animation n'est pas touché : ces scénarios réutilisent le
// type JourneyEvent tel quel.

import type { JourneyEvent, Lane, Phase } from './journey-data';

export interface Scenario {
  id: string;
  label: string;
  hint: string;
  phases: Phase[];
  lanes: Lane[];
  events: JourneyEvent[];
}

/**
 * Les lanes = les domaines orchestrés, pas les acteurs.
 * L'ordre compte : Sojori au centre du récit, en tête, puis les trois
 * domaines dans l'ordre où le positionnement les énonce.
 */
export const ORCHESTRATION_LANES: Lane[] = [
  { id: 0, label: 'SOJORI',      sublabel: 'Moteur d’orchestration', color: '#e6b022' },
  { id: 1, label: 'GUEST',       sublabel: 'Expérience client',      color: '#06b6d4' },
  { id: 2, label: 'OPERATIONS',  sublabel: 'Équipes & partenaires',  color: '#8b5cf6' },
  { id: 3, label: 'REVENUE',     sublabel: 'Ventes & revenu',        color: '#10b981' },
];

const L = { SOJORI: 0, GUEST: 1, OPS: 2, REVENUE: 3 } as const;

const PHASES_STAY: Phase[] = [
  { id: 'before',    label: "Avant l'arrivée",   range: 'J-7 → J-1', from: 0.00, to: 0.22 },
  { id: 'arrival',   label: 'Arrivée',           range: 'Jour J',    from: 0.22, to: 0.36 },
  { id: 'stay',      label: 'Pendant le séjour', range: 'J+1 → J+n', from: 0.36, to: 0.66 },
  { id: 'departure', label: 'Départ',            range: 'J+n',       from: 0.66, to: 0.86 },
  { id: 'after',     label: 'Après le séjour',   range: 'J+1 → J+2', from: 0.86, to: 1.00 },
];

// ─────────────────────────────────────────────────────────────
// 1. SÉJOUR HÔTEL — le scénario principal, affiché par défaut
// ─────────────────────────────────────────────────────────────
const HOTEL_STAY: JourneyEvent[] = [
  // ── AVANT L'ARRIVÉE ───────────────────────────────────────
  {
    id: 'booking', t: 0.0, lane: L.SOJORI, phase: 'before', type: 'declaration',
    icon: '🏨', title: 'Réservation Booking', sub: 'Sarah J. · 3 nuits · Chambre 204',
    status: 'completed', anim: 'confetti', tag: 'SYSTÈME',
    transitions: [
      { at: 0.013, status: 'completed', sub: 'Booking · Airbnb · direct synchronisés', tag: 'SYNCHRO' },
    ],
  },
  {
    id: 'rate-check', t: 0.02, lane: L.REVENUE, phase: 'before', type: 'admin',
    icon: '📈', title: 'Tarif de la nuit', sub: 'Demande forte · festival en ville',
    status: 'active', anim: 'pop', tag: 'REVENU',
    transitions: [
      { at: 0.07, status: 'completed', sub: 'Ajusté +12 % · dans vos bornes', tag: 'APPLIQUÉ' },
    ],
  },
  {
    id: 'staff-prep', t: 0.04, lane: L.OPS, phase: 'before', type: 'staff',
    icon: '🧹', title: 'Chambre préparée', sub: 'Khadija · contrôle qualité',
    status: 'active', anim: 'slide-right', tag: 'ÉQUIPE', avatar: 'K',
    transitions: [
      { at: 0.08, status: 'completed', sub: 'Propreté ✓ · Linge ✓ · Minibar ✓', tag: 'PRÊTE' },
    ],
  },
  {
    id: 'welcome', t: 0.06, lane: L.GUEST, phase: 'before', type: 'message',
    icon: '📨', title: 'Message de bienvenue', sub: 'Bienvenue à Marrakech !',
    status: 'completed', anim: 'fade', tag: 'CLIENT',
  },
  {
    id: 'police-form', t: 0.09, lane: L.SOJORI, phase: 'before', type: 'declaration',
    icon: '🪪', title: 'Fiche de police', sub: 'Envoyée sur WhatsApp…',
    status: 'pending', anim: 'pop', tag: 'CONFORMITÉ',
    transitions: [
      { at: 0.15, status: 'completed', sub: 'Remplie par le client · pièce jointe', tag: 'COMPLÈTE' },
    ],
  },
  {
    id: 'upsell', t: 0.13, lane: L.REVENUE, phase: 'before', type: 'request',
    icon: '⬆️', title: 'Surclassement proposé', sub: 'Suite disponible · +350 MAD',
    status: 'pending', anim: 'pop', tag: 'UPSELL',
    transitions: [
      { at: 0.19, status: 'completed', sub: 'Accepté · revenu additionnel', tag: 'VENDU' },
    ],
  },
  {
    id: 'arrival-slot', t: 0.15, lane: L.GUEST, phase: 'before', type: 'timeslot',
    icon: '🕓', title: 'Heure d’arrivée', sub: '16:00 — 17:00',
    status: 'info', anim: 'pop', tag: 'CLIENT',
    transitions: [
      { at: 0.20, status: 'completed', tag: 'CONFIRMÉ' },
    ],
  },
  {
    id: 'airport-shuttle', t: 0.18, lane: L.OPS, phase: 'before', type: 'request',
    icon: '✈️', title: 'Navette aéroport', sub: 'Omar · chauffeur partenaire',
    status: 'pending', anim: 'slide-right', tag: 'PARTENAIRE',
    transitions: [
      { at: 0.22, status: 'completed', sub: 'Vol AT750 suivi en direct', tag: 'PLANIFIÉ' },
    ],
  },

  // ── ARRIVÉE ───────────────────────────────────────────────
  {
    id: 'flight-delay', t: 0.24, lane: L.SOJORI, phase: 'arrival', type: 'admin',
    icon: '⚠️', title: 'Vol retardé de 40 min', sub: 'Détecté automatiquement',
    status: 'late', anim: 'shake', tag: 'SYSTÈME', priority: true,
    transitions: [
      { at: 0.28, status: 'completed', sub: 'Chauffeur et réception reprogrammés', tag: 'ABSORBÉ', priority: false },
    ],
  },
  {
    id: 'reshuffle', t: 0.26, lane: L.OPS, phase: 'arrival', type: 'cleaning',
    icon: '🔄', title: 'Ménage replanifié', sub: 'La 204 passe après la 207',
    status: 'active', anim: 'slide-right', tag: 'ÉQUIPE',
    transitions: [
      { at: 0.31, status: 'completed', sub: 'Sans appel · sans arbitrage humain', tag: 'AJUSTÉ' },
    ],
  },
  {
    id: 'arrived', t: 0.30, lane: L.GUEST, phase: 'arrival', type: 'declaration',
    icon: '🛎', title: 'Client accueilli', sub: 'Check-in en 2 minutes',
    status: 'completed', anim: 'stars', tag: 'CLIENT',
    transitions: [
      { at: 0.33, status: 'completed', sub: 'Fiche déjà remplie · clé remise', tag: 'INSTALLÉ' },
    ],
  },
  {
    id: 'city-tax', t: 0.33, lane: L.REVENUE, phase: 'arrival', type: 'declaration',
    icon: '🧾', title: 'Taxe de séjour', sub: 'Calculée · 3 nuits · 2 adultes',
    status: 'completed', anim: 'fade', tag: 'AUTO',
  },

  // ── PENDANT LE SÉJOUR ─────────────────────────────────────
  {
    id: 'room-service', t: 0.40, lane: L.GUEST, phase: 'stay', type: 'request',
    icon: '🍽', title: 'Room service', sub: 'Commandé depuis la chambre',
    status: 'pending', anim: 'bubble', tag: 'CLIENT',
    transitions: [
      { at: 0.45, status: 'completed', sub: 'Servi en 18 min', tag: 'SERVI' },
    ],
  },
  {
    id: 'extras-revenue', t: 0.44, lane: L.REVENUE, phase: 'stay', type: 'admin',
    icon: '💰', title: 'Extras facturés', sub: 'Ajoutés à la note · 180 MAD',
    status: 'completed', anim: 'pop', tag: 'REVENU',
  },
  {
    id: 'recouche', t: 0.46, lane: L.OPS, phase: 'stay', type: 'cleaning',
    icon: '🛏', title: 'Recouche quotidienne', sub: 'Fatima · chambre 204',
    status: 'active', anim: 'slide-right', tag: 'ÉQUIPE', avatar: 'F',
    transitions: [
      { at: 0.52, status: 'completed', sub: 'Faite · 14 min · linge changé', tag: 'TERMINÉE' },
    ],
  },
  {
    id: 'maintenance', t: 0.53, lane: L.OPS, phase: 'stay', type: 'admin',
    icon: '🔧', title: 'Climatiseur signalé', sub: 'Ticket ouvert sur la 204',
    status: 'late', anim: 'shake', tag: 'ÉQUIPE', priority: true,
    transitions: [
      { at: 0.60, status: 'completed', sub: 'Réparé · client prévenu', tag: 'RÉSOLU', priority: false },
    ],
  },
  {
    id: 'spa', t: 0.58, lane: L.OPS, phase: 'stay', type: 'request',
    icon: '💆', title: 'Hammam & spa', sub: 'Partenaire · créneau demandé',
    status: 'pending', anim: 'pop', tag: 'PARTENAIRE',
    transitions: [
      { at: 0.64, status: 'completed', sub: 'Réservé · demain 15:00 · commission', tag: 'CONFIRMÉ' },
    ],
  },

  // ── DÉPART ────────────────────────────────────────────────
  {
    id: 'depart-instr', t: 0.68, lane: L.GUEST, phase: 'departure', type: 'message',
    icon: '📤', title: 'Instructions de départ', sub: 'Envoyées la veille',
    status: 'completed', anim: 'fade', tag: 'CLIENT',
  },
  {
    id: 'late-checkout', t: 0.72, lane: L.REVENUE, phase: 'departure', type: 'timeslot',
    icon: '🕚', title: 'Départ tardif', sub: 'Demandé pour 14:00',
    status: 'pending', anim: 'pop', tag: 'UPSELL',
    transitions: [
      { at: 0.77, status: 'completed', sub: 'Accordé · vendu 200 MAD', tag: 'VENDU' },
    ],
  },
  {
    id: 'folio', t: 0.78, lane: L.SOJORI, phase: 'departure', type: 'declaration',
    icon: '💳', title: 'Note du séjour', sub: 'Chambre · restaurant · spa',
    status: 'active', anim: 'pop', tag: 'SYSTÈME',
    transitions: [
      { at: 0.82, status: 'completed', sub: 'Réglée à la borne · facture envoyée', tag: 'SOLDÉE' },
    ],
  },
  {
    id: 'departed', t: 0.84, lane: L.GUEST, phase: 'departure', type: 'declaration',
    icon: '👋', title: 'Départ confirmé', sub: 'Chambre libérée à 14:05',
    status: 'completed', anim: 'fade', tag: 'CLIENT',
  },

  // ── APRÈS LE SÉJOUR ───────────────────────────────────────
  {
    id: 'final-clean', t: 0.87, lane: L.OPS, phase: 'after', type: 'cleaning',
    icon: '🧽', title: 'Chambre à blanc', sub: 'Arrivée suivante dans 2 h',
    status: 'active', anim: 'priority', tag: 'PRIORITÉ', avatar: 'K', priority: true,
    transitions: [
      { at: 0.94, status: 'completed', sub: 'Prête · contrôlée · 38 min', tag: 'PRÊTE', priority: false },
    ],
  },
  {
    id: 'review', t: 0.91, lane: L.GUEST, phase: 'after', type: 'message',
    icon: '⭐', title: 'Demande d’avis', sub: 'Envoyée à J+1',
    status: 'pending', anim: 'fade', tag: 'CLIENT',
    transitions: [
      { at: 0.96, status: 'completed', sub: '5 étoiles · publiée sur Booking', tag: '5★' },
    ],
  },
  {
    id: 'stay-value', t: 0.94, lane: L.REVENUE, phase: 'after', type: 'admin',
    icon: '📊', title: 'Valeur du séjour', sub: 'Chambre + extras + surclassement',
    status: 'info', anim: 'fade', tag: 'REVENU',
    transitions: [
      { at: 0.98, status: 'completed', sub: '+18 % vs tarif nu · direct encouragé', tag: 'MESURÉ' },
    ],
  },
];

// ─────────────────────────────────────────────────────────────
// 2. CHECK-IN — deux chemins, un seul dossier
// ─────────────────────────────────────────────────────────────
const CHECKIN_PHASES: Phase[] = [
  { id: 'before',    label: 'Avant la venue',  range: 'J-3 → J-1', from: 0.00, to: 0.28 },
  { id: 'arrival',   label: 'À la réception',  range: 'Jour J',    from: 0.28, to: 0.56 },
  { id: 'stay',      label: 'Vérification',    range: 'Jour J',    from: 0.56, to: 0.78 },
  { id: 'departure', label: 'Clé remise',      range: 'Jour J',    from: 0.78, to: 0.92 },
  { id: 'after',     label: 'Dossier complet', range: 'Archivé',   from: 0.92, to: 1.00 },
];

const CHECKIN: JourneyEvent[] = [
  {
    id: 'ci-invite', t: 0.02, lane: L.SOJORI, phase: 'before', type: 'message',
    icon: '📲', title: 'Invitation au check-in', sub: 'Lien envoyé sur WhatsApp',
    status: 'completed', anim: 'fade', tag: 'SYSTÈME',
  },
  {
    id: 'ci-choice', t: 0.07, lane: L.GUEST, phase: 'before', type: 'timeslot',
    icon: '🔀', title: 'Le client choisit', sub: 'WhatsApp ou borne en réception',
    status: 'info', anim: 'pop', tag: 'CLIENT',
    transitions: [
      { at: 0.24, status: 'completed', sub: 'Les deux mènent au même dossier', tag: 'AU CHOIX' },
    ],
  },
  {
    id: 'ci-whatsapp', t: 0.13, lane: L.GUEST, phase: 'before', type: 'declaration',
    icon: '💬', title: 'Voie WhatsApp', sub: 'Fiche de police remplie à distance',
    status: 'active', anim: 'bubble', tag: 'CLIENT',
    transitions: [
      { at: 0.26, status: 'completed', sub: 'Pièce d’identité photographiée · signée', tag: 'SIGNÉE' },
    ],
  },
  {
    id: 'ci-prep', t: 0.20, lane: L.OPS, phase: 'before', type: 'staff',
    icon: '🔑', title: 'Chambre attribuée', sub: 'La 204 sort du ménage',
    status: 'active', anim: 'slide-right', tag: 'ÉQUIPE',
    transitions: [
      { at: 0.30, status: 'completed', sub: 'Contrôlée · clé encodée', tag: 'PRÊTE' },
    ],
  },
  {
    id: 'ci-kiosk', t: 0.32, lane: L.GUEST, phase: 'arrival', type: 'declaration',
    icon: '🖥', title: 'Voie borne', sub: 'Le client se présente en réception',
    status: 'active', anim: 'slide-right', tag: 'CLIENT',
    transitions: [
      { at: 0.46, status: 'completed', sub: 'Scan passeport · signature tactile', tag: 'SIGNÉE' },
    ],
  },
  {
    id: 'ci-payment', t: 0.42, lane: L.REVENUE, phase: 'arrival', type: 'declaration',
    icon: '💳', title: 'Empreinte carte', sub: 'Prise sur la borne de paiement',
    status: 'pending', anim: 'pop', tag: 'REVENU',
    transitions: [
      { at: 0.54, status: 'completed', sub: 'Autorisée · aucun montant débité', tag: 'VALIDÉE' },
    ],
  },
  {
    id: 'ci-upsell', t: 0.48, lane: L.REVENUE, phase: 'arrival', type: 'request',
    icon: '⬆️', title: 'Petit-déjeuner proposé', sub: 'Sur la borne · 3 nuits',
    status: 'pending', anim: 'pop', tag: 'UPSELL',
    transitions: [
      { at: 0.58, status: 'completed', sub: 'Ajouté à la note · +240 MAD', tag: 'VENDU' },
    ],
  },
  {
    id: 'ci-merge', t: 0.58, lane: L.SOJORI, phase: 'stay', type: 'declaration',
    icon: '🗂', title: 'Un seul dossier', sub: 'Les deux voies convergent',
    status: 'active', anim: 'cascade', tag: 'SYSTÈME',
    transitions: [
      { at: 0.66, status: 'completed', sub: 'Identité · fiche · caution · taxe', tag: 'COMPLET' },
    ],
  },
  {
    id: 'ci-tax', t: 0.62, lane: L.REVENUE, phase: 'stay', type: 'declaration',
    icon: '🧾', title: 'Taxe de séjour', sub: 'Calculée selon le paramétrage',
    status: 'completed', anim: 'fade', tag: 'AUTO',
  },
  {
    id: 'ci-check', t: 0.70, lane: L.OPS, phase: 'stay', type: 'admin',
    icon: '✅', title: 'Contrôle réception', sub: 'Pièces manquantes signalées',
    status: 'active', anim: 'pop', tag: 'ÉQUIPE', avatar: 'R',
    transitions: [
      { at: 0.76, status: 'completed', sub: 'Rien ne manque · prêt à remettre', tag: 'CONFORME' },
    ],
  },
  {
    id: 'ci-key', t: 0.80, lane: L.GUEST, phase: 'departure', type: 'request',
    icon: '🔑', title: 'Clé remise', sub: 'Chambre 204 · 3e étage',
    status: 'completed', anim: 'stars', tag: 'CLIENT',
  },
  {
    id: 'ci-archive', t: 0.94, lane: L.SOJORI, phase: 'after', type: 'declaration',
    icon: '🔒', title: 'Dossier archivé', sub: 'Données prêtes à déclarer',
    status: 'completed', anim: 'fade', tag: 'CONFORMITÉ',
  },
];

// ─────────────────────────────────────────────────────────────
// 3. ROOM SERVICE — la demande devient tâche, puis revenu
// ─────────────────────────────────────────────────────────────
const SERVICE_PHASES: Phase[] = [
  { id: 'before',    label: 'La demande',   range: '20:41', from: 0.00, to: 0.24 },
  { id: 'arrival',   label: 'Assignation',  range: '20:42', from: 0.24, to: 0.46 },
  { id: 'stay',      label: 'Préparation',  range: '20:45', from: 0.46, to: 0.70 },
  { id: 'departure', label: 'Service',      range: '20:59', from: 0.70, to: 0.88 },
  { id: 'after',     label: 'Facturation',  range: 'Note',  from: 0.88, to: 1.00 },
];

const ROOM_SERVICE: JourneyEvent[] = [
  {
    id: 'rs-order', t: 0.02, lane: L.GUEST, phase: 'before', type: 'request',
    icon: '💬', title: 'Commande du client', sub: '« Un tajine et deux thés, svp »',
    status: 'active', anim: 'bubble', tag: 'CLIENT',
    transitions: [
      { at: 0.18, status: 'completed', sub: 'Comprise · chambre 204 identifiée', tag: 'REÇUE' },
    ],
  },
  {
    id: 'rs-menu', t: 0.09, lane: L.SOJORI, phase: 'before', type: 'declaration',
    icon: '📋', title: 'Carte consultée', sub: 'Disponibilité et prix vérifiés',
    status: 'completed', anim: 'fade', tag: 'SYSTÈME',
  },
  {
    id: 'rs-suggest', t: 0.14, lane: L.REVENUE, phase: 'before', type: 'request',
    icon: '🍰', title: 'Suggestion du soir', sub: 'Dessert proposé · +45 MAD',
    status: 'pending', anim: 'pop', tag: 'UPSELL',
    transitions: [
      { at: 0.22, status: 'completed', sub: 'Accepté par le client', tag: 'VENDU' },
    ],
  },
  {
    id: 'rs-confirm', t: 0.20, lane: L.GUEST, phase: 'before', type: 'message',
    icon: '✅', title: 'Confirmation au client', sub: 'Servi dans 20 minutes environ',
    status: 'completed', anim: 'pop', tag: 'CLIENT',
  },
  {
    id: 'rs-task', t: 0.28, lane: L.OPS, phase: 'arrival', type: 'staff',
    icon: '👨‍🍳', title: 'Tâche cuisine', sub: 'Youssef · assignée automatiquement',
    status: 'active', anim: 'slide-right', tag: 'ÉQUIPE', avatar: 'Y',
    transitions: [
      { at: 0.42, status: 'completed', sub: 'Acceptée · préparation lancée', tag: 'EN COURS' },
    ],
  },
  {
    id: 'rs-special', t: 0.36, lane: L.GUEST, phase: 'arrival', type: 'request',
    icon: '🌿', title: 'Demande particulière', sub: '« Sans coriandre »',
    status: 'info', anim: 'pop', tag: 'CLIENT',
    transitions: [
      { at: 0.44, status: 'completed', sub: 'Transmise en cuisine', tag: 'PRISE EN COMPTE' },
    ],
  },
  {
    id: 'rs-stock', t: 0.50, lane: L.SOJORI, phase: 'stay', type: 'declaration',
    icon: '📦', title: 'Stock décrémenté', sub: 'Économat mis à jour',
    status: 'completed', anim: 'fade', tag: 'SYSTÈME',
  },
  {
    id: 'rs-prep', t: 0.54, lane: L.OPS, phase: 'stay', type: 'staff',
    icon: '🍲', title: 'Préparation', sub: 'En cours · 14 min',
    status: 'active', anim: 'fade', tag: 'ÉQUIPE',
    transitions: [
      { at: 0.66, status: 'completed', sub: 'Prêt · plateau dressé', tag: 'PRÊT' },
    ],
  },
  {
    id: 'rs-runner', t: 0.72, lane: L.OPS, phase: 'departure', type: 'staff',
    icon: '🛎', title: 'Montée en chambre', sub: 'Karim · étage 3',
    status: 'active', anim: 'slide-right', tag: 'ÉQUIPE', avatar: 'K',
    transitions: [
      { at: 0.84, status: 'completed', sub: 'Servi à 20:59 · 18 min au total', tag: 'SERVI' },
    ],
  },
  {
    id: 'rs-folio', t: 0.90, lane: L.REVENUE, phase: 'after', type: 'declaration',
    icon: '🧾', title: 'Ajouté à la note', sub: 'Chambre 204 · 225 MAD',
    status: 'completed', anim: 'pop', tag: 'REVENU',
  },
  {
    id: 'rs-stat', t: 0.95, lane: L.REVENUE, phase: 'after', type: 'admin',
    icon: '📊', title: 'Revenu hors hébergement', sub: 'Suivi par chambre et par service',
    status: 'info', anim: 'fade', tag: 'MESURÉ',
    transitions: [
      { at: 0.98, status: 'completed', sub: '+12 % ce mois-ci', tag: '+12 %' },
    ],
  },
];

// ─────────────────────────────────────────────────────────────
// 4. HOUSEKEEPING — recouche, remise à blanc, et l'imprévu
// ─────────────────────────────────────────────────────────────
const HK_PHASES: Phase[] = [
  { id: 'before',    label: 'Plan du jour',     range: '07:00', from: 0.00, to: 0.22 },
  { id: 'arrival',   label: 'Recouches',        range: '09:00', from: 0.22, to: 0.46 },
  { id: 'stay',      label: 'Imprévu',          range: '11:20', from: 0.46, to: 0.66 },
  { id: 'departure', label: 'Chambres à blanc', range: '12:00', from: 0.66, to: 0.88 },
  { id: 'after',     label: 'Contrôle',         range: '15:30', from: 0.88, to: 1.00 },
];

const HOUSEKEEPING: JourneyEvent[] = [
  {
    id: 'hk-plan', t: 0.02, lane: L.SOJORI, phase: 'before', type: 'declaration',
    icon: '🗓', title: 'Plan du jour', sub: '18 recouches · 6 départs',
    status: 'active', anim: 'cascade', tag: 'SYSTÈME',
    transitions: [
      { at: 0.16, status: 'completed', sub: 'Construit sur les départs réels', tag: 'RÉPARTI' },
    ],
  },
  {
    id: 'hk-dispatch', t: 0.10, lane: L.OPS, phase: 'before', type: 'staff',
    icon: '📱', title: 'Missions envoyées', sub: 'Sur WhatsApp · en arabe',
    status: 'completed', anim: 'slide-right', tag: 'ÉQUIPE',
    transitions: [
      { at: 0.20, status: 'completed', sub: 'Aucune application à installer', tag: 'REÇUES' },
    ],
  },
  {
    id: 'hk-recouche', t: 0.26, lane: L.OPS, phase: 'arrival', type: 'cleaning',
    icon: '🛏', title: 'Recouches en cours', sub: 'Fatima · étage 2',
    status: 'active', anim: 'fade', tag: 'ÉQUIPE', avatar: 'F',
    transitions: [
      { at: 0.42, status: 'completed', sub: '9 chambres · 12 min en moyenne', tag: '9 FAITES' },
    ],
  },
  {
    id: 'hk-dnd', t: 0.32, lane: L.GUEST, phase: 'arrival', type: 'request',
    icon: '🚪', title: 'Ne pas déranger', sub: 'Chambre 118 · client présent',
    status: 'info', anim: 'pop', tag: 'CLIENT',
    transitions: [
      { at: 0.44, status: 'completed', sub: 'Replanifiée en fin de matinée', tag: 'DÉCALÉE' },
    ],
  },
  {
    id: 'hk-absent', t: 0.50, lane: L.SOJORI, phase: 'stay', type: 'admin',
    icon: '⚠️', title: 'Une femme de chambre absente', sub: '5 chambres sans intervenant',
    status: 'late', anim: 'shake', tag: 'SYSTÈME', priority: true,
    transitions: [
      { at: 0.62, status: 'completed', sub: 'Réparties sur l’équipe · sans appel', tag: 'RÉASSIGNÉES', priority: false },
    ],
  },
  {
    id: 'hk-linen', t: 0.56, lane: L.OPS, phase: 'stay', type: 'staff',
    icon: '🧺', title: 'Blanchisserie', sub: 'Partenaire · linge manquant signalé',
    status: 'pending', anim: 'pop', tag: 'PARTENAIRE',
    transitions: [
      { at: 0.65, status: 'completed', sub: 'Réapprovisionné en 10 min', tag: 'RÉSOLU' },
    ],
  },
  {
    id: 'hk-checkout', t: 0.70, lane: L.OPS, phase: 'departure', type: 'cleaning',
    icon: '🧽', title: 'Chambres à blanc', sub: 'Déclenchées au départ constaté',
    status: 'active', anim: 'slide-right', tag: 'ÉQUIPE', avatar: 'K',
    transitions: [
      { at: 0.84, status: 'completed', sub: '6 chambres · remises à neuf', tag: '6 PRÊTES' },
    ],
  },
  {
    id: 'hk-priority', t: 0.75, lane: L.REVENUE, phase: 'departure', type: 'cleaning',
    icon: '⚡', title: 'Arrivée anticipée vendue', sub: 'Check-in tôt · 150 MAD',
    status: 'active', anim: 'priority', tag: 'UPSELL', priority: true,
    transitions: [
      { at: 0.86, status: 'completed', sub: 'Chambre prête à 13:42 · tenue', tag: 'VENDU', priority: false },
    ],
  },
  {
    id: 'hk-control', t: 0.90, lane: L.OPS, phase: 'after', type: 'admin',
    icon: '🔍', title: 'Contrôle qualité', sub: 'Gouvernante · 4 chambres vérifiées',
    status: 'active', anim: 'pop', tag: 'ÉQUIPE', avatar: 'S',
    transitions: [
      { at: 0.96, status: 'completed', sub: 'Conformes · état visible en direct', tag: 'VALIDÉES' },
    ],
  },
  {
    id: 'hk-ready', t: 0.94, lane: L.SOJORI, phase: 'after', type: 'declaration',
    icon: '🟢', title: 'Inventaire à jour', sub: 'Chambres vendables en temps réel',
    status: 'completed', anim: 'fade', tag: 'SYSTÈME',
  },
];

// ─────────────────────────────────────────────────────────────
// 5. REVENU — le volet sales & revenue, invisible jusqu'ici
// ─────────────────────────────────────────────────────────────
const REV_PHASES: Phase[] = [
  { id: 'before',    label: 'Signaux',      range: 'J-30',   from: 0.00, to: 0.22 },
  { id: 'arrival',   label: 'Décision',     range: 'J-21',   from: 0.22, to: 0.44 },
  { id: 'stay',      label: 'Distribution', range: 'Canaux', from: 0.44, to: 0.66 },
  { id: 'departure', label: 'Séjour',       range: 'Extras', from: 0.66, to: 0.86 },
  { id: 'after',     label: 'Mesure',       range: 'Bilan',  from: 0.86, to: 1.00 },
];

const REVENUE: JourneyEvent[] = [
  {
    id: 'rv-signals', t: 0.02, lane: L.SOJORI, phase: 'before', type: 'declaration',
    icon: '📡', title: 'Signaux du marché', sub: 'Occupation · concurrence · calendrier',
    status: 'active', anim: 'cascade', tag: 'SYSTÈME',
    transitions: [
      { at: 0.14, status: 'completed', sub: 'Festival détecté · demande forte', tag: 'ANALYSÉ' },
    ],
  },
  {
    id: 'rv-pace', t: 0.10, lane: L.REVENUE, phase: 'before', type: 'admin',
    icon: '📈', title: 'Rythme de réservation', sub: 'Comparé à l’an dernier',
    status: 'info', anim: 'pop', tag: 'REVENU',
    transitions: [
      { at: 0.20, status: 'completed', sub: '+22 % sur la même période', tag: '+22 %' },
    ],
  },
  {
    id: 'rv-calc', t: 0.24, lane: L.SOJORI, phase: 'arrival', type: 'admin',
    icon: '🧮', title: 'Prix recalculé', sub: 'Calcul par règles, pas au hasard',
    status: 'active', anim: 'pop', tag: 'MOTEUR',
    transitions: [
      { at: 0.34, status: 'completed', sub: 'Proposition : +12 % sur 3 nuits', tag: 'PROPOSÉ' },
    ],
  },
  {
    id: 'rv-guardrail', t: 0.30, lane: L.REVENUE, phase: 'arrival', type: 'admin',
    icon: '🛡', title: 'Bornes respectées', sub: 'Min et max que vous avez fixés',
    status: 'active', anim: 'fade', tag: 'GARDE-FOU',
    transitions: [
      { at: 0.40, status: 'completed', sub: 'Dans la fourchette · appliqué', tag: 'VALIDÉ' },
    ],
  },
  {
    id: 'rv-approve', t: 0.36, lane: L.OPS, phase: 'arrival', type: 'staff',
    icon: '👤', title: 'Vous gardez la main', sub: 'Niveau d’autonomie paramétrable',
    status: 'info', anim: 'pop', tag: 'ÉQUIPE',
    transitions: [
      { at: 0.43, status: 'completed', sub: 'Auto sous seuil · validation au-delà', tag: 'RÉGLÉ' },
    ],
  },
  {
    id: 'rv-push', t: 0.48, lane: L.SOJORI, phase: 'stay', type: 'declaration',
    icon: '🔄', title: 'Poussé sur les canaux', sub: 'Booking · Airbnb · direct',
    status: 'active', anim: 'slide-right', tag: 'SYSTÈME',
    transitions: [
      { at: 0.58, status: 'completed', sub: 'Synchronisé partout · 40 s', tag: 'À JOUR' },
    ],
  },
  {
    id: 'rv-mix', t: 0.54, lane: L.REVENUE, phase: 'stay', type: 'admin',
    icon: '🥧', title: 'Mix canaux', sub: 'Booking 62 % · direct 23 %',
    status: 'info', anim: 'pop', tag: 'REVENU',
    transitions: [
      { at: 0.64, status: 'completed', sub: 'Commission nette calculée par canal', tag: 'ARBITRÉ' },
    ],
  },
  {
    id: 'rv-direct', t: 0.60, lane: L.GUEST, phase: 'stay', type: 'message',
    icon: '💬', title: 'Réservation directe', sub: 'Client fidèle · via WhatsApp',
    status: 'completed', anim: 'confetti', tag: 'CLIENT',
    transitions: [
      { at: 0.66, status: 'completed', sub: 'Zéro commission sur ce séjour', tag: 'DIRECT' },
    ],
  },
  {
    id: 'rv-upsell', t: 0.70, lane: L.REVENUE, phase: 'departure', type: 'request',
    icon: '⬆️', title: 'Extras vendus', sub: 'Surclassement · spa · petit-déjeuner',
    status: 'active', anim: 'pop', tag: 'UPSELL',
    transitions: [
      { at: 0.80, status: 'completed', sub: '+790 MAD sur le séjour', tag: 'VENDU' },
    ],
  },
  {
    id: 'rv-partner', t: 0.76, lane: L.OPS, phase: 'departure', type: 'staff',
    icon: '🤝', title: 'Commissions partenaires', sub: 'Spa · transport · excursions',
    status: 'completed', anim: 'fade', tag: 'PARTENAIRE',
  },
  {
    id: 'rv-revpar', t: 0.88, lane: L.REVENUE, phase: 'after', type: 'admin',
    icon: '📊', title: 'RevPAR du mois', sub: 'Revenu par chambre disponible',
    status: 'active', anim: 'pop', tag: 'MESURÉ',
    transitions: [
      { at: 0.95, status: 'completed', sub: '+18 % · dont 6 % hors hébergement', tag: '+18 %' },
    ],
  },
  {
    id: 'rv-learn', t: 0.94, lane: L.SOJORI, phase: 'after', type: 'declaration',
    icon: '🎯', title: 'Règles affinées', sub: 'Ce qui a marché nourrit la suite',
    status: 'completed', anim: 'stars', tag: 'MOTEUR',
  },
];

// ─────────────────────────────────────────────────────────────

export const SCENARIOS: Scenario[] = [
  {
    id: 'hotel',
    label: 'Séjour hôtel',
    hint: 'Expérience, opérations et revenu sur un même séjour',
    phases: PHASES_STAY, lanes: ORCHESTRATION_LANES, events: HOTEL_STAY,
  },
  {
    id: 'checkin',
    label: 'Check-in',
    hint: 'Borne en réception ou WhatsApp — un seul dossier',
    phases: CHECKIN_PHASES, lanes: ORCHESTRATION_LANES, events: CHECKIN,
  },
  {
    id: 'service',
    label: 'Room service',
    hint: 'Une demande devient une tâche, puis du revenu',
    phases: SERVICE_PHASES, lanes: ORCHESTRATION_LANES, events: ROOM_SERVICE,
  },
  {
    id: 'housekeeping',
    label: 'Housekeeping',
    hint: 'Recouche, chambre à blanc, et l’imprévu absorbé',
    phases: HK_PHASES, lanes: ORCHESTRATION_LANES, events: HOUSEKEEPING,
  },
  {
    id: 'revenue',
    label: 'Revenu',
    hint: 'Le prix se décide par règles — vous gardez la main',
    phases: REV_PHASES, lanes: ORCHESTRATION_LANES, events: REVENUE,
  },
];

export const DEFAULT_SCENARIO = SCENARIOS[0];

export function getScenario(id: string | null | undefined): Scenario {
  return SCENARIOS.find((s) => s.id === id) ?? DEFAULT_SCENARIO;
}
