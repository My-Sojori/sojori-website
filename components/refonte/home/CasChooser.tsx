'use client';

import { useTranslations } from 'next-intl';
import { CAS_IDS } from '@/lib/refonte/journee';
import { useCas } from '../CasProvider';

export function CasChooser() {
  const t = useTranslations('refonte.home.scene');
  const { cas, setCas } = useCas();
  return (
    <div role="group" aria-label={t('chooseAria')} className="sj2-cas">
      <span className="sj2-eyebrow sj2-eyebrow--sm sj2-eyebrow--dim">{t('chooseLabel')}</span>
      {CAS_IDS.map((id) => (
        <button key={id} type="button" className="sj2-cas__btn" aria-pressed={cas === id} onClick={() => setCas(id)}>
          <span className="sj2-cas__name">
            <span className="sj2-cas__type">{t(`cas.${id}.type`)}</span>
            <span className="sj2-cas__size">{t(`cas.${id}.size`)}</span>
          </span>
          <span className="sj2-cas__desc">{t(`cas.${id}.desc`)}</span>
        </button>
      ))}
    </div>
  );
}
