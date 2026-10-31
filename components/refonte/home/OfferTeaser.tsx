import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

export function OfferTeaser() {
  const t = useTranslations('refonte.home.offer');
  const steps = t.raw('steps') as { name: string; desc: string }[];
  return (
    <section id="offre" className="sj2-section sj2-wrap" aria-labelledby="sj2-offer-h">
      <div className="sj2-head">
        <span className="sj2-eyebrow">{t('eyebrow')}</span>
        <h2 id="sj2-offer-h" className="sj2-h2">{t('title')}</h2>
        <p className="sj2-lead">{t('lead')}</p>
      </div>
      <div className="sj2-trois sj2-trois--petit">
        {steps.map((s) => (
          <div key={s.name} className="sj2-card sj2-card--compact">
            <h3 className="sj2-h3 sj2-h3--sm">{s.name}</h3>
            <p className="sj2-agent__resume" style={{ fontSize: 15 }}>{s.desc}</p>
          </div>
        ))}
      </div>
      <p className="sj2-modules__note sj2-mono">{t('studioNote')}</p>
      <div style={{ marginTop: 32 }}>
        <Link href="/offre" className="sj2-btn" prefetch={false}>{t('cta')}</Link>
      </div>
    </section>
  );
}
