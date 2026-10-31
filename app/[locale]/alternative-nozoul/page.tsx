import type { Metadata } from 'next';
import { withShare } from '@/lib/seo';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { FaqFromMessages } from '@/components/FaqFromMessages';
import { PageSchema } from '@/components/PageSchema';
import { BackgroundEffects } from '@/components/BackgroundEffects';
import { PageHeader, PageFooter, PageHero, FinalCTA } from '@/components/SharedComponents';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'seoPages' });
  return withShare({
    title: t('altNozoul.title'),
    description: t('altNozoul.description'),
    alternates: { canonical: `/${locale}/alternative-nozoul` },
  }, locale);
}

/**
 * Page comparative Nozoul.
 *
 * 2026-09-11 — Règle de rédaction appliquée à toutes les pages comparatives :
 * l'offensive porte sur des différences STRUCTURELLES vérifiables
 * (architecture, périmètre, ancrage marché), jamais sur l'absence d'une
 * fonctionnalité chez le concurrent — un éditeur peut la livrer le mois
 * suivant et la page devient fausse, donc attaquable et décrédibilisante.
 * Les faiblesses issues d'avis clients sont attribuées à leur source
 * (G2, Hotel Tech Report), jamais affirmées en notre nom.
 * Chaque page dit explicitement dans quel cas le concurrent est le bon choix.
 * Relevé effectué le 2026-09-11 sur le site de l'éditeur.
 */
