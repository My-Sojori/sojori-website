import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

/** Fin de page des pages de ville, de comparatif et des pages produit : vers « Votre offre » et vers l'accueil. */
export function OfferBand() {
  const t = useTranslations('refonte.band');
  const p = useTranslations('refonte.pages.common.links');
  return (
    <section className="sj2-wrap sj2-band" aria-labelledby="sj2-band-h">
      <div className="sj2-card sj2-card--gold sj2-demo">
        <div className="sj2-demo__texte">
          <h2 id="sj2-band-h" className="sj2-h2 sj2-h2--band">{t('title')}</h2>
          <p className="sj2-lead">{t('text')}</p>
        </div>
        <div className="sj2-band__actions">
          <Link href="/offre" className="sj2-btn sj2-btn--lg" prefetch={false}>{t('cta')}</Link>
          <Link href="/" className="sj2-btn sj2-btn--ghost" prefetch={false}>{t('home')}</Link>
        </div>
      </div>
      <nav className="sj2-band__liens" aria-label={p('pmsMaroc')}>
        <Link href="/pms-maroc" prefetch={false}>{p('pmsMaroc')}</Link>
        <Link href="/conciergerie-maroc" prefetch={false}>{p('conciergerieMaroc')}</Link>
        <Link href="/agents" prefetch={false}>{p('agents')}</Link>
        <Link href="/check-in-whatsapp" prefetch={false}>{p('checkin')}</Link>
      </nav>
    </section>
  );
}
