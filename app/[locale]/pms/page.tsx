import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { BackgroundEffects } from '@/components/BackgroundEffects';
import { PageHeader, PageFooter, PageHero, StatsBar, FinalCTA } from '@/components/SharedComponents';
import { Calendar } from '@/components/pms/Calendar';
import { ScrollPaginationDots } from '@/components/shared/ScrollPaginationDots';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'seoPages' });
  return {
    title: t('pms.title'),
    description: t('pms.description'),
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
