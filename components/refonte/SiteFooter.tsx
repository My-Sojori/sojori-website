import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { SojoriMark } from '@/components/Logo';
import { FooterCol } from './FooterCol';

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
  const n = useTranslations('refonte.nav');
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
        <nav className="sj2-footer__col" aria-labelledby="sj2-foot-produit">
          <h2 id="sj2-foot-produit" className="sj2-eyebrow sj2-eyebrow--sm sj2-eyebrow--dim sj2-footer__titre">{t('product')}</h2>
          <ul>
            <li><Link href={{ pathname: '/', hash: 'socle' }} prefetch={false}>{n('pms')}</Link></li>
            <li><Link href={{ pathname: '/', hash: 'agents' }} prefetch={false}>{t('agents')}</Link></li>
            <li><Link href={{ pathname: '/', hash: 'whatsapp' }} prefetch={false}>{t('modules')}</Link></li>
            <li><Link href="/check-in-whatsapp" prefetch={false}>{p('checkin')}</Link></li>
            <li><Link href="/offre" prefetch={false}>{t('offer')}</Link></li>
          </ul>
        </nav>
        <FooterCol id="sj2-foot-guides" titre={t('guides')}>
          <ul>
            <li><Link href="/pms-maroc" prefetch={false}>{p('pmsMaroc')}</Link></li>
            <li><Link href="/conciergerie-maroc" prefetch={false}>{p('conciergerieMaroc')}</Link></li>
            <li><Link href="/comparatif-pms-maroc" prefetch={false}>{t('compare')}</Link></li>
            <li><Link href="/analyse-concurrents" prefetch={false}>{t('competitors')}</Link></li>
            <li><Link href="/fiche-de-police-maroc" prefetch={false}>{p('fichePolice')}</Link></li>
            <li><Link href="/facture-electronique-maroc" prefetch={false}>{p('factureElectronique')}</Link></li>
          </ul>
        </FooterCol>
        <nav className="sj2-footer__col" aria-labelledby="sj2-foot-sojori">
          <h2 id="sj2-foot-sojori" className="sj2-eyebrow sj2-eyebrow--sm sj2-eyebrow--dim sj2-footer__titre">{t('company')}</h2>
          <ul>
            <li><Link href="/about" prefetch={false}>{t('about')}</Link></li>
            <li><Link href="/orchestration" prefetch={false}>{t('orchestration')}</Link></li>
            <li><Link href="/mcp" prefetch={false}>{t('mcpDev')}</Link></li>
          </ul>
        </nav>
        <FooterCol id="sj2-foot-villes" titre={t('cities')}>
          <ul>
            {VILLES.map(([id, href]) => (
              <li key={id}><Link href={href} prefetch={false}>{t(`city.${id}`)}</Link></li>
            ))}
          </ul>
        </FooterCol>
        <div className="sj2-footer__col sj2-footer__contact">
          <h2 className="sj2-eyebrow sj2-eyebrow--sm sj2-eyebrow--dim sj2-footer__titre">{t('follow')}</h2>
          <ul>
            <li>
              <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" className="sj2-footer__social">
                <IconeLinkedin /><span>LinkedIn</span><span className="sj2-sr">{t('newTab')}</span>
              </a>
            </li>
            <li>
              <a href={INSTAGRAM} target="_blank" rel="noopener noreferrer" className="sj2-footer__social">
                <IconeInstagram /><span>Instagram</span><span className="sj2-sr">{t('newTab')}</span>
              </a>
            </li>
          </ul>
          <h2 className="sj2-eyebrow sj2-eyebrow--sm sj2-eyebrow--dim sj2-footer__titre" style={{ marginTop: 18 }}>{t('contact')}</h2>
          <span className="sj2-footer__note">{t('emailLabel')}</span>
          <ul>
            <li><a href={`mailto:${EMAIL}`}><bdi dir="ltr">{EMAIL}</bdi></a></li>
            <li><Link href="/demo" prefetch={false}>{t('demo')}</Link></li>
          </ul>
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
