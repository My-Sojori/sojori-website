import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { Shell } from '../Shell';
import { Faq } from '../Faq';
import { JsonLd } from '../JsonLd';
import { OfferBand } from '../OfferBand';
import { SEO_PAGES, type SeoPageId } from '@/lib/refonte/seoPages';
import { SITE_URL } from '@/lib/siteUrl';

type Section = { title: string; text?: string; points?: string[] };

/** Met en évidence les points réglementaires encore « à confirmer » : ils ne doivent pas passer pour des faits. */
function Texte({ texte, jeton }: { texte: string; jeton: string }) {
  if (!texte.includes(jeton)) return <>{texte}</>;
  const parts = texte.split(jeton);
  return (
    <>
      {parts.map((p, i) => (
        <span key={i}>{p}{i < parts.length - 1 && <mark className="sj2-aconfirmer">{jeton}</mark>}</span>
      ))}
    </>
  );
}

const LIENS: Record<string, { href: string }> = {
  home: { href: '/' }, offer: { href: '/offre' },
  pmsMaroc: { href: '/pms-maroc' }, conciergerieMaroc: { href: '/conciergerie-maroc' }, agents: { href: '/agents' },
  checkin: { href: '/check-in-whatsapp' }, fichePolice: { href: '/fiche-de-police-maroc' }, taxeSejour: { href: '/taxe-de-sejour-maroc' },
  channelManager: { href: '/channel-manager' }, dynamicPricing: { href: '/dynamic-pricing' }, comparatif: { href: '/comparatif-pms-maroc' },
};

/**
 * Une page de recherche : réponse directe de deux phrases, sections, FAQ de l'intention (visible, jamais repliée),
 * liens vers l'accueil et « Votre offre ». Tout le texte est dans le HTML servi.
 */
export async function SeoPage({ id, locale, related }: { id: SeoPageId; locale: string; related: (keyof typeof LIENS)[] }) {
  const t = await getTranslations({ locale, namespace: `refonte.pages.${id}` });
  const c = await getTranslations({ locale, namespace: 'refonte.pages.common' });
  const sections = t.raw('sections') as Section[];
  const faq = t.raw('faq') as { q: string; a: string }[];
  const jeton = c('toConfirm');
  const url = `${SITE_URL}/${locale}${SEO_PAGES[id]}`;

  return (
    <Shell>
      <article>
        <section className="sj2-hero sj2-hero--seo" aria-labelledby="sj2-seo-h1">
          <div className="sj2-wrap sj2-seo__tete">
            <span className="sj2-eyebrow">{t('kicker')}</span>
            <h1 id="sj2-seo-h1" className="sj2-h1 sj2-h1--seo">{t('title')}</h1>
            <div className="sj2-reponse">
              <span className="sj2-eyebrow sj2-eyebrow--sm sj2-eyebrow--dim">{c('answerLabel')}</span>
              <p><Texte texte={t('answer')} jeton={jeton} /></p>
            </div>
            <div className="sj2-hero__cta">
              <Link href="/offre" className="sj2-btn" prefetch={false}>{c('links.offer')}</Link>
              <Link href="/" className="sj2-btn sj2-btn--ghost" prefetch={false}>{c('links.home')}</Link>
            </div>
          </div>
        </section>

        <div className="sj2-wrap sj2-seo__corps">
          {sections.map((s) => (
            <section key={s.title} className="sj2-seo__section">
              <h2 className="sj2-h2 sj2-h2--seo">{s.title}</h2>
              {s.text && <p className="sj2-lead"><Texte texte={s.text} jeton={jeton} /></p>}
              {s.points && (
                <ul className="sj2-coches sj2-coches--seo">
                  {s.points.map((x) => <li key={x}><span aria-hidden="true" className="sj2-coche">✓</span><span><Texte texte={x} jeton={jeton} /></span></li>)}
                </ul>
              )}
            </section>
          ))}
          <nav className="sj2-related" aria-label={c('related')}>
            <span className="sj2-eyebrow sj2-eyebrow--sm sj2-eyebrow--dim">{c('related')}</span>
            <ul>
              {related.map((k) => (
                <li key={k}><Link href={LIENS[k].href as never} prefetch={false}>{c(`links.${k}`)}</Link></li>
              ))}
            </ul>
          </nav>
        </div>

        <Faq id="sj2-seo-faq" eyebrow={c('faqEyebrow')} title={c('faqTitle')} items={faq} />
        <OfferBand />
      </article>
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: t('title'),
        description: t('meta.description'),
        url,
        inLanguage: locale,
        isPartOf: { '@type': 'WebSite', name: 'Sojori', url: SITE_URL },
        about: { '@type': 'SoftwareApplication', name: 'Sojori', applicationCategory: 'BusinessApplication' },
      }} />
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: c('breadcrumbHome'), item: `${SITE_URL}/${locale}` },
          { '@type': 'ListItem', position: 2, name: t('title'), item: url },
        ],
      }} />
    </Shell>
  );
}
