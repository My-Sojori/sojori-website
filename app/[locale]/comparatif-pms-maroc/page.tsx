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
    title: t('comparatifPmsMaroc.title'),
    description: t('comparatifPmsMaroc.description'),
    alternates: { canonical: `/${locale}/comparatif-pms-maroc` },
  };
}

export default async function ComparatifPmsMarocPage({ params }: { params: Promise<{ locale: string }> }) {
  const tb = await getTranslations('pageBodies.comparatif-pms-maroc');
  const PLAYERS = [
    {
      name: 'Sojori',
      profil: tb('k040'),
      archi: 'Cloud',
      fort: tb('k041'),
      pour: tb('k042'),
      slug: null,
      highlight: true,
    },
    {
      name: 'Cloudbeds',
      profil: tb('k043'),
      archi: 'Cloud',
      fort: tb('k044'),
      pour: tb('k045'),
      slug: '/alternative-cloudbeds' as const,
      highlight: false,
    },
    {
      name: 'Pluriel',
      profil: tb('k046'),
      archi: tb('k047'),
      fort: tb('k048'),
      pour: tb('k049'),
      slug: '/alternative-pluriel' as const,
      highlight: false,
    },
    {
      name: 'Nozoul',
      profil: tb('k050'),
      archi: 'Cloud',
      fort: tb('k051'),
      pour: tb('k052'),
      slug: '/alternative-nozoul' as const,
      highlight: false,
    },
    {
      name: 'Welcomax',
      profil: tb('k053'),
      archi: 'Cloud',
      fort: tb('k054'),
      pour: tb('k055'),
      slug: '/alternative-welcomax' as const,
      highlight: false,
    },
  ];

  const { locale } = await params;
  return (
    <>
      <BackgroundEffects />
      <PageSchema
        crumbs={[
          { name: tb('crumbHome'), path: `/${locale}` },
          { name: 'Comparatifs', path: `/${locale}/comparatif-pms-maroc` },
        ]}
        serviceName={tb('k001')}
        serviceDescription={tb('k002')}
        areaServed="Maroc"
      />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <PageHeader pageTitle={tb('k003')} />

        <PageHero
          badge={tb('k004')}
          title={<>{tb('k005')}{' '}<br /><span className="gradient-text">{tb('k006')}</span></>}
          subtitle={tb('k007')}
          cta1={tb('k008')}
          cta2={tb('k009')}
        />

        <section style={{ padding: '8px 32px 56px' }}>
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <div className="uppercase-sm" style={{ color: 'var(--text-3)', marginBottom: 12 }}>{tb('k010')}</div>
            <p style={{ fontSize: 17, lineHeight: 1.7, color: 'var(--text-2)' }}>
              {tb('k011')}</p>
          </div>
        </section>

        <section style={{ padding: '40px 32px 64px', borderTop: '1px solid var(--glass-border)' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <h2 style={{ fontSize: 30, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 12 }}>
              {tb('k012')}</h2>
            <p style={{ fontSize: 15, lineHeight: 1.7, color: 'var(--text-3)', marginBottom: 24, maxWidth: 760 }}>
              {tb('k013')}</p>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 860, fontSize: 14 }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--glass-border)' }}>
                    <th style={{ textAlign: 'left', padding: '12px 14px', color: 'var(--text-3)', fontWeight: 600 }}>Solution</th>
                    <th style={{ textAlign: 'left', padding: '12px 14px', color: 'var(--text-3)', fontWeight: 600 }}>Profil</th>
                    <th style={{ textAlign: 'left', padding: '12px 14px', color: 'var(--text-3)', fontWeight: 600 }}>Architecture</th>
                    <th style={{ textAlign: 'left', padding: '12px 14px', color: 'var(--text-3)', fontWeight: 600 }}>{tb('k014')}</th>
                    <th style={{ textAlign: 'left', padding: '12px 14px', color: 'var(--text-3)', fontWeight: 600 }}>{tb('k015')}</th>
                  </tr>
                </thead>
                <tbody>
                  {PLAYERS.map(p => (
                    <tr key={p.name} style={{ borderBottom: '1px solid var(--glass-border)' }}>
                      <td style={{ padding: '14px', fontWeight: 600, color: p.highlight ? '#f4cf5e' : 'var(--text)' }}>
                        {p.slug ? (
                          <Link href={p.slug} style={{ color: 'inherit', textDecoration: 'none' }}>{p.name}</Link>
                        ) : p.name}
                      </td>
                      <td style={{ padding: '14px', color: 'var(--text-2)' }}>{p.profil}</td>
                      <td style={{ padding: '14px', color: 'var(--text-3)' }}>{p.archi}</td>
                      <td style={{ padding: '14px', color: 'var(--text-3)', lineHeight: 1.6 }}>{p.fort}</td>
                      <td style={{ padding: '14px', color: 'var(--text-3)', lineHeight: 1.6 }}>{p.pour}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section style={{ padding: '40px 32px 64px', borderTop: '1px solid var(--glass-border)' }}>
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <h2 style={{ fontSize: 30, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 20 }}>
              {tb('k016')}</h2>
            <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--text-3)', marginBottom: 16 }}>
              {tb('k017')}</p>
            <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--text-3)', marginBottom: 16 }}>
              {tb('k018')}</p>
            <div className="card" style={{ padding: 22 }}>
              <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 10 }}>{tb('k019')}</div>
              <p style={{ fontSize: 15, lineHeight: 1.7, color: 'var(--text-3)' }}>
                {tb('k020')}</p>
            </div>
          </div>
        </section>

        <section style={{ padding: '32px 32px 64px', borderTop: '1px solid var(--glass-border)' }}>
          <div style={{ maxWidth: 1000, margin: '0 auto' }}>
            <h2 style={{ fontSize: 30, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 20 }}>{tb('k021')}</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
              {[
                { t: tb('k022'), d: tb('k023'), link: '/alternative-cloudbeds' as const },
                { t: tb('k024'), d: tb('k025'), link: '/alternative-pluriel' as const },
                { t: tb('k026'), d: tb('k027'), link: '/alternative-nozoul' as const },
                { t: tb('k028'), d: tb('k029'), link: '/alternative-welcomax' as const },
              ].map(c => (
                <Link key={c.t} href={c.link} className="card" style={{ padding: 20, textDecoration: 'none', display: 'block' }}>
                  <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 6 }}>{c.t}</div>
                  <div style={{ fontSize: 13, color: 'var(--text-3)', lineHeight: 1.55 }}>{c.d}</div>
                </Link>
              ))}
            </div>
            <div style={{ marginTop: 28, fontSize: 14, color: 'var(--text-3)', lineHeight: 1.9 }}>
              {tb('k030')}{' '}
              <Link href={'/go-siyaha' as const} style={{ color: '#f4cf5e', textDecoration: 'none' }}>{tb('k031')}</Link>
              {' · '}
              <Link href={'/pms' as const} style={{ color: '#f4cf5e', textDecoration: 'none' }}>{tb('k032')}</Link>
              <br />
              <br />
              {tb('k033')}{' '}
              <Link href={'/orchestration' as const} style={{ color: '#f4cf5e', textDecoration: 'none', fontWeight: 600 }}>{tb('k034')}</Link>
              {tb('k035')}{' '}
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

        <FaqFromMessages page="comparatif-pms-maroc" />

        <section style={{ padding: '8px 32px 40px' }}>
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <p style={{ fontSize: 13, lineHeight: 1.7, color: 'var(--text-3)', fontStyle: 'italic' }}>
              {tb('k036')}</p>
          </div>
        </section>

        <FinalCTA
          title={<>{tb('k037')}{' '}<span className="gradient-text">{tb('k038')}</span></>}
          subtitle={tb('k039')}
        />

        <PageFooter />
      </div>
    </>
  );
}
