import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { Shell } from '../Shell';
import { Faq } from '../Faq';
import { JsonLd } from '../JsonLd';
import { SITE_URL } from '@/lib/siteUrl';

const LINKEDIN_ENTREPRISE = 'https://www.linkedin.com/company/108488739';
const INSTAGRAM = 'https://instagram.com/sojoriapp';
const LINKEDIN_FONDATEUR = 'https://www.linkedin.com/in/tawfiq-gouach-77158a21/';
const EMAIL = 'commercial@sojori.com';

type Carte = { tag: string; title: string; text: string };
type Principe = { title: string; text: string };
type Repere = { label: string; value: string };

/**
 * « À propos » : le positionnement, les principes, des repères vérifiés et l'équipe. Aucun chiffre ni promesse de plus
 * que ce que Tawfiq a confirmé (création 2025 ; équipe à Marrakech, Casablanca et Paris ; clients au Maroc, en France,
 * en Espagne et au Portugal). Texte rendu côté serveur.
 */
export async function AboutPage({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: 'refonte.about' });
  const f = await getTranslations({ locale, namespace: 'refonte.footer' });
  const cartes = t.raw('why.cards') as Carte[];
  const principes = t.raw('principles.items') as Principe[];
  const reperes = t.raw('facts.items') as Repere[];
  const faq = t.raw('faq.items') as { q: string; a: string }[];
  const url = `${SITE_URL}/${locale}/about`;

  return (
    <Shell>
      <article>
        <section className="sj2-hero sj2-hero--seo" aria-labelledby="sj2-about-h1">
          <div className="sj2-wrap sj2-seo__tete">
            <span className="sj2-eyebrow">{t('hero.kicker')}</span>
            <h1 id="sj2-about-h1" className="sj2-h1 sj2-h1--seo">{t('hero.title')}</h1>
            <p className="sj2-lead sj2-about__chapeau">{t('hero.lead')}</p>
            <div className="sj2-hero__cta">
              <Link href={{ pathname: '/offre', hash: 'contact' }} className="sj2-btn" prefetch={false}>{t('hero.demo')}</Link>
              <Link href={{ pathname: '/', hash: 'salle' }} className="sj2-btn sj2-btn--ghost" prefetch={false}>{t('hero.day')}</Link>
            </div>
          </div>
        </section>

        <section className="sj2-section sj2-wrap" aria-labelledby="sj2-about-why">
          <div className="sj2-head">
            <span className="sj2-eyebrow">{t('why.eyebrow')}</span>
            <h2 id="sj2-about-why" className="sj2-h2">{t('why.title')}</h2>
            <p className="sj2-lead">{t('why.text')}</p>
          </div>
          <div className="sj2-trois">
            {cartes.map((c) => (
              <div key={c.tag} className="sj2-card">
                <span className="sj2-eyebrow sj2-eyebrow--sm">{c.tag}</span>
                <h3 className="sj2-h3 sj2-about__carte-titre">{c.title}</h3>
                <p className="sj2-agent__resume">{c.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="sj2-section sj2-wrap" aria-labelledby="sj2-about-principes">
          <div className="sj2-head">
            <span className="sj2-eyebrow">{t('principles.eyebrow')}</span>
            <h2 id="sj2-about-principes" className="sj2-h2">{t('principles.title')}</h2>
          </div>
          <ol className="sj2-principes">
            {principes.map((p, k) => (
              <li key={p.title}>
                <span className="sj2-principes__num" aria-hidden="true">{String(k + 1).padStart(2, '0')}</span>
                <h3 className="sj2-h3">{p.title}</h3>
                <p>{p.text}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="sj2-section sj2-wrap" aria-labelledby="sj2-about-reperes">
          <div className="sj2-head">
            <span className="sj2-eyebrow">{t('facts.eyebrow')}</span>
            <h2 id="sj2-about-reperes" className="sj2-h2">{t('facts.title')}</h2>
          </div>
          <dl className="sj2-reperes">
            {reperes.map((r) => (
              <div key={r.label} className="sj2-card sj2-repere">
                <dt className="sj2-eyebrow sj2-eyebrow--sm sj2-eyebrow--dim">{r.label}</dt>
                <dd>{r.value}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="sj2-section sj2-wrap" aria-labelledby="sj2-about-equipe">
          <div className="sj2-head">
            <span className="sj2-eyebrow">{t('team.eyebrow')}</span>
            <h2 id="sj2-about-equipe" className="sj2-h2">{t('team.title')}</h2>
          </div>
          <div className="sj2-equipe">
            <div className="sj2-card sj2-equipe__carte">
              <span className="sj2-equipe__avatar" aria-hidden="true">TG</span>
              <div className="sj2-equipe__texte">
                <h3 className="sj2-h3">Tawfiq Gouach</h3>
                <span className="sj2-eyebrow sj2-eyebrow--sm sj2-eyebrow--dim">{t('team.role')}</span>
                <p>{t('team.bio')}</p>
                <a href={LINKEDIN_FONDATEUR} target="_blank" rel="noopener noreferrer" className="sj2-equipe__lien">
                  {t('team.linkedin')}<span className="sj2-sr"> {f('newTab')}</span>
                </a>
              </div>
            </div>
            <div className="sj2-card sj2-equipe__agents">
              <h3 className="sj2-h3">{t('team.agentsTitle')}</h3>
            </div>
          </div>
          <div className="sj2-about__contact">
            <div>
              <h3 className="sj2-eyebrow sj2-eyebrow--sm sj2-eyebrow--dim">{f('follow')}</h3>
              <ul>
                <li><a href={LINKEDIN_ENTREPRISE} target="_blank" rel="noopener noreferrer">LinkedIn<span className="sj2-sr"> {f('newTab')}</span></a></li>
                <li><a href={INSTAGRAM} target="_blank" rel="noopener noreferrer">Instagram<span className="sj2-sr"> {f('newTab')}</span></a></li>
              </ul>
            </div>
            <div>
              <h3 className="sj2-eyebrow sj2-eyebrow--sm sj2-eyebrow--dim">{f('contact')}</h3>
              <p className="sj2-footer__note">{f('emailLabel')}</p>
              <ul>
                <li><a href={`mailto:${EMAIL}`}><bdi dir="ltr">{EMAIL}</bdi></a></li>
              </ul>
            </div>
          </div>
        </section>

        <Faq id="sj2-about-faq" eyebrow={t('faq.eyebrow')} title={t('faq.title')} items={faq} />

        <section className="sj2-wrap sj2-band" aria-labelledby="sj2-about-final">
          <div className="sj2-card sj2-card--gold sj2-demo">
            <div className="sj2-demo__texte">
              <h2 id="sj2-about-final" className="sj2-h2 sj2-h2--band">{t('final.title')}</h2>
            </div>
            <div className="sj2-band__actions">
              <Link href="/offre" className="sj2-btn sj2-btn--lg" prefetch={false}>{t('final.cta')}</Link>
            </div>
          </div>
        </section>
      </article>
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'AboutPage',
        name: t('meta.title'),
        description: t('meta.description'),
        url,
        inLanguage: locale,
        isPartOf: { '@type': 'WebSite', name: 'Sojori', url: SITE_URL },
        mainEntity: {
          '@type': 'Organization',
          name: 'Sojori',
          url: SITE_URL,
          slogan: 'AI workforce for hospitality',
          foundingDate: '2025',
          founder: { '@type': 'Person', name: 'Tawfiq Gouach', jobTitle: 'Founder', sameAs: [LINKEDIN_FONDATEUR] },
          sameAs: [LINKEDIN_ENTREPRISE, INSTAGRAM],
          contactPoint: { '@type': 'ContactPoint', contactType: 'Sales', email: EMAIL },
          address: [
            { '@type': 'PostalAddress', addressLocality: 'Marrakech', addressCountry: 'MA' },
            { '@type': 'PostalAddress', addressLocality: 'Casablanca', addressCountry: 'MA' },
            { '@type': 'PostalAddress', addressLocality: 'Paris', addressCountry: 'FR' },
          ],
        },
      }} />
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Sojori', item: `${SITE_URL}/${locale}` },
          { '@type': 'ListItem', position: 2, name: t('meta.title'), item: url },
        ],
      }} />
    </Shell>
  );
}
