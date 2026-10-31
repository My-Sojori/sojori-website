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
    title: t('conciergerieRabat.title'),
    description: t('conciergerieRabat.description'),
    alternates: { canonical: `/${locale}/conciergerie-rabat` },
  };
}

export default function ConciergerieRabatPage() {
  const tb = useTranslations('pageBodies.conciergerie-rabat');
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
            <div style={{ fontSize: 32, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 32, maxWidth: 900 }}>
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
                { i: '•', t: tb('k020'), d: tb('k021') },
                { i: '•', t: tb('k022'), d: tb('k023') },
                { i: '•', t: tb('k024'), d: tb('k025') },
                { i: '•', t: tb('k026'), d: tb('k027') },
                { i: '•', t: tb('k028'), d: tb('k029') },
                { i: '•', t: tb('k030'), d: tb('k031') },
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
          <div style={{ maxWidth: 1000, margin: '0 auto' }}>
            <div className="uppercase-sm" style={{ color: 'var(--text-3)', marginBottom: 12 }}>{tb('k032')}</div>
            <div style={{ fontSize: 32, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 32 }}>
              {tb('k033')}<span className="gradient-text">{tb('k034')}</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 12 }}>
              {[
                { step: '1', moment: tb('k063'), action: 'Message automatique WhatsApp', detail: tb('k035') },
                { step: '2', moment: tb('k064'), action: tb('k065'), detail: tb('k036') },
                { step: '3', moment: tb('k066'), action: 'Check-in autonome', detail: tb('k037') },
                { step: '4', moment: tb('k067'), action: tb('k068'), detail: tb('k038') },
                { step: '5', moment: 'Jour check-out', action: 'Feedback automatique', detail: tb('k039') },
              ].map((c) => (
                <div key={c.step} className="card" style={{ padding: 20, display: 'flex', gap: 20, alignItems: 'start' }}>
                  <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#f4cf5e', color: '#0a0a10', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 16, flexShrink: 0 }}>{c.step}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-3)', marginBottom: 4, textTransform: 'uppercase', letterSpacing: 1 }}>{c.moment}</div>
                    <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 6 }}>{c.action}</div>
                    <div style={{ fontSize: 13, color: 'var(--text-3)', lineHeight: 1.55 }}>{c.detail}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        

        <StatsBar stats={[
          { k: tb('k044'), l: tb('k045') },
          { k: tb('k047'), l: tb('k048') },
          { k: 'UNESCO', l: tb('k049') }
        ]} />
        <FaqFromMessages page="conciergerie-rabat" />

        {/* Maillage interne — ajouté le 2026-09-11. Ces pages vivaient sans
            liens entre elles : le PageRank n'y circulait pas. */}
        <section style={{ padding: '32px 32px 56px', borderTop: '1px solid var(--glass-border)' }}>
          <div style={{ maxWidth: 1000, margin: '0 auto' }}>
            <div className="uppercase-sm" style={{ color: 'var(--text-3)', marginBottom: 14 }}>{tb('k050')}</div>
            <div style={{ fontSize: 14, color: 'var(--text-3)', lineHeight: 2 }}>
              <Link href={'/pms-rabat' as const} style={{ color: '#f4cf5e', textDecoration: 'none', fontWeight: 600 }}>{tb('k051')}</Link>
              {' · '}
              <Link href={'/gestion-locative-rabat' as const} style={{ color: '#f4cf5e', textDecoration: 'none' }}>{tb('k052')}</Link>
              <br />
              <br />
              {tb('k053')}{' '}
              <Link href={'/orchestration' as const} style={{ color: '#f4cf5e', textDecoration: 'none', fontWeight: 600 }}>{tb('k054')}</Link>
              {tb('k055')}{' '}
              <Link href={'/pms-marrakech' as const} style={{ color: '#f4cf5e', textDecoration: 'none' }}>{tb('k056')}</Link>
              {' · '}
              <Link href={'/pms-casablanca' as const} style={{ color: '#f4cf5e', textDecoration: 'none' }}>{tb('k057')}</Link>
              {' · '}
              <Link href={'/pms-tanger' as const} style={{ color: '#f4cf5e', textDecoration: 'none' }}>{tb('k058')}</Link>
              {' · '}
              <Link href={'/pms-agadir' as const} style={{ color: '#f4cf5e', textDecoration: 'none' }}>{tb('k059')}</Link>
            </div>
          </div>
        </section>



        <FinalCTA
          title={<>{tb('k060')}<span className="gradient-text">{tb('k061')}</span></>}
          subtitle={tb('k062')}
        />

        <PageFooter />
      </div>
    </>
  );
}
