import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { BackgroundEffects } from '@/components/BackgroundEffects';
import { Link } from '@/i18n/routing';
import { PageHeader, PageFooter, PageHero, StatsBar, FinalCTA } from '@/components/SharedComponents';
import { Calendar } from '@/components/pms/Calendar';
import { ScrollPaginationDots } from '@/components/shared/ScrollPaginationDots';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'seoPages' });
  return {
    title: t('pms.title'),
    description: t('pms.description'),
    alternates: { canonical: `/${locale}/pms` },
  };
}

export default async function PMSPage() {
  const t = await getTranslations('pmsPage');
  const properties = t.raw('properties') as string[];
  const modules = t.raw('modules') as { title: string; desc: string }[];
  const stats = t.raw('stats') as { k: string; l: string }[];

  return (
    <>
      <BackgroundEffects />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <PageHeader pageTitle={t('pageTitle')} />
        <PageHero
          badge={t('hero.badge')}
          title={
            <>
              {t('hero.titleLine1')}
              <br />
              <span className="gradient-text">{t('hero.titleGradient')}</span>
            </>
          }
          subtitle={t('hero.subtitle')}
          cta1={t('hero.cta1')}
          cta2={t('hero.cta2')}
        />
        <section style={{ padding: '12px 32px 44px' }}>
          <div style={{ maxWidth: 1280, margin: '0 auto' }}>
            <div className="uppercase-sm" style={{ color: 'var(--text-3)', textAlign: 'center', marginBottom: 14 }}>
              {t('sectionCalendar.eyebrow')}
            </div>
            <div style={{ fontSize: 32, fontWeight: 700, letterSpacing: '-0.02em', textAlign: 'center', maxWidth: 720, margin: '0 auto 32px' }}>
              {t('sectionCalendar.title')} <span className="gradient-text">{t('sectionCalendar.titleGradient')}</span>
            </div>
            <Calendar header={t('calendar.header')} properties={properties} />
          </div>
        </section>
        <section style={{ padding: '24px 32px 44px', borderTop: '1px solid var(--glass-border)' }}>
          <div style={{ maxWidth: 1280, margin: '0 auto' }}>
            <div className="uppercase-sm" style={{ color: 'var(--text-3)', marginBottom: 12 }}>{t('sectionModules.eyebrow')}</div>
            <div style={{ fontSize: 32, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 32, maxWidth: 700 }}>
              {t('sectionModules.title')} <span style={{ color: 'var(--text-3)' }}>{t('sectionModules.titleMuted')}</span>
            </div>
            <ScrollPaginationDots itemCount={modules.length} gap={16} peekCarousel>
              {modules.map((c, idx) => (
                <div key={c.title} data-carousel-slide className="card" style={{
                  padding: 22,
                  flexShrink: 0
                }}>
                  <div style={{ fontSize: 28, marginBottom: 10 }}>{['📅', '💳', '📄', '📊', '🧾', '🔁'][idx] ?? '✓'}</div>
                  <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 4 }}>{c.title}</div>
                  <div style={{ fontSize: 13, color: 'var(--text-3)', lineHeight: 1.55 }}>{c.desc}</div>
                </div>
              ))}
            </ScrollPaginationDots>
          </div>
        </section>
        <StatsBar stats={stats.map((s) => ({ k: s.k, l: s.l }))} />

        {/* Page pilier → déclinaisons ville. Ajouté le 2026-09-11 : c'est
            /pms qui concentre l'autorité, elle doit la redistribuer. */}
        <section style={{ padding: '32px 32px 64px', borderTop: '1px solid var(--glass-border)' }}>
          <div style={{ maxWidth: 1000, margin: '0 auto' }}>
            <div className="uppercase-sm" style={{ color: 'var(--text-3)', marginBottom: 14 }}>● Le PMS Sojori par ville</div>
            <h2 style={{ fontSize: 30, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 20 }}>
              Chaque marché a son rythme.
            </h2>
            <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--text-3)', marginBottom: 24, maxWidth: 760 }}>
              Un riad de médina, un hôtel d&apos;affaires et une résidence balnéaire n&apos;ont
              ni la même durée de séjour, ni le même mix de canaux, ni les mêmes contraintes
              de ménage. Voici comment Sojori s&apos;applique dans les cinq principales villes
              hôtelières du Maroc.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 12 }}>
              {[
              { city: 'Marrakech', slug: '/pms-marrakech' as const },
              { city: 'Casablanca', slug: '/pms-casablanca' as const },
              { city: 'Rabat', slug: '/pms-rabat' as const },
              { city: 'Tanger', slug: '/pms-tanger' as const },
              { city: 'Agadir', slug: '/pms-agadir' as const },
              ].map(c => (
                <Link key={c.city} href={c.slug} className="card" style={{ padding: 18, textDecoration: 'none', display: 'block', textAlign: 'center' }}>
                  <div style={{ fontSize: 15, fontWeight: 600 }}>{c.city}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-3)', marginTop: 4 }}>PMS hôtel</div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <FinalCTA
          title={
            <>
              {t('finalCTA.titleBefore')} <span className="gradient-text">{t('finalCTA.titleGradient')}</span>
            </>
          }
          subtitle={t('finalCTA.subtitle')}
        />
        <PageFooter />
      </div>
    </>
  );
}
