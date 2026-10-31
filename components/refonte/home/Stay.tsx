import { useTranslations } from 'next-intl';
import { Etapes } from './Etapes';

export function Stay() {
  const t = useTranslations('refonte.home.stay');
  return (
    <section id="sejour" className="sj2-section sj2-wrap" aria-labelledby="sj2-stay-h">
      <div className="sj2-head">
        <span className="sj2-eyebrow">{t('eyebrow')}</span>
        <h2 id="sj2-stay-h" className="sj2-h2">{t('title')}</h2>
        <p className="sj2-lead">{t('lead')}</p>
      </div>
      <Etapes />
    </section>
  );
}
