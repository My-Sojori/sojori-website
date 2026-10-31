import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

export function DemoCta() {
  const t = useTranslations('refonte.home.demo');
  return (
    <section id="demo" className="sj2-wrap" style={{ paddingBlock: '100px 0' }}>
      <div className="sj2-card sj2-card--gold sj2-demo">
        <div className="sj2-demo__texte">
          <h2 className="sj2-h2 sj2-h2--demo">{t('title')}</h2>
          <p className="sj2-lead">{t('lead')}</p>
        </div>
        <Link href="/demo" className="sj2-btn sj2-btn--lg" prefetch={false}>{t('cta')}</Link>
      </div>
    </section>
  );
}
