import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { SojoriMark } from '@/components/Logo';

const VILLES = [
  ['marrakech', '/pms-marrakech'],
  ['casablanca', '/pms-casablanca'],
  ['rabat', '/pms-rabat'],
  ['tanger', '/pms-tanger'],
  ['agadir', '/pms-agadir'],
] as const;

export function SiteFooter() {
  const t = useTranslations('refonte.footer');
  const p = useTranslations('refonte.pages.common.links');
  return (
    <footer className="sj2-footer">
      <div className="sj2-wrap sj2-footer__grid">
        <div className="sj2-footer__brand">
          <span className="sj2-logo">
            <SojoriMark size={30} />
            sojori
          </span>
          <p style={{ fontSize: 15, color: 'var(--sj-text-3)', maxWidth: 300 }}>
            <bdi lang="en" dir="ltr">AI workforce for hospitality.</bdi> {t('tagline')}
          </p>
        </div>
        <nav className="sj2-footer__col" aria-label={t('product')}>
          <span className="sj2-eyebrow sj2-eyebrow--sm sj2-eyebrow--dim" style={{ marginBottom: 8 }}>{t('product')}</span>
          <Link href={{ pathname: '/', hash: 'agents' }} prefetch={false}>{t('agents')}</Link>
          <Link href={{ pathname: '/', hash: 'whatsapp' }} prefetch={false}>{t('whatsapp')}</Link>
          <Link href={{ pathname: '/', hash: 'socle' }} prefetch={false}>{t('pms')}</Link>
          <Link href="/offre" prefetch={false}>{t('offer')}</Link>
        </nav>
        <nav className="sj2-footer__col" aria-label={t('resources')}>
          <span className="sj2-eyebrow sj2-eyebrow--sm sj2-eyebrow--dim" style={{ marginBottom: 8 }}>{t('resources')}</span>
          <Link href="/analyse-concurrents" prefetch={false}>{t('competitors')}</Link>
          <Link href="/comparatif-pms-maroc" prefetch={false}>{t('compare')}</Link>
          <Link href="/pms-maroc" prefetch={false}>{p('pmsMaroc')}</Link>
          <Link href="/conciergerie-maroc" prefetch={false}>{p('conciergerieMaroc')}</Link>
          <Link href="/agents" prefetch={false}>{p('agents')}</Link>
          <Link href="/check-in-whatsapp" prefetch={false}>{p('checkin')}</Link>
          <Link href="/orchestration" prefetch={false}>{t('orchestration')}</Link>
          <Link href="/mcp" prefetch={false}>{t('mcp')}</Link>
          <Link href="/about" prefetch={false}>{t('about')}</Link>
        </nav>
        <nav className="sj2-footer__col" aria-label={t('cities')}>
          <span className="sj2-eyebrow sj2-eyebrow--sm sj2-eyebrow--dim" style={{ marginBottom: 8 }}>{t('cities')}</span>
          {VILLES.map(([id, href]) => (
            <Link key={id} href={href} prefetch={false}>{t(`city.${id}`)}</Link>
          ))}
        </nav>
        <div className="sj2-footer__legal">
          <span>{t('copyright')}</span>
          <span>
            <Link href="/terms" prefetch={false}>{t('terms')}</Link>
            {' · '}
            <Link href="/privacy" prefetch={false}>{t('privacy')}</Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
