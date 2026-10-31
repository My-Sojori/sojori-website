import { useTranslations } from 'next-intl';

export function Control() {
  const t = useTranslations('refonte.home.control');
  const cartes = t.raw('cards') as { title: string; text: string }[];
  return (
    <section className="sj2-section sj2-wrap" aria-labelledby="sj2-control-h">
      <div className="sj2-head">
        <span className="sj2-eyebrow">{t('eyebrow')}</span>
        <h2 id="sj2-control-h" className="sj2-h2">{t('title')}</h2>
      </div>
      <div className="sj2-trois">
        {cartes.map((c) => (
          <div key={c.title} className="sj2-card">
            <h3 className="sj2-h3">{c.title}</h3>
            <p className="sj2-agent__resume">{c.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
