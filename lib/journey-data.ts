// Sojori Journey Data — 18 tâches orchestrées, 4 lanes, 5 phases
// Adapté pour theme light Aurora Soft

export interface Phase {
  id: string;
  label: string;
  range: string;
  from: number;
  to: number;
}

export interface Lane {
  id: number;
  label: string;
  sublabel: string;
  color: string;
}

export interface EventTransition {
  at: number;
  status?: EventStatus;
  sub?: string;
  tag?: string;
  icon?: string;
  avatar?: string;
  priority?: boolean;
}

export interface JourneyEvent {
  id: string;
  t: number;
  lane: number;
  phase: string;
  type: EventType;
  icon: string;
  title: string;
  sub: string;
  status: EventStatus;
  anim: AnimationType;
  tag: string;
  avatar?: string;
  priority?: boolean;
  transitions?: EventTransition[];
}

export type EventStatus = 'pending' | 'active' | 'completed' | 'info' | 'late' | 'soon';
export type EventType = 'message' | 'declaration' | 'timeslot' | 'cleaning' | 'request' | 'staff' | 'admin';
export type AnimationType = 'fade' | 'slide-right' | 'pop' | 'bounce' | 'bubble' | 'cascade' | 'shake' | 'confetti' | 'stars' | 'priority';

export const PHASES: Phase[] = [
  { id: 'before',    label: "Avant l'arrivée",  range: 'J-7 → J-1', from: 0.00, to: 0.22 },
  { id: 'arrival',   label: 'Arrivée',          range: 'Jour J',     from: 0.22, to: 0.36 },
  { id: 'stay',      label: 'Pendant le séjour', range: 'J+1 → J+n', from: 0.36, to: 0.66 },
  { id: 'departure', label: 'Départ',           range: 'J+n',        from: 0.66, to: 0.86 },
  { id: 'after',     label: 'Après le séjour',  range: 'J+1 → J+2', from: 0.86, to: 1.00 },
];

export const LANES: Lane[] = [
  { id: 0, label: 'GUEST',  sublabel: 'Voyageur',      color: '#06b6d4' }, // cyan
  { id: 1, label: 'SOJORI', sublabel: 'Orchestrateur', color: '#e6b022' }, // yellow/orange brand
  { id: 2, label: 'STAFF',  sublabel: 'Équipe terrain', color: '#8b5cf6' }, // violet
  { id: 3, label: 'ADMIN',  sublabel: 'Superviseur',   color: '#ef4444' }, // red
];

// Type colors for left border accent
export const TYPE_COLORS: Record<EventType, string> = {
  message:     '#3b82f6',  // blue — messages
  declaration: '#10b981',  // green — déclarations
  timeslot:    '#f59e0b',  // orange — choix timeslot
  cleaning:    '#8b5cf6',  // violet — ménages
  request:     '#ec4899',  // pink — demandes client
  staff:       '#06b6d4',  // cyan — préparation
  admin:       '#ef4444',  // red — admin
};

