import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { FaqFromMessages } from '@/components/FaqFromMessages';
import { PageSchema } from '@/components/PageSchema';
import { BackgroundEffects } from '@/components/BackgroundEffects';
import { PageHeader, PageFooter, PageHero, FinalCTA } from '@/components/SharedComponents';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'seoPages' });
  return {
    title: t('mcp.title'),
    description: t('mcp.description'),
    alternates: { canonical: `/${locale}/mcp` },
  };
}

export default async function McpPage({ params }: { params: Promise<{ locale: string }> }) {
  const tb = await getTranslations('pageBodies.mcp');
  const EXPOSED = [
    { t: tb('k030'), d: tb('k031') },
    { t: tb('k032'), d: tb('k033') },
    { t: tb('k034'), d: tb('k035') },
    { t: tb('k036'), d: tb('k037') },
  ];
  
  const NEVER_EXPOSED = [
    { t: tb('k038'), d: tb('k039') },
    { t: tb('k040'), d: tb('k041') },
    { t: tb('k042'), d: tb('k043') },
  ];
  
  const QUESTIONS = [
    tb('k044'),
    tb('k045'),
    tb('k046'),
    tb('k047'),
    tb('k048'),
    tb('k049'),
  ];

  const { locale } = await params;
  return (
    <>
      <BackgroundEffects />
      <PageSchema
        crumbs={[
          { name: tb('crumbHome'), path: `/${locale}` },
          { name: 'MCP', path: `/${locale}/mcp` },
        ]}
        serviceName={tb('k001')}
        serviceDescription={tb('k002')}
        areaServed="Maroc"
      />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <PageHeader pageTitle="MCP" />

        <PageHero
          badge={tb('k003')}
          title={<>{tb('k004')}{' '}<br /><span className="gradient-text">{tb('k005')}</span></>}
          subtitle={tb('k006')}
          cta1={tb('k007')}
          cta2={tb('k008')}
        />

        {/* Réponse directe — format repris des pages piliers, pour les IA */}
        <section style={{ padding: '8px 32px 48px' }}>
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <div className="uppercase-sm" style={{ color: 'var(--text-3)', marginBottom: 12 }}>{tb('k009')}</div>
            <p style={{ fontSize: 17, lineHeight: 1.7, color: 'var(--text-2)' }}>
              {tb('k010')}<em>{tb('k011')}</em> {tb('k012')}<strong style={{ color: 'var(--text)' }}> {tb('k013')}</strong>{' '}
              {tb('k014')}</p>
          </div>
        </section>

        {/* Ce qu'on demande */}
        <section style={{ padding: '0 32px 56px' }}>
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <div className="uppercase-sm" style={{ color: 'var(--text-3)', marginBottom: 16 }}>{tb('k015')}</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {QUESTIONS.map(q => (
                <div
                  key={q}
                  style={{
                    padding: '14px 18px',
                    borderRadius: 11,
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid var(--glass-border)',
                    fontSize: 15,
                    color: 'var(--text-2)',
                    fontStyle: 'italic',
                  }}
                >
                  «&nbsp;{q}&nbsp;»
                </div>
              ))}
            </div>
            <p style={{ marginTop: 18, fontSize: 14, color: 'var(--text-3)', lineHeight: 1.6 }}>
              {tb('k016')}</p>
          </div>
        </section>

        {/* Lisible / jamais lisible */}
        <section style={{ padding: '0 32px 56px' }}>
          <div style={{ maxWidth: 1080, margin: '0 auto' }}>
            <div className="mcp-split">
              <div>
                <div className="uppercase-sm" style={{ color: '#10b981', marginBottom: 16 }}>{tb('k017')}</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  {EXPOSED.map(x => (
                    <div key={x.t} className="card" style={{ padding: 18 }}>
                      <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 6 }}>{x.t}</div>
                      <div style={{ fontSize: 13, color: 'var(--text-2)', lineHeight: 1.55 }}>{x.d}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="uppercase-sm" style={{ color: '#f4cf5e', marginBottom: 16 }}>{tb('k018')}</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  {NEVER_EXPOSED.map(x => (
                    <div
                      key={x.t}
                      style={{
                        padding: 18,
                        borderRadius: 14,
                        background: 'linear-gradient(180deg, rgba(244,207,94,0.06), rgba(244,207,94,0.02))',
                        border: '1px solid rgba(244,207,94,0.3)',
                      }}
                    >
                      <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 6 }}>{x.t}</div>
                      <div style={{ fontSize: 13, color: 'var(--text-2)', lineHeight: 1.55 }}>{x.d}</div>
                    </div>
                  ))}
                </div>
                <p style={{ marginTop: 16, fontSize: 13, color: 'var(--text-3)', lineHeight: 1.6 }}>
                  {tb('k019')}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Lecture seule */}
        <section style={{ padding: '0 32px 56px' }}>
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <div
              style={{
                padding: '22px 26px',
                borderRadius: 14,
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid var(--glass-border)',
              }}
            >
              <div style={{ fontSize: 17, fontWeight: 700, marginBottom: 8 }}>
                {tb('k020')}</div>
              <p style={{ fontSize: 14, color: 'var(--text-2)', lineHeight: 1.65, margin: 0 }}>
                {tb('k021')}{' '}
                <Link href="/orchestration" style={{ color: '#f4cf5e' }}>{tb('k022')}</Link>{tb('k023')}</p>
            </div>
          </div>
        </section>

        {/* Pourquoi ça change la façon de piloter */}
        <section style={{ padding: '0 32px 56px' }}>
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <div className="uppercase-sm" style={{ color: 'var(--text-3)', marginBottom: 16 }}>{tb('k024')}</div>
            <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--text-2)', marginBottom: 16 }}>
              {tb('k025')}</p>
            <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--text-2)', marginBottom: 16 }}>
              {tb('k026')}</p>
            <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--text-2)', margin: 0 }}>
              {tb('k027')}</p>
          </div>
        </section>

        <FaqFromMessages page="mcp" />

        <FinalCTA
          title={<>{tb('k028')}<span className="gradient-text">interrogeable.</span></>}
          subtitle={tb('k029')}
        />
        <PageFooter />
      </div>

      <style>{`
        .mcp-split {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 32px;
        }
        @media (max-width: 860px) {
          .mcp-split {
            grid-template-columns: 1fr;
            gap: 40px;
          }
        }
      `}</style>
    </>
  );
}
