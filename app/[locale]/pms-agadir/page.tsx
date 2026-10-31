import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { FaqFromMessages } from '@/components/FaqFromMessages';
import { PageSchema } from '@/components/PageSchema';
import { BackgroundEffects } from '@/components/BackgroundEffects';
import { PageHeader, PageFooter, PageHero, StatsBar, FinalCTA } from '@/components/SharedComponents';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'seoPages' });
  return {
    title: t('pmsAgadir.title'),
    description: t('pmsAgadir.description'),
    alternates: { canonical: `/${locale}/pms-agadir` },
  };
}

export default async function PmsPageAgadir({ params }: { params: Promise<{ locale: string }> }) {
  const tb = await getTranslations('pageBodies.pms-agadir');
  const { locale } = await params;
  return (
    <>
      <BackgroundEffects />
      <PageSchema
        crumbs={[
          { name: tb('crumbHome'), path: `/${locale}` },
          { name: tb('crumbSolutions'), path: `/${locale}/pms` },
          { name: tb('k001'), path: `/${locale}/pms-agadir` },
        ]}
        serviceName={tb('k002')}
        serviceDescription={tb('k003')}
        areaServed={"Agadir"}
      />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <PageHeader pageTitle={tb('k004')} />

        <PageHero
          badge={tb('k005')}
          title={<>{tb('k006')}{' '}<br /><span className="gradient-text">{tb('k007')}</span></>}
          subtitle={tb('k008')}
          cta1={tb('k009')}
          cta2={tb('k010')}
        />

        {/* Réponse directe : bloc court et autonome, écrit pour être repris
            tel quel en featured snippet et par les moteurs de réponse. */}
        <section style={{ padding: '8px 32px 56px' }}>
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <div className="uppercase-sm" style={{ color: 'var(--text-3)', marginBottom: 12 }}>{tb('k011')}</div>
            <p style={{ fontSize: 17, lineHeight: 1.7, color: 'var(--text-2)' }}>
              {tb('k012')}</p>
          </div>
        </section>

        <section style={{ padding: '40px 32px 64px', borderTop: '1px solid var(--glass-border)' }}>
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <h2 style={{ fontSize: 30, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 20 }}>{tb('k013')}</h2>
            <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--text-3)', marginBottom: 16 }}>{tb('k014')}</p>
            <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--text-3)', marginBottom: 16 }}>{tb('k015')}</p>
          </div>
        </section>

        <section style={{ padding: '40px 32px 64px', borderTop: '1px solid var(--glass-border)' }}>
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <h2 style={{ fontSize: 30, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 20 }}>{tb('k016')}</h2>
            <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--text-3)', marginBottom: 16 }}>{tb('k017')}</p>
            <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--text-3)', marginBottom: 16 }}>{tb('k018')}</p>
            <ul style={{ margin: '20px 0 0', paddingLeft: 20, color: 'var(--text-3)', lineHeight: 1.9, fontSize: 15 }}>
              <li>{tb('k019')}</li>
              <li>{tb('k020')}</li>
              <li>{tb('k021')}</li>
              <li>{tb('k022')}</li>
              <li>{tb('k023')}</li>
              <li>{tb('k024')}</li>
            </ul>
          </div>
        </section>

        <section style={{ padding: '40px 32px 64px', borderTop: '1px solid var(--glass-border)' }}>
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <h2 style={{ fontSize: 30, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 20 }}>{tb('k025')}</h2>
            <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--text-3)', marginBottom: 16 }}>{tb('k026')}</p>
            <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--text-3)', marginBottom: 16 }}>{tb('k027')}</p>
          </div>
        </section>

        <section style={{ padding: '40px 32px 64px', borderTop: '1px solid var(--glass-border)' }}>
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <h2 style={{ fontSize: 30, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 20 }}>{tb('k028')}</h2>
            <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--text-3)', marginBottom: 16 }}>{tb('k029')}</p>
            <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--text-3)', marginBottom: 16 }}>{tb('k030')}</p>
            <ul style={{ margin: '20px 0 0', paddingLeft: 20, color: 'var(--text-3)', lineHeight: 1.9, fontSize: 15 }}>
              <li>{tb('k031')}</li>
              <li>{tb('k032')}</li>
              <li>{tb('k033')}</li>
              <li>{tb('k034')}</li>
              <li>{tb('k035')}</li>
            </ul>
          </div>
        </section>


        {/* Fiche de police — ajouté le 2026-09-11. C'est un sujet à fort
            volume de recherche que les concurrents traitent peu, et une
            obligation réelle des hôteliers marocains. Rédigé prudemment :
            Sojori collecte et prépare, il ne télé-déclare pas à la place de
            l'établissement. */}
        <section style={{ padding: '40px 32px 64px', borderTop: '1px solid var(--glass-border)' }}>
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <div className="uppercase-sm" style={{ color: 'var(--text-3)', marginBottom: 12 }}>{tb('k036')}</div>
            <h2 style={{ fontSize: 30, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 20 }}>
              {tb('k037')}</h2>
            <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--text-3)', marginBottom: 16 }}>
              {tb('k038')}</p>
            <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--text-3)', marginBottom: 16 }}>
              {tb('k039')}</p>
            <div className="card" style={{ padding: 22, marginBottom: 16 }}>
              <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 10 }}>{tb('k040')}</div>
              <p style={{ fontSize: 15, lineHeight: 1.7, color: 'var(--text-3)', marginBottom: 12 }}>
                {tb('k041')}<strong style={{ color: 'var(--text-2)' }}>collecte</strong> {tb('k042')}</p>
              <ul style={{ margin: 0, paddingLeft: 20, color: 'var(--text-3)', lineHeight: 1.9, fontSize: 15 }}>
                <li>{tb('k043')}</li>
                <li>{tb('k044')}</li>
                <li>{tb('k045')}</li>
                <li>{tb('k046')}</li>
              </ul>
            </div>
            <p style={{ fontSize: 14, lineHeight: 1.7, color: 'var(--text-3)', fontStyle: 'italic' }}>
              {tb('k047')}</p>
          </div>
        </section>

        {/* Maillage interne : ces liens portent le PageRank vers les pages
            produit et les autres villes. C'était le levier le plus faible
            du site — 33 pages quasiment sans liens entre elles. */}
        <section style={{ padding: '40px 32px 64px', borderTop: '1px solid var(--glass-border)' }}>
          <div style={{ maxWidth: 1000, margin: '0 auto' }}>
            <h2 style={{ fontSize: 30, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 20 }}>{tb('k048')}</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
              {[
                { t: 'PMS', d: tb('k049'), link: '/pms' as const },
                { t: tb('k050'), d: tb('k051'), link: '/channel-manager' as const },
                { t: 'TeamFlow', d: tb('k052'), link: '/teamflow' as const },
                { t: 'WhatsApp', d: tb('k053'), link: '/whatsapp' as const },
                { t: tb('k054'), d: tb('k055'), link: '/dynamic-pricing' as const },
                { t: 'Analytics', d: tb('k056'), link: '/analytics' as const },
              ].map(c => (
                <Link key={c.t} href={{ pathname: c.link, query: { source: 'seo-pms-agadir' } }} className="card" style={{ padding: 20, textDecoration: 'none', display: 'block' }}>
                  <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 6 }}>{c.t}</div>
                  <div style={{ fontSize: 13, color: 'var(--text-3)', lineHeight: 1.55 }}>{c.d}</div>
                </Link>
              ))}
            </div>

            <div style={{ marginTop: 28, fontSize: 14, color: 'var(--text-3)', lineHeight: 1.9 }}>
              {tb('k057')}{' '}
              <Link href={'/gestion-locative-agadir' as const} style={{ color: '#f4cf5e', textDecoration: 'none' }}>{tb('k058')}</Link>
              {' · '}
              <Link href={'/conciergerie-agadir' as const} style={{ color: '#f4cf5e', textDecoration: 'none' }}>{tb('k059')}</Link>
              <br />
              <br />
              <br />
              {tb('k060')}{' '}
              <Link href={'/comparatif-pms-maroc' as const} style={{ color: '#f4cf5e', textDecoration: 'none' }}>{tb('k061')}</Link>
              {tb('k062')}{' '}
              <Link href={'/go-siyaha' as const} style={{ color: '#f4cf5e', textDecoration: 'none' }}>{tb('k063')}</Link>
              <br />
              {tb('k064')}{' '}
              <Link href={'/orchestration' as const} style={{ color: '#f4cf5e', textDecoration: 'none', fontWeight: 600 }}>{tb('k065')}</Link>
              {tb('k066')}{' '}
              <Link href={'/pms-marrakech' as const} style={{ color: '#f4cf5e', textDecoration: 'none' }}>{tb('k067')}</Link>
              {' · '}
              <Link href={'/pms-casablanca' as const} style={{ color: '#f4cf5e', textDecoration: 'none' }}>{tb('k068')}</Link>
              {' · '}
              <Link href={'/pms-rabat' as const} style={{ color: '#f4cf5e', textDecoration: 'none' }}>{tb('k069')}</Link>
              {' · '}
              <Link href={'/pms-tanger' as const} style={{ color: '#f4cf5e', textDecoration: 'none' }}>{tb('k070')}</Link>
            </div>
          </div>
        </section>

        <StatsBar stats={[{"k": tb('k071'), "l": tb('k072')}, {"k": tb('kWinter'), "l": tb('k073')}]} />

        <FaqFromMessages page="pms-agadir" />

        <FinalCTA
          title={<>{tb('k076')}{' '}<span className="gradient-text">{tb('k077')}</span></>}
          subtitle={tb('k078')}
        />

        <PageFooter />
      </div>
    </>
  );
}
