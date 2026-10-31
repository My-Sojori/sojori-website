import { useTranslations } from 'next-intl';

const SENS: ('same' | 'up' | 'down')[] = ['down', 'same', 'same', 'down', 'up', 'up', 'same'];
const FLECHE = { up: '↑', down: '↓', same: '→' };

export function Socle() {
  const t = useTranslations('refonte.home.socle');
  const pms = t.raw('pms') as { name: string; desc: string }[];
  const own = t.raw('own') as string[];
  const points = t.raw('pricing.points') as string[];
  const days = t.raw('pricing.days') as { d: string; r: string }[];
  return (
    <section id="socle" className="sj2-section sj2-wrap" aria-labelledby="sj2-socle-h">
      <div className="sj2-head">
        <span className="sj2-eyebrow">{t('eyebrow')}</span>
        <h2 id="sj2-socle-h" className="sj2-h2">{t('title')}</h2>
        <p className="sj2-lead">{t('lead')}</p>
      </div>
      <div className="sj2-socle__grille">
        <div className="sj2-card sj2-card--gold sj2-socle__pms">
          <span className="sj2-eyebrow sj2-eyebrow--sm">{t('pmsTitle')}</span>
          <ul className="sj2-pms">
            {pms.map((m) => (
              <li key={m.name}><h3>{m.name}</h3><p>{m.desc}</p></li>
            ))}
          </ul>
        </div>
        <div className="sj2-card sj2-socle__own">
          <span className="sj2-eyebrow sj2-eyebrow--sm sj2-eyebrow--dim">{t('ownTitle')}</span>
          <ul>{own.map((x) => <li key={x}>{x}</li>)}</ul>
        </div>
      </div>

      <div id="tarification" className="sj2-card sj2-card--gold sj2-tarif">
        <div className="sj2-tarif__texte">
          <span className="sj2-eyebrow sj2-eyebrow--sm">{t('pricing.eyebrow')}</span>
          <h3 className="sj2-h3 sj2-h3--lg">{t('pricing.title')}</h3>
          <p className="sj2-agent__resume">{t('pricing.lead')}</p>
          <ul className="sj2-tarif__points">
            {points.map((x) => <li key={x}><span aria-hidden="true">✓</span><span>{x}</span></li>)}
          </ul>
        </div>
        <div className="sj2-tarif__semaine" role="group" aria-label={t('pricing.weekAria')}>
          <span className="sj2-eyebrow sj2-eyebrow--sm sj2-eyebrow--dim">{t('pricing.weekTitle')}</span>
          <ul className="sj2-semaine">
            {days.map((j, k) => (
              <li key={j.d} className={`sj2-jour sj2-jour--${SENS[k]}`}>
                <span className="sj2-jour__d">{j.d}</span>
                <span className="sj2-jour__f" role="img" aria-label={t(`pricing.arrows.${SENS[k]}`)}>{FLECHE[SENS[k]]}</span>
                <span className="sj2-jour__r">{j.r}</span>
              </li>
            ))}
          </ul>
          <div className="sj2-carte-terra">
            <span className="sj2-carte-terra__titre">{t('pricing.cardTitle')}</span>
            <span className="sj2-carte-terra__texte">{t('pricing.cardText')}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