export const EVENTS: JourneyEvent[] = [
  // ── AVANT L'ARRIVÉE ─────────────────────────────────────────
  // Réservation initiale
  {
    id: 'booking', t: 0.00, lane: 1, phase: 'before', type: 'declaration',
    icon: '🏠', title: 'Réservation Airbnb', sub: 'Sarah J. · 3 nuits · €840',
    status: 'completed', anim: 'confetti', tag: 'J-14',
    transitions: [
      { at: 0.02, status: 'completed', sub: 'Sync auto → Calendrier · Paiement confirmé', tag: 'Synced' },
    ]
  },

  {
    id: 'staff-prep', t: 0.03, lane: 2, phase: 'before', type: 'staff',
    icon: '👨‍🔧', title: 'Préparation logement', sub: 'Lucas · Contrôle qualité',
    status: 'active', anim: 'slide-right', tag: 'J-1', avatar: 'L',
    transitions: [
      { at: 0.06, status: 'completed', sub: 'Qualité ✓ · Stock ✓ · Clés ✓', tag: 'Prêt' },
    ]
  },

  {
    id: 'welcome', t: 0.05, lane: 0, phase: 'before', type: 'message',
    icon: '📨', title: 'Message bienvenue', sub: "« Welcome to Paris! Your stay starts soon »",
    status: 'completed', anim: 'fade', tag: 'J-7'
  },

  {
    id: 'register', t: 0.08, lane: 1, phase: 'before', type: 'declaration',
    icon: '🔐', title: 'Registration', sub: 'KYC en cours…',
    status: 'pending', anim: 'pop', tag: 'En cours',
    transitions: [
      { at: 0.14, status: 'completed', sub: 'Identité vérifiée en 30 secondes', tag: 'Validé' },
    ]
  },

  {
    id: 'arrival-slot', t: 0.12, lane: 0, phase: 'before', type: 'timeslot',
    icon: '🎫', title: 'Choix arrivée', sub: 'Créneau 16:00 — 17:00',
    status: 'info', anim: 'pop', tag: 'Timeslot',
    transitions: [
      { at: 0.20, status: 'completed', tag: 'Confirmé' },
    ]
  },

  {
    id: 'kids-club', t: 0.16, lane: 0, phase: 'before', type: 'request',
    icon: '👶', title: 'Kids Club demandé', sub: 'Service garde enfants',
    status: 'pending', anim: 'pop', tag: 'Option',
    transitions: [
      { at: 0.21, status: 'completed', sub: 'Kids Club réservé · 2 enfants', tag: 'Confirmé' },
    ]
  },

  {
    id: 'airport-shuttle', t: 0.18, lane: 0, phase: 'before', type: 'request',
    icon: '✈️', title: 'Navette aéroport', sub: "Demande transfert à l'arrivée",
    status: 'pending', anim: 'slide-right', tag: 'Transport',
    transitions: [
      { at: 0.22, status: 'completed', sub: 'Chauffeur confirmé · Vol AA123', tag: 'Planifié' },
    ]
  },

  // ── ARRIVÉE ─────────────────────────────────────────────────
  {
    id: 'arrived', t: 0.24, lane: 0, phase: 'arrival', type: 'declaration',
    icon: '🏨', title: 'Arrivée client', sub: 'GPS + QR · auto-déclaré',
    status: 'completed', anim: 'pop', tag: 'Jour J'
  },

  // Admin conflict: Départ non déclaré + nouvelle arrivée même jour
  {
    id: 'admin-conflict', t: 0.27, lane: 3, phase: 'arrival', type: 'admin',
    icon: '⚠️', title: 'Conflit planning', sub: 'Client précédent n\'a pas déclaré son départ',
    status: 'late', anim: 'shake', tag: 'Blocage',
    transitions: [
      { at: 0.29, status: 'active', sub: 'Admin contacte client sortant · Heure départ ?', tag: 'En cours', icon: '📞' },
      { at: 0.32, status: 'completed', sub: 'Départ 14h confirmé · Nouvelle arrivée 16h OK', tag: 'Résolu', icon: '✓' },
    ]
  },

  // ── PENDANT LE SÉJOUR ───────────────────────────────────────
  {
    id: 'feedback', t: 0.38, lane: 0, phase: 'stay', type: 'message',
    icon: '💬', title: 'Message feedback', sub: "« Comment se passe votre séjour ? »",
    status: 'info', anim: 'bubble', tag: 'J+1'
  },

  // Cleaning included — full lifecycle
  {
    id: 'clean-mid', t: 0.42, lane: 2, phase: 'stay', type: 'cleaning',
    icon: '🧹', title: 'Ménage inclus J+3', sub: 'Planifié · rappel J-2',
    status: 'soon', anim: 'cascade', tag: 'Planifié',
    transitions: [
      { at: 0.46, status: 'pending', sub: 'Bientôt · staff notifié', tag: 'Bientôt' },
      { at: 0.50, status: 'active', sub: 'Sophie en route', tag: 'Assigné', avatar: 'S' },
      { at: 0.55, status: 'completed', sub: 'Ménage effectué · logement impeccable', tag: 'OK', icon: '✅' },
    ]
  },

  // Optional client requests
  {
    id: 'transport', t: 0.46, lane: 0, phase: 'stay', type: 'request',
    icon: '🚗', title: 'Transport aéroport', sub: 'Demande client',
    status: 'pending', anim: 'slide-right', tag: 'Optionnel',
    transitions: [
      { at: 0.52, status: 'completed', sub: 'Chauffeur assigné · ETA 16:23', tag: 'Confirmé' },
    ]
  },

  {
    id: 'groceries', t: 0.50, lane: 0, phase: 'stay', type: 'request',
    icon: '🛍️', title: 'Courses', sub: 'Demande client',
    status: 'pending', anim: 'pop', tag: 'Optionnel',
    transitions: [
      { at: 0.56, status: 'completed', sub: "Frigo rempli à l'arrivée", tag: 'Livré' },
    ]
  },

  {
    id: 'wifi-issue', t: 0.52, lane: 0, phase: 'stay', type: 'request',
    icon: '📶', title: 'Ticket support WiFi', sub: 'Problème connexion signalé',
    status: 'late', anim: 'shake', tag: 'Urgent',
    transitions: [
      { at: 0.52, status: 'active', sub: 'Staff assigné immédiatement · Marc en route', tag: 'Assigné', avatar: 'M' },
      { at: 0.54, status: 'active', sub: 'Technicien sur place · Diagnostic en cours', tag: 'En cours' },
      { at: 0.56, status: 'completed', sub: 'WiFi rétabli · Vitesse testée OK', tag: 'Résolu' },
    ]
  },

  {
    id: 'support', t: 0.54, lane: 1, phase: 'stay', type: 'request',
    icon: '✨', title: 'Support personnalisé', sub: 'Concierge dédié',
    status: 'active', anim: 'pop', tag: 'Premium'
  },

  {
    id: 'extra-clean', t: 0.58, lane: 2, phase: 'stay', type: 'cleaning',
    icon: '🧼', title: 'Ménage supplémentaire', sub: 'Service à la demande',
    status: 'pending', anim: 'cascade', tag: 'EXTRA · 25€',
    transitions: [
      { at: 0.63, status: 'completed', sub: 'Ménage effectué · 28 min', tag: 'Done' },
    ]
  },

  // ── DÉPART ──────────────────────────────────────────────────
  {
    id: 'depart-instr', t: 0.68, lane: 0, phase: 'departure', type: 'message',
    icon: '📋', title: 'Instructions départ', sub: "« Tout ce qu'il faut savoir »",
    status: 'info', anim: 'fade', tag: 'J-1'
  },

  {
    id: 'depart-slot', t: 0.71, lane: 0, phase: 'departure', type: 'timeslot',
    icon: '🎫', title: 'Choix départ', sub: 'Créneau 11:00',
    status: 'info', anim: 'pop', tag: 'Timeslot',
    transitions: [
      { at: 0.76, status: 'completed', tag: 'Confirmé' },
    ]
  },

  {
    id: 'staff-late', t: 0.73, lane: 3, phase: 'departure', type: 'admin',
    icon: '🚨', title: 'Staff manquant', sub: 'Réassignation requise',
    status: 'late', anim: 'shake', tag: 'Urgent',
    transitions: [
      { at: 0.78, status: 'completed', sub: 'Marc réassigné · 2 min', tag: 'Résolu', icon: '👨‍💼' },
    ]
  },

  {
    id: 'departed', t: 0.79, lane: 0, phase: 'departure', type: 'declaration',
    icon: '✅', title: 'Départ client', sub: 'Checkout déclaré',
    status: 'completed', anim: 'confetti', tag: 'Done'
  },

  // Final cleaning — special PRIORITÉ MAX with countdown
  {
    id: 'final-clean', t: 0.81, lane: 2, phase: 'departure', type: 'cleaning',
    icon: '🧹', title: 'Ménage Sojori final', sub: '2h restantes avant prochaine résa',
    status: 'late', anim: 'priority', tag: 'PRIORITÉ', priority: true,
    transitions: [
      { at: 0.84, status: 'pending', sub: '1h30 · Marc sur place', tag: 'En cours', avatar: 'M' },
      { at: 0.86, status: 'completed', sub: 'Préparation prochaine réservation · Logement prêt', tag: '✓ Prêt', icon: '✅', priority: false },
    ]
  },

  // ── APRÈS LE SÉJOUR ─────────────────────────────────────────
  {
    id: 'thanks', t: 0.88, lane: 0, phase: 'after', type: 'message',
    icon: '🙏', title: 'Message merci', sub: "« À très bientôt chez Sojori »",
    status: 'info', anim: 'fade', tag: 'J+1'
  },

  {
    id: 'review', t: 0.93, lane: 0, phase: 'after', type: 'message',
    icon: '⭐', title: "Demande d'avis", sub: '5 étoiles reçues',
    status: 'completed', anim: 'stars', tag: 'J+2'
  },
];

export interface EventState {
  icon: string;
  title: string;
  sub: string;
  status: EventStatus;
  tag: string;
  avatar?: string;
  priority?: boolean;
}

export function resolveEvent(event: JourneyEvent, progress: number): EventState {
  let state: EventState = {
    icon: event.icon,
    title: event.title,
    sub: event.sub,
    status: event.status,
    tag: event.tag,
    avatar: event.avatar,
    priority: event.priority,
  };

  if (event.transitions) {
    for (const tr of event.transitions) {
      if (progress >= tr.at) {
        state = { ...state, ...tr };
      }
    }
  }

  return state;
}
