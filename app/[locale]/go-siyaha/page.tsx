import type { Metadata } from 'next';
import { withShare } from '@/lib/seo';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { FaqFromMessages } from '@/components/FaqFromMessages';
import { PageSchema } from '@/components/PageSchema';
import { BackgroundEffects } from '@/components/BackgroundEffects';
import { PageHeader, PageFooter, PageHero, StatsBar, FinalCTA } from '@/components/SharedComponents';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'seoPages' });
  return withShare({
    title: t('goSiyaha.title'),
    description: t('goSiyaha.description'),
    alternates: { canonical: `/${locale}/go-siyaha` },
  }, locale);
}

/**
 * Page Go Siyaha.
 *
 * 2026-09-11 — Précaution rédactionnelle importante : cette page explique le
 * programme et oriente vers Maroc PME. Elle n'affirme NULLE PART que Sojori
 * est agréé, référencé ou pré-éligible, parce que la vérification n'a pas pu
 * aboutir : marocpme.gov.ma présente un certificat TLS invalide, et aucune
 * source consultée ne dit si Maroc PME impose un prestataire référencé.
 * Promettre une subvention à un hôtelier sans cette certitude serait
 * trompeur. Les chiffres viennent de sources secondaires concordantes et sont
 * attribués comme tels dans le texte.
 */
export default async function GoSiyahaPage({ params }: { params: Promise<{ locale: string }> }) {
  const tb = await getTranslations('pageBodies.go-siyaha');
  const { locale } = await params;
  return (
    <>
      <BackgroundEffects />
      <PageSchema
        crumbs={[
          { name: tb('crumbHome'), path: `/${locale}` },
          { name: tb('crumbSolutions'), path: `/${locale}/pms` },
          { name: tb('k001'), path: `/${locale}/go-siyaha` },
        ]}
        serviceName={tb('k002')}
        serviceDescription={tb('k003')}
        areaServed="Maroc"
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

        <section style={{ padding: '8px 32px 56px' }}>
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <div className="uppercase-sm" style={{ color: 'var(--text-3)', marginBottom: 12 }}>{tb('k011')}</div>
            <p style={{ fontSize: 17, lineHeight: 1.7, color: 'var(--text-2)' }}>
              {tb('k012')}</p>
          </div>
        </section>

        <section style={{ padding: '40px 32px 64px', borderTop: '1px solid var(--glass-border)' }}>
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <h2 style={{ fontSize: 30, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 20 }}>
              {tb('k013')}</h2>
            <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--text-3)', marginBottom: 16 }}>
              {tb('k014')}</p>
            <ul style={{ margin: '20px 0 0', paddingLeft: 20, color: 'var(--text-3)', lineHeight: 1.9, fontSize: 15 }}>
              <li>{tb('k015')}</li>
              <li>{tb('k016')}</li>
              <li>{tb('k017')}</li>
              <li>{tb('k018')}</li>
              <li>{tb('k019')}</li>
              <li>{tb('k020')}</li>
            </ul>
          </div>
        </section>

        <section style={{ padding: '40px 32px 64px', borderTop: '1px solid var(--glass-border)' }}>
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <h2 style={{ fontSize: 30, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 20 }}>
              {tb('k021')}</h2>
            <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--text-3)', marginBottom: 16 }}>
              {tb('k022')}</p>
            <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--text-3)', marginBottom: 16 }}>
              {tb('k023')}</p>
            <div className="card" style={{ padding: 22 }}>
              <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 10 }}>{tb('k024')}</div>
              <p style={{ fontSize: 15, lineHeight: 1.7, color: 'var(--text-3)' }}>
                {tb('k025')}</p>
            </div>
          </div>
        </section>

        <section style={{ padding: '32px 32px 64px', borderTop: '1px solid var(--glass-border)' }}>
          <div style={{ maxWidth: 1000, margin: '0 auto' }}>
            <h2 style={{ fontSize: 30, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 20 }}>{tb('k026')}</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
              {[
                { t: 'PMS', d: tb('k027'), link: '/pms' as const },
                { t: tb('k028'), d: tb('k029'), link: '/channel-manager' as const },
                { t: 'TeamFlow', d: tb('k030'), link: '/teamflow' as const },
                { t: 'WhatsApp', d: tb('k031'), link: '/whatsapp' as const },
                { t: tb('k032'), d: tb('k033'), link: '/dynamic-pricing' as const },
                { t: 'Analytics', d: tb('k034'), link: '/analytics' as const },
              ].map(c => (
                <Link key={c.t} href={{ pathname: c.link, query: { source: 'seo-go-siyaha' } }} className="card" style={{ padding: 20, textDecoration: 'none', display: 'block' }}>
                  <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 6 }}>{c.t}</div>
                  <div style={{ fontSize: 13, color: 'var(--text-3)', lineHeight: 1.55 }}>{c.d}</div>
                </Link>
              ))}
            </div>
            <div style={{ marginTop: 28, fontSize: 14, color: 'var(--text-3)', lineHeight: 1.9 }}>
              <br />
              {tb('k035')}{' '}
              <Link href={'/orchestration' as const} style={{ color: '#f4cf5e', textDecoration: 'none', fontWeight: 600 }}>{tb('k036')}</Link>
              {tb('k037')}{' '}
              <Link href={'/pms-marrakech' as const} style={{ color: '#f4cf5e', textDecoration: 'none' }}>{tb('k038')}</Link>
              {' · '}
              <Link href={'/pms-casablanca' as const} style={{ color: '#f4cf5e', textDecoration: 'none' }}>{tb('k039')}</Link>
              {' · '}
              <Link href={'/pms-rabat' as const} style={{ color: '#f4cf5e', textDecoration: 'none' }}>{tb('k040')}</Link>
              {' · '}
              <Link href={'/pms-tanger' as const} style={{ color: '#f4cf5e', textDecoration: 'none' }}>{tb('k041')}</Link>
              {' · '}
              <Link href={'/pms-agadir' as const} style={{ color: '#f4cf5e', textDecoration: 'none' }}>{tb('k042')}</Link>
            </div>
          </div>
        </section>

        <StatsBar stats={[
          { k: '90%', l: tb('k043') },
          { k: '200M', l: tb('k044') },
          { k: '3', l: tb('k045') },
          { k: tb('k046'), l: tb('k047') }
        ]} />

        <FaqFromMessages page="go-siyaha" />

        <section style={{ padding: '8px 32px 40px' }}>
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <p style={{ fontSize: 13, lineHeight: 1.7, color: 'var(--text-3)', fontStyle: 'italic' }}>
              {tb('k048')}</p>
          </div>
        </section>

        <FinalCTA
          title={<>{tb('k049')}{' '}<span className="gradient-text">{tb('k050')}</span></>}
          subtitle={tb('k051')}
        />

        <PageFooter />
      </div>
    </>
  );
}
