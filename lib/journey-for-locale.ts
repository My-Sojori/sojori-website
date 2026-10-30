import type { JourneyEvent, Lane, Phase } from './journey-data';
import { EVENTS, LANES, PHASES } from './journey-data';
import { EVENTS_AR, LANES_AR, PHASES_AR } from './journey-data-ar';
import { EVENTS_EN, LANES_EN, PHASES_EN } from './journey-data-en';
import { EVENTS_ES, LANES_ES, PHASES_ES } from './journey-data-es';
import { EVENTS_PT, LANES_PT, PHASES_PT } from './journey-data-pt';

const bundleEn = { phases: PHASES_EN, lanes: LANES_EN, events: EVENTS_EN };
const bundleEs = { phases: PHASES_ES, lanes: LANES_ES, events: EVENTS_ES };
const bundlePt = { phases: PHASES_PT, lanes: LANES_PT, events: EVENTS_PT };
const bundleAr = { phases: PHASES_AR, lanes: LANES_AR, events: EVENTS_AR };

export function getJourneyForLocale(locale: string): {
  phases: Phase[];
  lanes: Lane[];
  events: JourneyEvent[];
} {
  if (locale === 'fr') {
    return { phases: PHASES, lanes: LANES, events: EVENTS };
  }
  if (locale === 'es') {
    return bundleEs;
  }
  if (locale === 'pt') {
    return bundlePt;
  }
  if (locale === 'ar') {
    return bundleAr;
  }
  return bundleEn;
}
