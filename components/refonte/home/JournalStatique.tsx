import { useTranslations } from 'next-intl';
import { chiffresDe, TAILLES } from '@/lib/refonte/journee';
import { scenario, cleTexte } from '@/lib/refonte/scenario';

/**
 * La journée type de la conciergerie en liste HTML : les robots (et les lecteurs sans animation)
 * lisent chaque échange. L'animation de « La salle » ne fait que la mettre en mouvement.
 */
export function JournalStatique() {
  const t = useTranslations('refonte.home.scene');
  const script = scenario('conc', chiffresDe(TAILLES.conc));
  const nom = (a: string) => (a === 'staff' || a === 'tiers' || a === 'prospects' ? t(`cas.conc.${a}`) : t(`actor.${a}`));
  return (
    <details className="sj2-fullday">
      <summary>{t('fullDay')}</summary>
      <p>{t('fullDayIntro')}</p>
      <ol>
        {script.map((e, k) => (
          <li key={k}>
            <strong>{nom(e.de)} <span className="sj2-arrow" aria-hidden="true">→</span> {nom(e.vers)}</strong> ({e.etat ? t(`etat.${e.etat}`) : t(`badge.${e.type}`)}) : {t(`step.${cleTexte(e, 'ok')}`, e.params ?? {})}
          </li>
        ))}
      </ol>
    </details>
  );
}
