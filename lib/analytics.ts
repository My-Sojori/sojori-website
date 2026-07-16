"use client";

/**
 * Événements custom envoyés à GA4 (gtag) et Meta Pixel (fbq) en parallèle — les deux
 * scripts sont déjà chargés globalement dans app/[locale]/layout.tsx. Pas de no-op silencieux
 * en cas d'échec : window.gtag/window.fbq sont toujours définis après le premier paint car
 * les <script> sont dans <head>, mais on garde des checks défensifs pour SSR / ad-blockers.
 */

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

type AnalyticsParams = Record<string, string | number | boolean | undefined>;

function gtagEvent(eventName: string, params?: AnalyticsParams) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;
  window.gtag('event', eventName, params);
}

function fbqEvent(eventName: string, params?: AnalyticsParams) {
  if (typeof window === 'undefined' || typeof window.fbq !== 'function') return;
  window.fbq('track', eventName, params);
}

/** Étape 1 du funnel démo soumise (email + tel + nb propriétés) — premier signal de lead. */
export function trackDemoLead(source: string) {
  gtagEvent('generate_lead', { event_category: 'demo_funnel', event_label: 'step1_submitted', source });
  fbqEvent('Lead', { source });
}

/** Créneau de RDV confirmé (étape 2 → 3). */
export function trackDemoScheduled(source: string) {
  gtagEvent('schedule', { event_category: 'demo_funnel', event_label: 'slot_confirmed', source });
  fbqEvent('Schedule', { source });
}

/** Questionnaire de qualification complet (étape 3 → 4) — conversion la plus qualifiée. */
export function trackDemoQualified(source: string) {
  gtagEvent('generate_lead', { event_category: 'demo_funnel', event_label: 'qualification_completed', source });
  fbqEvent('CompleteRegistration', { source });
}

/** Clic sur un CTA (hero, pricing, nav…) — avant même d'arriver sur /demo. */
export function trackCtaClick(ctaLabel: string, location: string) {
  gtagEvent('select_content', { event_category: 'cta_click', content_type: ctaLabel, event_label: location });
}

/**
 * Délégation d'événements globale : capture le clic sur TOUT lien menant à /demo, qu'il
 * ait ou non un ?source=... — pas besoin d'instrumenter chaque CTA un par un dans chaque
 * composant (Hero, FinalCTA, SharedComponents nav/footer/mobile menu…), donc un futur CTA
 * ajouté n'importe où est tracké automatiquement sans y penser.
 */
export function installDemoCtaClickTracking() {
  if (typeof document === 'undefined') return;
  document.addEventListener(
    'click',
    (e) => {
      const link = (e.target as HTMLElement)?.closest?.('a[href*="/demo"]') as HTMLAnchorElement | null;
      if (!link) return;
      let source = 'unknown';
      try {
        source = new URL(link.href, window.location.origin).searchParams.get('source') || 'no-source-param';
      } catch {
        /* URL invalide, on garde 'unknown' */
      }
      trackCtaClick('demo_link', source);
    },
    { capture: true },
  );
}
