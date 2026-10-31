import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

const CARTES = [['socle', 'socle', true], ['agents', 'agents', false], ['modules', 'whatsapp', false]] as const;

export function Three() {
  const t = useTranslations('refonte.home.three');
  return (
    <section className="sj2-wrap sj2-three" aria-label={t('aria')}>
      {CARTES.map(([id, ancre, or]) => (
        <Link key={id} href={{ pathname: '/', hash: ancre }} className={`sj2-card${or ? ' sj2-card--gold' : ''} sj2-three__carte`} prefetch={false}>
          <span className="sj2-eyebrow sj2-eyebrow--sm">{t(`${id}.eyebrow`)}</span>
          <span className="sj2-three__titre">{t(`${id}.title`)}</span>
          <span className="sj2-three__sub">{t(`${id}.sub`)}</span>
        </Link>
      ))}
    </section>
  );
}
