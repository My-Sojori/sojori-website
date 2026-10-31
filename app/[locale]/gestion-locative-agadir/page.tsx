import type { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { FaqFromMessages } from '@/components/FaqFromMessages';
import { BackgroundEffects } from '@/components/BackgroundEffects';
import { PageHeader, PageFooter, PageHero, StatsBar, FinalCTA } from '@/components/SharedComponents';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'seoPages' });
  return {
    title: t('gestionLocativeAgadir.title'),
    description: t('gestionLocativeAgadir.description'),
    alternates: { canonical: `/${locale}/gestion-locative-agadir` },
  };
}

export default function GestionLocativeAgadirPage() {
  const tb = useTranslations('pageBodies.gestion-locative-agadir');
  return (
    <>
      <BackgroundEffects />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <PageHeader pageTitle={tb('k001')} />

        <PageHero
          badge={tb('k002')}
          title={<>{tb('k003')}<br /><span className="gradient-text">{tb('k004')}</span></>}
          subtitle={tb('k005')}
          cta1={tb('k006')}
          cta2={tb('k007')}
        />

        <section style={{ padding: '40px 32px 80px' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div className="uppercase-sm" style={{ color: 'var(--text-3)', marginBottom: 12 }}>{tb('k008')}</div>
            <div style={{ fontSize: 32, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 32, maxWidth: 820 }}>
              {tb('k009')}<span className="gradient-text">{tb('k010')}</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
              {[
                { i: '•', t: tb('k011'), d: tb('k012') },
                { i: '•', t: tb('k013'), d: tb('k014') },
                { i: '•', t: tb('k015'), d: tb('k016') },
              ].map(c => (
                <div key={c.t} className="card" style={{ padding: 22 }}>
                  <div aria-hidden="true" style={{ width: 28, height: 3, borderRadius: 2, background: 'var(--primary)', marginBottom: 14 }} />
                  <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 4 }}>{c.t}</div>
                  <div style={{ fontSize: 13, color: 'var(--text-3)', lineHeight: 1.55 }}>{c.d}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section style={{ padding: '40px 32px 80px', borderTop: '1px solid var(--glass-border)' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div className="uppercase-sm" style={{ color: 'var(--text-3)', marginBottom: 12 }}>{tb('k017')}</div>
            <div style={{ fontSize: 32, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 32 }}>
              {tb('k018')}<span style={{ color: 'var(--text-3)' }}>{tb('k019')}</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
              {[
                { i: '•', t: tb('k020'), d: tb('k021'), link: '/pms' as const },
                { i: '•', t: tb('k022'), d: tb('k023'), link: '/channel-manager' as const },
                { i: '•', t: tb('k024'), d: tb('k025'), link: '/whatsapp' as const },
                { i: '•', t: tb('k026'), d: tb('k027'), link: '/dynamic-pricing' as const },
                { i: '•', t: tb('k028'), d: tb('k029'), link: '/teamflow' as const },
                { i: '•', t: tb('k030'), d: tb('k031'), link: '/analytics' as const },
              ].map(c => (
                <div key={c.t} className="card" style={{ padding: 22 }}>
                  <div aria-hidden="true" style={{ width: 28, height: 3, borderRadius: 2, background: 'var(--primary)', marginBottom: 14 }} />
                  <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 4 }}>{c.t}</div>
                  <div style={{ fontSize: 13, color: 'var(--text-3)', lineHeight: 1.55, marginBottom: 12 }}>{c.d}</div>
                  <Link href={{ pathname: c.link, query: { source: 'seo-gestion-locative-agadir' } }} style={{ fontSize: 12, color: '#f4cf5e', textDecoration: 'none', fontWeight: 600 }}>{tb('k032')}</Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        

        <StatsBar stats={[
          { k: tb('k039'), l: tb('k040') },
          { k: tb('k041'), l: tb('k042') },
          { k: tb('k044'), l: tb('k045') }
        ]} />
        <FaqFromMessages page="gestion-locative-agadir" />

        {/* Maillage interne — ajouté le 2026-09-11. Ces pages vivaient sans
            liens entre elles : le PageRank n'y circulait pas. */}
        <section style={{ padding: '32px 32px 56px', borderTop: '1px solid var(--glass-border)' }}>
          <div style={{ maxWidth: 1000, margin: '0 auto' }}>
            <div className="uppercase-sm" style={{ color: 'var(--text-3)', marginBottom: 14 }}>{tb('k046')}</div>
            <div style={{ fontSize: 14, color: 'var(--text-3)', lineHeight: 2 }}>
              <Link href={'/pms-agadir' as const} style={{ color: '#f4cf5e', textDecoration: 'none', fontWeight: 600 }}>{tb('k047')}</Link>
              {' · '}
              <Link href={'/conciergerie-agadir' as const} style={{ color: '#f4cf5e', textDecoration: 'none' }}>{tb('k048')}</Link>
              <br />
              <br />
              {tb('k049')}{' '}
              <Link href={'/orchestration' as const} style={{ color: '#f4cf5e', textDecoration: 'none', fontWeight: 600 }}>{tb('k050')}</Link>
              {tb('k051')}{' '}
              <Link href={'/pms-marrakech' as const} style={{ color: '#f4cf5e', textDecoration: 'none' }}>{tb('k052')}</Link>
              {' · '}
              <Link href={'/pms-casablanca' as const} style={{ color: '#f4cf5e', textDecoration: 'none' }}>{tb('k053')}</Link>
              {' · '}
              <Link href={'/pms-rabat' as const} style={{ color: '#f4cf5e', textDecoration: 'none' }}>{tb('k054')}</Link>
              {' · '}
              <Link href={'/pms-tanger' as const} style={{ color: '#f4cf5e', textDecoration: 'none' }}>{tb('k055')}</Link>
            </div>
          </div>
        </section>



        <FinalCTA
          title={<>{tb('k056')}<span className="gradient-text">{tb('k057')}</span></>}
          subtitle={tb('k058')}
        />

        <PageFooter />
      </div>
    </>
  );
}
