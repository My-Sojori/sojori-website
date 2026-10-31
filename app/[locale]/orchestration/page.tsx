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
    title: t('orchestration.title'),
    description: t('orchestration.description'),
    alternates: { canonical: `/${locale}/orchestration` },
  }, locale);
}

export default async function OrchestrationPage({ params }: { params: Promise<{ locale: string }> }) {
  const tb = await getTranslations('pageBodies.orchestration');
  const DOMAINS = [
    {
      key: 'guest',
      label: tb('k052'),
      color: '#06b6d4',
      lead: tb('k053'),
      body: tb('k054'),
      links: [
        { t: tb('k055'), href: '/guest-experience' as const },
        { t: 'WhatsApp', href: '/whatsapp' as const },
        { t: tb('k056'), href: '/inbox' as const },
      ],
    },
    {
      key: 'ops',
      label: tb('k057'),
      color: '#8b5cf6',
      lead: tb('k058'),
      body: tb('k059'),
      links: [
        { t: 'TeamFlow', href: '/teamflow' as const },
        { t: 'PMS', href: '/pms' as const },
        { t: tb('k060'), href: '/dashboard-app' as const },
      ],
    },
    {
      key: 'revenue',
      label: tb('k061'),
      color: '#10b981',
      lead: tb('k062'),
      body: tb('k063'),
      links: [
        { t: tb('k064'), href: '/dynamic-pricing' as const },
        { t: tb('k065'), href: '/channel-manager' as const },
        { t: tb('k066'), href: '/analytics' as const },
      ],
    },
  ];
  
  const CONNECTS = [
    { i: '•', t: tb('k067'), d: tb('k068') },
    { i: '•', t: tb('k069'), d: tb('k070') },
    { i: '•', t: tb('k071'), d: tb('k072') },
    { i: '•', t: tb('k073'), d: tb('k074') },
  ];

  const { locale } = await params;
  return (
    <>
      <BackgroundEffects />
      <PageSchema
        crumbs={[
          { name: tb('crumbHome'), path: `/${locale}` },
          { name: 'Orchestration', path: `/${locale}/orchestration` },
        ]}
        serviceName={tb('k001')}
        serviceDescription={tb('k002')}
        areaServed="Maroc"
      />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <PageHeader pageTitle="Orchestration" />

        <PageHero
          badge={tb('k003')}
          title={<>{tb('k004')}{' '}<br /><span className="gradient-text">{tb('k005')}</span></>}
          subtitle={tb('k006')}
          cta1={tb('k007')}
          cta2={tb('k008')}
        />

        <section style={{ padding: '8px 32px 56px' }}>
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <div className="uppercase-sm" style={{ color: 'var(--text-3)', marginBottom: 12 }}>{tb('k009')}</div>
            <p style={{ fontSize: 17, lineHeight: 1.7, color: 'var(--text-2)' }}>
              {tb('k010')}</p>
          </div>
        </section>

        {/* La distinction fondatrice, posée noir sur blanc. */}
        <section style={{ padding: '40px 32px 64px', borderTop: '1px solid var(--glass-border)' }}>
          <div style={{ maxWidth: 1000, margin: '0 auto' }}>
            <h2 style={{ fontSize: 30, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 24 }}>
              {tb('k011')}</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
              <div className="card" style={{ padding: 24 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-3)', marginBottom: 12, textTransform: 'uppercase', letterSpacing: 1 }}>{tb('k012')}</div>
                <ul style={{ margin: 0, paddingLeft: 18, color: 'var(--text-3)', lineHeight: 1.9, fontSize: 15 }}>
                  <li>{tb('k013')}</li>
                  <li>{tb('k014')}</li>
                  <li>{tb('k015')}</li>
                  <li>{tb('k016')}</li>
                  <li>{tb('k017')}</li>
                </ul>
                <p style={{ fontSize: 14, lineHeight: 1.7, color: 'var(--text-3)', marginTop: 16, fontStyle: 'italic' }}>
                  {tb('k018')}</p>
              </div>
              <div className="card" style={{ padding: 24, borderColor: 'rgba(230,176,34,0.4)' }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#f4cf5e', marginBottom: 12, textTransform: 'uppercase', letterSpacing: 1 }}>{tb('k019')}</div>
                <ul style={{ margin: 0, paddingLeft: 18, color: 'var(--text-3)', lineHeight: 1.9, fontSize: 15 }}>
                  <li>{tb('k020')}</li>
                  <li>{tb('k021')}</li>
                  <li>{tb('k022')}</li>
                  <li>{tb('k023')}</li>
                  <li>{tb('k024')}</li>
                </ul>
                <p style={{ fontSize: 14, lineHeight: 1.7, color: 'var(--text-3)', marginTop: 16, fontStyle: 'italic' }}>
                  {tb('k025')}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Les trois domaines — et les modules qui les servent. */}
        <section style={{ padding: '40px 32px 64px', borderTop: '1px solid var(--glass-border)' }}>
          <div style={{ maxWidth: 1000, margin: '0 auto' }}>
            <h2 style={{ fontSize: 30, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 12 }}>
              {tb('k026')}</h2>
            <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--text-3)', marginBottom: 28, maxWidth: 780 }}>
              {tb('k027')}</p>
            <div style={{ display: 'grid', gap: 16 }}>
              {DOMAINS.map((d) => (
                <div key={d.key} className="card" style={{ padding: 24, borderLeft: `3px solid ${d.color}` }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: d.color, marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 }}>{d.label}</div>
                  <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>{d.lead}</div>
                  <p style={{ fontSize: 15, lineHeight: 1.7, color: 'var(--text-3)', marginBottom: 14 }}>{d.body}</p>
                  <div style={{ fontSize: 13, color: 'var(--text-3)' }}>
                    {d.links.map((l, i) => (
                      <span key={l.t}>
                        {i > 0 && ' · '}
                        <Link href={{ pathname: l.href, query: { source: 'seo-orchestration' } }} style={{ color: '#f4cf5e', textDecoration: 'none', fontWeight: 600 }}>{l.t}</Link>
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Les quatre connexions. */}
        <section style={{ padding: '40px 32px 64px', borderTop: '1px solid var(--glass-border)' }}>
          <div style={{ maxWidth: 1000, margin: '0 auto' }}>
            <h2 style={{ fontSize: 30, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 12 }}>
              {tb('k028')}</h2>
            <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--text-3)', marginBottom: 28, maxWidth: 780 }}>
              {tb('k029')}</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
              {CONNECTS.map((c) => (
                <div key={c.t} className="card" style={{ padding: 22 }}>
                  <div aria-hidden="true" style={{ width: 28, height: 3, borderRadius: 2, background: 'var(--primary)', marginBottom: 14 }} />
                  <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 6 }}>{c.t}</div>
                  <p style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--text-3)', margin: 0 }}>{c.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Un exemple concret : la démonstration du principe. */}
        <section style={{ padding: '40px 32px 64px', borderTop: '1px solid var(--glass-border)' }}>
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <h2 style={{ fontSize: 30, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 20 }}>
              {tb('k030')}</h2>
            <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--text-3)', marginBottom: 16 }}>
              {tb('k031')}</p>
            <ul style={{ margin: '0 0 16px', paddingLeft: 20, color: 'var(--text-3)', lineHeight: 1.95, fontSize: 15 }}>
              <li><strong style={{ color: 'var(--text-2)' }}>{tb('k032')}</strong> {tb('k033')}</li>
              <li><strong style={{ color: 'var(--text-2)' }}>{tb('k034')}</strong> {tb('k035')}</li>
              <li><strong style={{ color: 'var(--text-2)' }}>Revenu</strong> {tb('k036')}</li>
            </ul>
            <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--text-3)' }}>
              {tb('k037')}</p>
          </div>
        </section>

        <StatsBar stats={[
          { k: '3', l: tb('k038') },
          { k: '4', l: tb('k039') },
          { k: 'PMS', l: tb('k040') },
          { k: tb('k041'), l: tb('k042') }
        ]} />

        <FaqFromMessages page="orchestration" />

        {/* Maillage : cette page est le pilier, elle doit redistribuer. */}
        <section style={{ padding: '8px 32px 56px' }}>
          <div style={{ maxWidth: 1000, margin: '0 auto' }}>
            <div className="uppercase-sm" style={{ color: 'var(--text-3)', marginBottom: 14 }}>{tb('k043')}</div>
            <div style={{ fontSize: 14, color: 'var(--text-3)', lineHeight: 2 }}>
              <Link href={'/comparatif-pms-maroc' as const} style={{ color: '#f4cf5e', textDecoration: 'none', fontWeight: 600 }}>{tb('k044')}</Link>
              {' · '}
              <Link href={'/integrations' as const} style={{ color: '#f4cf5e', textDecoration: 'none' }}>{tb('k045')}</Link>
              {' · '}
              <Link href={'/go-siyaha' as const} style={{ color: '#f4cf5e', textDecoration: 'none' }}>{tb('k046')}</Link>
              {' · '}
              <Link href={'/offre' as const} style={{ color: '#f4cf5e', textDecoration: 'none' }}>{tb('k047')}</Link>
              <br />
              {tb('k048')}{' '}
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

        <FinalCTA
          title={<>{tb('k049')}{' '}<span className="gradient-text">{tb('k050')}</span></>}
          subtitle={tb('k051')}
        />

        <PageFooter />
      </div>
    </>
  );
}
