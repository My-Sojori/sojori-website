import { useTranslations } from 'next-intl';
import { SiteHeader } from './SiteHeader';
import { SiteFooter } from './SiteFooter';
import './refonte.css';

/** Coque de la version nuit : en-tête, contenu, pied de page. Tout ce qui est dedans est sous .sj2. */
export function Shell({ children }: { children: React.ReactNode }) {
  const t = useTranslations('refonte.nav');
  return (
    <div className="sj2">
      <a className="sj2-skip" href="#contenu">{t('skip')}</a>
      <SiteHeader />
      <main id="contenu">{children}</main>
      <SiteFooter />
    </div>
  );
}
