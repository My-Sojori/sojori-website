import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { BackgroundEffects } from '@/components/BackgroundEffects';
import { PageHeader, PageFooter, PageHero, StatsBar, FinalCTA } from '@/components/SharedComponents';

interface BookingData {
  propIdx: number;
  startDay: number;
  length: number;
  color: string;
  label: string;
}

function Calendar({ header, properties }: { header: string; properties: string[] }) {
  const days = Array.from({ length: 21 }, (_, i) => i + 5);
  const bookings: BookingData[] = [
    [0, 5, 4, '#FF5A5F', 'Sarah J. · Airbnb'],
    [0, 11, 6, '#003580', 'Marco R. · Booking'],
    [0, 19, 3, '#0E64A4', 'Emma · Vrbo'],
    [1, 6, 5, '#FF5A5F', 'James P. · Airbnb'],
    [1, 14, 8, '#003580', 'Wei L. · Booking'],
    [2, 5, 9, '#FF5A5F', 'Carlos · Airbnb'],
    [2, 17, 4, '#FFC72C', 'Linh N. · Expedia'],
    [3, 8, 6, '#003580', 'Yumi K. · Booking'],
    [3, 16, 5, '#FF5A5F', 'Ali B. · Airbnb'],
    [4, 5, 7, '#FF5A5F', 'Diego · Airbnb'],
    [4, 14, 4, '#003580', 'Sofia · Booking'],
    [4, 19, 3, '#FFC72C', 'Tom W. · Expedia'],
  ].map((b) => ({ propIdx: b[0] as number, startDay: b[1] as number, length: b[2] as number, color: b[3] as string, label: b[4] as string }));

  const colW = 38;
  const rowH = 50;
  const headW = 160;

  return (
    <div className="card" style={{ padding: 0, overflow: 'auto' }}>
      <div style={{ minWidth: headW + days.length * colW + 20 }}>
        <div style={{ display: 'flex', borderBottom: '1px solid var(--glass-border)', position: 'sticky', top: 0, background: 'rgba(20,20,28,0.95)', backdropFilter: 'blur(10px)', zIndex: 2 }}>
          <div style={{ width: headW, padding: '14px 18px', fontSize: 11, fontWeight: 600, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: 1 }}>{header}</div>
          {days.map((d) => (
            <div key={d} style={{ width: colW, padding: '14px 0', textAlign: 'center', fontSize: 11, color: d === 12 ? '#f4cf5e' : 'var(--text-3)', fontFamily: 'Geist Mono', fontWeight: d === 12 ? 700 : 400, borderLeft: '1px solid rgba(255,255,255,0.04)' }}>{d}</div>
          ))}
        </div>
        {properties.map((p, i) => (
          <div key={p} style={{ display: 'flex', borderBottom: i < properties.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none', position: 'relative', height: rowH }}>
            <div style={{ width: headW, padding: '14px 18px', fontSize: 13, fontWeight: 500, color: 'var(--text-1)', display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#10b981' }} />
              {p}
            </div>
            <div style={{ position: 'relative', flex: 1, height: rowH }}>
              {days.map((d, j) => (
                <div key={d} style={{ position: 'absolute', left: j * colW, top: 0, width: colW, height: rowH, borderLeft: '1px solid rgba(255,255,255,0.03)' }} />
              ))}
              {bookings.filter((b) => b.propIdx === i).map((b, k) => {
                const { startDay, length, color, label } = b;
                return (
                  <div
                    key={k}
                    style={{
                      position: 'absolute',
                      left: (startDay - 5) * colW + 3,
                      top: 9,
                      height: rowH - 18,
                      width: length * colW - 6,
                      background: `linear-gradient(135deg, ${color}dd, ${color}aa)`,
                      border: `1px solid ${color}`,
                      borderRadius: 7,
                      padding: '4px 8px',
                      fontSize: 10,
                      color: '#fff',
                      fontWeight: 600,
                      display: 'flex',
                      alignItems: 'center',
                      overflow: 'hidden',
                      whiteSpace: 'nowrap',
                      textOverflow: 'ellipsis',
                      boxShadow: `0 4px 10px ${color}44`,
                    }}
                  >
                    {label}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

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
        <section style={{ padding: '20px 32px 80px' }}>
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
        <section style={{ padding: '40px 32px 80px', borderTop: '1px solid var(--glass-border)' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div className="uppercase-sm" style={{ color: 'var(--text-3)', marginBottom: 12 }}>{t('sectionModules.eyebrow')}</div>
            <div style={{ fontSize: 32, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 32, maxWidth: 700 }}>
              {t('sectionModules.title')} <span style={{ color: 'var(--text-3)' }}>{t('sectionModules.titleMuted')}</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
              {modules.map((c, idx) => (
                <div key={c.title} className="card" style={{ padding: 22 }}>
                  <div style={{ fontSize: 28, marginBottom: 10 }}>{['📅', '💳', '📄', '📊', '🧾', '🔁'][idx] ?? '✓'}</div>
                  <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 4 }}>{c.title}</div>
                  <div style={{ fontSize: 13, color: 'var(--text-3)', lineHeight: 1.55 }}>{c.desc}</div>
                </div>
              ))}
            </div>
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
