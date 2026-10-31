'use client';

import { useTranslations } from 'next-intl';
import { chiffresDe, gains, TAILLES } from '@/lib/refonte/journee';
import { useCas } from '../CasProvider';

/** Les gains sont des estimations calculées sur la journée type de l'établissement choisi. */
function useGains() {
  const { cas } = useCas();
  return { cas, ...gains(cas, chiffresDe(TAILLES[cas])) };
}

/** Une valeur du type « ≈ {h} h » : `kind` dit quelle heure injecter. */
export function GainValue({ k, kind }: { k: string; kind: 'guest' | 'field' }) {
  const t = useTranslations('refonte.home.agents');
  const g = useGains();
  return <>{t(k, { h: kind === 'guest' ? g.hVoyageurs : g.hTerrain })}</>;
}

export function GainNote() {
  const t = useTranslations('refonte.home');
  const g = useGains();
  return <>{t('agents.kpi.note', { type: t(`scene.cas.${g.cas}.type`).toLowerCase(), size: t(`scene.cas.${g.cas}.size`) })}</>;
}