export default async function AltNozoul({ params }: { params: Promise<{ locale: string }> }) {
  const tb = await getTranslations('pageBodies.alternative-nozoul');
  const { locale } = await params;
  return (
    <>
      <BackgroundEffects />
      <PageSchema
        crumbs={[
          { name: tb('crumbHome'), path: `/${locale}` },
          { name: 'Comparatifs', path: `/${locale}/comparatif-pms-maroc` },
          { name: tb('k001'), path: `/${locale}/alternative-nozoul` },
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

        {/* Reconnaître les forces du concurrent n'est pas une concession :
            une page qui ne dit que du mal n'est pas crue, et Google
            déclasse les comparatifs déséquilibrés. */}
        <section style={{ padding: '40px 32px 64px', borderTop: '1px solid var(--glass-border)' }}>
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <h2 style={{ fontSize: 30, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 20 }}>{tb('k013')}</h2>
            <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--text-3)', marginBottom: 16 }}>{tb('k014')}</p>
            <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--text-3)', marginBottom: 16 }}>{tb('k015')}</p>
          </div>
        </section>

        <section style={{ padding: '40px 32px 64px', borderTop: '1px solid var(--glass-border)' }}>
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <h2 style={{ fontSize: 30, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 24 }}>{tb('k016')}</h2>
            <div style={{ display: 'grid', gap: 16 }}>
              <div className="card" style={{ padding: 24 }}>
                <div style={{ fontSize: 17, fontWeight: 600, marginBottom: 8 }}>{tb('k017')}</div>
                <p style={{ fontSize: 15, lineHeight: 1.7, color: 'var(--text-3)' }}>{tb('k018')}</p>
              </div>
              <div className="card" style={{ padding: 24 }}>
                <div style={{ fontSize: 17, fontWeight: 600, marginBottom: 8 }}>{tb('k019')}</div>
                <p style={{ fontSize: 15, lineHeight: 1.7, color: 'var(--text-3)' }}>{tb('k020')}</p>
              </div>
              <div className="card" style={{ padding: 24 }}>
                <div style={{ fontSize: 17, fontWeight: 600, marginBottom: 8 }}>{tb('k021')}</div>
                <p style={{ fontSize: 15, lineHeight: 1.7, color: 'var(--text-3)' }}>{tb('k022')}</p>
              </div>
              <div className="card" style={{ padding: 24 }}>
                <div style={{ fontSize: 17, fontWeight: 600, marginBottom: 8 }}>{tb('k023')}</div>
                <p style={{ fontSize: 15, lineHeight: 1.7, color: 'var(--text-3)' }}>{tb('k024')}</p>
              </div>
            </div>
          </div>
        </section>

        <section style={{ padding: '40px 32px 64px', borderTop: '1px solid var(--glass-border)' }}>
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <h2 style={{ fontSize: 30, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 24 }}>{tb('k025')}</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
              <div className="card" style={{ padding: 24 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-3)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: 1 }}>{tb('k026')}</div>
                <p style={{ fontSize: 15, lineHeight: 1.7, color: 'var(--text-3)' }}>{tb('k027')}</p>
              </div>
              <div className="card" style={{ padding: 24 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#f4cf5e', marginBottom: 10, textTransform: 'uppercase', letterSpacing: 1 }}>{tb('k028')}</div>
                <p style={{ fontSize: 15, lineHeight: 1.7, color: 'var(--text-3)' }}>{tb('k029')}</p>
              </div>
            </div>
          </div>
        </section>

        <section style={{ padding: '32px 32px 64px', borderTop: '1px solid var(--glass-border)' }}>
          <div style={{ maxWidth: 1000, margin: '0 auto' }}>
            <div className="uppercase-sm" style={{ color: 'var(--text-3)', marginBottom: 14 }}>{tb('k030')}</div>
            <div style={{ fontSize: 14, color: 'var(--text-3)', lineHeight: 2 }}>
              <Link href={'/comparatif-pms-maroc' as const} style={{ color: '#f4cf5e', textDecoration: 'none', fontWeight: 600 }}>{tb('k031')}</Link>
              {' · '}
              <Link href={'/go-siyaha' as const} style={{ color: '#f4cf5e', textDecoration: 'none' }}>{tb('k032')}</Link>
              {' · '}
              <Link href={'/pms' as const} style={{ color: '#f4cf5e', textDecoration: 'none' }}>{tb('k033')}</Link>
              <br />
              {tb('k034')}{' '}
              <Link href={'/alternative-cloudbeds' as const} style={{ color: '#f4cf5e', textDecoration: 'none' }}>{tb('k035')}</Link>
              {' · '}
              <Link href={'/alternative-pluriel' as const} style={{ color: '#f4cf5e', textDecoration: 'none' }}>{tb('k036')}</Link>
              {' · '}
              <Link href={'/alternative-welcomax' as const} style={{ color: '#f4cf5e', textDecoration: 'none' }}>{tb('k037')}</Link>
              <br />
              <br />
              {tb('k038')}{' '}
              <Link href={'/orchestration' as const} style={{ color: '#f4cf5e', textDecoration: 'none', fontWeight: 600 }}>{tb('k039')}</Link>
              {tb('k040')}{' '}
              <Link href={'/pms-marrakech' as const} style={{ color: '#f4cf5e', textDecoration: 'none' }}>Marrakech</Link>
              {' · '}
              <Link href={'/pms-casablanca' as const} style={{ color: '#f4cf5e', textDecoration: 'none' }}>Casablanca</Link>
              {' · '}
              <Link href={'/pms-rabat' as const} style={{ color: '#f4cf5e', textDecoration: 'none' }}>Rabat</Link>
              {' · '}
              <Link href={'/pms-tanger' as const} style={{ color: '#f4cf5e', textDecoration: 'none' }}>Tanger</Link>
              {' · '}
              <Link href={'/pms-agadir' as const} style={{ color: '#f4cf5e', textDecoration: 'none' }}>Agadir</Link>
            </div>
          </div>
        </section>

        <FaqFromMessages page="alternative-nozoul" />

        <section style={{ padding: '8px 32px 40px' }}>
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <p style={{ fontSize: 13, lineHeight: 1.7, color: 'var(--text-3)', fontStyle: 'italic' }}>
              {tb('k041')}</p>
          </div>
        </section>

        <FinalCTA
          title={<>{tb('k042')}{' '}<span className="gradient-text">{tb('k043')}</span></>}
          subtitle={tb('k044')}
        />

        <PageFooter />
      </div>
    </>
  );
}
