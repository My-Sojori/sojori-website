import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { SojoriMark } from '@/components/Logo';

const LINKEDIN = 'https://www.linkedin.com/company/108488739';
const INSTAGRAM = 'https://instagram.com/sojoriapp';
const EMAIL = 'commercial@sojori.com';

function IconeLinkedin() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="currentColor">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
    </svg>
  );
}

function IconeInstagram() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
    </svg>
  );
}

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
        <div className="sj2-footer__col sj2-footer__contact">
          <span className="sj2-eyebrow sj2-eyebrow--sm sj2-eyebrow--dim" style={{ marginBottom: 8 }}>{t('follow')}</span>
          <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" className="sj2-footer__social">
            <IconeLinkedin /><span>LinkedIn</span><span className="sj2-sr">{t('newTab')}</span>
          </a>
          <a href={INSTAGRAM} target="_blank" rel="noopener noreferrer" className="sj2-footer__social">
            <IconeInstagram /><span>Instagram</span><span className="sj2-sr">{t('newTab')}</span>
          </a>
          <span className="sj2-eyebrow sj2-eyebrow--sm sj2-eyebrow--dim" style={{ margin: '18px 0 4px' }}>{t('contact')}</span>
          <span className="sj2-footer__note">{t('emailLabel')}</span>
          <a href={`mailto:${EMAIL}`}><bdi dir="ltr">{EMAIL}</bdi></a>
          <Link href={{ pathname: '/offre', hash: 'contact' }} prefetch={false}>{t('demo')}</Link>
        </div>
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
