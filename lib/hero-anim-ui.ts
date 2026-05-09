/** Homepage hero animation — UI strings (acts 1–2 + core strip), all routing locales. */
export type HeroAnimUi = {
  headerIncoming: string;
  headerIngest: string;
  webhookOk: string;
  webhookIdle: string;
  ingestCaption: string;
  sojoriCoreActiveWord: string;
  badgeNewBooking: string;
  timeAgo: string;
  nightsLabel: string;
  footerDate: string;
  footerGuests: string;
  footerConfirmed: string;
  handoff: string;
  stageIncoming: string;
  stageIngest: string;
  stageTimeline: string;
  channelsLive: string;
  demoPropertyName: string;
  demoPropertyTagline: string;
  channelDirect: string;
  /** Guest line when locale ≠ fr (no superscript). */
  guestMetaPlain: string;
  coreTitle: string;
  /** Demo guest full name (Latin). */
  demoGuestName: string;
  /** After name, e.g. "· 🇺🇸 New York". */
  demoGuestOrigin: string;
  /** Price on booking card (mono). */
  demoTotalPrice: string;
  /** Small line under name in ingest act (route + price). */
  demoIngestSummary: string;
};

const heroAnimByLocale: Record<string, HeroAnimUi> = {
  fr: {
    headerIncoming: 'Réservation entrante',
    headerIngest: 'Ingestion en cours',
    webhookOk: '✓ webhook reçu',
    webhookIdle: 'en veille · synchro',
    ingestCaption: 'Ingestion · génération de +20 tâches orchestrées…',
    sojoriCoreActiveWord: 'actives',
    badgeNewBooking: 'Nouvelle résa · Airbnb',
    timeAgo: 'il y a 2s',
    nightsLabel: '7 nuits',
    footerDate: '📅 15 → 22 juin',
    footerGuests: '👥 2 voyageurs',
    footerConfirmed: '✓ confirmée',
    handoff: '↓ Sojori prend le relai',
    stageIncoming: '🟡 RÉSERVATION ENTRANTE',
    stageIngest: '⚡ INGESTION',
    stageTimeline: '🟢 ORCHESTRATION',
    channelsLive: '● CANAUX · EN DIRECT',
    demoPropertyName: 'Villa Belvédère',
    demoPropertyTagline: "NICE · CÔTE D'AZUR · 4ch · piscine",
    channelDirect: 'Direct',
    guestMetaPlain: '',
    coreTitle: 'SOJORI · CORE',
    demoGuestName: 'Sarah Johnson',
    demoGuestOrigin: '· 🇺🇸 New York',
    demoTotalPrice: '1 840 €',
    demoIngestSummary: 'New York → Nice · 1 840 €',
  },
  en: {
    headerIncoming: 'Incoming booking',
    headerIngest: 'Ingesting…',
    webhookOk: '✓ Webhook received',
    webhookIdle: 'standby · synced',
    ingestCaption: 'Ingesting · generating 20+ orchestrated tasks…',
    sojoriCoreActiveWord: 'active',
    badgeNewBooking: 'New booking · Airbnb',
    timeAgo: '2s ago',
    nightsLabel: '7 nights',
    footerDate: '📅 Jun 15–22',
    footerGuests: '👥 2 guests',
    footerConfirmed: '✓ confirmed',
    handoff: '↓ Sojori takes over',
    stageIncoming: '🟡 INCOMING BOOKING',
    stageIngest: '⚡ INGESTING',
    stageTimeline: '🟢 ORCHESTRATING',
    channelsLive: '● CHANNELS · LIVE',
    demoPropertyName: 'Villa Belvédère',
    demoPropertyTagline: 'NICE · FRENCH RIVIERA · 4 bd · pool',
    channelDirect: 'Direct',
    guestMetaPlain: 'EN · 1st stay · verified',
    coreTitle: 'SOJORI · CORE',
    demoGuestName: 'Sarah Johnson',
    demoGuestOrigin: '· 🇺🇸 New York',
    demoTotalPrice: '€1,840',
    demoIngestSummary: 'NYC → Nice · €1,840',
  },
  es: {
    headerIncoming: 'Reserva entrante',
    headerIngest: 'Ingesta en curso',
    webhookOk: '✓ Webhook recibido',
    webhookIdle: 'en espera · sinc.',
    ingestCaption: 'Ingesta · generación de +20 tareas orquestadas…',
    sojoriCoreActiveWord: 'activas',
    badgeNewBooking: 'Nueva reserva · Airbnb',
    timeAgo: 'hace 2s',
    nightsLabel: '7 noches',
    footerDate: '📅 15–22 jun',
    footerGuests: '👥 2 huéspedes',
    footerConfirmed: '✓ confirmada',
    handoff: '↓ Sojori toma el relevo',
    stageIncoming: '🟡 RESERVA ENTRANTE',
    stageIngest: '⚡ INGESTA',
    stageTimeline: '🟢 ORQUESTACIÓN',
    channelsLive: '● CANALES · EN DIRECTO',
    demoPropertyName: 'Villa Belvédère',
    demoPropertyTagline: 'NIZA · COSTA AZUL · 4 hab · piscina',
    channelDirect: 'Directo',
    guestMetaPlain: 'EN · 1.ª estancia · verificada',
    coreTitle: 'SOJORI · CORE',
    demoGuestName: 'Sarah Johnson',
    demoGuestOrigin: '· 🇺🇸 Nueva York',
    demoTotalPrice: '1.840 €',
    demoIngestSummary: 'Nueva York → Niza · 1.840 €',
  },
  pt: {
    headerIncoming: 'Reserva recebida',
    headerIngest: 'Ingestão em curso',
    webhookOk: '✓ Webhook recebido',
    webhookIdle: 'em espera · sinc.',
    ingestCaption: 'Ingestão · geração de +20 tarefas orquestradas…',
    sojoriCoreActiveWord: 'ativas',
    badgeNewBooking: 'Nova reserva · Airbnb',
    timeAgo: 'há 2s',
    nightsLabel: '7 noites',
    footerDate: '📅 15–22 jun',
    footerGuests: '👥 2 hóspedes',
    footerConfirmed: '✓ confirmada',
    handoff: '↓ Sojori assume a gestão',
    stageIncoming: '🟡 NOVA RESERVA',
    stageIngest: '⚡ INGESTÃO',
    stageTimeline: '🟢 ORQUESTRAÇÃO',
    channelsLive: '● CANAIS · AO VIVO',
    demoPropertyName: 'Villa Belvédère',
    demoPropertyTagline: 'NICE · COSTA AZUL · 4 qts · piscina',
    channelDirect: 'Direto',
    guestMetaPlain: 'EN · 1.ª estadia · verificada',
    coreTitle: 'SOJORI · CORE',
    demoGuestName: 'Sarah Johnson',
    demoGuestOrigin: '· 🇺🇸 Nova Iorque',
    demoTotalPrice: '1 840 €',
    demoIngestSummary: 'Nova Iorque → Nice · 1 840 €',
  },
  ar: {
    headerIncoming: 'حجز وارد',
    headerIngest: 'جاري الاستيعاب…',
    webhookOk: '✓ تم استلام الـ webhook',
    webhookIdle: 'خامل · متزامن',
    ingestCaption: 'استيعاب · توليد أكثر من 20 مهمة منسّقة…',
    sojoriCoreActiveWord: 'نشطة',
    badgeNewBooking: 'حجز جديد · Airbnb',
    timeAgo: 'منذ ثانيتين',
    nightsLabel: '7 ليالٍ',
    footerDate: '📅 15–22 يونيو',
    footerGuests: '👥 ضيفان',
    footerConfirmed: '✓ مؤكد',
    handoff: '↓ يتولّى Sojori المتابعة',
    stageIncoming: '🟡 حجز وارد',
    stageIngest: '⚡ استيعاب',
    stageTimeline: '🟢 تنسيق العمليات',
    channelsLive: '● القنوات · مباشر',
    demoPropertyName: 'Villa Belvédère',
    demoPropertyTagline: 'نيس · الريفييرا · ٤ غرف · مسبح',
    channelDirect: 'مباشر',
    guestMetaPlain: 'الإنجليزية · إقامة أولى · تم التحقق',
    coreTitle: 'SOJORI · CORE',
    demoGuestName: 'Sarah Johnson',
    demoGuestOrigin: '· 🇺🇸 نيويورك',
    demoTotalPrice: '1840 €',
    demoIngestSummary: 'نيويورك → نيس · 1840 €',
  },
};

export function getHeroAnimUi(locale: string): HeroAnimUi {
  return heroAnimByLocale[locale] ?? heroAnimByLocale.en;
}
