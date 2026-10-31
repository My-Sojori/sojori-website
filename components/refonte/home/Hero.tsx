import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

/** Le H1 porte la ligne de mots-clés et le slogan : un seul H1, lisible sans JavaScript. */
export function Hero() {
  const t = useTranslations('refonte.home.hero');
  return (
    <section className="sj2-hero" aria-labelledby="sj2-h1">
      <div className="sj2-wrap">
        <div className="sj2-hero__top">
          <div className="sj2-hero__text">
            <h1 id="sj2-h1" className="sj2-h1">
              <span className="sj2-eyebrow">{t('keywords')}</span>
              AI workforce <em>for hospitality.</em>
            </h1>
            <p className="sj2-hero__sub">{t('sub')}</p>
            <div className="sj2-hero__cta">
              <Link href={{ pathname: '/', hash: 'salle' }} className="sj2-btn">{t('seeAgents')}</Link>
              <Link href={{ pathname: '/offre', hash: 'contact' }} className="sj2-btn sj2-btn--ghost">{t('demo')}</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
